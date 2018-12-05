import React from "react";

import "./HomePage.css";

import {
  EdgeHeader,
    Col,
    Row,
    Button,
    Container,
    Card,
    CardBody,
    CardGroup,
    CardTitle,
    CardText,
    View
} from "mdbreact";

const NavLink = require("react-router-dom").NavLink;

class HomePage extends React.Component {

  render() {
    return (
      <div>
          <View>
              <EdgeHeader>
                  <div className="inner ">
                      <br/>
                      <h1 className="display-4 font-weight-bold white-text pt-5 mb-2">HASANdotCOM</h1>
                      <hr className="hr-light"/>
                      <p><br/></p>
                      <h3 className="white-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti consequuntur.</h3>
                      <p><br/></p>
                      <Button
                          active
                          href="/coursePage"
                          target="_blank"
                          color="primary"
                      >
                          Pilihan Materi ...
                      </Button>
                  </div>
              </EdgeHeader>
          </View>
          <Container>
          <Row>
            <Col md="10" className="mx-auto mt-4">
                <br/>
                <div className="wow fadeIn">
                    <h2 className="h1 text-center mb-5  font-weight-bold">APAKAH HASAN DOT COM ITU?</h2>
                    <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum..</p>
                    <p className="text-center mb-5 pb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum..
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident,
                        sunt in culpa qui officia deserunt mollit anim id est laborum..</p>
                </div>
              <hr className="my-5" />
                <CardGroup deck className="mt-3">
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Panel title</CardTitle>
                            <CardText>
                                Some quick example text to build on the card title and make up
                                the bulk of the card's content.
                            </CardText>
                            <NavLink
                                tag="button"
                                className="btn btn-sm indigo darken-3"
                                to="/advanced"
                            >
                                Learn more
                            </NavLink>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">Panel title</CardTitle>
                            <CardText>
                                Some quick example text to build on the card title and make up
                                the bulk of the card's content.
                            </CardText>
                            <NavLink
                                tag="button"
                                className="btn btn-sm indigo darken-3"
                                to="/advanced"
                            >
                                Learn more
                            </NavLink>
                        </CardBody>
                    </Card>
                </CardGroup>
                <hr className="my-5" />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default HomePage;
