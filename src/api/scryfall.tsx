import axios from 'axios';
import React from 'react';

export interface CardProperties {
  name?: string;
  image_uris?: {
    normal?: string;
  }
  related_uris?: {
    edhrec?: string;
  }
}

const GetScryfallData = async (
  path: string,
  query?: string,
):Promise<CardProperties> => {
  const baseURL = 'https://api.scryfall.com/';
  const url = baseURL + path + query;
  return ((await axios.get(url, { timeout: 2000 })).data);
};

export default GetScryfallData;
