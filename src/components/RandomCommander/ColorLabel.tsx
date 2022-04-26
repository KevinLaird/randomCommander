import React from 'react';
import './ColorLabel.scss';

const ColorLabel = ({
  id = 'Default',
  inputName = 'colors',
  value = 'Default',
}): JSX.Element => (
  <input
    id={id}
    type="checkbox"
    name={inputName}
    value={value}
  />
);

export default ColorLabel;
