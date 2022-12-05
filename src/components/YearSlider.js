import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useEffect, useState } from 'react';

function valuetext(value) {
  return `${value}`;
}



export default function YearSlider(props) {
  const [value, setValue] = useState([2015,2022])

  const onChange = (event, newValue) =>{
    setValue(newValue);
  }
  useEffect (() =>{
    setValue(props.value)
  },[])

  return (
    <Box sx={{ width: "93%", marginLeft:"10px", marginRight:"20px" }}>
      <Slider
        min = {2015}
        max = {2022}
        getAriaLabel={() => 'Year range'}
        value={value}
        onChange = {onChange}
        onChangeCommitted={props.handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}