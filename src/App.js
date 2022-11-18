import './App.css';
import { Header } from './codes/wologin/viewpages/search/header';
// import { Playing } from './codes/wologin/playingnow/playing';
import { Queuelist } from './codes/wologin/viewpages/queue/queuelist';
import { Result } from './codes/wologin/viewpages/searchresult/result';
import { Navbar } from './codes/wologin/viewpages/navbar/nav';
import { PlayList } from './codes/playlists/playl';
import { useEffect} from 'react';
import { LoginVerify } from './codes/wologin/common/axios/login';
import { ActionCreator } from './codes/wologin/common/redux/action';
import { store } from './codes/wologin/common/redux/store';
import { createRoot } from 'react-dom/client';
import { useSelector } from 'react-redux';
import { ChoosePlay } from './codes/wologin/viewpages/playingnow/choose';
import { PreviewPlaylist } from './codes/playlists/previewplaylist';


function App() {

  const state=useSelector(state=>state);
  const verified=state.tokenverified;
  
  function handleCredentialResponse(response){
    LoginVerify(response.credential);
  } 
  
  function logout(){
    window.google.accounts.id.disableAutoSelect();
    const action=ActionCreator('logout');
    store.dispatch(action);
  }
  
 
  useEffect(()=>{
    const google=window.google;
    google.accounts.id.initialize({
        client_id: process.env.REACT_APP_CLIENTID,
        callback: handleCredentialResponse
    });
    if(document.getElementById('custId').value==='true'){
        const googleid=createRoot(document.getElementById('google')) 
        if(state.subscriptionvalid==='false'){
          googleid.render(<div>
            <button 
            className='btn btn-dark' 
            onClick={()=>logout()}>
              <img src={state.loggedin.picurl} alt="loggedinuser" width="32" height="32" className="rounded-circle" referrerPolicy="no-referrer"/> 
              &nbsp;{state.loggedin.name}
            </button>
          </div>)
        }   
        else{
          googleid.render(<div>
            <button 
            className='btn btn-warning' 
            onClick={()=>logout()}>
              <img src={state.loggedin.picurl} alt="loggedinuser" width="32" height="32" className="rounded-circle" referrerPolicy="no-referrer"/>
              &nbsp;{state.loggedin.name}
            </button>
          </div>)
        }
        
      
    }
    else{
      async function renderbutton(){
        await google.accounts.id.renderButton(
          document.getElementById('google'),
          {theme:'outline',size:'large'}
        );
      }
      renderbutton()
    }
  },[verified,state.loggedin,state.subscriptionvalid]);

  return (
    <div>
      <input type="hidden" id="custId" name="custId" value={verified}></input>
      <div style={{'position':'sticky','top':'0px','zIndex':'100'}}>
        <Navbar/>
      </div> &nbsp;
      <div className='row'>
        <div className='col-lg-7 col-xs-12'>
            <Header  />
        </div> 
        <div className='col-lg-5 col-xs-12'>
          <ChoosePlay  />
          {/* <Playing id='PlayingNow' /> */}
        </div>
      </div> 
      <div className='row'>
        <div className='col-lg-7 col-xs-12'>
            <Result  />
        </div> 
        <div className='col-lg-5 col-xs-12'>
          <Queuelist  />
        </div>
      </div> 
      {verified==='true'?<div className='row'>
                          <div className='col-lg-7 col-xs-12'>
                            <PlayList />
                          </div>
                          <div className='col-lg-5 col-xs-12'>
                            <PreviewPlaylist />
                          </div>
                        </div>:<></>}
    </div>
  );
}

export default App;
