import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import request from "superagent";
import debounce from "lodash.debounce";
import { Card,CardDeck } from 'react-bootstrap';

export class Users extends React.Component {
  constructor(props) {
    super(props);

    // here we will sets up our initial state
    this.state = {
      error: false,
      hasMore: true,
      isLoading: false,
      users: [],
    };

    // here we will binds our scroll event handler
    window.onscroll = debounce(() => {
      const {
        loadUsers,
        state: {
          error,
          isLoading,
          hasMore,
        },
      } = this;

      // check here error or have more records
      if (error || isLoading || !hasMore) return;

      // Checks that the page has scrolled to the bottom
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        loadUsers();
      }
    }, 100);
  }

  componentWillMount() {
    // Loads some users on initial load
    this.loadUsers();
  }

  loadUsers = () => {
    this.setState({ isLoading: true }, () => {
      request
        .get('https://randomuser.me/api/?results=10')
        .then((results) => {
          // Creates a massaged array of users records
          const nextUsers = results.body.results.map(user => ({
            email: user.email,
            name: Object.values(user.name).join(' '),
            photo: user.picture.medium,
            username: user.login.username,
            uuid: user.login.uuid,
            age: user.registered.age,
          }));

          // Merges the next users into our existing users
          this.setState({
            // Note: here we will check that api has more record or not
            hasMore: (this.state.users.length < 500),
            isLoading: false,
            users: [
              ...this.state.users,
              ...nextUsers,
            ],
          });
        })
        .catch((err) => {
          this.setState({
            error: err.message,
            isLoading: false,
           });
        })
    });
  }

  render() {
    const {
      error,
      hasMore,
      isLoading,
      users,
    } = this.state;

    return (
      <div>
        <h6>Scroll down to load more record!!</h6>
        {users.map(user => (
            <CardDeck>
            <Card>
              <Card.Img variant="top" src={user.photo} style={{
                  borderRadius: '50%',
                  height: 72,
                  marginRight: 20,
                  width: 72,
                }} />
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                Email : {user.email}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
               @<small className="text-muted">{(user.username) ? user.username : ""}</small>
              </Card.Footer>
            </Card>
          </CardDeck>
          
        ))}
        <hr />
        {error &&
          <div style={{ color: '#900' }}>
            {error}
          </div>
        }
        {isLoading &&
          <div>Loading...</div>
        }
        {!hasMore &&
          <div>No More Record!</div>
        }
      </div>
    );
  }
}
