import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoutes = ( props ) => 
{   
    return (
        <Route 
            path = { props.path }
            exact = { props.exact }
            component = 
            { 
                (pp) => (
                    props.user ?
                        <props.component { ...pp } user = { props.user } />
                        :
                    <Redirect to="/sign_in"/>
                )
            }
        />
    );
}

export default PrivateRoutes;