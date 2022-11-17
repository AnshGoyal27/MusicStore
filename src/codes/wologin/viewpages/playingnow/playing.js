import ReactAudioPlayer from "react-audio-player";
import { useSelector } from "react-redux"
import { ActionCreator } from "../../common/redux/action";
import { store } from "../../common/redux/store";


export const Playing=()=>{

    const playingNows=useSelector(state=>state.playingNow);
    const playq=useSelector(state=>state.playqueue);
    function playnext(){
        if(playq.length===0){
            window.alert('No more songs');
        }
        else{
            let playn=false;
            playq.forEach((ele,index)=>{
                if(playn){
                    const action=ActionCreator('play',{
                        ArtistP:ele.ArtistP,
                        Artist:ele.Artist,
                        Song:ele.SongUrl
                    })
                    playn=false;
                    store.dispatch(action);
                    
                }
                else{
                    if(playingNows.Song===ele.SongUrl){
                        if(index===playq.length-1){
                            window.alert('No more songs');
                        }
                        else{
                            playn=true;
                        }
                        
                    }
                }
            })
        }
    }
    return(
        <div align="center">
            <h1 className="display-3">PLAYING</h1>
            <img src={playingNows.ArtistP} className="img-fluid" alt={playingNows.Artist} />
            <br/>
            <br/>
            <ReactAudioPlayer src={playingNows.Song} onEnded={()=>playnext()} autoPlay controls/>
        </div>
    )
} 