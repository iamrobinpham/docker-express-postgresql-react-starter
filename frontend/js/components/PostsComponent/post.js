import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Post extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <tr>
        <th scope="row">{this.props.i + 1}</th>
        <td>{this.props.post.name}</td>
        <td>{this.props.post.content}</td>
        <td>
          <Button
            className="remove-button"
            color="danger"
            onClick={this.props.removePost.bind(null, this.props.post.name, this.props.i)}>
            REMOVE
          </Button>
        </td>
      </tr>
    );
  }
}

Post.propTypes = {
  i: PropTypes.number,
  post: PropTypes.object,
  removePost: PropTypes.func,
};

export default Post;
