import React from 'react';
import { Link } from 'react-router-dom';

class Card extends React.Component {
    render() {
        let padding = this.props.padded;
        if (typeof padding === 'undefined' || padding === null)
            padding = true;
        return (<div className={"ui-card" + (padding ? "" : " ui-unpadded")}>
            {this.props.children}
        </div>);
    }
}

class Padding extends React.Component {
    render() {
        return (<div className="ui-padding">
            {this.props.children}
        </div>);
    }
}

class Header extends React.Component {
    render() {
        return (
            <h4 className="ui-header">{this.props.text}</h4>
        );
    }
}
class SubHeader extends React.Component {
    render() {
        return (
            <h5 className="ui-subheader">{this.props.text}</h5>
        );
    }
}

class Button extends React.Component {

    render() {
        if (this.props.onClick) {
            return (<span className={"ui-button" + (this.props.selected ? " selected" : "")} onClick={this.props.onClick}>{this.props.text}</span>);
        }
        else {
            return (<Link className={"ui-button" + (this.props.selected ? " selected" : "")} to={this.props.url}>{this.props.text}</Link>);
        }
    }
}

class Text extends React.Component {
    render() {
        return (<span className="ui-text">{this.props.text}</span>)
    }
}

class Divider extends React.Component {
    render() {
        return (<span className='ui-divider'></span>);
    }
}

class TabBar extends React.Component {
    render() {
        return (<div className="ui-tabbar">
            {this.props.children}
        </div>)
    }
}

const UI = {
    'Button': Button,
    'Header': Header,
    'Card': Card,
    'Padding': Padding,
    'Divider': Divider,
    'Text': Text,
    'SubHeader': SubHeader,
    'TabBar': TabBar
}

export default UI
export { UI, Card, Padding, Header, Button, Divider, Text, SubHeader, TabBar }
