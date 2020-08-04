import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RequestContext } from "../../Context/Request";


export default function Asynchronous({fetchFunction, onChange, entity, disableOption}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [text, setText] = React.useState([]);
  const { loading } = React.useContext(RequestContext);
  function handleChange(e){
    setText(e.target.value)
    
  }

  function onInputChange(reason, value){
      console.log(reason)
      switch(reason){
          case "reset":
              onChange(null)
              break;
          case "clear":
              onChange(null)
              break
          case "input":
              if(!value){
                onChange(null)
              }
            break
      }
  }

  React.useEffect(() => {
    let active = true;

    if (loading) {
      return undefined;
    }

    (async () => {
      const response = await fetchFunction(text);
      const data =  response.data;

      if (active) {
        setOptions(data);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, text]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionDisabled={(option) => disableOption.findIndex(id=> option.id === id) > -1}
      onChange={(a, value) => onChange(value?.id)}
      onInputChange={(event, value, reason) => onInputChange(reason,value)}
      getOptionLabel={(option) => option.title || `${option.firstName} ${option.lastName}` }
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label={entity}
          variant="outlined"
          value={text}
          onChange={handleChange}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
