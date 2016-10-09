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
            // {
            //     id: 2,
            //     title: 'News',
            //     url: '/news'
            // },
            {
                id: 3,
                title: 'Schedule',
                url: '/schedule'
            },
            {
                id: 4,
                title: 'Teachers',
                url: '/teachers'
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

let target;
let handler;
let openState = false;
let trackedTouch = null;
let xOrigin = 0;
let offset = 0;

let touchStart = (ev) => {
    if (trackedTouch == null) {
        trackedTouch = ev.changedTouches[0];
        target.classList.add('dragging');
        offset = 0;
        xOrigin = trackedTouch.pageX;
        console.log("Now tracking!")
        console.log(trackedTouch);
    }
}

let touchEnd = (ev) => {
    if (trackedTouch != null) {
        for (var i = 0; i < ev.changedTouches.length; i++) {
            let touch = ev.changedTouches.item(i);
            if (touch.identifier == trackedTouch.identifier) {
                // TODO: Do something with removed touch data
                //target.style = "";
                target.classList.remove('dragging');
                handler(target, offset)
                trackedTouch = null;
                xOrigin = 0;
                offset = 0;
                console.log("Stopped tracking!");
            }
        }
    }
    //console.log(ev);
}

let setOffset = () => {
    if (openState) {
        target.style = "transform: translateX(0%) translateX(" + offset + "px)";
    } else {
        target.style = "transform: translateX(-100%) translateX(" + offset + "px)";
    }
}

let touchMove = (ev) => {
    if (trackedTouch != null)  {
        for (var i = 0; i < ev.changedTouches.length; i++) {
            let touch = ev.changedTouches.item(i);
            offset = touch.pageX - xOrigin;
            if (offset > 0 && openState) offset = 0;
            if (offset < -target.clientWidth && openState) offset = -target.clientWidth

            if (offset < 0 && !openState) offset = 0;
            if (offset > target.clientWidth && !openState) offset = target.clientWidth
            //Do something with touch
            setOffset();
        }
    }
}

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }

        this.toggleNav = this.toggleNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.handleNavDrag = this.handleNavDrag.bind(this);
    }

    componentDidMount() {
        let el = this.refs.navHolder;

        target = el;
        openState = this.state.open;
        handler = this.handleNavDrag;

        //el.addEventListener('touchstart', touchStart, false);
        //el.addEventListener('touchend', touchEnd, false);
        //el.addEventListener('touchcancel', touchEnd, false);

        //el.addEventListener('touchmove', touchMove, false);
    }

    componentWillUnmount() {
        //el.removeEventListener('touchstart', touchStart);
        //el.removeEventListener('touchend', touchEnd);
        //el.removeEventListener('touchcancel', touchEnd);
        //el.removeEventListener('touchmove', touchMove);
    }

    handleNavDrag(target, offset) {
        if ((Math.abs(offset) >= Math.abs(target.clientWidth/3))) {
            if (this.state.open) {
                this.closeNav();
            } else if (!this.state.open) {
                this.openNav();
            }
        }

        target.style = "";
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

    openNav() {
        this.setState({
            open: open
        });
    }

    closeNav() {
        this.setState({
            open: false
        });
    }

    render() {
        openState = this.state.open;
        return (
            <nav>
                <span id="hamburger" className={this.state.open ? 'selected' : ''} onClick={this.toggleNav}/>
                <h1>{getPageTitle(this.props.loc)}</h1>
                <NavOverlay open={this.state.open} clickHandler={this.closeNav}/>
                <ul ref="navHolder" id="navHolder" className={this.state.open ? '' : 'hidden'}>
                    {/* <span id="navDragger"></span> */}
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
