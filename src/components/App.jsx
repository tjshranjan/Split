import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Content from "./Content";
import PaymentDetail from "./PaymentDetail";
import NetPayment from "./NetPayment";
// import Details from "./Details";
function App(){
  const [payments,setPayments]=useState([])
  function addPayment(paymentDetail){
    setPayments(prePayments=>{
      return [...prePayments,paymentDetail]
    })
  }
  function deletePayment(id){
    setPayments(prePayments=>{
      return payments.filter((payment,index)=>{
        return id!==index;
      })
    })
  }
  const [isClicked,setClick]=useState(false);
  function handleClickOnShowFinalPayments(){
    setClick(val=>!val);
  }
  return (
          <div>
            <div className="split left">
              <div>
                  <Header />
                  <Content onAdd={addPayment}/>
                  {payments.map((payment,index)=>{
                    return <PaymentDetail id={index} key={index} name={payment.name} amount={payment.amount} onDelete={deletePayment} onReset={handleClickOnShowFinalPayments}/>
                  })}
                  {!isClicked && <button className="finalPayment" onClick={handleClickOnShowFinalPayments}>Calculate<br/>Final Payments</button>}
              </div>
            </div>
            <div className="split right">
              <div>
              {isClicked && <NetPayment payments={payments}/>}
              </div>
            </div>
        </div>
  );
}
export default App;