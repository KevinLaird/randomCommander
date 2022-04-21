import axios from 'axios';
import React from 'react';
import '../components/btn.scss';

export interface CardProperties {
  name: string | undefined;
  image_uris: {
    normal: string | undefined;
  }
  related_uris: {
    edhrec: string | undefined;
  }
}

export const defaultCard:CardProperties = {
  name: undefined,
  image_uris: {
    normal: undefined,
  },
  related_uris: {
    edhrec: undefined,
  },
};

const GetRandomCommander = async (
  colorTypes: string[] = [],
):Promise<CardProperties> => {
  const baseURL = 'https://api.scryfall.com/cards/random';
  const parameters = '?q=%28type%3Acreature+type%3Alegendary%29';
  const url = baseURL + parameters + [...colorTypes].join('');
  console.log(url);
  let res = defaultCard;
  await axios.get(url, { timeout: 2000 })
    .then((response) => {
      res = response.data;
    })
    .catch((err) => err);
  return res;
};

export default GetRandomCommander;
