

export default function HealthBar(props){
    let current = props.currentNumber, starting = props.startingNumber;
    let barParts = [];
    let color="";
    for (var i = 0; i < starting; i++) {
        if(current/starting*100 <= 50 && current/starting*100 > 25){
            color="yellow";
        }
        else if( current/starting*100 <=25){
            color="red";
        }
        else if ( current/starting*100 > 50) color="green";
      if(current<starting){
        
        if(i<starting && i>=current) {
            color="black";
        }
      }
        barParts.push(<div className='bar-part' key={i} style={{backgroundColor: color}}></div>);
      
    }
    
    return(
        <div className="health">
            <div className="text">
                <h1>Boss Health: <span className="health-remain" >{current}</span> / <span className = "health-full"> {starting} </span></h1>
            </div>
            <div className="bar">
                {barParts}
            </div>
        </div>
    )
}

// 20 - starting
//19 - current
// i<20 i>=19 