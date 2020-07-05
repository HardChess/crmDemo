import React, { Component } from 'react';
import './App.css'
//import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios'
import Login from './Login'
import Staff from './Staff'
import Admin from './Admin'
import NotFound from './NotFound'
import { date } from 'faker';

window.db = {test : "test" }

class App extends Component {

  constructor(props) {
    super(props)

  }

  state = {
    loggedIn: false,
    isAdmin: false,
    users: [],
    meetings: [],
    idUser: 0,
    firstName: '',
    lastName: ''
  }

  //component renderdan önce userları okur ve state'e işler
  componentWillMount() {
    axios.get('./users.json').then(users => users.data).then(users => {
      console.log(users)

      this.setState({
        users: users
      });
    })

    axios.get('./meetings.json').then(meetings => meetings.data).then(meetings => {
      console.log(meetings)

      this.setState({
        meetings: meetings
      });
    })

    axios.get('./reservs.json').then(reservs => reservs.data).then(reservs => {

      console.log(reservs)

      this.setState({
        reservs: reservs
      });
    })

    axios.get('./customers.json').then(customers => customers.data).then(customers => {
      console.log(customers)

      this.setState({
        customers: customers
      });
    })

    axios.get('./reminders.json').then(reminders => reminders.data).then(reminders => {

      this.setState({
        reminders: reminders
      });
    })


  }



  loginCallBack = (loggedIn, isAdmin, idUser, firstName, lastName) => {

    this.setState({
      loggedIn: loggedIn,
      isAdmin: isAdmin,
      idUser: idUser,
      firstName: firstName,
      lastName: lastName
    });
    setTimeout(() => {
      console.log(this.state.loggedIn)
      console.log(this.state.users)
      console.log(this.state.idUser)
      console.log(this.state.firstName)
    }, 100);
  }

  logOut = (loggedIn) => {
    console.log("çıkış yapıldı")
    this.setState({
      loggedIn: loggedIn
    });

  }

  render() {
    //Login page
    if (!this.state.loggedIn) {

      return (
        <div className="App">

          <Login
            callBack={this.loginCallBack}
            users={this.state.users}></Login>

        </div>
      )
    }

    //Admin Page
    else if (this.state.loggedIn && this.state.isAdmin) {
      return (
        <Admin
          users={this.state.users}
          meetings={this.state.meetings}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          logOut={this.logOut}></Admin>
      )
    }

    //Staff Page
    else if (this.state.loggedIn && !(this.state.isAdmin)) {
      return (

        <Staff
          reminders={this.state.reminders}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          idUser={this.state.idUser}
          meetings={this.state.meetings}
          reservs={this.state.reservs}
          customers={this.state.customers}
          logOut={this.logOut}></Staff>

      )
    }

    //Error Page
    else {
      return (
        <NotFound></NotFound>
      )
    }
  }

}

export default App;