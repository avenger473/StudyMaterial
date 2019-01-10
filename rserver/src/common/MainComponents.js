import React from 'react';
import Resource from './Resourse';
import Navbar from './Navbar';


class MainComponents extends React.Component{

    constructor(){
        super();
        this.state={
            user: ''
        }
    }

    componentDidMount(){
        this.setState({
            user: this.state.user
        })
    }
    render(){
        return(
            <>
                <Navbar user={this.props.user}  />
                
                <div className="row">
                    <Resource />                        
                </div>
            </>
        )
    }
}

export default MainComponents;