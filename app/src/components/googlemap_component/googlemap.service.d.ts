declare module IGoogleMapService {
  interface IMarkerPoint {
    lng: number;
    lat: number;
    name?: string;
    text: string;
  }

}
declare module 'IGoogleMapService/Interfaces' {
  export default IGoogleMapService;
}