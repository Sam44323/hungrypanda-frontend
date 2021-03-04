const axiosMethod = (method, url, data, headers = null) => {
  return {
    method,
    url,
    data,
    headers,
  };
};

export default axiosMethod;
