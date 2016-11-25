
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

  constructor(){
    this.innerBlock = `<div>        
            <div>Weather in towns: </div>
            <div class="townstable"></div>
        </div> `;
  }

  _initTable(){
    return `<div class='tablewrapper'>`
  }
  _addLineToTable(tableQuery: string, row: string){
    tableQuery.concat(row);
  }
  _endTable(){
    return '</div>';
  }
  generateTableRow(rowObject: Weather.ITownWeather){
    return `<div class="tablerow"> 
        <div class="cell townname"><span>${rowObject.name}</span></div>
        <div class="cell towntemp"><span>${rowObject.main.temp-274.15}</span></div>
      </div>`;
  }

  generateTownTable(array: Weather.ITownWeather[], context: WeatherService){
    context.townTableTemp = context._initTable();
    array.forEach((value, index, array) => {
      // context._addLineToTable(context.townTableTemp, context.generateTableRow(value));
      context.townTableTemp = context.townTableTemp.concat(context.generateTableRow(value));
    });
    // context._endTable(context.townTableTemp);
    context.townTableTemp = context.townTableTemp.concat(context._endTable());

    console.log(context.townTableTemp);

    context.townTableRender = String(context.townTableTemp);
    context.updateTowsTable(context);
  }

  updateTowsTable(context: WeatherService){
    document.querySelector('.townstable').innerHTML = context.townTableRender;
  }

  downloadWeatherInCircle(coordinates: Coordinates, context: WeatherService){
    let urlTemplate: string = `http://api.openweathermap.org/data/2.5/find?lat=${coordinates.latitude}&lon=${coordinates.longitude}&cnt=${context.cnt}&appid=${context.API}`;
    console.log(urlTemplate);
    RestService.sendRequest(context.type, urlTemplate, context.async, context.callBackResponseList, context, '');
  }

  callBackResponseList(data: string, context: WeatherService){
    if (data !== null){
      console.log(' data ' + data);
      context.weatherObject = <Weather.IWeatherResponse> JSON.parse(data);
      context.generateTownTable(context.weatherObject.list, context);
      context.updateTowsTable(context);
    } else {
      console.log('Cann\'t load data from weather portal!');
      alert('Cann\'t load data from weather portal!');
    }
  }

  getInner(){
    LocationService.getCurrentLocation(this.downloadWeatherInCircle, this);
    // this.downloadweather();
    return this.innerBlock;
  }
}