import { useEffect } from "react";
import { useSelector } from "react-redux"
import { PaymentPlan } from "../../../payment/paymentgw";
import { Subscribed } from "../../common/axios/subscribe";

export const Navbar=()=>{
    
    const verified=useSelector(state=>state.tokenverified);
    const subs= useSelector(state=>state.subscriptionvalid);
    const logid=useSelector(state=>state.loggedin.id)

    useEffect(()=>{
        
        if(verified==='true'){
            Subscribed(logid)
        }
    },[verified,logid])

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <span className="navbar-brand">Music Store</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#Header">Search</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#Results">Search Result</a>
                        </li>
                        <li className="nav-item">
                        <a className="nav-link active" href="#PlayingNow">Playing Now</a>
                        </li>
                        {/* <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                        </li> */}
                        <li className="nav-item">
                        <a className="nav-link active" href="#PlayQueue">Play Queue</a>
                        </li>
                        {verified==='true'?
                        <li className="nav-item">
                            <a className="nav-link active" href="#playlists">Playlists</a>
                        </li>:<></>}
                        {verified==='true'?
                        <li className="nav-item">
                            <a className="nav-link active" href="#preview">Preview</a>
                        </li>:<></>}
                        
                        <li className="nav-item" id="google">

                        </li>
                        {(subs==='false' && verified==='true')?
                        <li><button className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#subsBackdrop">Subscribe</button></li>:<></>}
                    </ul>
                    </div>
                </div>
            </nav>

            <div className="modal fade" id="subsBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="display-2">Subscription Plans</h2>
                        </div>
                        <div className="modal-body">
                            <PaymentPlan></PaymentPlan>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}