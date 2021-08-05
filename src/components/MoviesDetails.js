import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from '../AppNavbar';
import { Link } from 'react-router-dom';

class GroupList extends Component {

  constructor(props) {
    super(props);
    this.state = {Movies: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('movies-from-mongo/1.0') // getting the data from the mongo side
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
      // const address = `${seenMovie.id || ''} ${seenMovie.movieName || ''}`;
      return <tr key={Movie.id}>
        <td style={{whiteSpace: 'nowrap'}}>{Movie.title}</td>
        <td style={{whiteSpace: 'nowrap'}}>{Movie.movieDirector}</td>
        <td style={{whiteSpace: 'nowrap'}}>{Movie.releaseDate}</td>
    
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <h3>Movies Details from Mongo Side</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Name</th>
              <th width="20%">Movie Director</th>
              <th>Release Date</th>
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