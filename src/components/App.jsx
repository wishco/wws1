import React from 'react'
import GettingStatusTraffic from "components/GettingStatusTraffic/GettingStatusTraffic";
import {WebSocketMain} from "components/highCharts/WebSocketMain";
import SignalBox from "components/highCharts/SignalBox";
import SignalList from "components/highCharts/SignalList";

function App() {

  return (
    <div>
      <GettingStatusTraffic/>
      <WebSocketMain/>
      <SignalBox/>
      <SignalList/>
    </div>
  )
}

export default App;
