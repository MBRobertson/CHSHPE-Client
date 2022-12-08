import React from 'react';

import { UI } from './ui.jsx';
import { Config } from '../config';

class PeriodView extends React.Component {
    constructor(props) {
        super(props);

        this.getRelevantClasses = this.getRelevantClasses.bind(this);
        this.getLocationList = this.getLocationList.bind(this);
        this.getClass = this.getClass.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    getRelevantClasses(slot) {
        var classes = {
            scheduled: [],
            unscheduled: []
        };

        var locations = this.getLocationList(slot);

        for (var i = 0; i < this.props.classList.length; i++) {
            let c = this.props.classList[i];
            if (c.timetable.indexOf(slot) >= 0) {
                var c2 = this.getClass(c._id)
                var item = {
                    id: c2._id,
                    name: c2.name,
                    teacher: c2.teacher,
                    location: 'No location set'
                }
                if (locations[c2._id]) {
                    item.location = this.getLocation(locations[c2._id]).name;
                    classes.scheduled.push(item);
                }
                else {
                    classes.unscheduled.push(item);
                }


            }
        }
        return classes;
    }

    getLocationList(slot) {
        for (var i = 0; i < this.props.schedule.length; i++) {
            if (this.props.schedule[i].slot == slot)
            {
                return this.props.schedule[i].locations || {};
            }

        }
        return {};
    }

    getClass(id) {
        let classList = this.props.classList
        for (var i = 0; i < classList.length; i++) {
            if (classList[i]._id == id)
                return classList[i];
        }
    }

    getLocation(id) {
        let locationList = this.props.locationList
        for (var i = 0; i < locationList.length; i++) {
            if (locationList[i]._id == id)
                return locationList[i];
        }
    }


    render() {
        console.log(Config.time.toString(this.props.time, true) + ':' + this.props.period);
        var classes = this.getRelevantClasses(Config.time.toString(this.props.time, true) + ':' + this.props.period);

        var scheduledItems = [];
        var unscheduledItems = [];

        for (var i = 0; i < classes.scheduled.length; i++) {
            var item = classes.scheduled[i];
            scheduledItems.push(<ScheduleItem key={item.id} data={item} />)
        }

        for (var i = 0; i < classes.unscheduled.length; i++) {
            var item = classes.unscheduled[i];
            unscheduledItems.push(<ScheduleItem unscheduled={true} key={item.id} data={item} />)
        }

        return (
            <UI.Card>
                <UI.Header text={'Period ' + this.props.period}/>

                {this.props.dayData ? <UI.SubHeader text={'Week ' + this.props.time.week + ' - Day ' + this.props.time.day}/> : ''}
                {scheduledItems.length > 0 ? <UI.Divider/> : ''}
                {scheduledItems}
                {unscheduledItems.length > 0 ? <UI.Divider/> : ''}
                {unscheduledItems}
                {/*<UI.Divider/>*/}
                {/*<UI.Button onClick={this.refresh} text="Refresh" />*/}
                {this.props.children}
            </UI.Card>
        )
    }
}

class ScheduleItem extends React.Component {



    render() {
        /*return <div className="class">
            <span className="name">{this.props.classData.name}<span className="code">{this.props.classData.teacher}</span></span>
            <span className="location">{this.props.locationData.name}</span>
        </div>*/
        return (
            <div className={"class" + (this.props.unscheduled ? ' faded' : '')}>
                <span className="name">{this.props.data.name}<span className="code">{this.props.data.teacher}</span></span>
                <span className="location">{this.props.data.location}</span>
            </div>
        )
    }
}

export default PeriodView
export { PeriodView }
