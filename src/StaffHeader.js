import React, { Component } from 'react';

class StaffHeader extends Component {

    constructor(props) {
        super(props)
        console.log(this.props.lastName)
    }

    onClick = () => {
        this.props.logOut(false);
    }

    render() {
        const firstName = this.props.firstName
        const lastName = this.props.lastName
        return (
            <div>
                <h3 className="ui block header">

                    <div className="ui grid">
                        <div className="four wide column">
                            <h3 className="ui header">
                                <i className="users icon"></i>
                                <div className="content">
                                    PERSONEL SAYFASI
                                </div>
                            </h3>
                        </div>
                        <div className="four wide column"></div>
                        <div className="four wide column"></div>
                        <div className="four wide column">
                            <h3 className="ui header">
                                <i onClick={this.onClick} className="power off icon"></i>
                                <div className="content">
                                    {firstName + " " + lastName}
                                </div>
                            </h3>
                        </div>


                    </div>
                </h3>
            </div>
        );
    }
}

export default StaffHeader;