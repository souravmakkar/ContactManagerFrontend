import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar/Navbar.component';
import ProtectedRoute from './services/ProtectedRoute';
import HomePage from './pages/HomePage/HomePage.component';
import ProfilePage from './pages/ProfilePage/ProfilePage.component';
import SignIn from './pages/SignIn/SignIn.component';
import SignUp from './pages/SignUp/Signup.component';
import AddContact from './pages/AddContact/AddContact.component';
import AdminBoard from './Admin_Pages/AdminBoard/Admin Board.component';
import AllContacts from './Admin_Pages/AllContacts/AllContacts.component';
import ShowContacts from './pages/ShowContacts/ShowContacts.component';
import NoMatchPage from './pages/NoMatchPage/NoMatchPage.component';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.component';
import ViewContact from './pages/ViewContact/ViewContact';
import UpdateContact from './pages/UpdateContact/UpdateContact.component';
import ResetPassword from './pages/ResetPassword/ResetPassword.component';
import SignOut from './components/SignOut/SignOut.component';
import ChangePassword from './pages/ChangePassword/ChangePassword.component';
function App() {

  return (
    <Router>
      <Navbar />
      <Switch>
         <Route exact path={["/", "/home"]} component={HomePage}/>
         <Route exact path='/signup' component={SignUp} />
         <Route exact path='/signin' component={SignIn} />
         <ProtectedRoute  exact path='/user/profile' component={ProfilePage} />
         <ProtectedRoute  exact path='/user/contact' component={AddContact} />
         <ProtectedRoute  exact path='/user/show-contacts' component={ShowContacts} />
         <ProtectedRoute  exact path='/user/info/contact/:id' component={ViewContact} />
         <ProtectedRoute  exact path='/user/update/contact/:id' component={UpdateContact} />
         <ProtectedRoute  exact path='/user/signout' component={SignOut} />
         <ProtectedRoute  exact path='/user/change/password' component={ChangePassword} />
         
         {/*-------------- Admin Routes--------------------- */}
         <Route exact path='/admin/home' component={AdminBoard} />
         <Route exact path='/admin/all-contacts' component={AllContacts} />
         <Route exact path="/forgot_password" component={ForgotPassword} />
         <Route exact path="/reset_password" component={ResetPassword} />

         <Route render={()=> <NoMatchPage/> } />

      </Switch>
    </Router> 
  );
}

export default App;
