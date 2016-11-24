

export class GoogleMapService {

  // api-key AIzaSyDdauxpzXTyktNa8x97awm9_3X-3pycINA

  innerBlock: string = `<script type="text/javascript">    
        var map;
        function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }    
    </script>
    <script async defer
      src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDdauxpzXTyktNa8x97awm9_3X-3pycINA&callback=initMap">
    </script>
  `;

  constructor(){

  }

  // initMap() {
  //   // Create a map object and specify the DOM element for display.
  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     center: {lat: -34.397, lng: 150.644},
  //     scrollwheel: false,
  //     zoom: 8
  //   });
  // }



  getInner (){
    return this.innerBlock;
  }


}
