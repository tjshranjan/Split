import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
function Content(props){
    const [paymentDetail,setPaymentDetail]=useState({
        name:"",
        amount:""
    })
    function handleChange(event){
        const {name,value}=event.target;
        setPaymentDetail(preValue=>{
            return {
                ...preValue,
                [name]:value
            }
        })
    }
    function handleClickOnAdd(e){
        props.onAdd(paymentDetail);
        setPaymentDetail({
            name:"",
            amount:""
        })
        e.preventDefault();
    }
    return <div>
        <form action="">
        <input
        name="name"
        placeholder="Name of Payer"
        onChange={handleChange}
        value={paymentDetail.name}
        autoComplete="off"
        />
        {paymentDetail.name!=="" && <input
        name="amount"
        placeholder="Amout Paid in ₹"
        onChange={handleChange}
        value={paymentDetail.amount}
        autoComplete="off"
        />}
        {paymentDetail.name!=="" && paymentDetail.amount!=="" && <button onClick={handleClickOnAdd}><AddIcon/></button>}
        </form>
    </div>
}
export default Content;