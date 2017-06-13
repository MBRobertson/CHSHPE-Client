import React from 'react';
import { UI } from '../components/ui.jsx';
import { PeriodView } from '../components/period-view.jsx';

import { Config } from 'config';

class Home extends React.Component {
    constructor(props) {
        super(props)

        if (this.props.route.data.checkData()) {
            let info = this.props.route.data.getData();
            this.state = {
                day: info.time,
                schedule: info.schedule,
                classList: info.classes,
                locationList: info.locations
            }
        } else {
            this.state = {
                day: null,
                schedule: null,
                classList: null,
                locationList: null
            }
        }

        this.refresh = this.refresh.bind(this);
        this.populateData = this.populateData.bind(this);
    }

    refresh() {
        let data = this.props.route.data;
        data.getSchedule();
        data.getClasses();
        data.getLocations();
        data.verifyData();
    }

    populateData() {
        let info = this.props.route.data.getData();
        this.setState({
            day: info.time,
            schedule: info.schedule,
            classList: info.classes,
            locationList: info.locations
        })
    }

    componentDidMount() {
        this.refresh()
        document.addEventListener("dataready", this.populateData, false);
        document.addEventListener("resume", this.refresh, false);
    }

    componentWillUnmount() {
        document.removeEventListener("dataready", this.populateData, false);
        document.removeEventListener("resume", this.refresh, false);
    }

    render() {
        var defaultGreeting = (
            <section id="schoolHeader">
                <div id="schoolLogo"></div>
                <h2>Cambridge High School</h2>
                <h1>HPE Information App</h1>
            </section>
        )
        /*return (<div>
            <UI.Card>
                <UI.Header text="Upcoming Classes"/>
                <UI.Divider/>
                <UI.Button url="/timetable" text="Timetable" />
                <UI.Button url="/timetable" text="Something" />
            </UI.Card>
            <UI.Card>

                <UI.Button url="/News" text="News" />
            </UI.Card>
        </div>);*/
        if (!(this.state.day && this.state.schedule && this.state.classList && this.state.locationList)) {
            return (<div id="homePage">
                {defaultGreeting}
                <UI.Card>
                    <UI.Header text="Fetching data"/>
                    <UI.SubHeader text="One moment please..."/>
                </UI.Card>
            </div>)
        }
        else if (this.state.day.day <= 0 || this.state.day.day >= 6) {
            return (<div id="homePage">
                {defaultGreeting}
                <UI.Card>
                    <UI.Header text="It's currently the weekend"/>
                    <UI.SubHeader text="Nothing to show at the moment"/>
                </UI.Card>
            </div>)
        }
        else if (this.state.day.period <= 0) {
            return (<div id="homePage">
                {defaultGreeting}
                <UI.Card>
                    <UI.Header text={'It is currently ' + (this.state.day.period == 0 ? 'before school' : 'after school')}/>
                    <UI.SubHeader text={'Week ' + this.state.day.week + ' - Day ' + this.state.day.day}/>
                </UI.Card>
                <UI.Button url="/schedule" text="Week Schedule" />
            </div>)
        }
        else {
            return (<div id="homePage">
                {defaultGreeting}
                <div id="schedulePage">
                    <PeriodView dayData={true} period={this.state.day.period} time={this.state.day} schedule={this.state.schedule} classList={this.state.classList} locationList={this.state.locationList}></PeriodView>
                    {/*<UI.Divider/>
                    <UI.Button onClick={this.refresh} text="Refresh" />*/}
                    <UI.Button url="/schedule" text="Week Schedule" />
                </div></div>)
            ;
        }
    }
}
//id="homePage"

export default Home
export { Home }
