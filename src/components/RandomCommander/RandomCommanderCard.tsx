import React, { useState } from 'react';
import '../../assets/styles/btn.scss';
import ColorLabel from './ColorLabel';
import GetRandomCommander, {
  CardProperties,
  defaultCard,
} from '../../api/Scryfall';

const RandomCommanderCard = ():JSX.Element => {
  // Handle card state
  const [card, setCard]:
  [
    CardProperties, (card: CardProperties) => void
  ] = useState(defaultCard);

  const handleGetCommanderClick = async ():Promise<void> => {
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
    setCard(await GetRandomCommander(colorTypes));
  };

  return (
    <>
      <form method="GET">
        <fieldset id="colorSelection" className="colorSelection">
          <legend>Select colors</legend>
          <ColorLabel id="checkbox-white" value="w" />
          <ColorLabel id="checkbox-blue" value="u" />
          <ColorLabel id="checkbox-black" value="b" />
          <ColorLabel id="checkbox-red" value="r" />
          <ColorLabel id="checkbox-green" value="g" />
        </fieldset>
        <button
          className="btn btn--default"
          type="button"
          onClick={handleGetCommanderClick}
        >
          Random Commander
        </button>
      </form>
      <p>
        <a
          href={card?.related_uris.edhrec}
          target="_blank"
          rel="noreferrer"
        >
          {card?.name}
        </a>
      </p>
      <img src={card?.image_uris.normal} alt={card?.name} />
    </>

  );
};

export default RandomCommanderCard;
