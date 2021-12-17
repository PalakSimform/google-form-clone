import React from 'react'
import "./Card.css"
import StorageIcon from '@material-ui/icons/Storage';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import doc_image from "../../image/t-shirt.png"


function Card({name,url,createdAt}) {
    return (
        <div className="doc_card" onClick={()=>name}>
             <img src={doc_image} className="doc_card_image"></img>
             <div className="doc_card_content">
                <h5 style={{overFlow:"ellipsis"}}>{name ? name : " Untitled Doc" }</h5>
                <h5 style={{overFlow:"ellipsis"}}>{url ? url : " Url not found" }</h5>
                <div className="doc_content">
                    <div className="content_left" style={{fontSize:"12px",color:"grey"}}>
                    <StorageIcon style={{color:"white",fontSize:"12px",backgroundColor:"#6E2594",padding:"3px",marginRight:"3px",borderRadius:"2px"}}/>   Opened {createdAt}
                    </div>
                    
                     <MoreVertIcon style={{color:"grey",fontSize:"16px"}} />
                </div>
             </div>
        </div>
    )
}

export default Card