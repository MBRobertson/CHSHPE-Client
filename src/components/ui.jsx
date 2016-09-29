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

class Button extends React.Component {
    render() {
        return (<a className="ui-button" href={'#' + this.props.url}>{this.props.text}</a>);
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
    'Divider': Divider
}

export default UI
export { UI, Card, Header, Button, Divider }
