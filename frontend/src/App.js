import React, { useState } from 'react';
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

import ProtectedRoute from './components/utils/ProtectedRoute'

function getUser() {
  const storageUser = localStorage.getItem('user');
  if (!storageUser) {
    return null;
  }
  return storageUser;
}

function App() {
  const [user, setUser] = useState(getUser());

  function logOut() {
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <GlobalProvider>
      <Router>
          
        <Switch>
          <Route path="/register"><Register /></Route>
          <Route path="/login"><Login setUser={setUser} logOut={logOut} /></Route>
          
          <Route path="/">          
              {(user === null || user === undefined) && <NonAuthDashboard/>} 
          </Route>
        <ProtectedRoute
          path="/dashboard"
          component={() => <Dashboard setUser={setUser} logOut={logOut}/>}
        />

          {/* <Route path="/main">
            <Main />
          </Route> */}
          
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/add">
            <Add />
          </Route>
          <Route path="/transactions">
            <Transactions />
          </Route>
          <Route path="/expenses">
            <Expenses />
          </Route>
          <Route path="/incomes">
            <Incomes />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          
          

        </Switch>
      </Router>
    </GlobalProvider>
  );
}

export default App;

