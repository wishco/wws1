import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import {russianLocalizationHighcarts} from "components/highCharts/localization/russianLocalizationHighcarts";
import {presetsHightcharts} from "components/highCharts/presets/presetsHightcharts";
import {
  changeDataTrafficDateTimeTick,
  changeDataTrafficTickWSS,
  hideStationFromChart,
  showStationIntoChart
} from "store/reducers/traffc-reducer";
import {dataTik} from "components/highCharts/WebSocketMain";

const Charts = () => {

  const dispatch = useDispatch()
  const dataTrafficWSS = useSelector(state => state.traffic.dataTrafficWSS)
  const dataTrafficDateTime = useSelector(state => state.traffic.dataTrafficDateTime)
  const dataStationsCharts = useSelector(state => state.traffic.dataStationsCharts)
  const dataStationList = useSelector(state => state.traffic.dataStationList)
  const [series, setSeries] = useState()

  // useEffect(()=>{
  //     setTimeout(() => {
  //       dispatch(changeDataTrafficTickWSS(dataTik()))
  //       dispatch(changeDataTrafficDateTimeTick())
  //     }, 1000);
  // },[dataTrafficWSS])

  Highcharts.setOptions(russianLocalizationHighcarts);
  Highcharts.setOptions(presetsHightcharts);

    const hideStation = (e) => {
    const _name = e.target.name
    e.preventDefault()
    if (dataStationsCharts.filter(name => name === _name).length === 0) return
    dispatch(hideStationFromChart(_name))
  }

  const showStation = (e) => {
    const _name = e.target.name
    e.preventDefault()
    if (dataStationList.filter(name => name === _name).length === 0) return
    if (dataStationsCharts.filter(name => name === _name).length !== 0) return
    dispatch(showStationIntoChart(_name))
  }

  const events = {hide: (e)=> hideStation(e), show: (e)=> showStation(e)}

  useEffect(()=>{
    setSeries( dataStationList.map((el) => {
      const data = dataTrafficWSS.map((_el, _index) => [dataTrafficDateTime[_index], _el[el]])
      const isVisible = (dataStationsCharts.filter(name => name === el).length > 0)
      return {
        visible: isVisible,
        events: events,
        data: data,
        name: el
      }
    }) )

  }, [dataTrafficDateTime])

  if (dataStationList.length === 0) return null

  const options = {
    legend: {
      enabled: true,
    },
    xAxis: {
      title: {
        text: 'Время',
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Значение трафика',
      },
      minPadding: 0,
      maxPadding: 0
    },
    title: {
      text: 'График показаний трафика'
    },
    series: series
  }


  return (<div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </div>
  );


};

export default Charts;
