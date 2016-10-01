import './css/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router';

import { Home } from './pages/home.jsx';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Nav from './components/nav.jsx';

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
            <Route path="timetable" component={Timetable}/>
        </Route>
    </Router>),
    document.getElementById('app')
);
