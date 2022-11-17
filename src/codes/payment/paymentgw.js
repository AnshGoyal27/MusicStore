import { useSelector } from "react-redux";
import { Pay } from "../wologin/common/axios/payment"

export const PaymentPlan=()=>{
    const log=useSelector(state=>state.loggedin);

    function pay(subs,price,discount,time){
        Pay(price,subs,discount,time,log);
    }

    return(
        <div className="row text-center">
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Month</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">$3<small className="text-muted fw-light">/mo</small></h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>No advertisements</li>
                <li>5% Discount</li>
              </ul>
              <button type="button" className="w-100 btn btn-lg btn-outline-primary" onClick={()=>pay('payment',3,5,'month')}>Select</button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Year</h4>
            </div>
            <div className="card-body">
              <h1 className="card-title pricing-card-title">$27<small className="text-muted fw-light">/yr</small></h1>
              <ul className="list-unstyled mt-3 mb-4">
                <li>No advertisements</li>
                <li>10% Discount</li>
              </ul>
              <button type="button" className="w-100 btn btn-lg btn-outline-primary" onClick={()=>pay('payment',27,10,'year')}>Select</button>
            </div>
          </div>
        </div>
      </div>
    )
}