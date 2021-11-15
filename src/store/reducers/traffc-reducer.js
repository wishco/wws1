const CHANGE_GETTING_STATUS_TRAFFIC_CURRENT = 'CHANGE_GETTING_STATUS_TRAFFIC_CURRENT'
const CHANGE_DATA_TRAFFIC_WSS = 'CHANGE_DATA_TRAFFIC_WSS'
const CHANGE_DATA_TRAFFIC_TICK_WSS = 'CHANGE_DATA_TRAFFIC_TICK_WSS'
const CHANGE_DATA_TRAFFIC_DATETIME = 'CHANGE_DATA_TRAFFIC_DATETIME'
const CHANGE_DATA_TRAFFIC_DATETIME_TICK = 'CHANGE_DATA_TRAFFIC_DATETIME_TICK'
const GET_DATA_STATION_LIST = 'GET_DATA_STATION_LIST'

const HIDE_STATION_FROM_CHART = 'HIDE_STATION_FROM_CHART'
const SHOW_STATION_INTO_CHART = 'SHOW_STATION_INTO_CHART'


const CHANGE_SIGNAL_VALUE = 'CHANGE_SIGNAL_VALUE'
const ADD_DATA_TRAFFIC_SIGNAL_TO_LIST = 'ADD_DATA_TRAFFIC_SIGNAL_TO_LIST'



const initialState = {
  gettingStatusTrafficCurrent: true,  // статус получения данных, трафика
  dataTrafficWSS: [], // данные через WSS
  dataTrafficDateTime: [], // временные данные, при получении трафика
  dataStationList: ['total'], // список графов станций
  dataStationsCharts: ['total'], // список активных трендов станций
  signalValue: 100, // уровень превышения, по которому срабатывает сигнал
  dataTrafficSignalList: [],
}

export const trafficReducer = (state = initialState, action) => {
  switch (action.type) {

    case CHANGE_GETTING_STATUS_TRAFFIC_CURRENT: {
      return {...state, gettingStatusTrafficCurrent: action.status}
    }

    case CHANGE_DATA_TRAFFIC_WSS: {
      return {...state, dataTrafficWSS: action.data}
    }

    case CHANGE_DATA_TRAFFIC_TICK_WSS: {
      const arr = [...state.dataTrafficWSS]
      const tikObj = action.tick.reduce((acc, curr) => {
        const _currName = curr['station_name']
        const _currValue = curr['station_traffic']
        acc[_currName] = (acc[_currName] || 0) + _currValue
        acc['total'] += _currValue
        return acc
      }, {total: 0})
      const last = arr.shift() // удалить последний элемент массива

      arr.push(tikObj) // добавить новый элемент в конец

      return {...state, dataTrafficWSS: [...arr]}
    }

    case CHANGE_DATA_TRAFFIC_DATETIME: {
      const _length = action.length
      const _arrDateTime = []
      const timeBefore300sec = Date.now() - _length * 1000
      for(let i= 0; i<_length; i++) {
        _arrDateTime.push(timeBefore300sec + i * 1000)
      }
      return {...state, dataTrafficDateTime: _arrDateTime}
    }

    case CHANGE_DATA_TRAFFIC_DATETIME_TICK: {
      const arr = [...state.dataTrafficDateTime]
      arr.shift() // удалить последний элемент массива
      arr.push(Date.now()) // добавить новый элемент в конец
      return {...state, dataTrafficDateTime: arr}
    }

    case GET_DATA_STATION_LIST: {
      const arrWithoutTotal = action.stations.filter(el=>el!=='total')
      return {...state, dataStationList: [...state.dataStationList , ...arrWithoutTotal]}
    }

    case SHOW_STATION_INTO_CHART: {
       return {...state, dataStationsCharts: [...state.dataStationsCharts, action.nameStation]}
    }

    case HIDE_STATION_FROM_CHART: {
      const newArr = state.dataStationsCharts.filter(el => el !== action.nameStation)
      return {...state, dataStationsCharts: newArr}
    }

    case CHANGE_SIGNAL_VALUE: {
      return {...state, signalValue: action.value}
    }

    case ADD_DATA_TRAFFIC_SIGNAL_TO_LIST: {
      const data = action.value.data
      const dateTime = action.value.dateTime
      return {...state, dataTrafficSignalList: [...state.dataTrafficSignalList, {data, dateTime} ]}
    }

    default:
      return state
  }
}

export const changeGettingStatusTrafficCurrent = (status) => ({type: CHANGE_GETTING_STATUS_TRAFFIC_CURRENT, status})
export const changeDataTrafficWSS = (data) => ({type: CHANGE_DATA_TRAFFIC_WSS, data})
export const changeDataTrafficTickWSS = (tick) => ({type: CHANGE_DATA_TRAFFIC_TICK_WSS, tick})
export const changeDataTrafficDateTime = (length) => ({type: CHANGE_DATA_TRAFFIC_DATETIME, length})
export const changeDataTrafficDateTimeTick = () => ({type: CHANGE_DATA_TRAFFIC_DATETIME_TICK})

export const getDataStationList = (stations) => ({type: GET_DATA_STATION_LIST, stations})

export const hideStationFromChart = (nameStation) => ({type: HIDE_STATION_FROM_CHART, nameStation})
export const showStationIntoChart = (nameStation) => ({type: SHOW_STATION_INTO_CHART, nameStation})

export const changeSignalValue = (value) => ({type: CHANGE_SIGNAL_VALUE, value})
export const addDataTrafficSignalToList = (data, dateTime) => ({type: ADD_DATA_TRAFFIC_SIGNAL_TO_LIST, value:{data,dateTime}})
