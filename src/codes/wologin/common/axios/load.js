import axios from "axios";
import { ActionCreator } from "../redux/action";
import { store } from "../redux/store";

export function LoadData(userid){
    axios({
        method: 'post',
        url: 'https://music-storeback.vercel.app/load',
        data: {
            userid : userid
        }
      })
      .then((ele)=>{
        const action=ActionCreator('loaded',ele.data.playlists);
        store.dispatch(action);
      })
}