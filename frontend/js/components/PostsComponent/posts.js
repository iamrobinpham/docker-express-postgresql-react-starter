import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';

import { Button, Label, Table, Col } from 'reactstrap';
import Post from './post';
import './posts.scss';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount = () => {
    this.props.showPosts();
  }

  render() {
    return (
      <section>
        <Col xs="4" className="addPost-form">
          <form ref="commentForm" onSubmit={this.handleSubmit} className="form-inline">
            <Label hidden>Name</Label>
            <input type="text" ref="name" placeholder="name" className="form-control addPost-input"/>
            <Label hidden>Content</Label>
            <input type="text" ref="content" placeholder="content" className="form-control addPost-input"/>
            <Button type="submit" color="success" className="addPost-button">Submit</Button>
          </form>
        </Col>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>{''}</th>
            </tr>
          </thead>
          <tbody>
            {this.props.posts.map((post, i) =>
              <Post {...this.props}
                key={i}
                i={i}
                post={post}
              />)}
          </tbody>
        </Table>
      </section>
    );
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const name = this.refs.name.value;
    const content = this.refs.content.value;
    this.props.addPost(name, content);
    this.refs.commentForm.reset();
  }
}

Posts.propTypes = {
  posts: PropTypes.array,
  addPost: PropTypes.func,
  showPosts: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    posts: state.posts,
    alerts: state.alerts,
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispachToProps)(Posts);
