import React, { Component } from 'react';
import fire from "../../firebase/firebase";

import { Container, Row} from "mdbreact";

class BookEdit extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.state = {
            key: '',
            title: '',
            description: '',
            author: '',
            url:'',
            file: null,
            progress: 0
        };
    }

    componentDidMount() {
        const ref = fire.firestore().collection('books').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const books = doc.data();
                this.setState({
                    key: doc.id,
                    title: books.title,
                    description: books.description,
                    author: books.author,
                    url: books.url
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({books:state});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { title, description, author, url } = this.state;

        const updateRef = fire.firestore().collection('books').doc(this.state.key);
        updateRef.set({
            title,
            description,
            author,
            url
        }).then((docRef) => {
            this.setState({
                key: '',
                title: '',
                description: '',
                author: '',
                url: ''
            });
            this.props.history.push("/bookShow/"+this.props.match.params.id)
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
        return (
            <div>
                <Container>
                    <Row className="card mb-4 wow fadeIn">
                        <main className="mt-1 pt-12">
                            <div className="container">
                                <section className="pt-5">
                                    <div>
                                        <h2 className="h1 text-center mb-5">PERBAHARUI BUKU</h2>
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
                                            <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
                                        </div>
                                        <div class="form-group">
                                            <label for="description">Description:</label>
                                            <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
                                        </div>
                                        <div class="form-group">
                                            <label for="author">Author:</label>
                                            <input type="text" class="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="author">URL:</label>
                                            <a  className="form-control" href={this.state.url} download=" " >{this.state.url}</a>
                                        </div>
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

export default BookEdit;