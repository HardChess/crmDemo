import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './StaffSearch.css'
import faker, { phone } from 'faker'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

export default class StaffSearch extends Component {
    static propType = {
        customers: PropTypes.array
    }

    constructor(props) {
        super(props)

    }

    state = {
        filterText: '',
        open: false,
        openRez: false,
        openHat: false,
        newName: '',
        newPhone: '',
        newEmail: '',
        selectedId: 0,
        selectedName: '',
        selectedPhone: '',
        selectedMail: '',
        isVisible: 'hidden'
    }

    //modals için
    open = () => this.setState({ open: true })
    openRez = () => this.setState({ openRez: true })
    openHat = () => this.setState({ openHat: true })
    closeRez = (e) => {
        e.preventDefault();

        //Veriler ile rezervasyon ekleme


        //modalın kapatılması (görsel)
        this.setState({ openRez: false })
    }
    closeHat = (e) => {
        e.preventDefault();

        //Veriler ile Hatırlatıcı ekleme


        //modalın kapatılması (görsel)
        this.setState({ openHat: false })
    }
    close = (e) => {
        e.preventDefault();

        //Veriler ile kullanıcı ekleme


        //modalın kapatılması (görsel)
        this.setState({ open: false })
    }

    clickGuncelle = (e) => {
        e.preventDefault();
        this.setState({

        });
    }

    clickSelect = (e) => {
        this.setState({
            isVisible: 'visible'
        });

    }
    //detayy aynı sonucu işle
    handleKeyPress(target) {
        if (target.charCode == 13) {

        }
    }

    onChangeFilterText = (e) => {
        //console.log(e.target.value)
        this.setState({
            filterText: e.target.value,
        })
    }

    onChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )

    }

    render() {
        //filtreleme
        const filteredContacts = this.props.customers.filter(

            customer => {
                // return contact.name.toLowerCase().indexOf(
                //     this.state.filterText.toLowerCase()
                // ) !== -1

                return (

                    customer.phone.toLowerCase().indexOf(
                        this.state.filterText.toLowerCase()
                    ) !== -1

                    //ya da :)
                    ||

                    customer.name.toLowerCase().indexOf(
                        this.state.filterText.toLowerCase()
                    ) !== -1

                    ||

                    customer.email.toLowerCase().indexOf(
                        this.state.filterText.toLowerCase()
                    ) !== -1

                )
            }

        )

        return (
            <div className="searchStaff">
                <br></br>
                <div className="ui grid">
                    <div className="eight wide column">
                        <div className="ui middle aligned center aligned grid">

                            <Modal open={this.state.open}
                                onOpen={this.open}
                                onClose={this.close}
                                trigger={<button className="ui basic button">
                                    <i className="icon user plus"></i>
                                    Yeni Müşteri
                                </button>} closeIcon>
                                <Header icon='user plus' content='Yeni Müşteri Ekle' />
                                <Modal.Content>
                                    <form className="ui form">
                                        <div className="field">
                                            <label>Ad-Soyad</label>
                                            <input type="text" name="newName" id="newName" onChange={this.onChange} placeholder="Ad Soyad" />
                                        </div>
                                        <div className="field">
                                            <label>Telefon</label>
                                            <input type="text" name="newPhone" id="newPhone" onChange={this.onChange} placeholder="Telefon" />
                                        </div>
                                        <div className="field">
                                            <label>E-mail</label>
                                            <input type="text" name="newEmail" id="newEmail" onChange={this.onChange} placeholder="E-mail" />
                                        </div>

                                        <button onClick={this.close} className="ui button" type="submit">Kaydet</button>
                                    </form>
                                </Modal.Content>

                            </Modal>
                        </div>
                    </div>
                    <div className="eight wide column">
                        <div className="ui middle aligned center aligned grid">

                            <div className="ui search">

                                <div className="ui icon input">
                                    <input className="prompt" style={{ maxWidth: '130px' }} type="text" value={this.state.filterText} onChange={this.onChangeFilterText} name="filter" id="filter" placeholder="Müşteri Ara..." />
                                    <i className="search icon"></i>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                    </div>
                </div>

                <div className="results1">
                    <div className="ui middle aligned divided list">
                        {
                            filteredContacts.slice(0, 3).map(customer =>

                                <div key={customer.id} className="item">
                                    <div className="right floated content">
                                        <div onClick={() => (

                                            this.setState({
                                                selectedId: customer.id,
                                                selectedName: customer.name,
                                                selectedPhone: customer.phone,
                                                selectedMail: customer.email
                                            }),
                                            this.clickSelect()

                                        )}
                                            className="ui button">Seç</div>
                                    </div>
                                    <img className="ui avatar image" src={faker.image.avatar()} />
                                    <div className="content">
                                        <div className="ui label">
                                            {customer.name}
                                        </div>
                                        <div className="ui label">
                                            {customer.phone}
                                        </div><div className="ui label">
                                            {customer.email}
                                        </div>
                                    </div>

                                </div>

                            )
                        }



                    </div>

                </div>
                <br></br>
                <br></br>

                <div>
                    <form className="ui form" style={{ visibility: this.props.isVisible }}>
                        <div className="field">
                            <label>Ad-Soyad</label>
                            <input type="text" name="selectedName" placeholder="" onChange={this.onChange} value={this.state.selectedName} />
                        </div>
                        <div className="field">
                            <label>Telefon</label>
                            <input type="text" name="selectedPhone" placeholder="" onChange={this.onChange} value={this.state.selectedPhone} />
                        </div>
                        <div className="field">
                            <label>E-mail</label>
                            <input type="text" name="selectedMail" placeholder="" onChange={this.onChange} value={this.state.selectedMail} />
                        </div>
                        <div className="ui middle aligned center aligned grid">
                            <div className="four wide column">
                                <Modal open={this.state.openHat}
                                    onOpen={this.openHat}
                                    onClose={this.closeHat}
                                    trigger={<div className="ui small inverted brown button">
                                        <i className="icon bullhorn"></i>
                                    Alarm
                                </div>} closeIcon>
                                    <Header icon='icon bullhorn' content='Bir Hatırlatma Oluştur' />
                                    <Modal.Content>
                                        <form className="ui form">
                                            <div className="field">
                                                <label>Tarih</label>
                                                <input type="text" name="dateH" id="dateH" onChange={this.onChange} placeholder="Tarih seçiniz" />
                                            </div>
                                            <div className="field">
                                                <label>Saat</label>
                                                <input type="text" name="timeH" id="timeH" onChange={this.onChange} placeholder="Saat Seçiniz" />
                                            </div>

                                            <button onClick={this.closeHat} className="ui button" type="submit">Ayarla</button>
                                        </form>
                                    </Modal.Content>
                                </Modal>
                            </div>

                            <div className="eight wide column">
                                <Modal open={this.state.openRez}
                                    onOpen={this.openRez}
                                    onClose={this.closeRez}
                                    trigger={<div className="ui small inverted violet button">
                                        <i className="icon calendar alternate outline"></i>
                                    Rezervasyon
                                </div>} closeIcon>
                                    <Header icon='icon calendar alternate outline' content='Bir Rezervasyon Oluştur' />
                                    <Modal.Content>
                                        <form className="ui form">
                                            <div className="field">
                                                <label>Tarih</label>
                                                <input type="text" name="date" id="date" onChange={this.onChange} placeholder="Tarih giriniz" />
                                            </div>
                                            <div className="field">
                                                <label>Saat</label>
                                                <input type="text" name="time" id="time" onChange={this.onChange} placeholder="Saat giriniz" />
                                            </div>
                                            <div className="field">
                                                <label>Açıklama</label>
                                                <input type="text" name="desc" id="desc" onChange={this.onChange} placeholder="Açıklama ekleyiniz" />
                                            </div>

                                            <button onClick={this.closeRez} className="ui button" type="submit">Kaydet</button>
                                        </form>
                                    </Modal.Content>
                                </Modal>
                            </div>

                            <div className="four wide column">
                                <div onClick={this.clickGuncelle} className="ui small inverted green button">
                                    <i className="icon save"></i>Kaydet</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
