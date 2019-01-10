import React from 'react'
import axios from 'axios'

class Login extends React.Component{
    constructor(){
        super();
        this.state={
            username: '',
            password: '' 
        }
    }

    onLogin=(e)=>{
        e.preventDefault();

        axios.post('http://localhost:8000/user/login', 
            {   username: this.state.username, 
                password: this.state.password
            })
        .then((data) => {

            console.log(data);
            this.props.setUser(data.data);
        })
        .catch((err) => console.log('kuch galat hua'))
    }

    onUserNameChange= (event)=>{
        this.setState({
            username: event.target.value
        })
    }
    
    onPassworfChange= (event)=>{
        this.setState({
            password: event.target.value
        })
    }

    render(){
        return(
            <>
                <form onSubmit={this.onLogin}>
                    <div className="form-group">
                        <label htmlFor="username1">User Name</label>
                        <input type="text" className="form-control" id="username1" onChange={(e) => this.setState({username:e.target.value})} value={this.state.username} name="username" placeholder="Enter Username" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password1">Password</label>
                        <input type="password" className="form-control" id="password1" onChange={(e) => this.setState({password:e.target.value})} value={this.state.password} name="password" placeholder="Password" required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form></>
        )
    }
}

export default Login;