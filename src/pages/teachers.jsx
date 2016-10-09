import React from 'react';
import { UI } from '../components/ui.jsx';

import { Config } from 'config';

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

        this.state = {
            teachers: null
        }
    }

    componentDidMount() {
        Config.teachers.get((teachers) => {
            console.log(teachers)
            this.setState({
                teachers: teachers
            })
        });
    }

    render() {
        var teacherBoxes = [];
        if (this.state.teachers) {
            teacherBoxes = this.state.teachers.map((teacher) => {
                return (<Teacher key={teacher._id} teacher={teacher}/>);
            })
        } else {
            teacherBoxes.push(
                <UI.Card>
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
