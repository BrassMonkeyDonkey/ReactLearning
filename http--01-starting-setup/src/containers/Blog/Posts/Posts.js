import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "../../../axios";

import "./Posts.css";
import Post from "../../../components/Post/Post";

class Posts extends Component {
  state = {
    posts: [],
  };

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
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
        <Link key={post.id} to={"/" + post.id}>
          <Post
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        </Link>
      ));
    }

    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
