import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export function ProtectedRoute({ children, ...rest }) {
    return (
        <Route {...rest} render={({ location }) => {
            return Boolean(localStorage.getItem("token"))
                ? children
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: location }
                }}
                />
        }} />
    )
}