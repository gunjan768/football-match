import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoutes = ( props ) => 
{   
    console.log("public routes",props);
    
    return (
        <Route  
            path = { props.path }
            exact = { props.exact }
            component = 
            {
                ( ) => (
                    props.restricted ?
                        ( 
                            props.user ?
                                <Redirect to="/dashboard"/>
                            :
                                <props.component { ...props } />
                        )
                    :
                    <props.component { ...props } />
                )
            }
        />
    );
}

export default PublicRoutes;