import './index.scss';
// import './main.css'
// // import './index.scss';  // not work
// class Greeter {
//     constructor(public greeting: string) { }
//     greet() {
//         return "<h1>" + this.greeting + "</h1>";
//     }
// }
//
// var greeter = new Greeter("Hello, world!");
//
// document.body.innerHTML = greeter.greet();

import {WeatherService} from './components/weather_component/weather.service';
import {GoogleMapService} from './components/googlemap_component/googlemap.service';


class Main {

    constructor(){

    }


    renderData(){
      let weatherService: WeatherService = new WeatherService();
      let googleMapService: GoogleMapService = new GoogleMapService();

      let innerBlock: string = `<div> 
          <div>${weatherService.getInner()}</div>
          <div>${googleMapService.getInner()}</div>
      </div>`;

      return innerBlock;
    }
}

var main = new Main();

document.querySelector('.app').innerHTML = main.renderData();