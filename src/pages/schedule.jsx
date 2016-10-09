import React from 'react';
import { UI } from '../components/ui.jsx';

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
        this.getClass = this.getClass.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    componentDidMount() {
        Config.time.getDay((day) => {
            Config.time.getSchedule(Config.time.toString(day), (schedule) => {
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
            Config.time.getSchedule(Config.time.toString(day), (schedule) => {
                this.setState({
                    day: day,
                    schedule: schedule
                })
            })
        })
    }

    getClass(id) {
        let classList = this.state.classList
        for (var i = 0; i < classList.length; i++) {
            if (classList[i]._id == id)
                return classList[i];
        }
    }

    getLocation(id) {
        let locationList = this.state.locationList
        for (var i = 0; i < locationList.length; i++) {
            if (locationList[i]._id == id)
                return locationList[i];
        }
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
        else if (this.state.day.period <= 0) {
            return (
                <UI.Card>
                    <UI.Header text={'It is currently ' + (this.state.period == 0 ? 'before school' : 'after school')}/>
                    <UI.SubHeader text={'Week ' + this.state.day.week + ' - Day ' + this.state.day.day}/>
                </UI.Card>
            )
        }
        else {
            console.log(this.state.schedule);
            var scheduleItems = [];
            for (var c in this.state.schedule.locations) {
                let classData = this.getClass(c);
                let locationData = this.getLocation(this.state.schedule.locations[c]);
                if (classData && locationData) {
                    scheduleItems.push(
                        <ScheduleItem key={c} classData={classData} locationData={locationData} />
                    )
                }
            }
            return (
                <div id="schedulePage">
                    <UI.Card>
                        <UI.Header text={'Period ' + this.state.day.period}/>
                        <UI.SubHeader text={'Week ' + this.state.day.week + ' - Day ' + this.state.day.day}/>
                        <UI.Divider/>
                        {scheduleItems}
                        <UI.Divider/>
                        <UI.Button onClick={this.refresh} text="Refresh" />
                    </UI.Card>
                </div>)
            ;
        }

    }
}

class ScheduleItem extends React.Component {
    render() {
        return <div className="class">
            <span className="name">{this.props.classData.name}<span className="code">{this.props.classData.teacher}</span></span>
            <span className="location">{this.props.locationData.name}</span>
    </div>
    }
}
//id="homePage"

export default Schedule
export { Schedule }
