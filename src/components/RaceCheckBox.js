import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function RaceCheckBox(props) {

  const { Asian,White,Hispanic,Black,Others,Natives } = props.race;

  return (
      <FormControl sx={{ m: 6 }} component="fieldset" variant="standard" style ={{margin: '0'}}>
        <FormLabel component="legend">Assign Race</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={Asian} onChange={props.handleChange} name="Asian" />
            }
            label="Asian"
          />
          <FormControlLabel
            control={
              <Checkbox checked={White} onChange={props.handleChange} name="White" />
            }
            label="White"
          />
          <FormControlLabel
            control={
              <Checkbox checked={Hispanic} onChange={props.handleChange} name="Hispanic" />
            }
            label="Hispanic"
          />
                    <FormControlLabel
            control={
              <Checkbox checked={Black} onChange={props.handleChange} name="Black" />
            }
            label="Black"
          />          <FormControlLabel
          control={
            <Checkbox checked={Others} onChange={props.handleChange} name="Others" />
          }
          label="Others"
/>          <FormControlLabel
        control={
          <Checkbox checked={Natives} onChange={props.handleChange} name="Natives" />
        }
        label="Native Americans"
      />  
        </FormGroup>
      </FormControl>
  );
}