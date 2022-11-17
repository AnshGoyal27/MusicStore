import { useSelector } from "react-redux";
import { ActionCreator } from "../wologin/common/redux/action";
import { store } from "../wologin/common/redux/store";

export const PreviewPlaylist=()=>{
    const TableC=process.env.REACT_APP_TABLEHEAD3.split(",");
    function play(){
        const action=ActionCreator('playthelist');
        store.dispatch(action);
    }

    function Deleted(name){
        const action=ActionCreator('deleteplaylist',name);
        store.dispatch(action);
    }

    const itemdata=useSelector(state=>state.previewplaylist)
    const name=useSelector(state=>state.previewplaylistname)
    return(
        <div id='previews'>
            <div >
                <h1 className="display-1">Opened</h1>
            </div>
            <div style={{'height': '30em', 'width': '100%', 'overflow': 'scroll'}}>
                <table className="table table-bordered table-hover table-light">
                    <thead className="table-dark" style={{'position':'sticky','top':'0px'}}>
                        <tr>
                            {TableC.map((ele,index)=><th key={index} scope="col">{ele}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {itemdata.map((ele,index)=>{
                            return(
                                <tr key={index} id={ele.SongURL}>
                                    <th scope="row" >{index+1}</th>
                                    <td>{ele.SongName}</td>
                                    <td>{ele.Artist}</td>
                                    <td><img src={ele.ArtistP} alt='Artist Pic'></img></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>     
            </div> &nbsp;
            <div>
                {itemdata.length!==0?<button className="btn btn-dark" onClick={()=>play()}>Play</button>:<></>} &nbsp;
                {itemdata.length!==0?<button className="btn btn-dark" onClick={()=>Deleted(name)}>Delete</button>:<></>}
            </div>
        </div>
    )
}