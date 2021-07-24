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


function App() {

  return (
    <GlobalProvider>
      <Router>
          
        <Switch>
          <Route path="/register"><Register /></Route>
          <Route path="/login"><Login /></Route>
          
          {/* <Route exact path="/">          
              {(user === null || user === undefined) && <NonAuthDashboard/>} 
          </Route>
        <ProtectedRoute
          path="/dashboard"
          component={() => <Dashboard setUser={setUser} logOut={logOut}/>}
        /> */}

          
          <Route path="/dashboard"><Dashboard /></Route>
          <Route path="/add"><Add /></Route>
          <Route path="/update"><Update /></Route>
          <Route path="/transactions"><Transactions /></Route>
          <Route path="/expenses"><Expenses /></Route>
          <Route path="/incomes"><Incomes /></Route>
          <Route path="/profile"><Profile /></Route>

          <Route path="/">
            <NonAuthDashboard />
          </Route>
        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;

