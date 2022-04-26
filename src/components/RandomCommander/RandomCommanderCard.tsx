import React, { useState } from 'react';
import CommanderForm from './CommanderForm';
import { CardProperties } from '../../api/Scryfall';

const RandomCommanderCard = ():JSX.Element => {
  const [card, setCard] = useState<CardProperties | undefined>();
  return (
    <>
      <CommanderForm setCard={setCard} />
      {card
      && (
      <>
        <p>
          <a
            href={card.related_uris?.edhrec}
            target="_blank"
            rel="noreferrer"
          >
            {card?.name}
          </a>
        </p>
        <img src={card?.image_uris?.normal} alt={card?.name} />
      </>
      )}

    </>
  );
};
export default RandomCommanderCard;
