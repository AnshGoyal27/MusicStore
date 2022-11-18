import { useEffect } from "react";
import { useSelector } from "react-redux"
import { ActionCreator } from "../../common/redux/action";
import { store } from "../../common/redux/store";


export const Queuelist=()=>{

    let data=useSelector(state=>state)
    let itemdatas=data.playqueue;
    let playlistarray=data.playlist;
    let addornot=data.ad;
    let verified=data.tokenverified;
    const TableC=process.env.REACT_APP_TABLEHEAD2.split(",");
    
    useEffect(()=>{
        if(verified==='true'){
            document.getElementById('savebutton').disabled=false;
        }
        else{
            document.getElementById('savebutton').disabled=true;
        }
    },[verified,itemdatas])

    function playsong(song,artistp,artist){
        if(addornot%4!==0){
            if(artist==='-'){
                window.alert('Cant Play');
            }
            else{
                const action=ActionCreator('play',{
                    ArtistP:artistp,
                    Artist:artist,
                    Song:song
                })
                store.dispatch(action);
            }
        }
    }

    function selected(name){
        document.getElementById('playname').value=name;
    }

    function removeq(URL){
        const action=ActionCreator('remove',URL);
        store.dispatch(action);
    }

    function saveplaylist(){
        if(document.getElementById('playname').value.length===0){
            window.alert("Playlist Needs a Name");
        }
        else{
            const action=ActionCreator('save',document.getElementById('playname').value);
            store.dispatch(action);
        }
        
    }

    function clear(){
        const action=ActionCreator('clear');
        store.dispatch(action);
    }
 
    return(
        <div id='PlayQueue'>
            <div>
                <h1 className="display-3" align="center">PLAY QUEUE</h1>
            </div>
            <div>
                <div style={{'height': '25em', 'width': '100%', 'overflow': 'scroll'}}>
                    <table className="table table-bordered table-hover table-light">
                        <thead className="table-dark" style={{'position':'sticky','top':'0px','zIndex':'100'}}>
                            <tr>
                                {TableC.map((ele,index)=><th key={index} scope="col">{ele}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {itemdatas.map((ele,index)=>{
                                if(ele.SongUrl===data.playingNow.Song){
                                    return(
                                        <tr key={ele.SongUrl+index} id={ele.SongUrl+index} onDoubleClick={()=>playsong(ele.SongUrl,ele.ArtistP,ele.Artist)}>
                                            <th scope="row" >{index+1}</th>
                                            <th>{ele.SongName}</th>
                                            <th>{ele.Artist}</th>
                                            <th style={{textAlign:'center'}}>
                                                <div className="btn-group">
                                                    <button className="btn btn-dark" onClick={()=>removeq(ele.SongUrl)}>-</button>
                                                    <button  onClick={()=>playsong(ele.SongURL,ele.ArtistP,ele.Artist)} className='btn btn-dark'><i class="fa-solid fa-play"></i></button>
                                                </div>
                                            </th>    
                                            <th>Playing</th>
                                        </tr>
                                    )
                                }
                                return(
                                    <tr key={ele.SongUrl+index} id={ele.SongUrl+index} onDoubleClick={()=>playsong(ele.SongUrl,ele.ArtistP,ele.Artist)}>
                                        <th scope="row" >{index+1}</th>
                                        <th>{ele.SongName}</th>
                                        <th>{ele.Artist}</th>
                                        <th style={{textAlign:'center'}}>
                                            <div className="btn-group">
                                                <button className="btn btn-dark" onClick={()=>removeq(ele.SongUrl)}>-</button> &nbsp;
                                                <button  onClick={()=>playsong(ele.SongURL,ele.ArtistP,ele.Artist)} className='btn btn-dark'><i class="fa-solid fa-play"></i></button>
                                            </div>
                                        </th>    
                                        <th></th>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div> &nbsp;
            <div>
                <button id='savebutton' className="btn btn-dark" style={{marginRight:'10px'}} data-bs-toggle="modal" data-bs-target="#staticBackdrop">SAVE</button>
                {itemdatas.length>0?<button className="btn btn-dark" onClick={()=>clear()}>Clear All</button>:false}
            </div>

            {/* Modal  */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Playlist</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="input-group mb-3">
                            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
                            <ul className="dropdown-menu">
                                {playlistarray.length!==0?playlistarray.map((ele,index)=>{
                                    console.log(ele.playlistname);
                                    return (
                                        <li key={ele.playlistname+index}><button className="dropdown-item" onClick={()=>selected(ele.playlistname)}>{ele.playlistname}</button></li>
                                    )
                                }):<></>}
                                {/* <li><button class="dropdown-item" >Action</button></li>
                                <li><button class="dropdown-item" >Action</button></li>
                                <li><button class="dropdown-item" >Action</button></li>
                                <li><button class="dropdown-item" >Action</button></li> */}
                            </ul>
                            <input id='playname' type="text" className="form-control" aria-label="Text input with dropdown button"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-dark" data-bs-dismiss="modal" onClick={()=>saveplaylist()}>Save</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
