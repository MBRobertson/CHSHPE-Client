import './css/main.scss';

import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    render () {
        return <h1> Hello React!</h1>;
    }
}

//document.addEventListener('deviceready', *func, false);

ReactDOM.render(<App/>, document.getElementById('content'));
