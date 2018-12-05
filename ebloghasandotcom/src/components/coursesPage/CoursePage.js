import React from 'react';
import fire from "../../firebase/firebase"
import { Link } from 'react-router-dom';

import { Container, Card, CardBody, Row} from "mdbreact";

class CoursePage extends React.Component {
    constructor(props) {
        super(props);
        this.ref = fire.firestore().collection('articles');
        this.unsubscribe = null;
        this.state = {
            articles: [],
            user: {}
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const articles = [];
        querySnapshot.forEach((doc) => {
            const { title,  author, description, content } = doc.data();
            articles.push({
                key: doc.id,
                doc, // DocumentSnapshot
                title,
                author,
                description,
                content,
            });
        });
        this.setState({
            articles
        });
    };

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
                                <h2 className="h1 text-center mb-5">ARTIKEL MATERI</h2>
                                <hr className="mb-5" />
                            </div>
                            <div className="card mb-4 wow fadeIn">
                                <div className="card-body">
                                        {this.state.articles.map ( articles =>
                                        <Card className ="btn-outline-blue mb-5 col-xl-auto jumbotron-fluid">
                                            <CardBody >
                                                <form>
                                                    <p className="h3 text-center py-4 text-uppercase">{articles.title}</p>
                                                    <div>
                                                        <p className="grey-text my-4 text-justify" >{articles.description}</p>
                                                        <p className="grey-text my-4 text-capitalize text-right">Penulis: {articles.author}</p>
                                                    </div>
                                                    <div className="text-center py-4 mt-3">
                                                        <Link className="btn btn-primary btn-md" to={`/courseShow/${articles.key}`}>Baca Lebih Lanjut....</Link>
                                                    </div>
                                                </form>
                                            </CardBody>
                                        </Card>
                                        )}
                                </div>
                            </div>
                            <hr className="mb-5" />
                            <nav className="d-flex justify-content-center wow fadeIn">
                                <ul className="pagination pg-blue">
                                    <li className="page-item disabled">
                                        <a className="page-link" href="/" aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                    </li>
                                    <li className="page-item active">
                                        <a className="page-link" href="/">1
                                            <span className="sr-only">(current)</span>
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="/">2</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="/">3</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="/">4</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="/">5</a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="/" aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </section>
                    </div>
                </main>
            </Row>
        </Container>
        </div>
    );
  }
}

export default CoursePage;
