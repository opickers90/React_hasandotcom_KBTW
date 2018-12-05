import React from "react";
import { Route, Switch } from "react-router-dom";

import RegistrationPage from "../components/registrationPage/RegistrationPage";
import HomePage from "../components/homepage/HomePage";
import CoursePage from "../components/coursesPage/CoursePage";
import CourseShow from "../components/coursesPage/CourseShow";
import CourseCreate from "../components/coursesPage/CourseCreate";
import CourseEdit from "../components/coursesPage/CourseEdit";
import BookPage from "../components/booksPage/BookPage";
import BookShow from "../components/booksPage/BookShow";
import BookEdit from "../components/booksPage/BookEdit";
import BookCreate from "../components/booksPage/BookCreate";
import ProfileCreate from "../components/profilePage/ProfileCreate"
import ProfileShow from "../components/profilePage/ProfileShow"
import ProfileEdit from "../components/profilePage/ProfileEdit"
import ProfilePage from "../components/profilePage/ProfilePage"
import CourseShowUser from "../components/coursesPage/CourseShowUser";
import BookShowUser from "../components/booksPage/BookShowUser";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route exact path="/coursePage" component={CoursePage} />
        <Route path="/courseShow/:id" component={CourseShow} />
        <Route path="/courseCreate" component={CourseCreate} />
        <Route path="/courseEdit/:id" component={CourseEdit} />

        <Route exact path="/bookPage" component={BookPage} />
        <Route path="/bookCreate" component={BookCreate} />
        <Route path="/bookShow/:id" component={BookShow} />
        <Route path="/bookEdit/:id" component={BookEdit} />

        <Route path="/courseShowUser/:id" component={CourseShowUser} />
        <Route path="/bookShowUser/:id" component={BookShowUser} />

        <Route exact path="/profilePage" component={ProfilePage} />
        <Route path="/profileCreate" component={ProfileCreate} />
        <Route path="/profileShow/:id" component={ProfileShow} />
        <Route path="/profileEdit/:id" component={ProfileEdit} />

        <Route exact path="/registrationPage" component={RegistrationPage} />
\
          <Route
          render={function() {
            return <h1>Not Found</h1>;
          }}
        />
      </Switch>
    );
  }
}

export default Routes;
