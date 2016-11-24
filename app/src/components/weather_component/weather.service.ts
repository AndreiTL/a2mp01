
import '../common/rest.service';

export class WeatherService {

  // dowloadButton: string = `<button onclick="downloadweather()">Загрузить phones.json!</button>`;

  innerBlock: string;


  constructor(){
    this.innerBlock = `<div> 
        <!--$ {this.dowloadButton} -->
        <div> Wheather table will be here </div>
        </div> `
  }

  downloadweather(){




  }

  getInner(){
    return this.innerBlock;
  }
}