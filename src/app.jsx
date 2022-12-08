import './css/main.scss';

import FastClick from './components/fastclick.js';

import React from 'react';
import {
    createHashRouter,
    RouterProvider,
    Route,
    useLocation,
  } from "react-router-dom";

import { Home } from './pages/home.jsx';
import { Teachers } from './pages/teachers.jsx';
import { Schedule } from './pages/schedule.jsx';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Nav from './components/nav.jsx';

import Data from './data';

const AppPage = (props) => {
    const location = useLocation()
    return (
        <main>
            <Nav loc={location}/>
            <ReactCSSTransitionGroup transitionName="pageSwap" transitionEnterTimeout={225} transitionLeaveTimeout={225}>
                <section id="mainContent" key={location.pathname}>
                    {props.children}
                </section>
            </ReactCSSTransitionGroup>
        </main>
    );
}

const routeData = {
    data: Data
}

const router = createHashRouter([
    {
        path: '/',
        element: <AppPage><Home route={routeData} /></AppPage>,
    },
    {
        path: '/schedule',
        element: <AppPage><Schedule route={routeData} /></AppPage>,
    },
    {
        path: '/teachers',
        element: <AppPage><Teachers route={routeData} /></AppPage>,
    },
])


export default class App extends React.Component {
    render() {
        return (
            <RouterProvider router={router} />
        )
    }
}