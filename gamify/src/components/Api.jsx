import { useState, useEffect } from "react";

export default function Api(props) {
  const [apiData, setApiData] = useState({ amount: 0 });

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
      .then((response) => setApiData(response))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    apiCall();
    const interval = setInterval(apiCall, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log(props.ticketNumber);
    console.log(apiData.amount);
    props.ticketNumber != apiData.amount
      ? props.changeNumberValue(apiData.amount)
      : null;
  }, [apiData]);

  return <></>;
}
