import axios from "axios";
import { LoadData } from "./load";

export function DeleteData(user,playlists){

        axios({
            method: 'post',
            url: 'http://localhost:1234/delete',
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