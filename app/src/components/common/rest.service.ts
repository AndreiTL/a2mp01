// var Promise = require("es6-promise").Promise;
// require('es6-promise').polyfill();
// import * as Promise from 'es6-promise/Promise';

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


}


// import '../../../app';
// import IOptions = Bua.IOptions;
//
// import * as Promise from 'es6-promise/dist/es6-promise.js'
// import 'whatwg-fetch';
//
// export class RestService {
//
//   constructor() {
//
//   }
//
//   sendRequest(type, url, data) {
//     const lowerCaseType = type.toLowerCase();
//
//     const headers = lowerCaseType !== 'get' ? {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json',
//     } : {};
//
//     const options: IOptions  = {
//       method: type,
//       headers,
//     };
//
//     if (data) {
//       options.body = JSON.stringify(data);
//     }
//
//     return fetch(url, options)
//       .then(response => {
//         // if (response.status === 401) {
//         //   notAuthorizedHandlers.forEach(handler => handler());
//         // }
//         // if (response.status !== 200) {
//         //   return Promise.reject(response.status);
//         // }
//         return response.json();
//       })
//       .catch(err => Promise.reject(err));
//
//
//   }
// }