import React from 'react';
import { Router as BrowserRouter, Route, Switch } from 'react-router-dom';

import history from '../utils/history';

import * as routes from '../constants/routes';

import Application from './application';

const Router = () => (
  <BrowserRouter history={history}>
    <Switch>
      <Route path={routes.APPLICATION} component={Application} />
    </Switch>
  </BrowserRouter>
);

export default Router;
