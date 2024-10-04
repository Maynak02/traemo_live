import axiosInstance from "@/utils/axios";
import { getData } from "@/utils/storage";

export const axiosPost = async (
  url,
  data,
  contentType = "application/json"
) => {
  let response = {};
  let header = {};
  const token = getData("token");
  const userAuth = token?.access_token;
  if (userAuth) {
    header = {
      "Content-Type": contentType,
      Accept: "*/*",
      Authorization: `Bearer ${userAuth}`,
    };
  } else {
    header = {
      "Content-Type": contentType,
      Accept: "*/*",
    };
  }
  try {
    const result = await axiosInstance.post(url, data, {
      headers: header,
    });
    response.data = result.data;
    response.status = [200, 201].includes(result.status);
  } catch (e) {
    response.status = false;
    response.message = e?.response?.data?.detail;
    response.data = e?.response?.data || e;

    console.log("🚀 ~ response:", response);
  }
  return response;
};
export const axiosGet = async (
  url,
  params = {},
  contentType = "application/json"
) => {
  let response = {};
  let header = {};

  const token = getData("token");
  console.log("get__token", token);
  const userAuth = token?.access_token;

  if (userAuth) {
    header = {
      "Content-Type": contentType,
      Accept: "*/*",
      Authorization: `Bearer ${userAuth}`,
    };
  } else {
    header = {
      "Content-Type": contentType,
      Accept: "*/*",
    };
  }
  try {
    const result = await axiosInstance.get(url, {
      headers: header,
      params,
    });
    response.data = result.data;
    response.status = [200, 201].includes(result.status);
  } catch (e) {
    response.status = false;
    response.message = "something went wrong";
    response.data = e;
  }
  return response;
};

export const axiosPatch = async (
  url,
  data,
  contentType = "application/json"
) => {
  let response = {};
  let header = {};

  const token = getData("token");
  const userAuth = token?.access_token;
  if (userAuth) {
    header = {
      "Content-Type": contentType,
      Accept: "*/*",
      Authorization: `Bearer ${userAuth}`,
    };
  } else {
    header = {
      "Content-Type": contentType,
      Accept: "*/*",
    };
  }
  try {
    const result = await axiosInstance.patch(url, data, {
      headers: header,
    });
    response = result.data;
    response.status = result.data?.status || [200, 201].includes(result.status);
  } catch (e) {
    response.status = false;
    response.message =
      e?.response?.data?.detail ||
      e?.response?.data?.details ||
      "something went wrong";
    response.data = e;
  }
  return response;
};

export const axiosPut = async (url, data, contentType = "application/json") => {
  let response = {};
  let header = {};
  const token = getData("token");
  const userAuth = token?.access_token;
  if (userAuth) {
    header = {
      "Content-Type": contentType,
      Accept: "*/*",
      Authorization: `Bearer ${userAuth}`,
    };
  } else {
    header = {
      "Content-Type": contentType,
      Accept: "*/*",
    };
  }
  try {
    const result = await axiosInstance.put(url, data, {
      headers: header,
    });
    response = result.data;
    response.status = [200, 201].includes(result.status);
  } catch (e) {
    response.status = false;
    response.message = "something went wrong";
    response.data = e;
  }
  return response;
};

export const axiosDelete = async (
  url,
  data,
  contentType = "application/json"
) => {
  let response = {};
  let header = {};
  const token = getData("token");
  const userAuth = token?.access_token;
  if (userAuth) {
    header = {
      "Content-Type": contentType,
      Accept: "*/*",
      Authorization: `Bearer ${userAuth}`,
    };
  } else {
    header = {
      "Content-Type": contentType,
      Accept: "*/*",
    };
  }
  try {
    const result = await axiosInstance.delete(url, {
      headers: header,
    });
    response = result.data;
    response.status = [200, 201].includes(result.status);
  } catch (e) {
    response.status = false;
    response.message = "something went wrong";
    response.data = e;
  }
  return response;
};

export const axiosGetProductID = async (
  url,
  productid,
  contentType = "application/json"
) => {
  let response = {};
  let header = {};

  const token = getData("token");
  console.log("get__token", token);
  const userAuth = token?.access_token;

  if (userAuth) {
    header = {
      "Content-Type": contentType,
      Accept: "*/*",
      Authorization: `Bearer ${userAuth}`,
    };
  } else {
    header = {
      "Content-Type": contentType,
      Accept: "*/*",
    };
  }
  try {
    const result = await axiosInstance.get(url + productid + "/product", {
      headers: header,
    });
    console.log("result-->======", result);

    response.data = result.data;
    response.status = [200, 201].includes(result.status);
  } catch (e) {
    response.status = false;
    response.message = "something went wrong";
    response.data = e;
  }
  return response;
};
