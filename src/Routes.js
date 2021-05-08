import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

import LoginPage from './Components/Login/LoginPage';
import MainPageLayout from './Components/Layout/MainPageLayout';
import About from './Components/About/About';
import RouteWithLayout from './Components/navigations/RouteWithLayout';
import Dashboard from './Components/UserMainPage/Start';
import News from './Components/News/News';
import Registrations from './Components/Registrations/RegistrationsPage';

const Routes = () => {
	return (
		<Switch>
			<Redirect exact from="/" to="/Login" />
            <Route
                component={LoginPage}
                exact
                path="/Login"              
            />
            <RouteWithLayout
                component={Dashboard}
                exact
                path="/Start"
                layout={MainPageLayout}
            />
			<RouteWithLayout
                component={About}
                exact
                path="/About"
                layout={MainPageLayout}
            />
            <RouteWithLayout
                component={News}
                exact
                path="/News"
                layout={MainPageLayout}
            />
            <RouteWithLayout
                component={Registrations}
                exact
                path="/Registrations"
                layout={MainPageLayout}
            />
             <RouteWithLayout
                component={Dashboard}
                exact
                path="/Dashboard"
                layout={MainPageLayout}
            />
		</Switch>
	);
};

export default Routes;