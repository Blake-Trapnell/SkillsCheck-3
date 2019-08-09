import React, {Component} from 'react'
import './Nav.css'
import {Link} from "react-router-dom"
import { connect } from 'react-redux'
import {withRouter} from "react-router-dom"


class Nav extends Component {
  state = {
    profileimg: "",
    username: '',
  }

  render() {
    console.log(this.props)
    return (
            <div className= "Nav">
              <div className="profile_border">
              <img className= "profile_pic" src={this.props.profileimg} alt=""/>
              </div>
              <Link to = "/dashboard">
              <button className="Nav_buttons">Home</button>
              </Link>
              <Link to = "/post">
              <button className="Nav_buttons">New Post</button>
              </Link>
              <div className="logout_button">
              <Link to = "/">
              <button className="Nav_buttons">Logout</button>
              </Link>
              </div>
            </div>
    )
  }
}
function mapStateToProps(reduxState) {
  const {username, profileimg} = reduxState
  return ({username, profileimg})
}
export default connect(mapStateToProps)(withRouter(Nav))
