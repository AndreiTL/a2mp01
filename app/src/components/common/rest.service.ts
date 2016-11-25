
export const RestService =  {

  sendRequest(type: string, url: string, async: boolean, callBack: Function, body:string) {
  //   let promise = new Promise(function(resolve, reject) {
  //   });
    let xhr = new XMLHttpRequest();

    xhr.open(type, url, async);

    xhr.send([body]);
    xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;
      // console.log(this.readyState + "" + this.status);
      if (this.status != 200) {
        // console.log(this.status + ': ' + this.statusText);
        callBack(null);
      } else {
        // console.log(this.responseText);
        callBack(this.responseText)
      }
    }
  }
};
