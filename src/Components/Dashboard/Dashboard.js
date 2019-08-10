import React, {Component} from 'react'
import './Dashboard.css'
import axios from "axios"

export default class Dashboard extends Component {
  state = {
    posts: [],
    search: '',
    userposts: true
  }

  componentDidMount(){
    axios.get('api/posts').then(res => {
      this.setState({
        posts: res.data
      })
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <div>
            <div>Dashboard</div>
            {this.state.posts.map(el => (
              <div>
              <h3>{el.title}</h3>
              <img src={el.img} alt="post img"/>
              <h3>{el.content}</h3>
              </div>

            ))}
      </div>
    )
  }
}
