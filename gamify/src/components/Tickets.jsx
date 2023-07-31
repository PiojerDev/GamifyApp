import {useState, useEffect, useRef} from 'react'
import Canvas from './Canvas';
import HealthBar from './HealthBar';


export default function Tickets(){

    let [startingNumber, setStartingNumber] = useState(0);
    let [ticketNumber, setTicketNumber] = useState({amount:0});
    let [lastTicketNumber, setLastTicketNumber] = useState(0);
    const [apiValue, setApiValue] = useState({amount:0});
    const [canvasProp, setCanvasProp] = useState({lower:false, higher: false, equal:true});
    

function apiCall(){
    fetch("https://datapi1.p.rapidapi.com/get/6f880344-9918-59ca-8fbc-b83372387e17", {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4010213a74msha542cc68cc82b84p1d0b71jsn5b1fa1f8fbd7',
            'X-RapidAPI-Host': 'datapi1.p.rapidapi.com',
        },
    })
    .then(response => response.json())
    .then(response => setApiValue(response))
    .catch(err => console.error(err));
}
useEffect(() => {
    if(ticketNumber!=apiValue){
        setTicketNumber(apiValue);
    }
}, [apiValue])



function test(){
    setTestCounter(testCounter - 1);
}


useEffect(()=> {
    setCanvasProp(()=> ({
        higher: false,
        lower:false,
        equal:true
       }))

    if(ticketNumber.amount > startingNumber){
        setStartingNumber(ticketNumber.amount);
    }    
    if(ticketNumber.amount != lastTicketNumber){
        console.log("??");
        if(ticketNumber.amount > lastTicketNumber) {
            console.log("tu");
            setCanvasProp(()=> ({
             higher: true,
             lower:false,
             equal:false
            }
            
        ))
        
    }
    else if(ticketNumber.amount < lastTicketNumber){
        setCanvasProp(()=> ({
            higher: false,
            lower:true,
            equal:false
           }
           
       ))
    }
    setLastTicketNumber(ticketNumber.amount);
    }
    


}, [ticketNumber])

    useEffect( () => {
        apiCall();
        const interval =  setInterval( apiCall, 10000);
        return () => clearInterval(interval);
}, []);


    return(
        <div className="app-in"> 
        <Canvas number = {ticketNumber.amount}
        lower = {canvasProp.lower}
        higher = {canvasProp.higher}
        
        />
        <HealthBar
        currentNumber = {ticketNumber.amount}
        startingNumber = {startingNumber} />
        </div>
    )
}