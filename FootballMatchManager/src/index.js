import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import './Resources/css/app.css';
import { BrowserRouter } from 'react-router-dom';
import { firebase } from './firebase';

const App = ( props ) =>
{
    return (
        <BrowserRouter>
            <Routes { ...props } />
        </BrowserRouter>
    )
}

// onAuthStateChanged() is a firebase function which executes whenever there is any change in the auth state i.e if user is currently logged in 
// now gets logout  or if currently signed out and then gets signed in 
firebase.auth().onAuthStateChanged((user) =>
{
    ReactDOM.render(<App user = { user }/>, document.getElementById('root'));
})