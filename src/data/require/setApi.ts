import option, { optionApi } from "./option";


function setApi(api: optionApi) {
  if (api && api.baseURL) {
    option.api.baseURL = api.baseURL
  }
}

export default setApi
