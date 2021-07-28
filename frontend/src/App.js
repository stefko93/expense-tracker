import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// import Home from './components/home/Home';
import Register from './components/register/Register';
import Login from './components/login/Login';
// import Main from './components/main/Main';
// import NonAuthNavbar from './components/navbars/NonAuthNavbar'
import Add from './components/main/add/Add';
import Incomes from './components/main/incomes/Incomes';
import Expenses from './components/main/expenses/Expenses';
import Dashboard from './components/main/dashboard/Dashboard';
import Transactions from './components/main/transactions/Transactions';
import Profile from './components/main/profile/Profile'

import { GlobalProvider } from './context/GlobalState';
import './scss/App.scss';
import NonAuthDashboard from './components/home/NonAuthDashboard';
import Update from './components/main/update/Update';
import ProtectedRoute from './components/utils/ProtectedRoute';
import Logout from './components/logout/Logout';


function App() {

  return (
    <GlobalProvider>
      <Router>
          
        <Switch>
          <Route path="/register"><Register /></Route>
          <Route path="/login"><Login /></Route>
          <Route path='/logout' ><Logout /></Route>
          
          <ProtectedRoute path="/dashboard" component={Dashboard}  />
          <ProtectedRoute path="/add" component={Add} />
          <ProtectedRoute path="/update" component={Update}  />
          <ProtectedRoute path="/transactions" component={Transactions}  />
          <ProtectedRoute path="/expenses" component={Expenses}  />
          <ProtectedRoute path="/incomes" component={Incomes}  />
          <ProtectedRoute path="/profile" component={Profile}  />

          <Route path="/">
            <NonAuthDashboard />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;

