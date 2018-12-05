import React, { Component } from 'react';
import fire from "../../firebase/firebase";
import { Container, Row} from "mdbreact";

class BookCreate extends Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.ref = fire.firestore().collection('books');
        this.state = {
            title: '',
            description: '',
            author: '',
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

        const { title, description, author, url } = this.state;

        this.ref.add({
            title,
            description,
            author,
            url

        }).then((docRef) => {
            this.setState({
                title: '',
                description: '',
                author: '',
                url: ''
            });
            this.props.history.push("/bookPage")
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
        const uploadTask = fire.storage().ref(`files/${file.name}`).put(file);
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
                fire.storage().ref('files').child(file.name).getDownloadURL().then(url => {
                    console.log(url);
                    this.setState({url});
                })
            });
    }

    render() {
        const { title, description, author, url } = this.state;
        return (
            <div>
                <Container>
                    <Row className="card mb-4 wow fadeIn">
                        <main className="mt-1 pt-12">
                            <div className="container">
                                <section className="pt-5">
                                    <div>
                                        <h2 className="h1 text-center mb-5">UPLOAD BUKU BARU</h2>
                                        <hr className="mb-5" />
                                    </div>
                                    <div class="panel-body">
                                        <div>
                                            <progress value={this.state.progress} max="100"/>
                                            <br/>
                                            <input type="file" onChange={this.handleChange}/>
                                            <button onClick={this.handleUpload}>Upload</button>
                                            <br/>
                                        </div>
                                        <form onSubmit={this.onSubmit}>
                                            <div class="form-group">
                                                <label for="title">Title:</label>
                                                <input type="text" class="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
                                            </div>
                                            <div class="form-group">
                                                <label for="description">Description:</label>
                                                <textArea class="form-control" name="description" onChange={this.onChange} placeholder="Description" cols="80" rows="3">{description}</textArea>
                                            </div>
                                            <div class="form-group">
                                                <label for="author">Author:</label>
                                                <input type="text" class="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="author">URL:</label>
                                                <a  className="form-control" href={this.state.url} download=" " >{url}</a>
                                            </div>
                                            <br/>
                                            <button type="submit" class="btn btn-success">Submit</button>
                                        </form>
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

export default BookCreate;