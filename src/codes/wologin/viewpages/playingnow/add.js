import { createRoot } from 'react-dom/client';
import { ActionCreator } from '../../common/redux/action';
import { store } from '../../common/redux/store';


export const PlayAd=()=>{
    function callAd(){
        setTimeout(()=>{
            const addid=createRoot(document.getElementById('addid'))
            addid.render(<button className="btn btn-dark" onClick={()=>skipad()}>SKIP</button>)
        },2000)
    }

    function skipad(){
        const action=ActionCreator('skipad');
        store.dispatch(action);
    }

    return(
        <div align='center'>
            <div>
                <img alt='ad' src='https://media.tenor.com/R0YRjCreZnYAAAAM/100.gif' onClick={callAd()}></img> 
            </div>
            <div id='addid'>

            </div>
        </div>
    )
}