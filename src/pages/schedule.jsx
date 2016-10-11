import React from 'react';
import { UI } from '../components/ui.jsx';
import { PeriodView } from '../components/period-view.jsx';

import { Config } from 'config';

class Schedule extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            class: Config.user.getClass(),
            day: null,
            schedule: null,
            classList: null,
            locationList: null
        }

        this.refresh = this.refresh.bind(this);
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

    render() {
        if (!(this.state.day && this.state.schedule && this.state.classList && this.state.locationList)) {
            return (
                <UI.Card>
                    <UI.Header text="Loading..."/>
                </UI.Card>
            )
        }
        else if (this.state.day.day <= 0 || this.state.day.day >= 6) {
            return (
                <UI.Card>
                    <UI.Header text="It's currently the weekend"/>
                    <UI.SubHeader text="Nothing to show at the moment"/>
                </UI.Card>
            )
        }
        /*else if (this.state.day.period <= 0) {
            return (
                <UI.Card>
                    <UI.Header text={'It is currently ' + (this.state.day.period == 0 ? 'before school' : 'after school')}/>
                    <UI.SubHeader text={'Week ' + this.state.day.week + ' - Day ' + this.state.day.day}/>
                </UI.Card>
            )
        }*/
        else {
            var scheduleItems = [];
            for (var i = 1; i <= 5; i++) {
                scheduleItems.push(
                    <PeriodView key={i} period={i} time={this.state.day} schedule={this.state.schedule} classList={this.state.classList} locationList={this.state.locationList}/>
                )
            }

            return (
                <div id="schedulePage">
                    <UI.Card>
                        <UI.Header text="Schedule"/>
                        <UI.SubHeader text={'Week ' + this.state.day.week + ' - Day ' + this.state.day.day}/>
                        <UI.Button onClick={this.refresh} text="Refresh" />
                    </UI.Card>
                    {scheduleItems}
                </div>)
            ;
        }

    }
}
//id="homePage"

export default Schedule
export { Schedule }
