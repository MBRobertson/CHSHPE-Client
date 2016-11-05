import React from 'react';
import { UI } from '../components/ui.jsx';
import { PeriodView } from '../components/period-view.jsx';

import { Config } from 'config';

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            day: null,
            schedule: null,
            classList: null,
            locationList: null
        }

        this.refresh = this.refresh.bind(this);
    }

    refresh() {
        this.setState({
            day: null,
            schedule: null
        });
        Config.time.getDay((day) => {
            Config.time.getSchedule(Config.time.toString(day, true), (schedule) => {
                this.setState({
                    day: day,
                    schedule: schedule
                })
            })
        })
    }

    componentDidMount() {
        Config.time.getDay((day) => {
            Config.time.getSchedule(Config.time.toString(day, true), (schedule) => {
                this.setState({
                    day: day,
                    schedule: schedule
                })
            })
        });
        Config.classes.get((classList) => { this.setState({ classList: classList }) });
        Config.locations.get((locationList) => { this.setState({ locationList: locationList }) });
        document.addEventListener("resume", this.refresh, false);
    }

    componentWillUnmount() {
        document.removeEventListener("resume", this.refresh, false);
    }

    render() {
        var defaultGreeting = (
            <UI.Card>
                <UI.Header text="Welcome to the CHS PE app!"/>
                <UI.SubHeader text="View information about your PE classes"/>
            </UI.Card>
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
            return (<div>
                {defaultGreeting}
                <UI.Card>
                    <UI.Header text="Fetching data"/>
                    <UI.SubHeader text="One moment please..."/>
                </UI.Card>
            </div>)
        }
        else if (this.state.day.day <= 0 || this.state.day.day >= 6) {
            return (<div>
                {defaultGreeting}
                <UI.Card>
                    <UI.Header text="It's currently the weekend"/>
                    <UI.SubHeader text="Nothing to show at the moment"/>
                </UI.Card>
            </div>)
        }
        else if (this.state.day.period <= 0) {
            return (<div>
                {defaultGreeting}
                <UI.Card>
                    <UI.Header text={'It is currently ' + (this.state.day.period == 0 ? 'before school' : 'after school')}/>
                    <UI.SubHeader text={'Week ' + this.state.day.week + ' - Day ' + this.state.day.day}/>
                </UI.Card>
            </div>)
        }
        else {
            return (<div>
                {defaultGreeting}
                <div id="schedulePage">
                    <PeriodView dayData={true} period={this.state.day.period} time={this.state.day} schedule={this.state.schedule} classList={this.state.classList} locationList={this.state.locationList}>
                        <UI.Divider/>
                        <UI.Button onClick={this.refresh} text="Refresh" />
                        <UI.Button url="/schedule" text="Schedule" />
                    </PeriodView>
                </div></div>)
            ;
        }
    }
}
//id="homePage"

export default Home
export { Home }
