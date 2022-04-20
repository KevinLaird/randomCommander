import axios, { CancelTokenSource } from 'axios';
import React, { useState } from 'react';
import './scryfall.scss';
import '../components/btn.scss';

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
          timeout: 2000,
          cancelToken: cancelTokenSource.token,
        },
      )
      .then((response) => {
        setCard(response.data);
        setLoading(false);
      })
      .catch((err) => {
        const errorResponse = 'An unexpected error has occurred';
        console.log(err);
        setError(errorResponse);
        setLoading(false);
      });
  };

  return (
    <>

      <form method="GET">
        <fieldset id="colorSelection" className="colorSelection">
          <legend>Select colors</legend>
          <label htmlFor="color">
            <input
              id="checkbox-white"
              type="checkbox"
              name="colors"
              value="w"
            />
          </label>
          <label htmlFor="color">
            <input
              id="checkbox-blue"
              type="checkbox"
              name="colors"
              value="u"
            />
          </label>
          <label htmlFor="color">
            <input
              id="checkbox-black"
              type="checkbox"
              name="colors"
              value="b"
            />
          </label>
          <label htmlFor="color">
            <input
              id="checkbox-red"
              type="checkbox"
              name="colors"
              value="r"
            />
          </label>
          <label htmlFor="color">
            <input
              id="checkbox-green"
              type="checkbox"
              name="colors"
              value="g"
            />
          </label>

        </fieldset>
        {loading && (
        <div>
          Getting commander...
        </div>
        )}
        {!loading && (
          <button
            className="btn btn--default"
            type="button"
            onClick={handleGetCardClick}
          >
            Random Commander
          </button>
        )}
      </form>

      <p>{card.name}</p>
      <img src={card.image_uris.normal} alt={card.name} />
      {error && <p>{error}</p>}

    </>
  );
}
