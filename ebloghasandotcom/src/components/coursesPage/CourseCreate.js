import React from 'react';
import fire from "../../firebase/firebase";

import { Container, Row} from "mdbreact";

class CourseCreate extends React.Component {

    constructor() {
        super();
        this.ref = fire.firestore().collection('articles');
        this.state = {
            title: '',
            author: '',
            description: '',
            content: ''
        };
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { title, author, description, content} = this.state;
        this.ref.add({
            title,
            author,
            description,
            content
        }).then((docRef) => {
            this.setState({
                title: '',
                author: '',
                description: '',
                content: '',
            });
            this.props.history.push("/CoursePageUser")
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        const { title, author, description, content } = this.state;
        return (
            <div>
                <Container>
                    <Row className="card mb-4 wow fadeIn">
                        <main className="mt-1 pt-12">
                            <div className="container">
                                <section className="pt-5">
                                    <div>
                                        <h2 className="h1 text-center mb-5">ARTIKEL BARU</h2>
                                        <hr className="mb-5" />
                                    </div>
                                    <br/>
                                    <div class="panel-body ">
                                    <form onSubmit={this.onSubmit}>
                                        <div class="form-group ">
                                            <label htmlFor="title">Judul:</label>
                                            <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Title" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="author">Penulis:</label>
                                            <input type="text" className="form-control" name="author" value={author} onChange={this.onChange} placeholder="Author"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Deskripsi:</label>
                                            <input type="text" className="form-control" name ="description" value={description} onChange={this.onChange} placeholder="Description"/>
                                        </div>
                                        <div class="form-group">
                                            <label htmlFor="content">Konten:</label>
                                            <textArea className="form-control" name ="content" onChange={this.onChange} placeholder="Content" cols="80" rows="30">{content}</textArea>
                                        </div>
                                        <div className="d-flex justify-content-center wow fadeIn">
                                            <button type="submit" className="btn btn-success ">Submit</button>
                                        </div>
                                    </form>
                                    </div>
                                    <br/>
                                </section>
                            </div>
                        </main>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default CourseCreate;