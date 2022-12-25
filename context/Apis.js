// import { FINANCE_API_URL as API_URL } from "@env";

let API_URL = "http://finance.apis.com:8000";

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
  req["headers"] = headers;
  req["method"] = request_method;
  if (
    request_data !== {} &&
    request_data !== null &&
    request_data !== undefined &&
    (request_method === "post" || request_method === "patch")
  ) {
    req["body"] = JSON.stringify(request_data);
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
    if (is_changed == true) {
      new_url += "/";
    }
  }
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
  try {
    let URL = updateUrlFilter(`${API_URL}${api_point}`, filters);
    let req = createRequest(request_method, request_data, token);
    console.log("request info::>>>", URL, req);
    let resp = await fetch(URL, req);
    console.log("resp from Api context:>>>", resp);
    let resp_json = await resp.json();
    return resp_json;
  } catch (e) {
    console.log("got error:", e);
  }
}
