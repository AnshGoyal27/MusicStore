import { DeleteData } from "../axios/delete";
import { SaveData } from "../axios/save";

export const reducerfn=(state={
    resultdata:[],
    playingNow:{
        ArtistP:'',
        Artist:'',
        Song:'',
    },
    ad:1,
    playqueue:[],
    playlist:[],
    tokenverified:'false',
    loggedin:{email:'',picurl:'',id:'',name:''},
    previewplaylist:[],
    subscriptionvalid:'false',
    previewplaylistname:''
},action)=>{
    if(action.type==='data'){
        let arr=[];
        action.payload.forEach(ele=>arr.push(ele));
        return {...state,resultdata:arr};
    }
    else if(action.type==='deleteplaylist'){
        let arr=[];
        state.playlist.forEach((ele)=>{
            if(ele.playlistname!==action.payload){
                arr.push(ele);
            }
        })
        DeleteData(state.loggedin.id,arr);
        return{...state}
    }
    else if(action.type==='subbed'){
        return{...state,subscriptionvalid:action.payload}
    }
    else if(action.type==='play'){
        let addd=state.ad;
        if(state.subscriptionvalid==='false'){
            addd=state.ad+1;
        }
        return{...state,playingNow:action.payload,ad:addd}
    }
    else if(action.type==='skipad'){
        return{...state,ad:state.ad+1}
    }
    else if(action.type==='addq'){
        let arr=state.playqueue;
        arr.push(action.payload)
        return{...state,playlist:state.playlist,playqueue:arr}
    }
    else if(action.type==='remove'){
        let arr=[]
        state.playqueue.forEach((ele)=>{
            if(ele.SongUrl!==action.payload){
                arr.push(ele);
            }
        })
        return {...state,playqueue:arr}
    }
    else if(action.type==='preview'){
        let arr=[];
        const name=action.payload.playlistname;
        action.payload.playlist.forEach((ele)=>{
            arr.push(ele);
        })
        return {...state,previewplaylist:arr,previewplaylistname:name}
    }
    else if(action.type==='playthelist'){
        let arr=[];
        state.previewplaylist.forEach((ele)=>{
            arr.push(ele);
        })
        return {...state,playqueue:arr}
    }
    else if(action.type==='save'){
        console.log("Hereeeeeeeeee");

        let arr=state.playlist
        let arr2=[];
        state.playqueue.forEach((ele)=>arr2.push(ele));
        arr.push({
            playlistname:action.payload,
            playlist:arr2
        });
        SaveData(state.loggedin.id,arr2,action.payload,state.tokenverified)
        return{...state}
    }
    else if(action.type==='verify'){
        const obj={
            email:action.payload.Email,
            picurl:action.payload.ImageURL,
            id:action.payload.ID,
            name:action.payload.FullName
        }
        return {...state,tokenverified:'true',loggedin:obj}
    }
    else if(action.type==='logout'){
        const obj={email:'',picurl:'',id:'',name:''}
        return {...state,tokenverified:'false',loggedin:obj,playqueue:[],playlist:[]}
    }
    else if(action.type==='loaded'){
        let arr=[];
        action.payload.forEach((ele)=>{
            arr.push(ele);
        })
        return {...state,playlist:arr}
    }
    else if(action.type==='clear'){
        return {...state,playqueue:[]}
    }
    return state;
}