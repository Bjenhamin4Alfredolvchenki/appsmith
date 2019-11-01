import API, { HttpMethod } from "./Api";
import { ApiResponse, GenericApiResponse, ResponseMeta } from "./ApiResponses";
import { APIRequest } from "../constants/ApiConstants";
import { AxiosPromise } from "axios";

export interface CreateActionRequest<T> extends APIRequest {
  resourceId: string;
  pageId: string;
  name: string;
  actionConfiguration: T;
}

export interface UpdateActionRequest<T> extends CreateActionRequest<T> {
  actionId: string;
}

export interface APIConfig {
  resourceId: string;
  pageId: string;
  name: string;
  requestHeaders: Record<string, string>;
  httpMethod: HttpMethod;
  path: string;
  body: JSON;
  queryParams: Record<string, string>;
  actionId: string;
}

export interface Property {
  key: string;
  value: string;
}

export interface APIConfigRequest {
  headers: Property[];
  httpMethod: string;
  path: string;
  body: JSON | string | Record<string, any> | null;
  queryParameters: Property[];
}

export interface QueryConfig {
  queryString: string;
}

export interface ActionCreateUpdateResponse extends ApiResponse {
  id: string;
  jsonPathKeys: Record<string, string>;
}

export interface RestAction {
  id: string;
  name: string;
  resourceId: string;
  pluginId: string;
  pageId?: string;
  actionConfiguration: Partial<APIConfigRequest>;
}

export interface ExecuteActionRequest extends APIRequest {
  actionId: string;
  params?: Property[];
}

export interface ExecuteActionResponse extends ApiResponse {
  actionId: string;
  data: any;
}

export interface ActionApiResponse {
  responseMeta?: ResponseMeta;
  body: JSON;
  headers: Record<string, string[]>;
  statusCode: string;
  duration: string;
  size: string;
}

class ActionAPI extends API {
  static url = "v1/actions";

  static fetchAPI(id: string): AxiosPromise<GenericApiResponse<RestAction>> {
    return API.get(`${ActionAPI.url}/${id}`);
  }

  static createAPI(
    apiConfig: RestAction,
  ): AxiosPromise<ActionCreateUpdateResponse> {
    return API.post(ActionAPI.url, apiConfig);
  }

  static fetchActions(): AxiosPromise<GenericApiResponse<RestAction[]>> {
    return API.get(ActionAPI.url);
  }

  static updateAPI(
    apiConfig: Partial<RestAction>,
  ): AxiosPromise<ActionCreateUpdateResponse> {
    return API.put(`${ActionAPI.url}/${apiConfig.id}`, null, apiConfig);
  }

  static deleteAction(id: string) {
    return API.delete(`${ActionAPI.url}/${id}`);
  }

  static createQuery(
    createQuery: CreateActionRequest<QueryConfig>,
  ): AxiosPromise<ActionCreateUpdateResponse> {
    return API.post(ActionAPI.url, createQuery);
  }

  static updateQuery(
    updateQuery: UpdateActionRequest<QueryConfig>,
  ): AxiosPromise<ActionCreateUpdateResponse> {
    return API.post(ActionAPI.url, updateQuery);
  }

  static executeAction(
    executeAction: ExecuteActionRequest,
  ): AxiosPromise<ActionApiResponse> {
    return API.post(ActionAPI.url + "/execute", executeAction);
  }
}

export default ActionAPI;
