import React, { Component } from 'react';
import faker from 'faker'
import { Button, Header, Icon, Modal, Rating } from 'semantic-ui-react'

class AdminSag extends Component {

    constructor(props) {
        super(props)



    }

    state = {
        meetings: [],
        selectedStaffId: 0
    }



    //props değişikliği bildirilince render metodu tekrar çalışır.
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.selectedStaffId !== this.props.selectedStaffId) {
            return true    //"selectedStaffId" props i değiştiyse componenti tekrar render et
        }
    }


    render() {
        this.setState({
            selectedStaffId: this.props.selectedStaffId,
            //meetings dizisini sıfırla
            meetings: []
        });

        // personel ile örtüşen meetingleri diziye ekle
        this.props.meetings.map(meet => {

            if (this.props.selectedStaffId === meet.staffId) {
                this.state.meetings.push(meet)
            }
        })

        //eğer seçilen personel idsi 0 ise (tümü) tüm meetingleri diziye kopyala
        if (this.props.selectedStaffId === 0) {
            this.state.meetings = this.props.meetings
        }

        //statete olan meetings dizisini render et TERSTEN (son yapılan görüşme en üstte gözükür)
        return (

            <div class="ui grid" >

                {
                    this.state.meetings.slice(0).reverse().map((meet) =>

                        <div key={meet.id} className="ui centered raised card" >
                            <div className="content">
                                <div className="header">Sn. {meet.customerName}</div>
                                <div className="meta">
                                    <span className="category">Prs. {meet.staffName}</span>
                                </div>
                                <div className="description">
                                    <p>{meet.channel}</p>
                                    <p>{meet.startTime + "-"} {meet.endTime}</p>
                                    <p>{"( " + meet.comment + " )"}</p>
                                </div>
                            </div>
                            <div class="extra">
                                Puan:
  <Rating icon='star' class="right floated" defaultRating={meet.favors} maxRating={5} />
                            </div>

                        </div>

                    )

                }

                <br></br>
                <br></br>

            </div>

        );
    }
}

export default AdminSag;