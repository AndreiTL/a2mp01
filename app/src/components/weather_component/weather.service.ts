
import {RestService} from '../common/rest.service';
import {LocationService} from '../common/location.service';

export class WeatherService {

  API: string = `94c7919f6854ca11558382472a998f8f`;
  cnt: string = '10';
  innerBlock: string;
  url: string = `http://api.openweathermap.org/data/2.5/weather?id=625144&APPID=${this.API}`; // Minsk id
  type: string = 'GET';
  async: boolean = true;


  constructor(){
    this.innerBlock = `<div>        
        <div> Wheather table will be here </div>
        </div> `;
    // LocationService.getCurrentLocation(this.locationCallback);

  }
  // downloadWeatherInCircle(lat: number, lon: number, cnt: string){
  //   let urlTemplate: string = `http://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&cnt=${cnt}&appid=${this.API}`;
  //   console.log(urlTemplate);
  //   RestService.sendRequest(this.type, urlTemplate, this.async, this.callBackResponse, '');
  // }
  // locationCallback(coordinates: Coordinates){
  //   console.log('locationCallback is called');
  //   this.downloadWeatherInCircle(coordinates.latitude, coordinates.longitude, this.cnt);
  // }
  downloadWeatherInCircle(coordinates: Coordinates, context: WeatherService){
    let urlTemplate: string = `http://api.openweathermap.org/data/2.5/find?lat=${coordinates.latitude}&lon=${coordinates.longitude}&cnt=${context.cnt}&appid=${context.API}`;
    console.log(urlTemplate);
    RestService.sendRequest(context.type, urlTemplate, context.async, context.callBackResponse, '');
  }

  callBackResponse(data: string){
    if (data !== null){
      console.log(' data ' + data);
    } else {
      console.log('Cann\'t load data from weather portal!');
    }

  }

  downloadweather(){
    RestService.sendRequest(this.type, this.url, this.async, this.callBackResponse, '');
  }

  getInner(){
    LocationService.getCurrentLocation(this.downloadWeatherInCircle, this);
    this.downloadweather();
    return this.innerBlock;
  }
}