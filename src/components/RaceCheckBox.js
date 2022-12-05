import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function RaceCheckBox(props) {

  const { A,W,H,B,O,N } = props.race;

  return (
      <FormControl sx={{ m: 6 }} component="fieldset" variant="standard" style ={{margin: '0'}}>
        <FormLabel component="legend">Assign Race</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={A} onChange={props.handleChange} name="A" />
            }
            label="Asian"
          />
          <FormControlLabel
            control={
              <Checkbox checked={W} onChange={props.handleChange} name="W" />
            }
            label="White"
          />
          <FormControlLabel
            control={
              <Checkbox checked={H} onChange={props.handleChange} name="H" />
            }
            label="Hispanic"
          />
                    <FormControlLabel
            control={
              <Checkbox checked={B} onChange={props.handleChange} name="B" />
            }
            label="Black"
          />          <FormControlLabel
          control={
            <Checkbox checked={O} onChange={props.handleChange} name="O" />
          }
          label="Others"
/>          <FormControlLabel
        control={
          <Checkbox checked={N} onChange={props.handleChange} name="N" />
        }
        label="Native Americans"
      />  
        </FormGroup>
      </FormControl>
  );
}