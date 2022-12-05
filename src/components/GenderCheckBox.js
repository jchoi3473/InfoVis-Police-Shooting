import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function GenderCheckBox(props) {

  const { M, F } = props.gender;
//   const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
      <FormControl sx={{ m: 2 }} component="fieldset" variant="standard" style ={{margin: '0'}}>
        <FormLabel component="legend">Assign Gender</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={M} onChange={props.handleChange} name="M" />
            }
            label="Male"
          />
          <FormControlLabel
            control={
              <Checkbox checked={F} onChange={props.handleChange} name="F" />
            }
            label="Female"
          />
        </FormGroup>
      </FormControl>
  );
}