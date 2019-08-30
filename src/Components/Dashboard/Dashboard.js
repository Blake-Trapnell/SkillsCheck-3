import React, {Component} from 'react'
import './Dashboard.css'
import axios from "axios"
import { search, setUser} from "../../ducks/reducer"
import { connect } from 'react-redux'

class Dashboard extends Component {
  state = {
    posts: [],
    search: '',
    userposts: false
  }

  componentDidMount = async () => {
    let res = await axios.get('/api/auth/me')
    console.log(res.data)
    this.props.setUser(res.data)
      if( this.props.user_id === "") {
        this.props.history.push('/')
        return
      }
      const {userposts, search} = this.state

    const result = await axios.get(`/api/posts?userposts=${userposts}&search=${search}&user_id=${this.props.user_id}`)
   const posts = result.data

  this.setState({
    posts,
  })
  }

  search = async () => {
    const {userposts, search} = this.state
    const res = await axios.get(`/api/posts?userposts=${userposts}&search=${search}&user_id=${this.props.user_id}`)
   const posts = res.data

  this.setState({
    posts,
  })
  }

  iHateLife = async () => {
    const {userposts, search} = this.state
    const res = await axios.get(`/api/posts?userposts=${!userposts}&search=${search}&user_id=${this.props.user_id}`)
    const posts = res.data
 
   this.setState({
     posts,
     userposts: !userposts
   })
  }

  handleChange(e) {
    this.setState({
      search: e
    })
  }



  render() {
    let {posts, userposts} = this.state
    return (
      <div>
            <div>Dashboard</div>
            <input type="text" onChange={(e)=> {this.handleChange(e.target.value)}}/>
            <button onClick={this.search}>Search</button>
            <input onChange={this.iHateLife} type="checkbox" checked={userposts}/>
            {posts.length > 0 ? 
              posts.map(el => (
                <div className="Dashboard_Posts" key={el.post_id}>
                  <h1 className="Dashboard_Title" >{el.title}</h1>
                  <img className="Dashboard_Img" src={el.img} alt=""/>
                  <h3 className="Dashboard_Content" >{el.content}</h3>
                  <h6 className="Dashboard_author" >{el.author}</h6>
                </div>
              ))
            : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {user_id} = state
  return {user_id}
 }
 

export default connect(mapStateToProps, {search, setUser})(Dashboard)