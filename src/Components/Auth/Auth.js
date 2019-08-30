import React, {Component} from 'react'
import './Auth.css'
import axios from 'axios'
import { setUser } from "../../ducks/reducer"
import { connect } from 'react-redux'


class Auth extends Component {
    state = {
      usernameInput: '',
      profileInput: '',
      passwordInput: ''
    }

handleChange(e, key) {
  this.setState({
    [key]: e.target.value
  })
}

componentDidMount = async ()=> {
  let res = await axios.get('/api/auth/me')
  console.log(res.data)
  this.props.setUser(res.data)
}


registerUser = () => {
  const {
    usernameInput: username,
    passwordInput: password,
    profileInput: profileimg
  } = this.state
  axios.post('/auth/register', { username, password, profileimg })
    .then(res => {
      this.props.setUser({username, profileimg})
      this.props.history.push('/dashboard')
    })
    .catch(err => {
      alert('username is already in use.')
    })
  }

  login = () => {
    const {usernameInput: username, passwordInput: password} = this.state
    axios.post('/auth/login', {username, password}).then(res => {
      const {username, profile_img, user_id} = res.data.user
      this.props.setUser({username, profile_img, user_id})
      this.props.history.push('/dashboard')
    })
    .catch(err => {
      alert('Incorrect username and or password')
    })
  }

  render() {
    
    return (
      <div className = "Auth">
          <div className= "auth_container">
            <img src="" alt=""/>
            <h3 className = " Helo">Helo</h3>
          <section className="auth_input-section">
            <input className= "auth_input" type="text" placeholder= "username" onChange={e => this.handleChange(e, 'usernameInput')} />
            <input className= "auth_input" type="text" placeholder= "profile Image" onChange={e => this.handleChange(e, 'profileInput')} />
            <input className= "auth_input" type="text" placeholder= "Password" onChange = {e=> this.handleChange(e, 'passwordInput')} />
          </section>
          <section className= " auth_button-section">
            <button className= "auth_button" onClick={this.login}>Login</button>
            <button className= "auth_button" onClick={this.registerUser} >Register</button>
          </section>
          </div>
      </div>
    )
  }
}


export default connect(
  null,
  { setUser }
)(Auth)
