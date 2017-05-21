/* global API_URL */
/* global API_PORT */
/* eslint no-undef: ["error", { "typeof": true }] */

export function getApiRoute(path) {
  let host = process.env.API_HOST ? process.env.API_HOST : 'http://localhost';
  let port = process.env.API_PORT ? process.env.API_PORT : '8080';

  if (typeof API_URL !== 'undefined') {
    host = API_URL;
  }

  if (typeof API_PORT !== 'undefined') {
    port = API_PORT;
  }

  return `http://localhost/api/nodejs/v1${path}`;

//   return `${host}:${port}/${path}`;
}
