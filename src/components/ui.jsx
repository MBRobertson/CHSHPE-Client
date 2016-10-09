import React from 'react';

class Card extends React.Component {
    render() {
        return (<div className="ui-card">
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
            return (<span className="ui-button" onClick={this.props.onClick}>{this.props.text}</span>);
        }
        else {
            return (<a className="ui-button" href={'#' + this.props.url}>{this.props.text}</a>);
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

const UI = {
    'Button': Button,
    'Header': Header,
    'Card': Card,
    'Divider': Divider,
    'Text': Text,
    'SubHeader': SubHeader
}

export default UI
export { UI, Card, Header, Button, Divider, Text, SubHeader }
