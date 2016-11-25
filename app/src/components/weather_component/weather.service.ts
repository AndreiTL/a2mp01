
import {RestService} from '../common/rest.service';

export class WeatherService {

  // api weather 94c7919f6854ca11558382472a998f8f

  innerBlock: string;
  url: string = `http://api.openweathermap.org/data/2.5/weather?id=625144&APPID=94c7919f6854ca11558382472a998f8f`; // Minsk id
  type: string = 'GET';
  async: boolean = true;


  constructor(){
    this.innerBlock = `<div>        
        <div> Wheather table will be here </div>
        </div> `
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
    this.downloadweather();
    return this.innerBlock;
  }
}