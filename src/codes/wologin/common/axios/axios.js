import axios from "axios";
import { ActionCreator } from "../redux/action";
import { store } from "../redux/store";

export async function GetMusic(SearchValue,type){
    let arr=SearchValue.split(" ")
    let str="";
    arr.forEach((ele,index)=>{
        if(index===(arr.length)-1){
            str+=ele;
        }
        else{
            str+=(ele+"+");
        }
    })
    let URL=process.env.REACT_APP_URL+str
    if(type==='Artist'){
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
        let ArtURL=URL+'&entity=allArtist&attribute=allArtistTerm'
        const promise = axios.get(ArtURL);
        await promise.then(ele=>{
            if(ele.data.resultCount!==0){
                URL='https://itunes.apple.com/lookup?amgArtistId='+ele.data.results[0].amgArtistId+'&entity=song&limit=20&sort=recent'
            }
        })
    }
    const promise=axios.get(URL);
    promise.then(ele=>{
        let arr=[]
        if(ele.data.resultCount===0){
            arr=[{
                Track_Name:'-',
                Artist_Name:'-',
                Release_Date:'-',
                SongURL:'-',
                Artist_Pic:'-'
            }]
        }
        else{
            ele.data.results.forEach((elem,index)=>{
                if(type==='Artist' && index===0){

                }
                else{
                    arr.push({
                        Track_Name:elem.trackName,
                        Artist_Name:elem.artistName,
                        Release_Date:elem.releaseDate,
                        SongURL:elem.previewUrl,
                        Artist_Pic:elem.artworkUrl100
                    })
                } 
            });
        }
        const action=ActionCreator('data',arr);
        store.dispatch(action)
    })
    .catch(err=>console.log(err));
    // const promise=axios.get(URL);
    // promise
    // .then(result=>console.log(result))
    // .catch(err=>console.log(err));
}