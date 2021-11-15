import {useDispatch, useSelector} from "react-redux";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";
import {changeGettingStatusTrafficCurrent} from "store/reducers/traffc-reducer";
import Switch from "@mui/material/Switch";

function GettingStatusTraffic() {
  const dispatch = useDispatch()
  const currentStatus = useSelector(state => state.traffic.gettingStatusTrafficCurrent)
  const statusText = ['ВКЛЮЧЕНО', 'ОТКЛЮЧЕНО']

  const clickHandler = (e) => {
    dispatch(changeGettingStatusTrafficCurrent(!currentStatus))
  }

  return (
    <div>
      <FormControlLabel control={
        <Switch onClick={clickHandler} checked={currentStatus}/>
      } label = {statusText[+!currentStatus] + ", получение данных через WSS..."}/>
    </div>
  )
}

export default GettingStatusTraffic;
