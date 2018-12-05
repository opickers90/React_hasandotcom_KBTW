import React, { Component } from 'react';
import fire from "../../firebase/firebase";

import { Container, Row} from "mdbreact";

class ProfileCreate extends Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.ref = fire.firestore().collection('profile');
        this.state = {
            fullname: '',
            phonenumber: '',
            address1: '',
            address2: '',
            city: '',
            zip: '',
            url: '',
            file: null,
            progress: 0
        };
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { fullname, phonenumber, address1, address2, city,  zip, url } = this.state;
        this.ref.add({
            fullname,
            phonenumber,
            address1,
            address2,
            city,
            zip,
            url

        }).then((docRef) => {
            this.setState({
                fullname: '',
                phonenumber: '',
                address1: '',
                address2: '',
                city: '',
                zip: '',
                url: ''
            });
            this.props.history.push("/")
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    handleChange = e => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            this.setState(() => ({file}));
        }
    }
    handleUpload = () => {
        const {file} = this.state;
        const uploadTask = fire.storage().ref(`photos/${file.name}`).put(file);
        uploadTask.on('state_changed',
            (snapshot) => {
                // progrss function ....
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.setState({progress});
            },
            (error) => {
                // error function ....
                console.log(error);
            },
            () => {
                // complete function ....
                fire.storage().ref('photos').child(file.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({url});
                })
            });
    }

    render() {
        const { fullname, phonenumber, address1, address2, city,  zip, url } = this.state;
        return (
            <div>
                <Container>
                    <Row className="card mb-4 wow fadeIn">
                        <main className="mt-1 pt-12">
                            <div className="container">
                                <section className="pt-5">
                                    <div>
                                        <h2 className="h1 text-center mb-5">REGISTRASI</h2>
                                        <hr className="mb-5" />
                                    </div>
                                    <div className="panel-body">
                                        <div>
                                            <progress value={this.state.progress} max="100"/>
                                            <br/>
                                            <input type="file" onChange={this.handleChange}/>
                                            <button onClick={this.handleUpload}>Upload</button>
                                            <br/>
                                            <img src={this.state.url || 'http://via.placeholder.com/400x300'} alt="Uploaded file" height="300" width="400"/>
                                        </div>
                                        <br/>
                                        <br/>
                                        <form onSubmit={this.onSubmit}>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="inputEmail4">Nama Lengkap</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="fullname"
                                                            value={fullname}
                                                            onChange={this.onChange}
                                                            placeholder="Nama Lengkap"
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="inputPassword4">Nomor Telepon</label>
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            name="phonenumber"
                                                            value={phonenumber}
                                                            onChange={this.onChange}
                                                            placeholder="Nomor Telepon"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inputAddress">Alamat 1</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="address1"
                                                        value={address1}
                                                        onChange={this.onChange}
                                                        placeholder="Alamat"

                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="inputAddress2">Alamat 2 (Alternative)</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="address2"
                                                        value={address2}
                                                        onChange={this.onChange}
                                                        placeholder="Alamat Alternative"
                                                    />
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="inputCity">Kota</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="city"
                                                            value={city}
                                                            onChange={this.onChange}
                                                            placeholder="Kota"
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-6">
                                                        <label htmlFor="inputZip">Zip</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="zip"
                                                            value={zip}
                                                            onChange={this.onChange}
                                                            placeholder="Kode Pos"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="author">URL:</label>
                                                        <a  className="form-control" href={this.state.url} download=" " >{url}</a>
                                                    </div>
                                                </div>
                                            <br/>
                                            <button type="submit" className="btn btn-success">Submit</button>
                                        </form>
                                        <br/>
                                    </div>
                                </section>
                            </div>
                        </main>
                    </Row>
                </Container>
            </div>

        );
    }
}

export default ProfileCreate;