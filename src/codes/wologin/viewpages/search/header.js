import { TextField } from "@mui/material"
import { GetMusic } from "../../common/axios/axios";

export const Header=()=>{

    function Search(type){
        GetMusic(document.getElementById('SearchBox').value,type);
    }

    return(
        <div id='Header' align="center">
            <h1 className="display-1">Music Store</h1>
            <TextField id='SearchBox' label="Search Here" variant="filled" /> 
            <br/>
            <br/>
            <button onClick={()=>Search('Artist')} className='btn btn-dark'>Artist</button> &nbsp;
            <button onClick={()=>Search('Submit')} className='btn btn-dark'>Submit</button>
        </div>
    )
}