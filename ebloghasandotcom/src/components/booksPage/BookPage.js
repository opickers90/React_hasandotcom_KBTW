import React from 'react';
import { Link } from 'react-router-dom';
import fire from "../../firebase/firebase";


import { Container, Row} from "mdbreact";


class BookPage extends React.Component {
    constructor(props) {
        super(props);
        this.ref = fire.firestore().collection('books');
        this.unsubscribe = null;
        this.state = {
            books: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const books = [];
        querySnapshot.forEach((doc) => {
            const { title, description, author } = doc.data();
            books.push({
                key: doc.id,
                doc, // DocumentSnapshot
                title,
                description,
                author,
            });
        });
        this.setState({
            books
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
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
                                        <h2 className="h1 text-center mb-5">PERPUSTAKAAN</h2>
                                        <hr className="mb-5" />
                                    </div>
                                    <div className="container">
                                        <div className="panel panel-default">
                                            <div className="panel-body">
                                                <table className="table table-stripe">
                                                    <thead>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Description</th>
                                                        <th>Author</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.books.map(books =>
                                                        <tr>
                                                            <td><Link to={`/bookShow/${books.key}`}>{books.title}</Link>
                                                            </td>
                                                            <td>{books.description}</td>
                                                            <td>{books.author}</td>
                                                        </tr>
                                                    )}
                                                    </tbody>
                                                </table>
                                            </div>
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

export default BookPage;
