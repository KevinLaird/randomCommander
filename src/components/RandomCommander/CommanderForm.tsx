import React from 'react';
import ColorLabel from './ColorLabel';
import GetScryfallData, { CardProperties } from '../../api/Scryfall';

interface ChildProps {
  setCard: (data:CardProperties) => void
}

const CommanderForm: React.FC<ChildProps> = ({ setCard }):JSX.Element => {
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
    const path = '/cards/random';
    const query = `?q=%28type%3Acreature+type%3Alegendary%29
      ${[...colorTypes].join('')}`;
    const GetData = await GetScryfallData(path, query)
      .then((result) => result);
    setCard(GetData);
  };
  return (
    <div>
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
    </div>
  );
};

export default CommanderForm;
