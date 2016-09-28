import React from 'react';

let pages = [
    {
        id: 1,
        title: 'CHS PE',
        nav_text: 'Home',
        url: '/'
    },
    {
        id: 2,
        title: 'News',
        url: '/news'
    },
    {
        id: 3,
        title: 'Timetable',
        url: '/time'
    }
]

let getPageTitle = (location) => {
    if (location) {
        for (var i = 0; i < pages.length; i++) {
            if (pages[i].url == location.pathname)
                return pages[i].title;
        }
    }
    console.log("No pathname found");
    return '';
}

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }

        this.toggleNav = this.toggleNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }

    toggleNav() {
        if (this.state.open) {
            this.setState({
                open: false
            });
        } else {
            this.setState({
                open: true
            });
        }
    }

    closeNav() {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <nav>
                <span id="hamburger" className={this.state.open ? 'selected' : ''} onClick={this.toggleNav}/>
                <h1>{getPageTitle(this.props.loc)}</h1>
                <ul id="navHolder" className={this.state.open ? '' : 'hidden'}>
                    {pages.map((page) => {
                        return (<NavButton clickHandler={this.closeNav} key={page.id} page={page} curPage={this.props.loc.pathname} />);
                    })}
                </ul>
            </nav>
        );
    }
}

class NavButton extends React.Component {
    render() {
        let title = this.props.page.nav_text ? this.props.page.nav_text : this.props.page.title;
        return (<li className={"nav-button" + (this.props.page.url == this.props.curPage ? ' active' : '')}>
            <a onClick={this.props.clickHandler} href={'#' + this.props.page.url}>{title}</a>
        </li>);
    }
}

export default Nav;
export { Nav, NavButton };
