import axios, { CancelTokenSource } from 'axios';
import React, { useState } from 'react';

const baseURL = 'https://api.scryfall.com/cards/random';
const parameters = '?q=%28type%3Acreature+type%3Alegendary%29';
interface CardProperties {
  name: string | undefined;
  image_uris: {
    normal: string | undefined;
  }
}

const defaultCard:CardProperties = {
  name: undefined,
  image_uris: {
    normal: undefined,
  },
};

export function GetRandomCommander(): any {
  const [card, setCard]:
      [CardProperties,
        (card: CardProperties) => void
      ] = useState(defaultCard);
  const [loading, setLoading]:
      [boolean, (loading: boolean) => void] = useState<boolean>(false);
  const [error, setError]: [string, (error: string) => void] = useState('');
  const cancelToken = axios.CancelToken;
  const [cancelTokenSource, setCancelTokenSource]:
    [
      CancelTokenSource,
      (cancelTokenSource: CancelTokenSource) => void
    ] = useState(cancelToken.source);

  // useEffect(() => {}, [response]);

  const handleCancelClick = (): void => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel('User cancelled the operation');
    }
  };

  const handleGetCardClick = ():any => {
    let url = baseURL + parameters;
    const colors = (
      document.getElementsByName('colors') as NodeListOf<HTMLInputElement>
    );
    const colorTypes: string[] = [];
    const colorIdentity = '+identity%3D';
    colors.forEach((color) => {
      if (color.checked) {
        if (!colorTypes.includes(colorIdentity)) {
          colorTypes.push(colorIdentity);
        }
        colorTypes.push(`${color.value}`);
      }
    });
    url += [...colorTypes].join('');
    setLoading(true);
    axios
      .get<CardProperties>(
        url,
        {
          timeout: 10000,
          cancelToken: cancelTokenSource.token,
        },
      )
      .then((response) => {
        setCard(response.data);
        setLoading(false);
      })
      .catch(() => {
        const errorResponse = 'An unexpected error has occurred';
        setError(errorResponse);
        setLoading(false);
      });
  };

  return (
    <>
      {loading && (
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      )}
      <form method="GET">
        <fieldset id="colorSelection">
          <legend>Select colors</legend>
          <label htmlFor="color">
            <input type="checkbox" name="colors" value="w" />
            White
          </label>
          <label htmlFor="color">
            <input type="checkbox" name="colors" value="u" />
            Blue
          </label>
          <label htmlFor="color">
            <input type="checkbox" name="colors" value="b" />
            Black
          </label>
          <label htmlFor="color">
            <input type="checkbox" name="colors" value="r" />
            Red
          </label>
          <label htmlFor="color">
            <input type="checkbox" name="colors" value="g" />
            Green
          </label>
        </fieldset>

        <button type="button" onClick={handleGetCardClick}>
          Random Commander
        </button>
      </form>

      <p>{card.name}</p>
      <img src={card.image_uris.normal} alt={card.name} />
      {error && <p>{error}</p>}
    </>
  );
}
