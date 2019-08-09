import React, {Component} from 'react'
import './Nav.css'
import {Link} from "react-router-dom"


export default class Nav extends Component {

  render() {
    return (
            <div>
              <Link to = "/dashboard">
              <button>Home</button>
              </Link>
              <Link to = "/post">
              <button>New Post</button>
              </Link>
              <Link to = "/">
              <button>Logout</button>
              </Link>
            </div>
    )
  }
}
