import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql, withApollo } from "react-apollo";
import { Link } from "react-router";
import query from "../queries/fetchSongs";


class SongList extends Component {
  onSongDelete(id, title) {
    console.log(id, title);
    this.props
      .mutate({ variables: { id: id.toString() } })
        .then(() => {
          this.props.client.resetStore();
          this.props.data.refetch();
        });
  }

  renderSongs() {
    console.log(this.props.data.songs);
    return this.props.data.songs.map(({ id, title }) => {
      return (
        <li key={id} className="collection-item">
          <Link to={`/songs/${id}`}>{title}</Link>
          <i className="material-icons" onClick={() => this.onSongDelete(id, title)}>
            delete
          </i>
        </li>
      );
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
      <h1>Song List</h1>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default withApollo(graphql(mutation)(
  graphql(query)(SongList)
));
