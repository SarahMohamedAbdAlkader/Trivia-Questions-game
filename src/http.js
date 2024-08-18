import axios from "axios";

const BASE_API_URL = "https://opentdb.com/";

class Http {
  constructor(baseURL) {
    const initialClient = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    initialClient.interceptors.response.use(
      this.handleSuccess,
      this.handleError
    );

    this.client = initialClient;
  }

  handleSuccess = (response) => {
    return response.data;
  };

  handleError = (error) => {
    console.error({ error: error.response?.data });
    return Promise.reject(error.response?.data);
  };

  get = (url, payload, headers = null) => {
    return this.client.get(url, {
      params: payload,
      ...headers,
    });
  };

  post = (url, payload, headers = null) => {
    return this.client.post(url, payload, { ...headers });
  };
}

export const http = new Http(BASE_API_URL);
