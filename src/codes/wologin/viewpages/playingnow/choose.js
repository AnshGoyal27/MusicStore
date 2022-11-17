import { useSelector } from "react-redux"
import { PlayAd } from "./add";
import { Playing } from "./playing";

export const ChoosePlay=()=>{
    const addchoice=useSelector(state=>state.ad);
    return(
        <div id='PlayingNow'>
            {addchoice%4===0?<PlayAd/>:<Playing/>}
        </div>
    )
}