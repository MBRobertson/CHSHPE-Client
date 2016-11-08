import React from 'react';
import { UI } from '../components/ui.jsx';
import { PeriodView } from '../components/period-view.jsx';

import { Config } from 'config';

class Schedule extends React.Component {
    constructor(props) {
        super(props)

        if (this.props.route.data.checkData()) {
            let info = this.props.route.data.getData();
            this.state = {
                class: Config.user.getClass(),
                day: info.time,
                schedule: info.schedule,
                classList: info.classes,
                locationList: info.locations
            }
        } else {
            this.state = {
                class: Config.user.getClass(),
                day: null,
                schedule: null,
                classList: null,
                locationList: null
            }
        }

        this.refresh = this.refresh.bind(this);
        this.populateData = this.populateData.bind(this);
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

    refresh() {
        let data = this.props.route.data;
        data.getSchedule();
        data.getClasses();
        data.getLocations();
        data.verifyData();
    }

    render() {
        if (!(this.state.day && this.state.schedule && this.state.classList && this.state.locationList)) {
            return (
                <UI.Card>
                    <UI.Header text="Fetching data"/>
                    <UI.SubHeader text="One moment please..."/>
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
                        {/*<UI.Button onClick={this.refresh} text="Refresh" />*/}
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
