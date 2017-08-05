import React from 'react';
import ReactDOM from "react-dom";
import ReactApp from '../views/Components/ReactApp.js';
import Home from '../views/Components/Home.js';
import AltDashboard from '../views/Components/AltDashboard.js';
import UpdateUser from '../views/Components/UpdateUser.js';
import AllBooks from '../views/Components/AllBooks.js';

import { IndexRoute, Router, Route, browserHistory} from 'react-router';
import $ from 'jquery';
import $bootstrap from 'bootstrap-jquery';

let app = document.getElementById('app');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={ReactApp} >
            <IndexRoute component={Home} />
            <Route path='all' component={AllBooks} />
            <Route path='dashboard' component={AltDashboard} />
            <Route path='settings' component={UpdateUser} />
        </Route>
    </Router>, 
    app
);