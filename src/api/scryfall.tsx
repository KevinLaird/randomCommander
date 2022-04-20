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
  related_uris: {
    edhrec: string | undefined;
  }
}

function ColorsLabel({ id = 'default', value = 'default' }):any {
  return (
    <label htmlFor="color">
      <input
        id={id}
        type="checkbox"
        name="colors"
        value={value}
      />
    </label>
  );
}

const defaultCard:CardProperties = {
  name: undefined,
  image_uris: {
    normal: undefined,
  },
  related_uris: {
    edhrec: undefined,
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
          <ColorsLabel id="checkbox-white" value="w" />
          <ColorsLabel id="checkbox-blue" value="u" />
          <ColorsLabel id="checkbox-black" value="b" />
          <ColorsLabel id="checkbox-red" value="r" />
          <ColorsLabel id="checkbox-green" value="g" />
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
      <p>
        <a
          href={card.related_uris.edhrec}
          target="_blank"
          rel="noreferrer"
        >
          {card.name}
        </a>
      </p>
      <img src={card.image_uris.normal} alt={card.name} />
      {error && <p>{error}</p>}

    </>
  );
}
