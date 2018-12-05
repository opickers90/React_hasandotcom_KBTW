import React from 'react';
import fire from "../../firebase/firebase";
import { Container, Row} from "mdbreact";
import {Link} from "react-router-dom";

class ProfileShow extends React.Component {

    constructor(props) {
        super(props);
        this.booksref = fire.firestore().collection('books');
        this.articlesref = fire.firestore().collection('articles');
        this.unsubscribe = null;
        this.state = {
            profile: {},
            books: [],
            articles: [],
            key: ''
        };
    }

    onArticlesCollectionUpdate = (querySnapshot) => {
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

    onBooksCollectionUpdate = (querySnapshot) => {
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
        this.unsubscribe = this.booksref.onSnapshot(this.onBooksCollectionUpdate);
        this.unsubscribe = this.articlesref.onSnapshot(this.onArticlesCollectionUpdate);
        const ref = fire.firestore().collection('profile').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    profile: doc.data(),
                    key: doc.id,
                    isLoading: false
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    deletebooks(id){
        fire.firestore().collection('books').doc(id).delete().then(() => {
            console.log("Document successfully deleted!");
            this.props.history.push("/bookPage")
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    deletearticles(id){
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
                                    <div className="card-body">
                                        <h2 className="h1 text-center mb-5 text-uppercase">
                                           {this.state.profile.fullname}
                                        </h2>
                                        <hr className="mb-5" />
                                    </div>
                                    <div className="card mb-4 wow fadeIn">
                                        <div className="card-body h1 text-center mb-5 text-uppercase">
                                            <img src={this.state.profile.url || 'http://via.placeholder.com/400x300'} alt="Uploaded file" height="400" width="400"/>
                                            <hr />
                                        </div>
                                        <div className="card-body">
                                        <dl>
                                            <dt><p className="text-uppercase">NAMA LENGKAP:</p></dt>
                                            <dd><p className="my-5 text-justify">{this.state.profile.fullname}</p></dd>
                                            <dt><p className="text-justify">NOMOR TELEPON:</p></dt>
                                            <dd><p className="my-5 text-justify">{this.state.profile.phonenumber}</p></dd>
                                            <dt><p className="text-justify">ALAMAT UTAMA:</p></dt>
                                            <dd><p className="my-5 text-justify">{this.state.profile.address1}</p></dd>
                                            <dt><p className="text-justify">ALAMAT AlTERNATIF:</p></dt>
                                            <dd><p className="my-5 text-justify">{this.state.profile.address2}</p></dd>
                                            <dt><p className="text-justify">KOTA:</p></dt>
                                            <dd><p className="my-5 text-justify">{this.state.profile.city}</p></dd>
                                            <dt><p className="text-justify">KODE POS:</p></dt>
                                            <dd><p className="my-5 text-justify">{this.state.profile.zip}</p></dd>
                                        </dl>
                                        <hr className="mb-5" />
                                    </div>
                                    </div>
                                    <div className="card mb-4 wow fadeIn justify-content-center text-center align-content-center">
                                            <Link to={`/profileEdit/${this.state.key}`} className="btn btn-success">Perbaiki Profile</Link>&nbsp;
                                    </div>
                                    <div className="card mb-4 wow fadeIn justify-content-center text-center align-content-center">
                                        <a href="/courseCreate" className="btn btn-primary btn ">Bikin Artikel Baru</a>
                                        <div className="panel-body">
                                            <table className="table table-stripe">
                                                <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Author</th>

                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.articles.map(articles =>
                                                    <tr>
                                                        <td><Link to={`/courseShowUser/${articles.key}`}>{articles.title}</Link>
                                                        </td>
                                                        <td>{articles.author}</td>
                                                    </tr>
                                                )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="card mb-4 wow fadeIn justify-content-center text-center align-content-center">
                                        <a href="/bookCreate" className="btn btn-primary btn ">Upload Buku Baru</a>
                                        <div className="panel-body">
                                            <table className="table table-stripe">
                                                <thead>
                                                <tr>
                                                    <th>Title</th>
                                                    <th>Author</th>

                                                </tr>
                                                </thead>
                                                <tbody>
                                                {this.state.books.map(books =>
                                                    <tr>
                                                        <td><Link to={`/bookShowUser/${books.key}`}>{books.title}</Link>
                                                        </td>
                                                        <td>{books.author}</td>

                                                    </tr>
                                                )}
                                                </tbody>
                                            </table>
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

export default ProfileShow;