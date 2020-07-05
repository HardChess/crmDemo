import React, { Component } from 'react';
import StaffSearch from './StaffSearch'
import { Button, Header, Icon, Modal, Dropdown } from 'semantic-ui-react'

const gorusmeKanali = [
    {
        key: 'Facebook',
        text: 'Facebook',
        value: 'Facebook',
        icon: 'facebook icon'
    },
    {
        key: 'Twitter',
        text: 'Twitter',
        value: 'Twitter',
        icon: 'twitter icon'
    },
    {
        key: 'Instagram',
        text: 'Instagram',
        value: 'Instagram',
        icon: 'instagram icon'
    },
    {
        key: 'Telefon',
        text: 'Telefon',
        value: 'Telefon',
        icon: 'phone icon'
    },
    {
        key: 'Birebir',
        text: 'Birebir',
        value: 'Birebir',
        icon: 'comments icon'
    },

]

class StaffSol extends Component {

    constructor(props) {
        super(props)
    }

    state = {
        second: 0,
        minute: 0,
        channelSelected: false,
        onCall: false,
        isVisible: 'hidden'
    }

    componentWillUnmount() {
        clearInterval(this.interval); // Always clean up before unmounting
    }

    render() {
        return (
            <div className="ui grid">
                <div className="four wide column">
                    <br></br>
                    <br></br>
                    <div className="ui middle aligned center aligned grid">
                        <button onClick={() => {
                            if (!this.state.onCall) {

                                this.setState({ onCall: true, isVisible: 'visible' });

                                this.interval = setInterval(() => {

                                    if (this.state.second > 58) {
                                        this.setState({
                                            minute: this.state.minute + 1,
                                            second: 0
                                        });


                                    }
                                    this.setState({
                                        second: this.state.second + 1

                                    });
                                }, 1000);
                            }
                        }


                        } className="positive ui button"><i className="play icon" style={{ position: "center" }}></i>Başlat</button>

                    </div>
                </div>
                <div className="four wide column">
                    <br></br>
                    <br></br>
                    <div className="ui middle aligned center aligned grid">

                        <Dropdown
                            defaultValue='Telefon'
                            placeholder='Kanal Seçin'
                            fluid
                            selection
                            options={gorusmeKanali}
                        />
                    </div>
                </div>

                <div className="two wide column">
                    <br></br>
                    <br></br>
                    <div className="ui middle aligned center aligned grid">

                        <button className="blue ui icon button"><i className="icon clock"></i>{" " + this.state.minute + ":"}{this.state.second}</button>
                    </div>
                </div>
                <div className="six wide column">
                    <br></br>
                    <br></br>
                    <div className="ui middle aligned center aligned grid">
                        <button onClick={() => {

                            clearInterval(this.interval)
                            this.setState({
                                second: 0,
                                minute: 0,
                                onCall: false,
                                isVisible: 'hidden'
                            });
                        }} className="negative ui button"><i className="stop icon"></i>Bitir</button>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div className="sixteen wide column">
                    <StaffSearch isVisible={this.state.isVisible} customers={this.props.customers}></StaffSearch>
                </div>
            </div>
        );
    }
}

export default StaffSol;