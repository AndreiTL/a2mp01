import './index.scss';

import {WeatherService} from './components/weather_component/weather.service';
import {GoogleMapService} from './components/googlemap_component/googlemap.service';


class Main {
  weatherService: WeatherService;
  googleMapService: GoogleMapService;

  constructor(){
    this.weatherService = new WeatherService();
    this.googleMapService = new GoogleMapService();
  }

  renderData(){
    return `<div> 
          <div class='weather'>${this.weatherService.getInner()}</div>
          <div class='map'>${this.googleMapService.getInner()}</div>
      </div>`;
  }
}

var main = new Main();

document.querySelector('.app').innerHTML = main.renderData();