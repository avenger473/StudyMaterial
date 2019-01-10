import React from 'react'
import axios from 'axios'

class Register extends React.Component{
    constructor(){
        super();
        this.state={
            coder: false,
            fullname: '',
            username: '',
            password: '',
            mobile: '',
            email: '',
            spojhandle: '',
            githandle: '',
            hehandle: '',
            cfhandle:''
            
        }
    }

    onRegister=(e)=>{

        axios.post('http://localhost:8000/user/signup', 
            {   username: this.state.username, 
                password: this.state.password,
                coder: this.state.coder,
                fullname: this.state.fullname,
                mobile: this.state.mobile,
                email: this.state.email,
                spojhandle: this.state.spojhandle,
                githandle: this.state.githandle,
                hehandle: this.state.hehandle,
                cfhandle: this.state.cfhandle
            })
        .catch((err) => console.log('kuch galat hua'))
    }

    onSwitch=()=>
    {   
        if(this.state.coder)
        this.setState({
            coder: false
        }, ()=>{
            console.log(this.state.coder);
        })
        else{
            this.setState({
                coder: true
            }, ()=>{
                console.log(this.state.coder);
            })
        }        
    }

    render(){

        const coder= (<div  className="form-row" id="coder" >
        <div className="form-group col-md-6">
            <label htmlFor="name">Spoj Handle</label>
            <input type="text" className="form-control" id="spoj" name="spojhandle" value={this.state.spojhandle} onChange={(e) => this.setState({spojhandle:e.target.value})} placeholder="Enter Handle" required/>
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="name">CodeForces Handle</label>
            <input type="text" className="form-control" id="cf" name="cfhandle" value={this.state.cfhandle} onChange={(e) => this.setState({cfhandle:e.target.value})} placeholder="Enter Handle" required/>
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="name">HackerEarth Handle</label>
            <input type="text" className="form-control" id="he" name="hehandle" value={this.state.hehandle} onChange={(e) => this.setState({hehandle:e.target.value})} placeholder="Enter Handle" required/>
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="name">Github Handle</label>
            <input type="text" className="form-control" id="git" name="githandle" value={this.state.githandle} onChange={(e) => this.setState({githandle:e.target.value})} placeholder="Enter Handle" required/>
        </div>
        </div>);
            
        
        return(
            <>
                <form onSubmit={this.onRegister}>
                    <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" className="form-control" id="fullname" name="fullname" value={this.state.fullname} onChange={(e) => this.setState({fullname:e.target.value})} placeholder="Enter name" required/>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">User Name</label>
                        <input type="text" className="form-control" id="username2" name="username" value={this.state.username} onChange={(e) => this.setState({username:e.target.value})} placeholder="Enter Username" required/>
                    </div>
                    <div className="form-group col-md-12">
                        <label htmlFor="inputEmail4">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" name="email" value={this.state.email} onChange={(e) => this.setState({email:e.target.value})} placeholder="Email" required/>
                    </div>
                    
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Password</label>
                        <input type="password" className="form-control" id="inputPassword4" name="password" value={this.state.password} onChange={(e) => this.setState({password:e.target.value})} placeholder="Password" required/>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputMobile4">Mobile</label>
                        <input type="number" className="form-control" id="inputMobile4" name="mobile" value={this.state.mobile} onChange={(e) => this.setState({mobile:e.target.value})} placeholder="Mobile" required/>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" defaultValue id="coderswitch" onClick={this.onSwitch} />
                        <label className="form-check-label" htmlFor="coderswitch">I am a Coder!!!</label>
                    </div>

                        {this.state.coder?coder:''}
                    </div>
                    <button type="submit" className="btn btn-primary ">Register</button>
                </form>
            </>
        )
    }




}

export default Register;