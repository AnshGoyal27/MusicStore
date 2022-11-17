import './App.css';
import { Header } from './codes/wologin/search/header';
import { Playing } from './codes/wologin/playingnow/playing';
import { Playlist } from './codes/wologin/queue/queuelist';
import { Result } from './codes/wologin/searchresult/result';
import { Navbar } from './codes/wologin/navbar/nav';
import { PlayList } from './codes/playlists/playl';
import { useEffect } from 'react';
import { LoginVerify } from './codes/wologin/common/axios/login';
import { ActionCreator } from './codes/wologin/common/redux/action';
import { store } from './codes/wologin/common/redux/store';
import { createRoot } from 'react-dom/client';

export const All=(tokenverifiedornot)=>{

    function handleCredentialResponse(response){
      console.log(response)
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
          client_id: '639258561001-u8ov3aie1ma0pi5kv317obqfua7o33gl.apps.googleusercontent.com',
          callback: handleCredentialResponse
      });
      if(document.getElementById('custId').value){
        console.log('Signout');
        const googleid=createRoot(document.getElementById('google'))
        googleid.render(<div>
          <button className='btn btn-dark' onClick={()=>logout()}>LOGOUT</button>
        </div>,)
      }
      else{
        google.accounts.id.renderButton(
          document.getElementById('google'),
          {theme:'outline',size:'large'}
        );
        
      }
    },[]);
  
    return (
      <div>
        <input type="hidden" id="custId" name="custId" value={tokenverifiedornot}></input>
        <Navbar/>
        <div className='row'>
          <div className='col-lg-7 col-xs-12'>
              <Header id='Header' />
          </div>
          <div className='col-lg-5 col-xs-12'>
            <Playing id='PlayingNow' />
          </div>
        </div> &nbsp;
        <div className='row'>
        <div className='col-lg-7 col-xs-12'>
              <Result id='Results' />
          </div>
          <div className='col-lg-5 col-xs-12'>
            <Playlist id='PlayQueue' />
          </div>
        </div>
        <PlayList/>
      </div>
    );
  }