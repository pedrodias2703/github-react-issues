import axios from 'axios';

const DEFAULT_URL = 'https://api.github.com/repos/facebook/react/issues';
const ACCESS_TOKEN = '5f99a6e72ee5a8692a6e1e9e5db893603fdbdd10';

let lastModified = new Date().toLocaleString();
let etag = '';

// service layer to make requests to api
export const getIssuesService = ({ url = DEFAULT_URL, options = {} } = {}) => {
  const { headers = {}, params = {}, ...opts } = options;
  const { page = 1 } = params;
  const localOptions = {
    headers: { 'If-Modified-Since': lastModified, 'If-None-Match': etag, ...headers },
    params: { access_token: ACCESS_TOKEN, page, ...params },
    ...opts
  };
  return axios.get(url, localOptions).then((response) => {
    lastModified = response.headers['Last-Modified'];
    etag = response.headers['etag'] || response.headers['ETag'];
    return response;
  });
};
