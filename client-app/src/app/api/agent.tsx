import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Activity } from '../models/activity';
import { store } from '../stores/store';

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};
axios.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
      case 400:
        if (typeof data === 'string') {
          toast.error(data);
        }
        if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
          history.push('/not-found');
        }
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        }

        break;
      case 401:
        toast.error('unauthorised');
        break;
      case 404:
        toast.error('not found');
        history.push('/not-found');
        break;
      case 500:
        store.commonStore.setServerError(data);
        history.push('/server-error');
        toast.error('server error');
    }
    return Promise.reject(error);
  }
);

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: <T,>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T,>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
  put: <T,>(url: string, body: {}) =>
    axios.put<T>(url, body).then(responseBody),
  delete: <T,>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>('/Activities'),
  details: (id: string) => requests.get<Activity>(`/Activities/${id}`),
  create: (activity: Activity) => requests.post<void>('/Activities', activity),
  update: (activity: Activity) =>
    requests.put<void>(`/Activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete<void>(`/Activities/${id}`),
};
const agent = {
  Activities,
};
export default agent;
