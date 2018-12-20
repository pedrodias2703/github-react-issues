import axios from 'axios';

const DEFAULT_URL = 'https://api.github.com/repos/facebook/react/issues';

let lastModified = new Date().toLocaleString();
let etag = '';

// service layer to make requests to api
export const getIssuesService = ({ url = DEFAULT_URL, page = 1 } = {}) => {
  const options = {
    headers: { 'If-Modified-Since': lastModified, 'If-None-Match': etag },
    params: { access_token: 'c82cd7c92bdaa2d4d8ad1aa45e0ba596554312ff', page }
  };
  return axios.get(url, options).then((response) => {
    lastModified = response.headers['Last-Modified'];
    etag = response.headers['etag'] || response.headers['ETag'];
    return response;
  });
};
