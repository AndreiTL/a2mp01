import './index.scss';

import {WeatherService} from './components/weather_component/weather.service';
import {GoogleMapService} from './components/googlemap_component/googlemap.service';

import {LocationService} from './components/common/location.service';
import {MarkersService} from './components/common/markers.service';

class Main {
  weatherService: WeatherService;
  googleMapService: GoogleMapService;

  defaultZoom: number = 8;
  defaultCount: number = 5;

  constructor(townCount: number){
    this.weatherService = new WeatherService();
    this.googleMapService = new GoogleMapService();
    this. defaultCount = townCount;
  }

  updateForLocation(crd: Coordinates, context: Main){
    let lat: number = crd.latitude;
    let lng: number = crd.longitude;

    let zoom: number = context.defaultZoom;

    let count: number = context.defaultCount;

    context.googleMapService.setMapCenterAndZoom.call(context.googleMapService, lat, lng, zoom);
    context.weatherService.downloadWeatherInCircle.call(context.weatherService, lat, lng, count, context.updateWeatherMarkers.bind(context));

  }

  updateWeatherMarkers(){
    let markers: IGoogleMapService.IMarkerPoint[] = MarkersService.processMarkers(this.weatherService.getWeatherObject().list);
    this.googleMapService.setMarkers(markers);
  }

  renderData(){
    LocationService.getCurrentLocation(this.updateForLocation, this);
    return `<div class="container"> 
          <div class='weather'>${this.weatherService.getInner()}</div>
          <div class='map'>${this.googleMapService.getInner()}</div>
      </div>`;
  }
}

var main = new Main(5);

document.querySelector('.app').innerHTML = main.renderData();