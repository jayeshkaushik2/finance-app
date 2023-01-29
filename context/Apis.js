// import { FINANCE_API_URL as API_URL } from "@env";

let API_URL =
  "https://2e2b-2402-3a80-41d2-9bea-198e-23c9-4e5e-4a81.in.ngrok.io";

// This Api should be in AuthContext
export async function loginUser(info) {
  let resp = await fetch(`${API_URL}/login/`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  });
  let resp_json = await resp.json();
  return resp_json;
}

// This Api should be in AuthContext
export async function registerUser(info) {
  let resp = await fetch(`${API_URL}/register-user/`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  });
  let resp_json = await resp.json();
  return resp_json;
}

// added Create API context functionality
function createRequest(
  request_method,
  request_data,
  token,
  is_default,
  data_type
) {
  // creates the request info for the fetch request.
  let req = {};
  let headers = {};
  if (is_default === true) {
    headers["Content-Type"] = "application/json";
  } else {
    headers["Content-Type"] = "multipart/form-data";
  }

  if (token !== null && token !== undefined) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  req["headers"] = headers;
  req["method"] = request_method;

  if (
    data_type === "json" &&
    request_data !== null &&
    request_data !== undefined &&
    (request_method === "post" || request_method === "patch")
  ) {
    // handling the json data
    req["body"] = JSON.stringify(request_data);
  } else if (
    data_type === "binary" &&
    request_data !== null &&
    request_data !== undefined &&
    (request_method === "post" || request_method === "patch")
  ) {
    // handling the binary data
    req["body"] = request_data;
  }
  return req;
}

function updateUrlFilter(url, filters) {
  // update the filters to url
  let new_url = url;
  let is_first = true;
  if (filters !== null) {
    let is_changed = false;
    for (var key in filters) {
      if (is_first === true) {
        new_url += `?${key}=${filters[key]}`;
        is_first = false;
      } else {
        new_url += `&${key}=${filters[key]}`;
      }
      is_changed = true;
    }
  }
  return new_url;
}

export async function CreateApiContext(
  api_point,
  request_method,
  request_data = {},
  filters = null,
  token = null,
  data_type = "json",
  is_default = true
) {
  // create the API context, sends the request to API.
  try {
    let URL = updateUrlFilter(`${API_URL}${api_point}`, filters);
    let req = createRequest(
      request_method,
      request_data,
      token,
      is_default,
      data_type
    );
    console.log(URL, req);
    let resp = await fetch(URL, req);
    return resp;
  } catch (e) {
    console.log("got error:", e);
  }
}
