import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Home from './components/home/Home';
import Login from './components/login/Login';
import Expenses from './components/main/expenses/Expenses';
import IncomeExpenses from './components/main/IncomeExpenses';
import Main from './components/main/Main';
// import AuthNavBar from './components/navbars/AuthNavBar';
import NonAuthNavbar from './components/navbars/NonAuthNavbar';
// import SideBar from './components/navbars/SideBar';
import Register from './components/register/Register';

import './scss/App.scss';

function App() {
  return (
    <>
      <Router>
        {/* <AuthNavBar /> */}
        <NonAuthNavbar />
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/main">
            <Main />
          </Route>
          <Route path="/expenses">
            <Expenses />
          </Route>
          <Route path="/incomes">
            <IncomeExpenses />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Redirect to="/"/>
        </Switch>
      </Router>
    </>
  );
}

export default App;

