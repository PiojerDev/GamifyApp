import { useState, useEffect, useRef } from "react";
import Canvas from "./Canvas";
import ChatField from "./ChatField";
import HealthBar from "./HealthBar";
import HitField from "./HitField";
import Api from "./Api";

export default function Tickets() {
  //ticket current:20, last: 15, starting: 0
  const [ticketProp, setTicketProp] = useState({
    current: 0,
    starting: 0,
  });
  const [ticketLast, setTicketLast] = useState(0);
  const [canvasProp, setCanvasProp] = useState({
    lower: false,
    higher: false,
    zero: false,
  });

  function changeNumberValue(val) {
    setTicketProp((prev) => ({
      current: val,
      starting: prev.starting < val ? val : prev.starting,
    }));
  }

  useEffect(() => {
    setCanvasProp(() => ({
      higher: ticketProp.current > ticketLast ? true : false,
      lower: ticketProp.current < ticketLast ? true : false,
      zero: ticketProp.current === 0 && ticketLast > 0 ? true : false,
    }));
    setTicketLast(ticketProp.current);
  }, [ticketProp]);

  return (
    <div className="app-in">
      <Api
        changeNumberValue={changeNumberValue}
        ticketNumber={ticketProp.current}
      />
      <Canvas
        number={ticketProp.current}
        lower={canvasProp.lower}
        higher={canvasProp.higher}
        zero={canvasProp.zero}
      />
      <HealthBar
        currentNumber={ticketProp.current}
        startingNumber={ticketProp.starting}
      />
      {canvasProp.lower ? <HitField /> : null}
    </div>
  );
}
