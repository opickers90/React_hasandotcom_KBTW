import React from 'react';
import fire from "../../firebase/firebase"

import { Container, Row} from "mdbreact";

class CourseEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: '',
            title: '',
            author: '',
            description: '',
            content:''
        };
    }

    componentDidMount() {
        const ref = fire.firestore().collection('articles').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const articles = doc.data();
                this.setState({
                    key: doc.id,
                    title: articles.title,
                    author: articles.author,
                    description: articles.description,
                    content: articles.content
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({articles:state});
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { title, author, description, content } = this.state;

        const updateRef = fire.firestore().collection('articles').doc(this.state.key);
        updateRef.set({
            title,
            author,
            description,
            content
        }).then((docRef) => {
            this.setState({
                key: '',
                title:'',
                author:'',
                description:'',
                content:''
            });
            this.props.history.push("/courseShow/"+this.props.match.params.id)
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
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
                                        <h2 className="h1 text-center mb-5">PERBAHARUI ARTIKEL</h2>
                                        <hr className="mb-5" />
                                    </div>
                                    <div class="panel-body">
                                    <form onSubmit={this.onSubmit}>
                                        <div class="form-group">
                                            <label for="title">Judul:</label>
                                            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
                                        </div>
                                    <div className="form-group">
                                        <label htmlFor="author">Penulis:</label>
                                        <input type="text" className="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="description">Deskripsi:</label>
                                        <input type="textArea" className="form-control" name="description" value={this.state.description} onChange={this.onChange} cols="80" rows="3" placeholder="Description" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Konten:</label>
                                        <input type="textArea" className="form-control" name="description" value={this.state.content} onChange={this.onChange} cols="80" rows="20" placeholder="Content"/>
                                    </div>
                                    <button type="submit" className="btn btn-success">Submit</button>
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

export default CourseEdit;