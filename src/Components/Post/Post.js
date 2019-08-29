import React, {Component} from 'react'
import './Post.css'
import axios from 'axios'
import { connect } from 'react-redux'

class Post extends Component {
  state = {
    title: '',
    img: '',
    content: '',
    author: '',
    author_id: '',
  }

componentDidMount(){
    this.setState({
      author: this.props.username,
      author_id: this.props.user_id
    })
}

  handleChange(key, e) {
    this.setState({
      [key]: e
    })
  }

  post = () => {
    if (this.state.author === "") {
      alert( "Please Loggin")
      return
    }
    const postinfo = this.state
    const {title, img, content, author, author_id} = postinfo
        axios.post('/api/posts', {title, img, content, author, author_id})
        .then(res => res.status(200).send("posted"))
        .catch(err => { alert(err)})
        this.props.history.push("/dashboard")
  }
  render() {
    return (
      <div>
            <div className="Post_body">
              <div className="Post_main">
                <input onChange={(e)=> this.handleChange("title", e.target.value)} value={this.state.title} type="text" placeholder="Post Title" className="Post_title"></input>
                <img className="Post_img" src="" alt=""/>
                <h3>Img Url</h3>
                <input onChange={(e)=> this.handleChange("img", e.target.value)} value={this.state.img} type="text" placeholder="Image Url"/>
                <div className="Post_content_box">
                <h3>Content</h3>
                <input onChange={(e)=> this.handleChange("content", e.target.value)} value={this.state.content} type= "text" placeholder="Content" className="Post_content"></input>
                </div>
                <button onClick={this.post}>Post</button>
              </div>
            </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const {username, user_id} = state
  return {username, user_id}
}

export default connect(mapStateToProps)(Post);

