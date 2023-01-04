import { style } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete';
import React from "react";
function PaymentDetail(props){
    return <div className="note">
        <p><em><strong style={{fontSize:20}}>{props.name}</strong></em>   paid    <strong style={{color:"green",fontSize:30}}>₹{props.amount}</strong></p>
        <button onClick={()=>{
            props.onDelete(props.id);
            props.onReset();
            }}>
            <DeleteIcon/>
        </button>
    </div>
}
export default PaymentDetail;