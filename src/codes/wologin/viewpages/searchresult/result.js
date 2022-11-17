import { useSelector } from "react-redux"
import { ActionCreator } from "../../common/redux/action";
import { store } from "../../common/redux/store";


export const Result=()=>{

    const itemdata=useSelector(state=>state.resultdata);
    const playlist=useSelector(state=>state.playlist);
    const addornot=useSelector(state=>state.ad);
    const TableC=process.env.REACT_APP_TABLEHEAD.split(",");

    function playsong(song,artistp,artist){
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

    function addqueue(song,track,artist,pic){
        if(addornot%4!==0){
            if(artist==='-'){
                window.alert('Cant Add');
            }
            else{
                console.log('tuttututtuttu',playlist);
                const action=ActionCreator('addq',{
                    Artist:artist,
                    SongName:track,
                    SongUrl:song,
                    ArtistP:pic
                })
                store.dispatch(action);
            }
        }
        
    }

    return(
        <div id='Results'>
            <div>
                <h1 className="display-3" align="center">RESULT</h1>
            </div>
            <div style={{'height': '30em', 'width': '100%', 'overflow': 'scroll'}}>
            <table className="table table-bordered table-hover table-light" >
                <thead className="table-dark" style={{'position':'sticky','top':'0px'}}>
                    <tr>
                        {TableC.map((ele,index)=><th style={{'position':'sticky'}} key={index} scope="col">{ele}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {itemdata.map((ele,index)=>{
                        return(
                            <tr key={index} id={ele.SongURL} onDoubleClick={()=>playsong(ele.SongURL,ele.Artist_Pic,ele.Artist_Name)}>
                                <th scope="row" >{index+1}</th>
                                <td>{ele.Track_Name}</td>
                                <td>{ele.Artist_Name}</td>
                                <td>{ele.Release_Date}</td>
                                <td style={{textAlign:'center'}}><button  onClick={()=>addqueue(ele.SongURL,ele.Track_Name,ele.Artist_Name,ele.Artist_Pic)} className='btn btn-dark'>+</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </div>
    )
}