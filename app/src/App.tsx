import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Subscribe from './components/Subcribe';
import { Login } from './components/Auth/Login'
import { Register } from './components/Auth/Register'
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
    return (
        <>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <ProtectedRoute path="/subscriptions">
                    <Subscribe />
                </ProtectedRoute>
            </Switch>
        </>
    );
}

export default App;
