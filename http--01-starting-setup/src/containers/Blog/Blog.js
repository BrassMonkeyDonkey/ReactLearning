import React, { Component, Suspense } from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import "./Blog.css";

import Posts from "./Posts/Posts";

const NewPost = React.lazy(() => import("./NewPost/NewPost"));

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/posts" exact>
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink to="/new-post">New post</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          {/* <Route path="/new-post" component={AsyncComponent} /> */}
          <Route path="/new-post" render={() => <Suspense fallback={<div>Loading...</div>}><NewPost/></Suspense>} />
          <Route path="/posts" component={Posts} />
          <Redirect from="/" to="/posts" />
        </Switch>
      </div>
    );
  }
}

export default Blog;
