import React from 'react';

const ColorLabel = ({
  id = 'Default',
  inputName = 'colors',
  value = 'Default',
}): JSX.Element => (
  <label htmlFor="color">
    <input
      id={id}
      type="checkbox"
      name={inputName}
      value={value}
    />
  </label>
);

export default ColorLabel;