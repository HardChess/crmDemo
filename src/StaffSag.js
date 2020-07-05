import React, { Component } from 'react';
import faker from 'faker'
import axios from 'axios'
import PropTypes from 'prop-types'

class StaffSag extends Component {

  //Son katmanda propsu kullanmak için lazım
  static propType = {
    customers: PropTypes.array,
    meetings: PropTypes.array,
    idUser: PropTypes.number,
    reservs: PropTypes.array
  }
  constructor(props) {
    super(props)
    console.log('window :' + window.db.test);
  }

  state = {
    activeMeets: [],
    activeReservs: [],
    filteredMeetings: [],
    filteredReservs: [],
    activeCustomerNames: []
  }


  componentWillMount() {

    this.props.meetings.map((meet) => {

      if (meet.staffId === this.props.idUser) {
        this.state.activeMeets.push(meet.id)

      }
    })

    this.props.reservs.map((reserv) => {

      this.state.activeMeets.map((activeMeet) => {

        if (activeMeet === reserv.meetingId) {
          this.state.activeReservs.push(reserv)

        }
      })

    })

  }


  render() {



    return (
      <div>
        <h4 class="ui white inverted block header" style={{ marginTop: "5%" }}>Rezervasyon</h4>
        {
          (this.state.activeReservs).map(reserv =>
            <div key={reserv.id} className="ui centered raised card">
              <div className="content">
                <div className="header">Rezerv.</div>
                <div className="meta">
                  <span className="category">{reserv.startTime}</span>
                </div>
                <div className="description">
                  <p>{reserv.desc}</p>
                </div>
              </div>
              <div className="extra content">
                <div className="right floated author">
                  {reserv.name}<img className="ui avatar image" style={{ marginTop: '1px', marginLeft: '10px' }} src={faker.internet.avatar()} />
                </div>
              </div>
            </div>
          )
        }

      </div>
    );
  }
}

export default StaffSag;