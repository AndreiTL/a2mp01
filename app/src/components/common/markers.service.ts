import {GoogleMapService} from "../googlemap_component/googlemap.service";
export const MarkersService ={
  processMarkers(array: Weather.ITownWeather[]): IGoogleMapService.IMarkerPoint[] {
    let sampleArray: IGoogleMapService.IMarkerPoint[] = [];
    array.forEach((value, index, array) => {
      // townTableTemp = context.townTableTemp.concat(context.generateTableRow(value));
      sampleArray.push({
        lng: value.coord.lon,
        lat: value.coord.lat,
        text: value.name +': '+ String(Math.round(value.main.temp - 273.15)),
        name: value.name
      })

    });
    return sampleArray;
  }
}