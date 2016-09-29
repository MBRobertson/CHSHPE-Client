import React from 'react';
import { UI } from '../components/ui.jsx';

class Home extends React.Component {
    render() {
        return (<div>
            <UI.Card>
                <UI.Header text="Upcoming Classes"/>
                <UI.Divider/>
                <UI.Button url="/timetable" text="Timetable" />
                <UI.Button url="/timetable" text="Something" />
            </UI.Card>
            <UI.Card>

                <UI.Button url="/News" text="News" />
            </UI.Card>
        </div>);
    }
}
//id="homePage"

export default Home
export { Home }
