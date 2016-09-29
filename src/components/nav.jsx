import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

let pages = [
    {
        id: 1,
        heading: "CHS PE",
        pages: [
            {
                id: 1,
                title: 'CHS PE',
                nav_text: 'Dashboard',
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
                url: '/timetable'
            }
        ]
    },
    {
        id: 2,
        heading: "SETTINGS",
        pages: [
            {
                id: 4,
                title: 'Settings',
                url: '/settings'
            }
        ]
    }
]

let getPageTitle = (location) => {
    if (location) {
        for (var i = 0; i < pages.length; i++) {
            for (var z = 0; z < pages[i].pages.length; z++) {
                if (pages[i].pages[z].url == location.pathname)
                    return pages[i].pages[z].title;
            }

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
                <NavOverlay open={this.state.open} clickHandler={this.closeNav}/>
                <ul id="navHolder" className={this.state.open ? '' : 'hidden'}>
                    {pages.map((pageSet) => {
                        return [
                            <NavHeader text={pageSet.heading} key={pageSet.id}/>,
                            pageSet.pages.map((page) => {
                                return (<NavButton clickHandler={this.closeNav} key={page.id} page={page} curPage={this.props.loc.pathname} />);
                            })
                        ]
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

class NavHeader extends React.Component {
    render() {
        return (
            <li className="nav-header"><h3>{this.props.text}</h3></li>
        );
    }
}

class NavOverlay extends React.Component {
    render() {
        let overlay;
        if (this.props.open)
            overlay = (<div id="navOverlay" onClick={this.props.clickHandler}></div>)
        return (
            <ReactCSSTransitionGroup transitionName="nav-overlay" transitionEnterTimeout={250} transitionLeaveTimeout={250}>
                {overlay}
            </ReactCSSTransitionGroup>
        );
    }
}

export default Nav;
export { Nav, NavButton };
