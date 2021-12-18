import React,{useState,useEffect} from 'react'
import "./Mainbody.css"
import Card from "./Card" 
import axios from "axios";
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

function Mainbody() {
    const [files,setFiles]=useState([]);
  
    useEffect(() => {
        async function filenames(){
            
            var request = await axios.get("http://localhost:9000/get_all_files")
            let files = request.data;

            if(files){
                setFiles(files)
            }
        }
        filenames()
        
    },[])

    
    return (
        <div className="mainbody">
            <div className="main_top">
              <div className="main_top_left" style={{fontSize:"16px",fontWeight:"500"}}>Recent forms</div>
             

            </div>
            <div className="main_docs">
                 {
                    files.map((ele)=>{
                        const {FileName,FileURL,createdAt} = JSON.parse(ele);
                       return <Card name={FileName} url={FileURL} createdAt={createdAt} />
                        
                    })            
                 }
                 <Card />  
                 
            </div>
            <Link to="/">
                 <Button variant="contained" color="primary" style={{ fontSize: "14px" }}>Back</Button>
             </Link> 
        </div>
    )
}

export default Mainbody