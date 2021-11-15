import React, {useCallback, useMemo} from 'react';
import {useSelector} from "react-redux";

const SignalList = () => {
  const dataTrafficSignalList = useSelector(state => state.traffic.dataTrafficSignalList)
  const signals = () => {
    return dataTrafficSignalList.map((el, index)=>{
      const d = new Date(+el.dateTime);
      return (
        <div key={index} style={{maxHeight: 300}}>
          Сообщение №{index+1}&nbsp;
          Дата:{d.toLocaleTimeString()}&nbsp;
          Время:{d.getHours()}:{d.getMinutes()}:{d.getSeconds()}&nbsp;
          Значение пика:{el.data.total}&nbsp;
        </div>
      )
    })
  }




  return (
    <div>
      {signals()}
    </div>
  );
};

export default SignalList;
