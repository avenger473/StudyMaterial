import React from 'react';

const Navbar=(props)=>{
  return(
    <div>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">Resource-Bhandaar</a>
        <span className="navbar-text">Welcome {props.user}</span>
      </nav>
    </div>
  )
}

export default Navbar