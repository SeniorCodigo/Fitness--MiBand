import React, { useState, useEffect } from "react";

import hmacsha1 from "hmacsha1";
import { stringify } from "query-string";
import axios from "axios";

export enum FatsecretFoodType {
  Brand = "Brand",
  Generic = "Generic",
}

export interface FatsecretFood {
  food_id: string;
  food_name: string;
  food_type: FatsecretFoodType;
  food_url: string;
  brand_name?: string;
  food_description?: string;
}

export interface FatsecretResponse {
  foods?: {
    food: FatsecretFood[];
    max_results: number;
    total_results: number;
    page_number: number;
  };
  food?: FatsecretFood;
}
const API_PATH = "https://platform.fatsecret.com/rest/server.api";
const ACCESS_KEY = "295b657fc1a745a9853a1b37325fb9e0";
const APP_SECRET = "d70dd7fb9b8d44f689dc47787df99bff";
const OAUTH_VERSION = "1.0";
const OAUTH_SIGNATURE_METHOD = "HMAC-SHA1";

function getOauthParameters(): object {
  const timestamp = Math.round(new Date().getTime() / 1000);
  return {
    oauth_consumer_key: ACCESS_KEY,
    oauth_nonce: `${timestamp}${Math.floor(Math.random() * 1000)}`,
    oauth_signature_method: OAUTH_SIGNATURE_METHOD,
    oauth_timestamp: timestamp,
    oauth_version: OAUTH_VERSION,
  };
}

function getSignature(queryParams: object, httpMethod = "GET") {
  const signatureBaseString = [
    httpMethod,
    encodeURIComponent(API_PATH),
    encodeURIComponent(stringify(queryParams)),
  ].join("&");
  const signatureKey = `${APP_SECRET}&`;
  return hmacsha1(signatureKey, signatureBaseString);
}

useEffect(() => {
  const consultarApi = async () => {
    const url = "https://platform.fatsecret.com/rest/server.api";
    const resultado = await axios.get(url);
    console.log(resultado);
  };
  consultarApi();
}, []);

function makeApiCall(
  methodParams: object,
  httpMethod = "GET"
): Promise<Response> {
  const queryParams = {
    ...getOauthParameters(),
    ...methodParams,
    format: "json",
  };
  queryParams["oauth_signature"] = getSignature(queryParams, httpMethod);
  return fetch(`${API_PATH}?${stringify(queryParams)}`, { method: httpMethod });
}

export async function searchFood(
  query: string,
  maxResults = 8
): Promise<FatsecretResponse> {
  const methodParams = {
    method: "foods.search",
    max_results: maxResults,
    search_expression: query,
  };
  const response = await makeApiCall(methodParams);
  return response.json();
}

export async function getFood(foodId: string): Promise<FatsecretResponse> {
  const methodParams = {
    method: "food.get",
    food_id: foodId,
  };
  const response = await makeApiCall(methodParams);
  return response.json();
}

import Form from "./Api";

const Yeah = () => {
  return <Form />;
};

export default Yeah;
