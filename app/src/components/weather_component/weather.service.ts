
import {RestService} from '../common/rest.service';
import {LocationService} from '../common/location.service';

export class WeatherService {

  API: string = `94c7919f6854ca11558382472a998f8f`;
  cnt: string = '10';
  innerBlock: string;
  url: string = `http://api.openweathermap.org/data/2.5/weather?id=625144&APPID=${this.API}`; // Minsk id
  type: string = 'GET';
  async: boolean = true;
  weatherObject: Weather.IWeatherResponse;
  townTableTemp: string = '';
  townTableRender: string = 'Loading';
  updateElementCallback: Function;

  constructor(updateCallback: Function){
    this.innerBlock = `<div>        
            <div>Weather in towns: </div>
            <div class="towntable"></div>
        </div> `;
    this.updateElementCallback = updateCallback;
  }

  _initTable(tableQuery: string){
    tableQuery = `<div class='tablewrapper'>`
  }
  _addLineToTable(tableQuery: string, row: string){
    tableQuery.concat(row);
  }
  _endTable(tableQuery: string){
    tableQuery.concat('</div>')
  }
  generateTableRow(rowObject: Weather.ITownWeather){
    return `<div class='tablerow'> 
        <span>${rowObject.name}</span>
        <span>${rowObject.main.temp}</span>
      </div>`;
  }

  generateTownTable(array: Weather.ITownWeather[]){
    this._initTable(this.townTableTemp);
    array.forEach((value, index, array) => {
      this._addLineToTable(this.townTableTemp, this.generateTableRow(value));
    })
    this._endTable(this.townTableTemp);

    console.log(this.townTableTemp);

    this.townTableRender = new String(this.townTableTemp);
    this.updateElementCallback();
  }

  downloadWeatherInCircle(coordinates: Coordinates, context: WeatherService){
    let urlTemplate: string = `http://api.openweathermap.org/data/2.5/find?lat=${coordinates.latitude}&lon=${coordinates.longitude}&cnt=${context.cnt}&appid=${context.API}`;
    console.log(urlTemplate);
    RestService.sendRequest(context.type, urlTemplate, context.async, context.callBackResponseList, '');
  }

  callBackResponseList(data: string){
    if (data !== null){
      console.log(' data ' + data);
      this.weatherObject = <Weather.IWeatherResponse> JSON.parse(data);
      this.generateTownTable(this.weatherObject.list);
    } else {
      console.log('Cann\'t load data from weather portal!');
      alert('Cann\'t load data from weather portal!');
    }
  }

  // downloadweather(){
  //   RestService.sendRequest(this.type, this.url, this.async, this.callBackResponseOneTown, '');
  // }

  getInner(){
    LocationService.getCurrentLocation(this.downloadWeatherInCircle, this);
    // this.downloadweather();
    return this.innerBlock;
  }
}