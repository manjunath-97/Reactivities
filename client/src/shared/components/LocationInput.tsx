import { useMemo, useState, useEffect } from 'react';
import { FieldValues, UseControllerProps, useController, } from 'react-hook-form'
import { Box, debounce, List, ListItemButton, TextField, Typography } from '@mui/material';
import { LocationIQSuggestion } from '../../lib/Types';
import axios from 'axios';

type Props<T extends FieldValues> = {
    label : string
} & UseControllerProps<T>;

export default function LocationInput<T extends FieldValues>( props : Props<T>)
{
    const { field, fieldState } = useController({ ...props });
    const [isLoading, setLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);

    const [inputValue, setInputValue] = useState(field.value || "");


    useEffect(() => {
        if (field.value && typeof field.value === 'object') {
            setInputValue(field.value.venue || "");
        }
        else {
            setInputValue(field.value || "");
        }
    }, [field.value]);



    const LocationApiUrl = 'https://api.locationiq.com/v1/autocomplete?key=pk.1b3e7b295e2bddadacf8768253dded96&q=londin&limit=5&dedupe=1&';

    const fetchSuggestions = useMemo(
		() => debounce(async (query: string)=>{

			if (!query || query.length < 3) {
				setSuggestions([]);
				return;
			}

			setLoading(true);

			try {
				const result = await axios.get<LocationIQSuggestion[]>(`${LocationApiUrl}q=${query}`);
				setSuggestions(result.data);
			}
			catch (error) {
				console.log(error);
			}
			finally {
				setLoading(false);
			}
			
		}, 500), [LocationApiUrl]
	);

    const handleChange = async (value : string ) => {
        field.onChange(value);
        await fetchSuggestions(value);
    }

    const handleSelect = (location: LocationIQSuggestion) => {
        const city = location.address?.city || location.address?.town || location.address?.village ;
        const venue = location.display_name;
        const latitude = location.lat;
        const longitude = location.lon;

        setInputValue(venue);
        field.onChange({ city, venue, latitude, longitude });
        setSuggestions([]);
    }

    return (
        <Box>
            <TextField
                {...props}
                value={inputValue || ""}
                fullWidth
                variant="outlined"
                error={!!fieldState.error}
                helperText={fieldState.error?.message || ""}
                onChange={e => handleChange(e.target.value)}
            />
            {isLoading && <Typography>Loading...</Typography>}
            {suggestions.length > 0 &&
                (
                <List sx={{ border: 1 } }>
                    {
                        suggestions.map(suggestion => (
                            <ListItemButton
                                divider
                                key={suggestion.place_id}
                                onClick={() => handleSelect(suggestion)}
                            >
                                {suggestion.display_name}
                            </ListItemButton>
                        ))
                    }
                </List>
                )   
            }

        </Box>
    );
}