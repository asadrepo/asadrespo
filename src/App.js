import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './containers/Home/Home';
import SearchResult from './containers/SearchResult/SearchResult';
import { Signup } from './containers/Signup';
import ForgotPassword from './containers/Auth/ForgotPassword';
import Logout from './containers/Auth/Logout';
import ProtectedRoutes from './containers/Auth/ProtectedRoutes';
import ResetPassword from './containers/Auth/ResetPassword';
import { Settings } from './containers/Settings';
import { ToastProvider} from 'react-toast-notifications'
import AccountActivation from './components/static/AccountActivation';
import Notfound from './components/common/Notfound';

function App() {
  
  return (
    <ToastProvider>
      <BrowserRouter>
        <div className="back_color">
                
                <Switch>
                    
                    <ProtectedRoutes path="/" exact component={Home} />
                    <ProtectedRoutes exact path="/profile" component={Settings} />
                    <ProtectedRoutes exact path="/search" component={SearchResult} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/forgot-password" component={ForgotPassword} />
                    <Route exact path="/accounts/reset-password/:user_id/:token/" component={ResetPassword} />
                    <Route exact path="/accounts/activate/:user_id/:token/" component={AccountActivation} />
                    <Route exact path="/logout" component={Logout} />
                    <Route path="*" component={Notfound} />

                </Switch>
               
            </div>
      </BrowserRouter>
      </ToastProvider>

  );
}

export default App;
