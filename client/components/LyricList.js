import React, { Component } from "react";

class LyricList extends Component {
  renderLyrics() {
    if (!this.props.lyrics) {
        return <div>Loading Lyrics...</div>;
    };

    return this.props.lyrics.map(({ id, content }) => {
      return (
        <li key={id} className="collection-item">
          {content}
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    );
  }
}

export default LyricList;
