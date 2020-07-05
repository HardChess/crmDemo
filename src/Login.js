import React, { Component } from 'react';
import './Login.css'

class Login extends Component {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.sendData = this.sendData.bind(this)

        // her login page geldiğinde sıfırlama
        this.state.loggedIn = false;
        this.state.isAdmin = false;
        this.state.idUser = 0;
        this.state.firstName = '';
        this.state.lastName = ';'
    }

    state = {
        email: '',
        password: '',
        loggedIn: false,
        isAdmin: false,
        idUser: 0,
        firstName: '',
        lastName: '',
        showError: 'hidden'
    }

    //inputa veri girilirken state güncelleme
    onChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )

    }

    //form onaylandıgında login kontrolü 
    onSubmit(e) {
        e.preventDefault()
        this.props.users.map((user) => {
            if (user.email === this.state.email && user.password === this.state.password) {

                console.log("giriş başarılı")
                this.state.loggedIn = true
                this.state.idUser = user.id
                this.state.firstName = user.firstName
                this.state.lastName = user.lastName

                if (user.isAdmin) {
                    console.log("admin girdi")
                    this.state.isAdmin = true
                    this.sendData()
                }
                else {

                    this.sendData()
                }
            }

            else {
                this.setState({
                    showError: 'visible'
                });
                console.log("giriş başarısız")
            }
        })


    }

    //call back fonksiyonuna dataları yolluyor
    sendData() {
        this.props.callBack(this.state.loggedIn, this.state.isAdmin, this.state.idUser, this.state.firstName, this.state.lastName)
    }

    render() {
        return (
            <div className="hizalama" style={{ paddingTop: "15%" }}>
                <div className="ui middle aligned center aligned grid">
                    <div className="column1">
                        <h2 className="ui teal image header">
                            <img src="/logo512.png" className="image" />
                            <div className="content">
                                CRM Demo Giriş Sayfası
                            </div>
                        </h2>
                        <form onSubmit={this.onSubmit} className="ui large form">
                            <div className="ui stacked segment">
                                <div className="field">
                                    <div className="ui left icon input">
                                        <i className="user icon"></i>
                                        <input type="text" id="email" name="email" placeholder="E-mail address" onChange={this.onChange} value={this.state.email} />
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui left icon input">
                                        <i className="lock icon"></i>
                                        <input type="password" id="password" name="password" placeholder="Password" onChange={this.onChange} value={this.state.password} />
                                    </div>
                                </div>
                                <button className="ui fluid large teal submit button">Giriş</button>
                            </div>

                            <div className="ui negative message" style={{ visibility: this.state.showError }}>
                                <div className="header">
                                    Giriş Başarısız!
  </div>
                                <p>Kullanıcı adı veya şifreyi hatalı girdiniz.
</p></div>

                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default Login;