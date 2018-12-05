import React from 'react';
import { Link } from 'react-router-dom';
import fire from "../../firebase/firebase";

import { Container, Row} from "mdbreact";

class BookShowUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            books: {},
            key: ''
        };
    }

    componentDidMount() {
        const ref = fire.firestore().collection('books').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    books: doc.data(),
                    key: doc.id,
                    isLoading: false
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    delete(id){
        fire.firestore().collection('books').doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
            this.props.history.push("/bookPage")
        }).catch((error) => {
            console.error("Error removing document: ", error);
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
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <h2 className="panel-title">
                                                {this.state.books.title}
                                            </h2>
                                        </div>
                                        <div className="panel-body">
                                            <dl>
                                                <dt>Description:</dt>
                                                <dd>{this.state.books.description}</dd>
                                                <dt>Author:</dt>
                                                <dd>{this.state.books.author}</dd>
                                                <dt>DOWNLOAD LINK:</dt>
                                                <dd><a href={this.state.books.url} download=" ">Download
                                                    now {this.state.books.title} !!</a></dd>
                                            </dl>
                                            <Link to={`/bookEdit/${this.state.key}`}
                                                  class="btn btn-success">Edit</Link>&nbsp;
                                            <button onClick={this.delete.bind(this, this.state.key)}
                                                    className="btn btn-danger">Delete
                                            </button>
                                        </div>
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

export default BookShowUser;