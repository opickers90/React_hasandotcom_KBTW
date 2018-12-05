import React, {Component} from 'react';

import { Container, Row} from "mdbreact";
import ProfileShow from "./ProfileShow";
import fire from "../../firebase/firebase";
import {Link} from "react-router-dom";

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.ref = fire.firestore().collection('profile');
        this.unsubscribe = null;
        this.state = {
            profile: [],
            user: {}
        }
    }

    authListener(){
        fire.auth().onAuthStateChanged((user) => {
            console.log(user);
            if (user) {
                this.setState({ user });
            } else {
                this.setState({user: null});
            }
        });
    }


    onCollectionUpdate = (querySnapshot) => {
        const profile = [];
        querySnapshot.forEach((doc) => {
            const {fullname} = doc.data();
            profile.push({
                key: doc.id,
                doc, // DocumentSnapshot
                fullname,

            });
        });
        this.setState({
            profile
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
        this.authListener()
    }


    render() {
        return (
            <div>
                <Container>
                    <table className="table table-stripe">
                        <thead>
                        <tr>
                            <th>profile</th>

                        </tr>
                        </thead>
                        <tbody>
                        {this.state.profile.map(profile =>
                            <tr>
                                <td><Link to={`/profileShow/${profile.key}`}>{profile.fullname}</Link>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </Container>
            </div>
        );
    }
}

export default ProfilePage;
