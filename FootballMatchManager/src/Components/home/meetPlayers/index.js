import React, { Component } from 'react';
import Stripes from '../../../Resources/images/stripes.png';
import { Tag } from '../../ui/misc';
import HomeCards from './cards';

// Reveal is used to trigger the animation when the part where we applied the animation becomes visible  
import Reveal from 'react-reveal/Reveal';

class MeetPlayers extends Component 
{
    state = 
    {
        show: false
    }

    render() 
    {
        return (
            <Reveal
                
                // fraction means when to start to the aniamtion i.e after how much fraction should becomes visible to start the animation
                fraction = { 0.4 }
                
                // onReveal means when the part where we applied the animation becomes visible 
                onReveal = 
                { 
                    () => 
                    {
                        this.setState(
                        {
                            show: true
                        })
                    }
                }
            >
                <div 
                    className="home_meetplayers"
                    style = 
                    {{ 
                        background: `#ffffff url(${Stripes})` 
                    }}
                >
                    <div className="container">
                        <div className="home_meetplayers_wrapper">
                            
                            <div className="home_card_wrapper">
                                <HomeCards show = { this.state.show }/>
                            </div>

                            <div className="home_text_wrapper">
                                
                                <div>
                                    <Tag 
                                        bck="#0e1731"
                                        size="100px" 
                                        color="#ffffff" 
                                        add =
                                        {{
                                            display: 'inline-block',
                                            marginBottom: '20px',
                                        }} > Meet
                                    </Tag>
                                </div>

                                <div>
                                    <Tag 
                                        bck="#0e1731" 
                                        size="100px" 
                                        color="#ffffff" 
                                        add =
                                        {{
                                            display: 'inline-block',
                                            marginBottom: '20px',
                                        }} > The
                                    </Tag>
                                </div>
                                
                                <div>
                                    <Tag 
                                        bck="#0e1731" 
                                        size="100px" 
                                        color="#ffffff" 
                                        add =
                                        {{
                                            display: 'inline-block',
                                            marginBottom: '20px',
                                        }} > Players
                                    </Tag>
                                </div>
                                
                                <div>
                                    <Tag
                                        bck="#ffffff"
                                        size="27px"
                                        color="#0e1731"
                                        link
                                        linkto="/the_team"
                                        add = 
                                        {{
                                            display: 'inline-block',
                                            marginBottom: '27px',
                                            border: '1px solid #0e1731'
                                        }} > Meet them here
                                    </Tag>

                                </div>
                            </div>

                        </div>
                    </div>

                </div>

            </Reveal>

        );
    }
}

export default MeetPlayers;