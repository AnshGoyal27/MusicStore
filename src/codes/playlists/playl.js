import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LoadData } from "../wologin/common/axios/load";
import { ActionCreator } from "../wologin/common/redux/action"
import { store } from "../wologin/common/redux/store";

export const PlayList=()=>{

    const Store=useSelector(state=>state);

    useEffect(()=>{
        if(Store.tokenverified==='true'){
            LoadData(Store.loggedin.id)
        }
    },[Store.tokenverified,Store.loggedin.id])

    function playit(ele){
        const action=ActionCreator('preview',ele);
        store.dispatch(action);
    }
    
    const PL=Store.playlist;
    
    return(
        <div id='playlists'>
            <h1 className="display-1">Playlists</h1>
            {PL.map((ele,index)=>{
            return(<button key={ele.playlistname+index} className="btn btn-dark" style={{marginRight:'10px'}} onClick={()=>{playit(ele)}}>{ele.playlistname}</button>);
            })}
            
        </div>
    )
}