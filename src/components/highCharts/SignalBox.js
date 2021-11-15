import React, {useCallback, useEffect, useMemo} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import {useDispatch, useSelector} from "react-redux";
import {addDataTrafficSignalToList, changeSignalValue} from "store/reducers/traffc-reducer";

const SignalBox = () => {
  const signalValue = useSelector(state => state.traffic.signalValue)
  const dataTrafficWSS = useSelector(state => state.traffic.dataTrafficWSS)
  const dataTrafficDateTime = useSelector(state => state.traffic.dataTrafficDateTime)
  const dispatch = useDispatch()
  const changeHandler = (event, newValue) => {
    dispatch(changeSignalValue(newValue))
  };

  useEffect(() => {
    if (dataTrafficDateTime.length === 0) return;
    const dataSignal = dataTrafficWSS[dataTrafficWSS.length - 1]
    if (dataSignal.total < signalValue) return
    const dateTimeSignal = dataTrafficDateTime[dataTrafficDateTime.length - 1]
    dispatch(addDataTrafficSignalToList(dataSignal, dateTimeSignal))
  }, [dataTrafficDateTime])

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 200,
      label: '200',
    },
  ];

  return (
    useMemo(() => jsxFn(), [dataTrafficDateTime, signalValue])
  );

  function jsxFn() {
    return (<div style={{display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap"}}>
      <div style={{display: "flex", justifyContent: "center", width: '100%'}}>Сигнал срабатывания...</div>
      <Box sx={{width: 200}}>
        <Slider onChange={changeHandler}
                aria-label="Temperature"
                value={signalValue}
                valueLabelDisplay="auto"
                step={10}
                marks={marks}
                max={200}
        />
      </Box>
      <div>
      </div>
    </div>)
  }
};

export default SignalBox;
