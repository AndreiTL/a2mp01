declare module Weather {
  interface ICoordinate {
    lon: string;
    lat: number;
  }
  interface IMainWeather {
    temp: number;
    pressure: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  }
  interface IWind{
    speed: number;
    deg: number;
  }
  interface ISys {
    country: string;
  }
  interface IClouds {
    all: number;
  }
  interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }

  interface ITownWeather {
    id: number;
    name: string;
    coord: ICoordinate;
    main: IMainWeather;
    dt:number;
    wind: IWind;
    sys: ISys;
    clouds: IClouds;
    weather: IWeather[];
  }

  interface IWeatherResponse{
    message: string;
    cod: number;
    count: number;
    list: ITownWeather[];
  }
}
declare module 'Weather/Interfaces' {
  export default Weather;
}