import {RestService} from '../common/rest.service';

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
            <div class="townstable">${this.townTableRender}</div>
        </div> `;
  }

  _initTable(){
    return `<div class='tablewrapper'>`
  }
  // _addLineToTable(tableQuery: string, row: string){
  //   tableQuery.concat(row);
  // }
  _endTable(){
    return '</div>';
  }
  generateTableRow(rowObject: Weather.ITownWeather){
    return `<div class="rowelement">         
        <table class="tablerow">
            <tr>
                <td><span class="townname">${rowObject.name}</span></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td><span>Temperature: </span><span>${Math.round(rowObject.main.temp-273.15)}</span></td>
                <td><span>Humidity: </span><span>${rowObject.main.humidity||''}</span></td>
                <td><span>Wind: </span><span>${rowObject.wind.speed||''}</span></td>
            </tr>
        </table>        
      </div>`
  }

  generateTownTable(array: Weather.ITownWeather[], context: WeatherService){
    context.townTableTemp = context._initTable();
    array.forEach((value, index, array) => {
      context.townTableTemp = context.townTableTemp.concat(context.generateTableRow(value));
    });
    context.townTableTemp = context.townTableTemp.concat(context._endTable());

    context.townTableRender = String(context.townTableTemp);
    context.updateTowsTable(context);
  }

  updateTowsTable(context: WeatherService){
    document.querySelector('.townstable').innerHTML = context.townTableRender;
  }

  downloadWeatherInCircle(latitude: number, longitude: number, count: number ){
    let urlTemplate: string = `http://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&cnt=${count}&appid=${this.API}`;
    RestService.sendRequest(this.type, urlTemplate, this.async, this.callBackResponseList, this, '');
  }

  callBackResponseList(data: string, context: WeatherService){
    if (data !== null){
      context.weatherObject = <Weather.IWeatherResponse> JSON.parse(data);
      context.generateTownTable(context.weatherObject.list, context);
      context.updateTowsTable(context);
    } else {
      console.log('Cann\'t load data from weather portal!');
      alert('Cann\'t load data from weather portal!');
    }
  }

  getInner(){
    return this.innerBlock;
  }
}