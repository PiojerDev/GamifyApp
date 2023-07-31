import { useState, useEffect, useRef } from "react";
import Canvas from "./Canvas";
import ChatField from "./ChatField";
import HealthBar from "./HealthBar";
import HitField from "./HitField";

export default function Tickets() {
  const [startingNumber, setStartingNumber] = useState(0);
  const [ticketNumber, setTicketNumber] = useState({ amount: 0 });
  const [lastTicketNumber, setLastTicketNumber] = useState(0);
  const [canvasProp, setCanvasProp] = useState({
    lower: false,
    higher: false,
  });

  function apiCall() {
    fetch(
      "https://datapi1.p.rapidapi.com/get/6f880344-9918-59ca-8fbc-b83372387e17",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "4010213a74msha542cc68cc82b84p1d0b71jsn5b1fa1f8fbd7",
          "X-RapidAPI-Host": "datapi1.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => setTicketNumber(response))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    setCanvasProp(() => ({
      higher: ticketNumber.amount > lastTicketNumber ? true : false,
      lower: ticketNumber.amount < lastTicketNumber ? true : false,
    }));
    setStartingNumber((prev) =>
      ticketNumber.amount > prev ? ticketNumber.amount : prev
    );
    setLastTicketNumber(ticketNumber.amount);
  }, [ticketNumber]);

  useEffect(() => {
    apiCall();
    const interval = setInterval(apiCall, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-in">
      <Canvas
        number={ticketNumber.amount}
        lower={canvasProp.lower}
        higher={canvasProp.higher}
      />
      <HealthBar
        currentNumber={ticketNumber.amount}
        startingNumber={startingNumber}
      />
      {canvasProp.lower ? <HitField /> : null}
    </div>
  );
}
