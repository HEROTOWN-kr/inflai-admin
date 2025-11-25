import React from 'react';
import { Controller } from 'react-hook-form';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

function ReactFormDatePicker(props) {
  const {
    control, name, ...datePickerProps
  } = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Controller
        name={name}
        control={control}
        render={({ ref, ...rest }) => (
          <KeyboardDatePicker
            autoOk
            disableToolbar
                    // disablePast
            margin="normal"
            id={name}
            variant="inline"
            format="yyyy/MM/dd"
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
            {...rest}
            {...datePickerProps}
          />
        )}
      />
    </MuiPickersUtilsProvider>
  );
}


export default ReactFormDatePicker;
