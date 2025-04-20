import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Paper, 
  InputBase, 
  IconButton, 
  Grid, 
  Button, 
  Box, 
  Autocomplete, 
  TextField,
  Typography,
  Popper,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import { hotels, cities, popularDestinations } from '../data/hotels';

dayjs.locale('tr');

const SearchBar = ({ initialValues }) => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(initialValues?.location || '');
  const [checkIn, setCheckIn] = useState(initialValues?.checkIn ? dayjs(initialValues.checkIn) : dayjs());
  const [checkOut, setCheckOut] = useState(initialValues?.checkOut ? dayjs(initialValues.checkOut) : dayjs().add(1, 'day'));
  const [guests, setGuests] = useState(initialValues?.guests || 2);
  const [searchOptions, setSearchOptions] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Otel isimleri ve şehirleri birleştirerek arama seçenekleri oluştur
  useEffect(() => {
    const hotelOptions = hotels.map(hotel => ({
      type: 'hotel',
      label: hotel.name,
      location: hotel.location,
      id: hotel.id
    }));

    const cityOptions = cities.map(city => ({
      type: 'city',
      label: city,
      location: `${city}, Türkiye`
    }));

    const destinationOptions = popularDestinations.map(dest => ({
      type: 'destination',
      label: dest,
      location: `${dest}, Türkiye`,
      popular: true
    }));

    setSearchOptions([...hotelOptions, ...cityOptions, ...destinationOptions]);
  }, []);

  const handleSearch = () => {
    const searchParams = {
      location,
      checkIn: checkIn.format('YYYY-MM-DD'),
      checkOut: checkOut.format('YYYY-MM-DD'),
      guests
    };
    
    // Arama sonuçları sayfasına yönlendir
    navigate('/search-results', { 
      state: searchParams,
      search: `?location=${encodeURIComponent(location)}&checkIn=${searchParams.checkIn}&checkOut=${searchParams.checkOut}&guests=${guests}`
    });
  };

  // Özel Popper bileşeni
  const CustomPopper = function (props) {
    return (
      <Popper
        {...props}
        placement="bottom-start"
        style={{ width: props.style.width }}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="tr">
      <Paper
        elevation={3}
        sx={{
          p: 2,
          maxWidth: 900,
          mx: 'auto',
          mt: 4,
          borderRadius: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <Autocomplete
              freeSolo
              options={searchOptions}
              PopperComponent={CustomPopper}
              groupBy={(option) => option.type === 'hotel' ? 'Oteller' : option.type === 'destination' ? 'Popüler Tatil Bölgeleri' : 'Şehirler'}
              getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
              renderOption={(props, option) => (
                <Box component="li" {...props} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <LocationOnIcon sx={{ color: 'primary.main', mr: 1, fontSize: 20 }} />
                    <Box>
                      <Typography variant="body1">{option.label}</Typography>
                      {option.location && (
                        <Typography variant="body2" color="text.secondary" fontSize="small">
                          {option.location}
                        </Typography>
                      )}
                    </Box>
                    {option.popular && (
                      <Chip 
                        label="Popüler" 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                        sx={{ ml: 'auto', fontSize: '0.7rem' }}
                      />
                    )}
                  </Box>
                </Box>
              )}
              onInputChange={(event, newValue) => {
                setLocation(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Nereye gitmek istiyorsunuz?"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                    ),
                  }}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
              )}
            />
            {isSearchFocused && (
              <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                <Typography variant="caption" color="text.secondary" sx={{ width: '100%', mb: 0.5 }}>
                  Popüler Aramalar:
                </Typography>
                {popularDestinations.slice(0, 3).map((dest, index) => (
                  <Chip
                    key={index}
                    label={dest}
                    size="small"
                    onClick={() => setLocation(dest)}
                    sx={{ fontSize: '0.7rem' }}
                  />
                ))}
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker
              label="Giriş Tarihi"
              value={checkIn}
              onChange={(newValue) => setCheckIn(newValue)}
              minDate={dayjs()}
              format="DD MMMM YYYY"
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <DatePicker
              label="Çıkış Tarihi"
              value={checkOut}
              onChange={(newValue) => setCheckOut(newValue)}
              minDate={checkIn.add(1, 'day')}
              format="DD MMMM YYYY"
              sx={{
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  borderRadius: 1,
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: 1, p: 1 }}>
              <PersonIcon sx={{ color: 'action.active', mr: 1 }} />
              <InputBase
                placeholder="Misafir Sayısı"
                fullWidth
                type="number"
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                inputProps={{ min: 1, max: 10 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={1}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                py: 1.5,
                backgroundColor: '#007fad',
                '&:hover': {
                  backgroundColor: '#006990',
                },
              }}
              onClick={handleSearch}
            >
              Ara
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};

export default SearchBar;
