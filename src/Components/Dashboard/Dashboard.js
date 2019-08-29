import React, {Component} from 'react'
import './Dashboard.css'
import axios from "axios"
import { search} from "../../ducks/reducer"
import { connect } from 'react-redux'

class Dashboard extends Component {
  state = {
    posts: [],
    userposts: [],
    search: '',
    view_userposts: false
  }

  componentDidMount = async () => {
    const res = await axios.get(`/api/posts`)
   const posts = res.data
   console.log(posts)
  this.setState({
    posts,
  })
  }

  componentDidUpdate(prevProps, prevState){
   const prevView_userposts = prevState.view_userposts
   if (prevView_userposts === this.state.view_userposts){
     return
   }
    const{posts, view_userposts} = this.state
    console.log(view_userposts, this.props.user_id)
    if (view_userposts === true) {
   let otherPosts =  posts.filter(el => {
    return  el.author_id !== this.props.user_id}
      )
    console.log(otherPosts)
      this.setState({
        posts: otherPosts
      })
    }
  }


  handleChange(e) {
    this.setState({
      search: e
    })
  }

  searchPosts(searchterm) {
    this.props.search(searchterm)
  }

  render() {
    let {posts, view_userposts} = this.state
    return (
      <div>
            <div>Dashboard</div>
            <input type="text" onChange={(e)=> {this.handleChange(e.target.value)}}/>
            <button onClick={()=> this.searchPosts(this.state.search)}>Search</button>
            <input onChange={()=> {this.setState({view_userposts: !view_userposts})}} type="checkbox" checked={view_userposts}/>
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
 

export default connect(mapStateToProps, {search})(Dashboard)