import axios from "axios";
import { ActionCreator } from "../redux/action";
import { store } from "../redux/store";

export function LoginVerify(credential){
    axios({
        method: 'post',
        url: 'http://localhost:1234/loginverified',
        data: {credential:credential}
      })
      .then(ele=>{
        if(ele.data.token){
            
            const action=ActionCreator('verify',ele.data.data);
            store.dispatch(action);
        }
    })
      .catch(err=>console.log(err));
}


