import { yellow } from "@mui/material/colors";

function willGet(payTo,id){
    let total=0;
    for(let i=0;i<payTo.length;i++){
        if(payTo[id][i]===Number.MAX_VALUE) continue;
        total+=payTo[id][i];
    }
    return total;
}
function willGive(payTo,id){
    let total=0;
    for(let i=0;i<payTo.length;i++){
        if(payTo[i][id]===Number.MAX_VALUE) continue;
        total+=payTo[i][id];
    }
    return total;
}
function getPayments(v){
    var s=v.length;
    var payTo=Array(s).fill().map(()=>Array(s));
    
    for(let i=0;i<s;i++){
        let perHead=v[i]/s;
        for(let j=0;j<s;j++){
            if(i===j) payTo[i][j]=Number.MAX_VALUE;
            else{
                payTo[i][j]=perHead;
            }
        }
    }

    for(let i=0;i<s;i++){
        for(let j=0;j<s;j++){
            if(payTo[i][j]!==Number.MAX_VALUE){
                if(payTo[i][j]>payTo[j][i]){
                    payTo[i][j]=Math.abs(payTo[i][j]-payTo[j][i]);
                    payTo[j][i]=0;
                }
                else{
                    payTo[j][i]=Math.abs(payTo[i][j]-payTo[j][i]);
                    payTo[i][j]=0;
                }
            }
        }
    }
    var netPayment=[];
    for(let i=0;i<s;i++){
        let x=willGet(payTo,i)-willGive(payTo,i);
        netPayment.push(x);
    }
    return netPayment;
}
function getStatements(payments){
    const setter=new Map();
    for(let x of payments){
        setter.set(x.name,Number((setter.get(x.name) ?? 0))+Number(x.amount));
    }
    var amount=[]
    var person=[]
    setter.forEach((value,key)=>{
        amount.push((value));
        person.push(key);
    })
    var netPayments=getPayments(amount);
    var np=new Map();
    for(let i=0;i<person.length;i++){
        np.set(person[i],netPayments[i]);
    }
    var mostDebt="";
    var counter=Number.MAX_VALUE;
    np.forEach((value,key)=>{
        if(value<counter){
            counter=value;
            mostDebt=key;
        }
    })
    var statements=[];
    np.forEach((value,key)=>{
        if(value<0 && key!==mostDebt){
            statements.push([key,-value.toFixed(2),mostDebt])
        }
    })
    np.forEach((value,key)=>{
        if(value>0){
            statements.push([mostDebt,value.toFixed(2),key])
        }
    })
    return statements;
}
function NetPayment(props){
    var payments=props.payments;
    var statements=getStatements(payments);
    return <div>
        {statements.map((s,i)=><p><strong>{s[0]}</strong> will give <strong style={{color:"red"}}>₹{s[1]}</strong> to <strong>{s[2]}</strong></p>)}
    </div>
}
export default NetPayment;