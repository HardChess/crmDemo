import React, { Component } from 'react';
import StaffHeader from './StaffHeader'
import './Staff.css'
import StaffSol from './StaffSol'
import axios from 'axios'
import StaffSag from './StaffSag'
import { date } from 'faker';
import { Button, Modal, Header, Icon } from 'semantic-ui-react'

class Staff extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        customers: [],
        //active idUser props olarak elimizde
        reminderMsg: '',
        reminderTime: '',
        open: false
    }

    componentWillMount() {


        axios.get('./customers.json').then(customers => customers.data).then(customers => {
            console.log(customers)

            this.setState({
                customers: customers
            });
        })



        this.props.reminders.map(reminder => {

            if (reminder.staffId === this.props.idUser) {
                console.log("geldi")
                if (reminder.year === new Date().getFullYear() && reminder.month === new Date().getMonth() + 1 && reminder.day === new Date().getDay() - 2) {

                    console.log("geeeeeldi")
                    this.setState({
                        reminderMsg: reminder.customerName,
                        reminderTime: reminder.time,
                        open: true
                    });
                }
            }
        })

    }

    close = (e) => {
        e.preventDefault();

        //Veriler ile Hatırlatıcı ekleme


        //modalın kapatılması (görsel)
        this.setState({ open: false })
    }


    open = () => this.setState({ open: true })


    render() {
        const firstName = this.props.firstName
        const lastName = this.props.lastName



        return (
            <div>


                <Modal
                    size="tiny"
                    open={this.state.open}
                    onOpen={this.open}
                    onClose={this.close}
                >
                    <Header icon='icon bullhorn' content='Bir Yeni Hatırlatma!' />
                    <Modal.Content>
                        <h4>{this.state.reminderMsg} için bugün bir hatırlatmanız var.</h4>
                        <h4> Saat: {this.state.reminderTime}</h4>
                        <Button className="ui right floated" color='green' onClick={this.close} inverted>
                            <Icon name='checkmark' /> Tamam
          </Button>
                        <br></br>
                        <br></br>
                    </Modal.Content>

                </Modal>
                <StaffHeader
                    firstName={firstName}
                    lastName={lastName}
                    logOut={this.props.logOut}></StaffHeader>
                <div className="hizalama">
                    <div className="ui grid">
                        <div className="two wide column"></div>
                        <div className="eight wide column" style={{ backgroundColor: "#f2f2f2" }}>
                            <StaffSol customers={this.state.customers}></StaffSol>
                        </div>
                        <div className="four wide column" style={{ backgroundColor: "#f2f2f2" }}>
                            <StaffSag
                                meetings={this.props.meetings}
                                reservs={this.props.reservs}
                                idUser={this.props.idUser}
                                customers={this.props.customers}></StaffSag>
                        </div>
                        <div className="two wide column"></div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Staff;