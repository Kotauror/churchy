import axios from 'axios';

export enum Methods {
  GET = "get",
  POST = "post",
  PUT = "put",
  PATCH = "patch"
}

interface IRequestOptions {
  method?: Methods;
  path?: string;
  body?: any;
  url?: string;
}

export const doRequest = async ({
  method = Methods.GET,
  path,
  body,
  url
}: IRequestOptions): Promise<any> => {
  const rootPath = process.env.REACT_APP_API_URL

  const requestData = {
    method: method,
    url: url ? url : `${rootPath}${path}`,
    data: body
  };

  const headers = {
    Pragma: "no-cache"
  };


  const request = await axios({
    ...requestData,
    headers,
  });
  return request.data;
};

export default doRequest;
