import React, { Component } from 'react';
import InstagramFeed from './InstagramFeed'
import Media from './Media';

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = { media: [] };

    InstagramFeed.get(props.username).then(media => this.setState({ media: media }))
  }

  render() {
    return (
      <div className="Feed">
        {this.state.media.map((media, index) => (
          <Media key={index} src={media.src} url={media.url} alt={media.alt} />
        ))}
      </div>
    );
  }
}

export default Feed;
