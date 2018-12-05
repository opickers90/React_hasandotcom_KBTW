import React from 'react';
import fire from "../../firebase/firebase"
import { Link } from 'react-router-dom';

import { Container, Row} from "mdbreact";

class CourseShowUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: {},
            key: ''
        };
    }

    componentDidMount() {
        const ref = fire.firestore().collection('articles').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    articles: doc.data(),
                    key: doc.id,
                    isLoading: false
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    delete(id){
        fire.firestore().collection('articles').doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
            this.props.history.push("/coursePage")
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

                                    <div>
                                        <h2 className="h1 text-center mb-5 text-uppercase">{this.state.articles.title}</h2>
                                        <hr className="mb-5" />
                                    </div>
                                    <div className="card mb-4 wow fadeIn">
                                        <div className="card-body">
                                      <dl>
                                        <dt><p className="h5 my-4 text-uppercase">DESKRIPSI:</p></dt>
                                          <dd><p className="font-italic text-justify">{this.state.articles.description}</p></dd>
                                      </dl>
                                        </div>
                                    </div>
                                    <div className="card mb-4 wow fadeIn">
                                        <div className="card-body">
                                        <dl>
                                        <dt><p className="my-4 text-uppercase">KONTEN:</p></dt>
                                          <dd><p className="text-justify">{this.state.articles.content}</p></dd>
                                            <dt><p className="my-4 text-right">Penulis:</p></dt>
                                            <dd><p className="text-right">{this.state.articles.author}</p></dd>
                                        </dl>
                                        </div>
                                    </div>
                                    <div className="card mb-4 wow fadeIn justify-content-center text-center align-content-center">
                                        <div className="card-header font-weight-bold">
                                            <Link to={`/courseEdit/${this.state.key}`} className="btn btn-success">Ubah Konten</Link>&nbsp;
                                            <button onClick={this.delete.bind(this, this.state.key)}>Hapus Konten</button>
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

export default CourseShowUser;