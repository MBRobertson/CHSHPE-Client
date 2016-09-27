import './css/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, hashHistory } from 'react-router'

import Nav from './components/Nav.jsx';

class App extends React.Component {
    render () {
        return this.props.children;
    }
}

class Home extends React.Component {
    render() {
        return (
            <Nav title="CHS PE"/>
        );
    }
}

class Timetable extends React.Component {
    render() {
        return (
            <Nav title="Timetable"/>
        );
    }
}

//document.addEventListener('deviceready', *func, false);

//ReactDOM.render(<App/>, document.getElementById('app'));

ReactDOM.render(
    (<App>
        <Router history={hashHistory}>
            <Route path="/" component={Home}/>
            <Route path="/time" component={Timetable}/>
        </Router>
    </App>),
    document.getElementById('app'))
