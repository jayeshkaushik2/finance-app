import { FINANCE_API_URL as API_URL } from "@env";

// This Api should be in AuthContext
export async function loginUser(info) {
  let resp = await fetch(`${API_URL}/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  });
  let resp_json = await resp.json();
  return resp_json;
}

// This Api should be in AuthContext
export async function registerUser(info) {
  let resp = await fetch(`${API_URL}/register-user/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  });
  let resp_json = await resp.json();
  return resp_json;
}

function createRequest(request_method, request_data, token, is_default = true) {
  // creates the request info for the fetch request.
  let req = {};
  let headers = {};
  if (is_default === true) {
    headers["Content-Type"] = "application/json";
  } else {
    headers["Content-Type"] = "multipart/form-data";
  }

  if (token !== null && token !== undefined) {
    headers["access"] = `Bearer ${token}`;
  }

  req["method"] = request_method;
  if (
    request_data !== {} &&
    request_data !== null &&
    request_data !== undefined &&
    (request_method === "POST" || request_method === "PATCH")
  ) {
    req["body"] = request_data;
  }
  req["headers"] = headers;
}

function updateUrlFilter(url, filters) {
  // update the filters to url
  let new_url = url;
  let is_first = true;
  for (var key in filters) {
    if (is_first === true) {
      new_url += `?${key}=${filters[key]}`;
      is_first = false;
    } else {
      new_url += `&${key}=${filters[key]}`;
    }
  }
  new_url += "/";
  return new_url;
}

export async function CreateApiContext(
  api_point,
  request_method,
  request_data = null,
  filters = null,
  token = null
) {
  // create the API context, sends the request to API.
  let URL = updateUrlFilter(`${API_URL}${api_point}`, filters);
  let req = createRequest(request_method, request_data, token);
  let resp = await fetch(URL, req);
  let resp_json = await resp.json();
  return resp_json;
}
