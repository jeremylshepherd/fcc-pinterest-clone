import React from 'react';
import ReactDOM from "react-dom";
import ReactApp from '../views/Components/ReactApp.js';
import AltDashboard from '../views/Components/AltDashboard.js';
import UserWall from '../views/Components/UserWall.js';
import AllWins from '../views/Components/AllWins.js';

import { IndexRoute, Router, Route, browserHistory} from 'react-router';
import $ from 'jquery';
import $bootstrap from 'bootstrap-jquery';

let app = document.getElementById('app');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={ReactApp} >
            <IndexRoute component={AllWins} />
            <Route path='/mywall' component={AltDashboard} />
            <Route path='/:username' component={UserWall} />
        </Route>
    </Router>, 
    app
);