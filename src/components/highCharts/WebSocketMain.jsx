import React, {useCallback, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  changeDataTrafficDateTime, changeDataTrafficDateTimeTick,
  changeDataTrafficTickWSS, changeDataTrafficWSS,
  changeGettingStatusTrafficCurrent, getDataStationList,
} from "store/reducers/traffc-reducer";
import Charts from "components/highCharts/Charts";

export const WebSocketMain = () => {
  const gettingStatusTrafficCurrent = useSelector(state => state.traffic.gettingStatusTrafficCurrent)
  const dataTrafficDateTime = useSelector(state => state.traffic.dataTrafficDateTime)

  const urlWebSocket = 'wss://ir-backend-02.rigintelpro.ru/api/v1/monitoring/app_server_traffic'
  const socket = useRef(null)
  const dispatch = useDispatch()

  // useEffect(()=>{
  //   const arr = []
  //   for (let i=0; i<300; i++) {
  //     arr.push(getElErrFromStations(dataTik()))
  //   }
  //
  //   dispatch(changeDataTrafficWSS(arr))
  //   dispatch(changeDataTrafficDateTime(arr.length))
  //   dispatch(getDataStationList(Object.keys(arr[0])))
  // },[])



  useEffect(() => {
    if (gettingStatusTrafficCurrent) {
      socket.current = new WebSocket(urlWebSocket)
      socket.current.onopen = () => socketOnOpen()
      socket.current.onmessage = (e) => socketOnMessage(e)
      socket.current.onclose = () => socketOnClose()
      socket.current.onerror = (e) => socketOnError(e)

    } else {
      if (socket.current) {
        socket.current.close();
      }
    }
  }, [gettingStatusTrafficCurrent])

  return useCallback(<Charts/>, [dataTrafficDateTime]) // return JSX
//-------------------

  function socketOff() {
    dispatch(changeGettingStatusTrafficCurrent(false))
  }

  function socketOnOpen() {
    dispatch(changeGettingStatusTrafficCurrent(true))
  }

  function socketOnClose() {
    socketOff()
  }

  function socketOnError(e) {
    socketOff()
  }

  function socketOnMessage(e) {
    const data = JSON.parse(e.data)
    if (data[0].hasOwnProperty('station_name') && data[0].hasOwnProperty('station_traffic')) {
      dispatch(changeDataTrafficTickWSS(data))
      dispatch(changeDataTrafficDateTimeTick()) // вносим время Tick

      // код, если получаем ТИК значение
      // socketOff()
    } else {
      // код, если получаем Data набор значений (первое получение данных)
      dispatch(changeDataTrafficWSS(data))
      dispatch(changeDataTrafficDateTime(data.length)) // эмулируем временные данные
      dispatch(getDataStationList(Object.keys(data[0])))

    }
  }
}



//
// function randomValue() {
//   let res = Math.floor(Math.random()*25)
//   let res2 = Math.floor(Math.random()*100)
//   let m = Math.floor(Math.random()*12)
//   if (m > 4) return 0
//   return (res2>98) ? 50 : res
// }
//
// function getElErrFromStations(dataTik){
//   return dataTik.reduce((acc, curr) => {
//     const _currName = curr['station_name']
//     const _currValue = curr['station_traffic']
//     acc[_currName] = (acc[_currName] || 0) + _currValue
//     acc['total'] += _currValue
//     return acc
//   }, {total: 0})
// }
//
// export function dataTik() {
//   return [
//     {station_name: 'Ir-Master-14', station_traffic: randomValue()},
//     {station_name: 'Ir-Master-26', station_traffic: randomValue()},
//     {station_name: 'Ir-Master-27', station_traffic: randomValue()},
//     {station_name: 'Ir-Master-29', station_traffic: randomValue()},
//     {station_name: 'Ir-Master-3', station_traffic: randomValue()},
//     {station_name: 'Ir-Master-5', station_traffic: randomValue()},
//     {station_name: 'Ir-Master-6', station_traffic: randomValue()},
//     {station_name: 'Ir-Master-9', station_traffic: randomValue()},
//     {station_name: 'IrMaster12', station_traffic: randomValue()},
//     {station_name: 'IrMaster4', station_traffic: randomValue()},
//     {station_name: 'IrMaster6', station_traffic: randomValue()},
//     {station_name: 'admin', station_traffic: randomValue()},
//     {station_name: 'admin', station_traffic: randomValue()},
//     {station_name: 'Ir-Master-Demo', station_traffic: randomValue()},
//     {station_name: 'Ir-Master-15', station_traffic: randomValue()},
//     {station_name: 'Ir-Master-17', station_traffic: randomValue()},
//     {station_name: 'Ir-Master-Demo2', station_traffic: randomValue()}
//   ]
// }
