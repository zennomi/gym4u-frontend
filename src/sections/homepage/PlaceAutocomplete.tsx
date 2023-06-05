import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import Iconify from '../../components/Iconify';
import { queryPlaces } from '../../api/place';
import { useNavigate } from 'react-router';
import { PATH_PAGE } from '../../routes/paths';

interface MainTextMatchedSubstrings {
    offset: number;
    length: number;
}
interface StructuredFormatting {
    main_text: string;
    secondary_text: string;
    main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
    description: string;
    structured_formatting: StructuredFormatting;
    objectId: string;
    name: string;
    location: {
        "__type": "GeoPoint";
        latitude: number;
        longitude: number;
    };
    country: string;
}

export default function PlaceAutocomplete() {
    const [value, setValue] = React.useState<PlaceType | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
    const navigate = useNavigate()
    const fetch = React.useMemo(
        () =>
            debounce(
                (
                    input: string,
                    callback: (results?: readonly PlaceType[]) => void,
                ) => {
                    // (autocompleteService.current as any).getPlacePredictions(
                    //     request,
                    //     callback,
                    // );
                    queryPlaces(input).then(callback)
                },
                400,
            ),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch(inputValue, (results?: readonly PlaceType[]) => {
            if (active) {
                let newOptions: readonly PlaceType[] = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    React.useEffect(() => {
        if (value) navigate(`${PATH_PAGE.gymList}?lat=${value.location.latitude}&lnt=${value.location.longitude}`)
    }, [value])

    return (
        <Autocomplete
            id="google-map-demo"
            getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.name
            }
            filterOptions={(x) => x}
            options={options}
            autoComplete
            fullWidth
            includeInputInList
            filterSelectedOptions
            value={value}
            noOptionsText="No locations"
            onChange={(event: any, newValue: PlaceType | null) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label="場所" fullWidth />
            )}
            renderOption={(props, option) => {
                const regex = new RegExp(inputValue, "ig");
                const matches =
                    [...option.name.matchAll(regex)] || [];
                const parts: any[] = parse(
                    option.name,
                    matches.map((match: any) => [match.index, match.index + match[0].length]),
                );

                return (
                    <li {...props}>
                        <Grid container alignItems="center">
                            <Grid item sx={{ display: 'flex', width: 44 }}>
                                <Iconify width="100%" icon="carbon:location-filled" sx={{ color: 'text.secondary' }} />
                            </Grid>
                            <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                                {parts.map((part, index) => (
                                    <Box
                                        key={index}
                                        component="span"
                                        sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                                    >
                                        {part.text}
                                    </Box>
                                ))}
                                <Typography variant="body2" color="text.secondary">
                                    {option.name}, {option.country}
                                </Typography>
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
}