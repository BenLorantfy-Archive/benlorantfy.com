import request from 'superagent';
import { getApiRoute } from '../../utils/apiHelper';

export function loadAwards() {
  return new Promise((resolve, reject) => {

    request.get(getApiRoute(`/awards`))
      .set('accept', 'application/json')
      .end((err, res) => {
        if (err) {
          reject(err);
        } else if (res.statusCode === 204) {
          resolve({});
        } else {
          resolve(res.body);
        }
      });
  });
}