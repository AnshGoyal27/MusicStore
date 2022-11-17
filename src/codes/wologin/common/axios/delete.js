import axios from "axios";
import { LoadData } from "./load";

export function DeleteData(user,playlists){

        axios({
            method: 'post',
            url: 'https://music-storeback.vercel.app/delete',
            data: {
                userid : user, 
                playlist: playlists
            }
          })
          .then((ele)=>{
            LoadData(user);
          })
          .catch((err)=>{
            console.log(err);
          });
    
}