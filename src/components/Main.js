import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Products from '../views/Products.js';
import Orders from '../views/Orders.js';
class Main extends Component {
    render() {
        return (
            <div className="main-container">
                <Switch>
                    <Route exact path='/' component={Products} />
                    <Route exact path='/orders' component={Orders} />
                    {/*<Route path='/roster' component={Roster} />
                    <Route path='/schedule' component={Schedule} />*/}
                </Switch>
            </div>
        );
    }
}

export default Main;
