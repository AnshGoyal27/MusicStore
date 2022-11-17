import axios from "axios";

export function Pay(price,type,discount,time,log){

    
        axios({
            method: 'post',
            mode: 'cors',
            credentials: 'include',
            headers: {
                "Access-Control-Allow-Origin": "https://musicstorebm.netlify.app",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": 'HEAD, GET, POST, PUT, DELETE, OPTIONS',
                "Access-Control-Allow-Headers" : 'Origin,Content-Type,Authorization',
                'Accept': "application/json",
                "Content-Type": "application/json;charset=UTF-8"
            },
            url: 'https://music-storeback.vercel.app/payment',
            data: {
                price:price,
                type:type,
                discount:discount,
                loggedin:log,
                time:time
            }
          })
          .then((ele)=>{
            // window.open(ele.data.url, '_blank');
            window.location=ele.data.url;
          })
          .catch((err)=>{
            console.log(err);
          });

    
}
