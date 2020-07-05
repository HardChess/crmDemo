import React, { Component } from 'react';
import faker from 'faker'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types';

class AdminSol extends Component {

    static propType = {
        users: PropTypes.array
    }

    constructor(props) {
        super(props)

        this.props.users.map(user => {
            //personelleri listele
            if (user.isAdmin !== true) {
                this.state.users.push(user)
            }
        })
    }


    state = {
        open: '',
        openDel: '',
        users: [],
        filterText: ''
    }

    //delete için
    show = (size) => () => this.setState({ size, openDel: true })
    closeDel = () => this.setState({ openDel: false })

    open = () => this.setState({ open: true })

    close = (e) => {
        e.preventDefault();

        //Veriler ile kullanıcı ekleme


        //modalın kapatılması (görsel)
        this.setState({ open: false })
    }

    onChange = (e) => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )

    }

    onChangeFilterText = (e) => {
        //console.log(e.target.value)
        this.setState({
            filterText: e.target.value,
        })
    }

    render() {

        const { openDel, size } = this.state


        const filteredStaffs = this.state.users.filter(

            user => {
                // return contact.name.toLowerCase().indexOf(
                //     this.state.filterText.toLowerCase()
                // ) !== -1

                return (

                    user.phone.toLowerCase().indexOf(
                        this.state.filterText.toLowerCase()
                    ) !== -1

                    //ya da :)
                    ||

                    user.firstName.toLowerCase().indexOf(
                        this.state.filterText.toLowerCase()
                    ) !== -1

                    ||

                    user.lastName.toLowerCase().indexOf(
                        this.state.filterText.toLowerCase()
                    ) !== -1


                )
            }

        )
        return (
            <div>
                <div class="ui left icon input">
                    <input type="text" style={{ maxWidth: "198px" }} value={this.state.filterText} onChange={this.onChangeFilterText} placeholder="Personel Ara..." />
                    <i class="users icon"></i>
                </div>


                <Modal open={this.state.open}

                    onOpen={this.open}
                    onClose={this.close}
                    trigger={<button class="ui small green  button" style={{ marginLeft: "10px" }}>
                        <i class="plus icon"></i>
                                Ekle
                              </button>} closeIcon>
                    <Header icon='user plus' content='Yeni bir personel ekle' />
                    <Modal.Content>
                        <form className="ui form">
                            <div className="field">
                                <label>Personel Adı</label>
                                <input type="text" name="name" id="name" onChange={this.onChange} placeholder="Ad" />
                            </div>
                            <div className="field">
                                <label>Personel Soyadı</label>
                                <input type="text" name="lastName" id="lastName" onChange={this.onChange} placeholder="Soyad" />
                            </div>
                            <div className="field">
                                <label>Telefon Numarası</label>
                                <input type="text" name="phone" id="phone" onChange={this.onChange} placeholder="Telefon" />
                            </div>
                            <div className="field">
                                <label>E-Mail Adresi</label>
                                <input type="text" name="mail" id="mail" onChange={this.onChange} placeholder="E-mail" />
                            </div>
                            <div className="field">
                                <label>Şifre</label>
                                <input type="text" name="pass" id="pass" onChange={this.onChange} placeholder="Şifre" />
                            </div>

                            <button onClick={this.close} className="ui button" type="submit">Ekle</button>
                        </form>
                    </Modal.Content>
                </Modal>

                <button onClick={() => (this.props.getChangedStaffId(0))} class="ui blue small right labeled icon button" style={{ marginLeft: "10px", maxWidth: "80px" }}>
                    <i class="right arrow icon"></i>
  Hepsi
</button>


                <div class="ui middle aligned animated selection list">

                    {
                        filteredStaffs.map(user =>
                            <div key={user.id} onClick={() => (this.props.getChangedStaffId(user.id))} class="item">
                                <div class="right floated content">
                                    <div onClick={this.show('mini')} class="ui mini button">X</div>

                                </div>
                                <img class="ui avatar image" src={faker.image.avatar()} />
                                <div class="content">
                                    <div class="header">{user.firstName + " "} {user.lastName}</div>
                                    <div class="text">{user.phone}</div>
                                </div>
                            </div>

                        )
                    }
                </div>


                {/* delete modali */}
                <Modal size={size} open={openDel} onClose={this.closeDel}>
                    <Modal.Header><i class="trash alternate icon"></i>Personeli Sil</Modal.Header>
                    <Modal.Content>
                        <p>Bu personelin hesabını silmek üzeresin, emin misin?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.closeDel} negative>Hayır</Button>
                        <Button
                            onClick={this.closeDel}
                            positive
                            icon='checkmark'
                            labelPosition='right'
                            content='Evet'
                        />
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default AdminSol;