import React from 'react';

let pages = [
    {
        title: 'Home',
        url: '/'
    }
]

class Nav extends React.Component {
    render() {
        return (
            <nav>
                <span id="hamburger"/>
                <h1>{this.props.title}</h1>
            </nav>
        );
    }
}

export default Nav;
export { Nav };
