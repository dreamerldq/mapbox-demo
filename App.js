import React from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import 'antd/dist/antd.css'
import './App.css';
import MapCicleData from './Map/map_cicleData';
import MapPopup from './Map/map_popup.js';
import MapGeoJsonLine from './Map/map_geoJsonLine';
import Map3DBuilding from './Map/mao_3dBuilding';
import { Layout , Menu} from 'antd'

const {  Header, Content }  = Layout;
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.switchMap = this.switchMap.bind(this);
    this.state = {
      activeMap: <MapPopup></MapPopup>,
      maps:{
        MapPopup: <MapPopup></MapPopup>,
        MapCicleData: <MapCicleData></MapCicleData>,
        MapGeoJsonLine: <MapGeoJsonLine></MapGeoJsonLine>,
        Map3DBuilding: <Map3DBuilding></Map3DBuilding>
      }
    }
  }
  switchMap(e){
    console.log("SSS",e);
    this.setState({
      activeMap: this.state.maps[e.key]
    })
  }
  render(){
    return(
      <React.Fragment>
        <Header>
        <Menu
        onClick={this.switchMap}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="MapPopup">MapPopup</Menu.Item>
        <Menu.Item key="MapCicleData">MapCicleData </Menu.Item>
        <Menu.Item key="MapGeoJsonLine">MapGeoJsonLine </Menu.Item>
        <Menu.Item key="Map3DBuilding">Map3DBuilding </Menu.Item>
      </Menu>
        </Header>
        <Content>
          {this.state.activeMap}
        </Content>
      </React.Fragment>
      
    )
  }
}
