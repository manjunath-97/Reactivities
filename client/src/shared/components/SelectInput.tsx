import {  FieldValues, UseControllerProps, useController,} from 'react-hook-form'
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { SelectInputProps } from '@mui/material/Select/SelectInput';


type Props<T extends FieldValues> = {
        items: { text: string, value: string }[]
        label: string
    } & UseControllerProps<T> & Partial<SelectInputProps>;

export default function SelectInput<T extends FieldValues>( props : Props<T>)
{
    const { field, fieldState } = useController({ ...props });

    return (
        <FormControl fullWidth error={!!fieldState.error} >
            <InputLabel> {props.label} </InputLabel>
            <Select
                value={field.value || ''}
                label={props.label}
                onChange={field.onChange}
                onBlur={field.onBlur}
                variant="outlined">
                {
                    props.items.map(item =>
                    (<MenuItem key={item.value} value={item.text} >
                        {item.text}
                    </MenuItem>))
                }
            </Select>
            <FormHelperText>{fieldState.error?.message || ""}</FormHelperText>
        </FormControl>
    );
}