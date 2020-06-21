import React, { Component } from 'react';
import PlayerCard from '../ui/playerCard';
import Fade from 'react-reveal/Fade';
import CircularProgress from '@material-ui/core/CircularProgress'

import Stripes from '../../Resources/images/stripes.png';
import { firebasePlayers, firebase } from '../../firebase';
import { firebaseLooper } from '../ui/misc';
  
class TheTeam extends Component 
{
    state = 
    {
        loading: true,
        players: []
    }

    componentDidMount()
    {
        firebasePlayers.once('value')
        .then(snapshot => 
        {
            const players = firebaseLooper(snapshot);
            let promises = [];
            console.log(players);
            for(let key in players)
            {
                promises.push(
                    new Promise((resolve,reject) =>
                    {
                        firebase.storage().ref('players').child("claudio_bravo.png").getDownloadURL()
                        .then(url => 
                        {
                            players[key].url = url;
                            resolve();
                        })
                    })
                )
            }

            Promise.all( promises )
            .then(() =>
            {
                this.setState(
                {
                    loading: false,
                    players
                })
            })
            .catch(error =>
            {
                console.log("theTeam.js Error",error);
            })
        })
    }

    showplayersByCategory = (category) => 
    {
        return (
            this.state.players ?
                this.state.players.map((player,ind) =>
                {
                    return (
                        player.position === category ?
                            <Fade left delay = { ind*20 } key = { ind }>
                                <div className="item">
                                    <PlayerCard
                                        number = { player.number }
                                        name = { player.name }
                                        lastname = { player.lastname }
                                        bck = { player.url }
                                    />
                                </div>
                            </Fade>
                        :
                            null
                    );
                })
            :
                null
        );
    }

    render()
    {console.log("2");
        return (
            <div className="the_team_container"
                style =
                {{
                    background:`url(${Stripes}) repeat`
                }}
            >
                { 
                    !this.state.loading ?
                        <div>
                            <div className="team_category_wrapper">
                                <div className="title">Keepers</div>
                                <div className="team_cards">
                                    { this.showplayersByCategory('Keeper')  }
                                </div>
                            </div>

                            <div className="team_category_wrapper">
                                <div className="title">Defence</div>
                                <div className="team_cards">
                                    { this.showplayersByCategory('Defence') }
                                </div>
                            </div>

                            <div className="team_category_wrapper">
                                <div className="title">Midfield</div>
                                <div className="team_cards">
                                    { this.showplayersByCategory('Midfield') }
                                </div>
                            </div>

                            <div className="team_category_wrapper">
                                <div className="title">Strikers</div>
                                <div className="team_cards">
                                    { this.showplayersByCategory('Striker') }
                                </div>
                            </div>

                        </div>
                    :
                        <CircularProgress 
                            thickness = { 4 }
                            size = { 80 } 
                            style = 
                            {{ 
                                color:'#98c5e9',
                                position: "relative",
                                left: "45%",
                                top: "240px"
                            }} 
                        />
                }
                
            </div>
        );
    }
}

export default TheTeam;