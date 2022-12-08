import React from 'react';
import { UI } from '../components/ui.jsx';

import { Config } from '../config';

class Teacher extends React.Component {
    render() {
        return (
            <div className="teacher">
                <div className="innerWrapper">
                    <img className="picture" src={Config.teachers.image(this.props.teacher)}/>
                    <div className="desc">
                        <span className="name">{this.props.teacher.name}</span>
                        <span className="code">{this.props.teacher.code}</span>
                    </div>
                </div>
            </div>
        )
    }
}

class Teachers extends React.Component {
    constructor(props) {
        super(props)

        if (this.props.route.data.checkData()) {
            let info = this.props.route.data.getData();
            this.state = {
                teachers: info.teachers
            }
        } else {
            this.state = {
                teachers: null
            }
        }

        this.populateData = this.populateData.bind(this);
    }

    populateData() {
        let info = this.props.route.data.getData();
        this.setState({
            teachers: info.teachers
        })
    }

    componentDidMount() {
        this.props.route.data.verifyData();
        document.addEventListener("dataready", this.populateData, false);
    }

    componentWillUnmount() {
        document.removeEventListener("dataready", this.populateData, false);
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

    render() {
        var teacherBoxes = [];
        if (this.state.teachers) {
            teacherBoxes = this.state.teachers.map((teacher) => {
                return (<Teacher key={teacher._id} teacher={teacher}/>);
            })
        } else {
            teacherBoxes.push(
                <UI.Card key="loading">
                    <UI.Header text="Loading..."/>
                </UI.Card>
            )
        }

        return (<div id="teacherPage">
            {teacherBoxes}
        </div>);
    }
}
//id="homePage"

export default Teachers
export { Teachers }
