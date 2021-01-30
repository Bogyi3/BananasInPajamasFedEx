async function generalFetch(endpoint, method, bodyData = undefined, token = undefined) {
  const requestOptions = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  if (endpoint !== 'sessions' && endpoint !== 'registration') {
    requestOptions.headers.Authorization = `Bearer ${token}`;
  }

  if (bodyData !== undefined) { requestOptions.body = JSON.stringify(bodyData); }
  const httpResponse = await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, requestOptions);
  const response = await httpResponse.json();
  const { status } = httpResponse;

  if (endpoint === 'challenge' && method === 'GET') {
    return response;
  }

  const data = { response, status };
  return data;
}
export default generalFetch;
