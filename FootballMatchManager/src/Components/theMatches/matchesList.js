import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import NodeGroup from 'react-move/NodeGroup';

class MatchesList extends Component {

    state = 
    {
        matcheslist: []
    }

    static getDerivedStateFromProps(props,state)
    {
        return state = 
        {
            matcheslist: props.matches
        }
    }

    showMatches = () => (
        this.state.matcheslist ?
            
            // NodeGroup 'data' property will receive the array and it will run for each element of the array.
            <NodeGroup
                data = { this.state.matcheslist }
                
                keyAccessor = { ( element ) => element.id }  

                start = { () => 
                ({
                    opacity: 0,
                    x: -200
                })}

                enter = { ( element, ind ) => 
                ({
                    opacity: [1],
                    x: [0],
                    timing: { duration: 500, delay: ind * 50, ease: easePolyOut }
                })}

                update = { ( element, ind ) =>
                ({
                    opacity: [1],
                    x: [0],
                    timing: { duration: 500, delay: ind * 50, ease: easePolyOut }
                })}

                leave = { ( element, ind ) =>
                ({
                    opacity: [0],
                    x: [-200],
                    timing: { duration: 500, delay: ind * 50, ease: easePolyOut }
                })}
            >
                {
                    ( nodes ) => (
                        <div>
                            { 
                                nodes.map(( {key, data, state: { x, opacity } } ) => (
                                    <div 
                                        key = { key } 
                                        className="match_box_big"
                                        style =
                                        {{
                                            opacity,
                                            transform: `translate(${x}px)`
                                        }}
                                    >
                                        <div className="block_wraper">
                                            
                                            <div className="block">
                                                <div 
                                                    className="icon" 
                                                    style={{background:`url(/images/team_icons/${data.localThmb}.png)`}}>
                                                </div>
                                                <div className="team">{ data.local }</div>
                                                <div className="result">{ data.resultLocal }</div>
                                            </div>

                                            <div className="block">
                                                <div 
                                                    className="icon" 
                                                    style={{background:`url(/images/team_icons/${data.awayThmb}.png)`}}> 
                                                </div>
                                                <div className="team">{ data.away }</div>
                                                <div className="result">{ data.resultAway }</div>
                                            </div>

                                        </div>

                                        <div className="block_wraper nfo">
                                            <div><strong>Date:</strong> { data.date }</div>
                                            <div><strong>Stadium:</strong> { data.stadium }</div>
                                            <div><strong>Referee:</strong> { data.referee }</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }

            </NodeGroup>
        : 
            null
    )

    render() 
    {
        return (
            <div>
                { this.showMatches() }
            </div>
        );
    }
}

export default MatchesList;