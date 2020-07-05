import React, { Component } from 'react';
import AdminHeader from './AdminHeader'
import AdminSol from './AdminSol'
import AdminSag from './AdminSag'

class Admin extends Component {

    constructor(props) {
        super(props)
        this.getChangedStaffId = this.getChangedStaffId.bind(this)
    }

    state = {
        changedStaffId: 0
    }

    getChangedStaffId(id) {

        this.setState({
            changedStaffId: id
        });


        //işlem zamanı
        setTimeout(() => {

            console.log(this.state.changedStaffId)
        }, 200);

    }


    render() {
        const firstName = this.props.firstName
        const lastName = this.props.lastName
        return (
            <div style={{ height: "100%" }}>
                <AdminHeader
                    firstName={firstName}
                    lastName={lastName}
                    logOut={this.props.logOut}></AdminHeader>

                <div className="hizalama" style={{ height: "100%" }}>
                    <div className="ui grid" style={{ height: "100%" }}>
                        <div className="two wide column"></div>
                        <div className="six wide column" style={{ backgroundColor: "#f2f2f2" }}>
                            <h3 class="ui white inverted top attached header">
                                Personeller
</h3>
                            <br></br>
                            <br></br>
                            <div className="ui middle aligned center aligned grid">
                                <AdminSol
                                    users={this.props.users}
                                    getChangedStaffId={this.getChangedStaffId}
                                ></AdminSol>
                            </div>
                        </div>
                        <div className="six wide column" style={{ backgroundColor: "#f2f2f2" }}>
                            <h3 class="ui white inverted top attached header">
                                Görüşmeler
</h3>
                            <br></br>
                            <br></br>
                            <AdminSag
                                selectedStaffId={this.state.changedStaffId}
                                meetings={this.props.meetings}></AdminSag>
                        </div>
                        <div className="two wide column"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Admin;