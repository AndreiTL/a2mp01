export class RestService {

  constructor() {

  }

  // sendRequest(type, url, data) {
  //
  //   var xhr = new XMLHttpRequest();
  //
  //   xhr.open('GET', 'phones.json', false);
  //
  //   xhr.send();
  //
  // }

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