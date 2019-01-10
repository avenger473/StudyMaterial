import React from 'react';
import Upload from './Upload';
import Download from './Download';

class Resourse extends React.Component{

    constructor(){
        super();
        this.state={

        }
    }

    render()
    {   
        
        return(
                             
                
                <>
                <div className="col-md-8 offset-md-2">
                  <nav >
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <a className="nav-item nav-link active col-sm-6" id="nav-login-tab" data-toggle="tab" href="#nav-login" role="tab" aria-controls="nav-login" aria-selected="true">Download</a>
                      <a className="nav-item nav-link col-sm-6" id="nav-signup-tab" data-toggle="tab" href="#nav-signup" role="tab" aria-controls="nav-signup" aria-selected="false">Upload</a>
                    </div>
                  </nav>
                  <div className="tab-content jumbotron" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-login" role="tabpanel" aria-labelledby="nav-login-tab">
                        <Download />
                        {/*  */}
                    </div>
                    <div className="tab-pane fade" id="nav-signup" role="tabpanel" aria-labelledby="nav-signup-tab">
                        <Upload />   
                        
                    </div>
                  </div>
                </div>
                </>
        )
    }
}

export default Resourse;