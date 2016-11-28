import {GoogleMapService} from "../googlemap_component/googlemap.service";
export const MarkersService ={
  processMarkers(array: Weather.ITownWeather[]): IGoogleMapService.IMarkerPoint[] {
    let sampleArray: IGoogleMapService.IMarkerPoint[] = [];
    array.forEach((value, index, array) => {
      // townTableTemp = context.townTableTemp.concat(context.generateTableRow(value));
      sampleArray.push({
        lng: value.coord.lon,
        lat: value.coord.lat,
        text: String(value.main.temp),
        name: value.name
      })

    });
    return sampleArray;
  }
}