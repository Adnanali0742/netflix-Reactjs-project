import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class GroupList extends Component {

  constructor(props) {
    super(props);
    this.state = {Movies: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('SeenMovies/1.0/')
      .then(response => response.json())
      .then(data => this.setState({Movies: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/SeenMovies/1.0/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedGroups = [...this.state.Movies].filter(i => i.id !== id);
      this.setState({Movies: updatedGroups});
    });
  }

  render() {
    const {Movies, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const groupList = Movies.map(Movie => {
      return <tr key={Movie.id}>
        <td style={{whiteSpace: 'nowrap'}}>{Movie.id}</td>
        <td style={{whiteSpace: 'nowrap'}}>{Movie.title}</td>
        <td style={{whiteSpace: 'nowrap'}}>{Movie.date}</td>

        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/seenMovies/" + Movie.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(Movie.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/groups/new">Add Movie</Button>
          </div>
          <h3>Admin Roles CRUD Operations for EPIFLIX</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">ID</th>
              <th width="20%">Name</th>
              <th>Date Added</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {groupList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default GroupList;