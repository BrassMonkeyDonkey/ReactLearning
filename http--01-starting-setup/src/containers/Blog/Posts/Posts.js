import React, { Component } from "react";
import { Route } from "react-router-dom";
import axios from "../../../axios";

import "./Posts.css";
import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";

class Posts extends Component {
  state = {
    posts: [],
  };

  postSelectedHandler = (id) => {
    this.props.history.push({ pathname: "/posts/" + id });
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        var updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Kevin",
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch((error) => console.log(error));
  }

  render() {
    let posts = (
      <p style={{ textAlign: "center" }}>
        Something went wrong while fetching the posts.
      </p>
    );
    if (!this.state.error) {
      posts = this.state.posts.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />
      ));
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
      </div>
    );
  }
}

export default Posts;
