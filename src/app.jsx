import './css/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

import { Home } from './pages/home.jsx';
import { Teachers } from './pages/teachers.jsx';
import { Schedule } from './pages/schedule.jsx';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Nav from './components/nav.jsx';

import Data from 'data';

class App extends React.Component {
    render() {
        return (
            <main>
                <Nav loc={this.props.location}/>
                <ReactCSSTransitionGroup transitionName="pageSwap" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
                    <section id="mainContent" key={this.props.location.pathname}>
                        {this.props.children}
                    </section>
                </ReactCSSTransitionGroup>
            </main>
        );
    }
}

/*
<ReactCSSTransitionGroup transitionName="pageSwap" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
    <section id="mainContent" key={this.props.location.pathname}>
        {this.props.children}
    </section>
</ReactCSSTransitionGroup>
*/

//document.addEventListener('deviceready', *func, false);

//ReactDOM.render(<App/>, document.getElementById('app'));

document.addEventListener('deviceready', () => {
    if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#003865");
    }
    /*if (device.platform == 'iOS') {*/
    //setTimeout(function() {StatusBar.overlaysWebView(false);}, 0);

    Data.beginFetch();
    console.log("Running...")

    ReactDOM.render(
        (<Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute path="" data={Data} component={Home} />
                <Route path="schedule" data={Data} component={Schedule}/>
                <Route path="teachers" data={Data} component={Teachers}/>
            </Route>
        </Router>),
        document.getElementById('app')
    );
}, false);
