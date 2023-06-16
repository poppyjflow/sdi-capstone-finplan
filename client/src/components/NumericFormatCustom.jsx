import React, { useState } from 'react';
//import React from 'react';
import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';

// This puts the commas in each number.
const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
  props,
  ref,
) {

  const { onChange, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      valueIsNumericString
    // prefix="$"
    />
  );
});

NumericFormatCustom.propTypes = {
  // name: PropTypes.string.isRequired,
  // onChange: PropTypes.func.isRequired,
};

export default NumericFormatCustom;
