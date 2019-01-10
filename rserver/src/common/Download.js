import React from 'react'
import axios from 'axios'


class Download extends React.Component{
    constructor(){
        super();
        this.state= {
            branch: '',
            sem: '',
            subject: '',
            material: '',
            fileList: ''
        }
    }

    onSearchHandle = (e)=>{
        e.preventDefault();
        console.log(this.state.branch)
       

        axios.get('http://localhost:8000/resource/get-files', 
            {params: {   branch: this.state.branch,
                sem: this.state.sem,
                subject: this.state.subject,
                material: this.state.material
            }})
        .then((data) => {

            console.log(data);
            this.setState({
                fileList: data.data
            }, ()=>{
                console.log(this.state.fileList)
            })
            
        })
        .catch((err) => console.log('kuch galat hua'))
    }

    
    onClickHandle= (id, name)=>{

        axios({
            url: 'http://localhost:8000/resource/download/'+id,
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', name); //or any other extension
             document.body.appendChild(link);
             link.click();
          });
        
    }

    render(){
        const searchResults= this.state.fileList.length?(this.state.fileList.map( item => {
            return (
                <li className="list-group-item" key={item.id} onClick={()=>{this.onClickHandle(item.id, item.name)}}>{item.name}</li>
            )
        })):(
            <li className="list-group-item" >NO FILE FOUND</li>
        )

        return(
            <>
                <form onSubmit={this.onSearchHandle}>
                    
            {/* this will be fetched in future */}
     
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
                    <center><button type="submit" className="btn btn-primary">Search</button></center>
                </form>

                <ul className="list-group">
                        {searchResults} 
                </ul>

                    


            </>
        )
    }
}

export default Download;