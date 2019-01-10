import React from 'react'
import axios from 'axios';

class Upload extends React.Component{
    constructor(){
        super();
        this.state= {
            branch: '',
            sem: '',
            subject: '',
            material: '',
            file: null
        }
    }

    onFormSubmit= (e)=>{
        e.preventDefault() // Stop form submit
        e.persist();
        console.log(this.state.file);

            const data = new FormData()
            data.append('file', this.state.file)
            data.append('branch', this.state.branch)
            data.append('sem', this.state.sem)
            data.append('subject', this.state.subject)
            data.append('material', this.state.material)
            axios.post('http://localhost:8000/resource/upload', data).then((response) => {
                console.log('hogsyasave');
                alert('File Uploaded');

                e.target.reset();
                this.setState({
                    branch: '',
                    sem: '',
                    subject: '',
                    material: '',
                    file: null
                })
            })

      }

    render(){

        return(
            <>
                <form onSubmit={this.onFormSubmit} >
     
                 <div className="form-group col-md-12">  
                    <label htmlFor="branch">Choose Branch:</label>
                    <select id="branch" name="branch" className="form-control" required onChange={(e) => this.setState({branch:e.target.value})} value={this.state.branch}>
                    <option value >Choose</option>
                    <option value="BE">Biotechnology</option>
                    <option value="ChE">Chemical Engineering</option>
                    <option value="ChEPP">Chemical Engineering (Plastic &amp; Polymer)</option>
                    <option value="CE">Civil Engineering</option>
                    <option value="CSE">Computer Science &amp; Engineering</option>
                    <option value="EEE">Electrical &amp; Electronics Engineering</option>
                    <option value="ECE">Electronics &amp; Communication Engineering</option>
                    <option value="IT">Information Technology</option>
                    <option value="ME">Mechanical Engineering</option>
                    <option value="PE">Production Engineering</option>
                    </select>
                </div>
                <div className="form-group col-md-12">  
                    <label htmlFor="sem">Choose Semester:</label>
                    <select id="sem" name="sem" className="form-control" required onChange={(e) => this.setState({sem:e.target.value})} value={this.state.sem}>
                    <option value>Choose</option>
                    <option value="sem1">Semester 1</option>
                    <option value="sem2">Semester 2</option>
                    <option value="sem3">Semester 3</option>
                    <option value="sem4">Semester 4</option>
                    <option value="sem5">Semester 5</option>
                    <option value="sem6">Semester 6</option>
                    <option value="sem7">Semester 7</option>
                    <option value="sem8">Semester 8</option>
                    </select>
                </div>
                <div className="form-group col-md-12">  
                    <label htmlFor="subject">Choose Subject:</label>
                    <select id="subject" name="subject" className="form-control" required onChange={(e) => this.setState({subject:e.target.value})} value={this.state.subject}>
                    <option value>Choose</option>
                    <option value="dca">DCA</option>
                    <option value="ob">OB</option>
                    <option value="psc">PSC</option>
                    <option value="dc">DC</option>
                    <option value="sep">SEP</option>      
                    </select>
                </div>
                <div className="form-group col-md-12">  
                    <label htmlFor="material">Choose Material Type:</label>
                    <select id="material" name="material" className="form-control" required onChange={(e) => this.setState({material:e.target.value})} value={this.state.material}>
                    <option value>Choose</option>
                    <option value="BOOKS">Book</option>
                    <option value="NOTES">Notes</option>
                    <option value="QP">Question Paper</option>
                    <option value="MISC">Misc</option>
                    </select>
                </div>

                <div className="form-group col-md-12">
                    <input type="file" className="form-control" name="sampleFile" required  onChange={(e) => this.setState({file:e.target.files[0]})}/>
                </div>
                    <center><button type="submit" className="btn btn-primary">Upload</button></center>
                </form>
            </>
        )
    }
}

export default Upload;