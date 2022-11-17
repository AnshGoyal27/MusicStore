import axios from "axios";
import { LoadData } from "./load";

export function SaveData(user,playlist,playname,verified){

    if(verified==='true'){
        axios({
            method: 'post',
            url: 'https://music-storeback.vercel.app/save',
            data: {
                userid : user, 
                playlistname: playname, 
                playlist : playlist,
            }
          })
          .then((ele)=>{
            LoadData(user);
          })
          .catch((err)=>{
            console.log(err);
          });
    }
    
}