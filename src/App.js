import React, { useEffect, useRef, useState } from "react";
import OptionsListComponent from "./components/optionsListComponent/OptionsListComponent";
import { message } from "antd";

import "./App.css";

const SOCKET_LINK = "wss://production-esocket.delta.exchange";

function App() {
  const [data, setData] = useState(null);
  let allSymbols = useRef({});
  const [markPrices, setMarkPrices] = useState(allSymbols.current);
  const [isClosed, setIsClosed] = useState(false);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    fetch("https://api.delta.exchange/v2/products",{
      mode:"cors",
    })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error("Network error");
    })
    .then((data) => {
      setData(data);
      setLoading(false);
      for (let i = 0; i < data.result.length; i++) {
        let symbol = data.result[i].symbol;
        allSymbols.current = {
          ...allSymbols.current,
          [symbol]: 0,
        };
      }
    })
    .catch((err) => message.error(err.message));
  }, []);

  useEffect(() => {
    const ws = new WebSocket(SOCKET_LINK);
    if (!loading) {
      const apiCall = {
        type: "subscribe",
        payload: {
          channels: [
            {
              name: "v2/ticker",
              symbols: Object.keys(allSymbols.current),
            },
          ],
        },
      };
      if (isClosed) return;
      ws.onopen = (event) => {
        ws.send(JSON.stringify(apiCall));
      };
      ws.onmessage = function (event) {
        const jsonData = JSON.parse(event.data);
        setMarkPrices((p) => {
          if ((jsonData.symbol === undefined) | "undefined") return p;
          return {
            ...p,
            [jsonData.symbol]: jsonData.mark_price,
          };
        });

        return;
      };
    }
    return () => {
      if (ws.readyState === 1) {
        setIsClosed(true);
        ws.close();
      }
    };
  }, [isClosed, loading]);
  return (
    <div className="App">
      <OptionsListComponent
        data={data}
        loading={loading}
        markPrices={markPrices}
      />
    </div>
  );
}

export default App;
