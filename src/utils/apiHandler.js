export default async function fetchApiResponse(url, headers, body, method) {
  let response = await fetch(url, {
    method: method,
    headers: headers,
    body: body,
  });
  let responseData = await response.json();
  return responseData;
}
