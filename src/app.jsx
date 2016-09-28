import './css/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Nav from './components/Nav.jsx';

class App extends React.Component {
    render() {
        return (
            <main>
                <Nav loc={this.props.location}/>
                <section id="mainContent" key={this.props.location.pathname}>
                    {this.props.children}
                </section>
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

class Home extends React.Component {
    render() {
        return (
            <h2>Hello Home!</h2>
        );
    }
}

class Timetable extends React.Component {
    render() {
        return (
            <h2>Hello Timetable!</h2>
        );
    }
}

//document.addEventListener('deviceready', *func, false);

//ReactDOM.render(<App/>, document.getElementById('app'));

ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute path="" component={Home} />
            <Route path="time" component={Timetable}/>
        </Route>
    </Router>),
    document.getElementById('app')
);
