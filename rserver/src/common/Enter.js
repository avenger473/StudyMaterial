import React from 'react';
// import './Enter.css';
import Login from './Login';
import Register from './Register';

class Enter extends React.Component{

    constructor(){
        super();
        this.state={
            
        }
    }

    // componentDidMount(){
    //     this.setUser();
    // }

    setUser=(newuser)=>{
        console.log(this.props);
        this.props.updateUser(newuser);
    }

    render()
    {   
        
        return(
                <div className="row">
                <div className="col-md-6 offset-md-3">
                  <nav >
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <a className="nav-item nav-link active col-sm-6" id="nav-login-tab" data-toggle="tab" href="#nav-login" role="tab" aria-controls="nav-login" aria-selected="true">Login</a>
                      <a className="nav-item nav-link col-sm-6" id="nav-signup-tab" data-toggle="tab" href="#nav-signup" role="tab" aria-controls="nav-signup" aria-selected="false">Sign Up</a>
                    </div>
                  </nav>
                  <div className="tab-content jumbotron" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-login" role="tabpanel" aria-labelledby="nav-login-tab">
                        <Login setUser= {this.setUser}/>
                        {/*  */}
                    </div>
                    <div className="tab-pane fade" id="nav-signup" role="tabpanel" aria-labelledby="nav-signup-tab">
                        <Register />
                        
                    </div>
                  </div>
                </div>
                </div>
              
        )
    }
}

export default Enter;