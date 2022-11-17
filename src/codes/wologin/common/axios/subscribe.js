import axios from "axios";
import { ActionCreator } from "../redux/action";
import { store } from "../redux/store";

export function Subscribed(user){

        axios({
            method: 'post',
            url: 'https://music-storeback.vercel.app/issubscribed',
            data: {
                userid : user, 
            }
          })
          .then((ele)=>{
            if(ele.data.sub==='Subscribed'){
                const action=ActionCreator('subbed','true');
                store.dispatch(action);
            }
            else{
                const action=ActionCreator('subbed','false');
                store.dispatch(action);
            }
          })
          .catch((err)=>{
            console.log(err);
          });
}