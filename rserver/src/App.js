import React, { Component } from 'react';
import './App.css';
import Enter from './common/Enter';
import MainComponents from './common/MainComponents';

class App extends Component {
  constructor(){
    super();
    this.state ={ user : ''}
  }


  // componentDidMount(){
  //   this.setState({
  //     user: "amdsc"
  //   },()=>{
  //     console.log(this.state.user)
  //   })
  // }

  updateUser= (newuser)=>{
    this.setState({
      user: newuser
    }, ()=>{
          console.log(this.state.user)
        })
  }

  render() {
    return (
      <div className="App container-fluid">
        {this.state.user?<MainComponents user={this.state.user}/>:<Enter updateUser={this.updateUser}/>}
      </div>
    );
  }
}

export default App;
