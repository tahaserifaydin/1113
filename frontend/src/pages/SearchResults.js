import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Paper, TextField, Select, MenuItem, FormControl, InputLabel, Slider, Button, Divider } from '@mui/material';
import HotelCard from '../components/HotelCard';
import { useLocation } from 'react-router-dom';
import { useFavorite } from '../contexts/FavoriteContext';

const SearchResults = () => {
  const location = useLocation();
  const { favorites } = useFavorite();
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    priceRange: [0, 5000],
    rating: 0,
    amenities: [],
    sortBy: 'recommended'
  });

  // URL'deki arama parametrelerini al
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const locationParam = searchParams.get('location') || '';
    const priceMin = searchParams.get('priceMin') ? parseInt(searchParams.get('priceMin')) : 0;
    const priceMax = searchParams.get('priceMax') ? parseInt(searchParams.get('priceMax')) : 5000;
    
    setFilters(prev => ({
      ...prev,
      location: locationParam,
      priceRange: [priceMin, priceMax]
    }));
  }, [location.search]);

  // Otelleri yükle
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/hotels');
        if (response.ok) {
          const data = await response.json();
          setHotels(data);
        } else {
          console.error('Oteller yüklenirken bir hata oluştu');
        }
      } catch (error) {
        console.error('Oteller yüklenirken bir hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Filtrelere göre otelleri filtrele
  useEffect(() => {
    if (hotels.length === 0) return;

    let result = [...hotels];

    // Konum filtresi
    if (filters.location) {
      result = result.filter(hotel => 
        hotel.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Fiyat aralığı filtresi
    result = result.filter(hotel => 
      hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1]
    );

    // Yıldız sayısı filtresi
    if (filters.rating > 0) {
      result = result.filter(hotel => Math.floor(hotel.rating) >= filters.rating);
    }

    // Sıralama
    switch(filters.sortBy) {
      case 'priceAsc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'recommended':
      default:
        // Önerilen sıralama - varsayılan olarak rating'e göre
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    setFilteredHotels(result);
  }, [hotels, filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handlePriceChange = (event, newValue) => {
    setFilters({
      ...filters,
      priceRange: newValue
    });
  };

  const handleInteraction = (type) => {
    console.log('User interaction:', type);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Otel Arama Sonuçları
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {filteredHotels.length} otel bulundu
      </Typography>

      <Grid container spacing={4}>
        {/* Filtreler */}
        <Grid item xs={12} md={3}>
          <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Filtreler
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 3 }}>
              <TextField
                label="Konum"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                fullWidth
                size="small"
                variant="outlined"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography gutterBottom>Fiyat Aralığı</Typography>
              <Slider
                value={filters.priceRange}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                min={0}
                max={5000}
                step={100}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">{filters.priceRange[0]} TL</Typography>
                <Typography variant="body2">{filters.priceRange[1]} TL</Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Yıldız Sayısı</InputLabel>
                <Select
                  name="rating"
                  value={filters.rating}
                  label="Yıldız Sayısı"
                  onChange={handleFilterChange}
                >
                  <MenuItem value={0}>Tümü</MenuItem>
                  <MenuItem value={5}>5 Yıldız</MenuItem>
                  <MenuItem value={4}>4 Yıldız ve üzeri</MenuItem>
                  <MenuItem value={3}>3 Yıldız ve üzeri</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Sıralama</InputLabel>
                <Select
                  name="sortBy"
                  value={filters.sortBy}
                  label="Sıralama"
                  onChange={handleFilterChange}
                >
                  <MenuItem value="recommended">Önerilen</MenuItem>
                  <MenuItem value="priceAsc">Fiyat - Artan</MenuItem>
                  <MenuItem value="priceDesc">Fiyat - Azalan</MenuItem>
                  <MenuItem value="rating">Değerlendirme</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button variant="contained" color="primary" fullWidth>
              Filtreleri Uygula
            </Button>
          </Paper>
        </Grid>

        {/* Otel Listesi */}
        <Grid item xs={12} md={9}>
          {loading ? (
            <Typography>Oteller yükleniyor...</Typography>
          ) : filteredHotels.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" gutterBottom>
                Arama kriterlerinize uygun otel bulunamadı.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lütfen farklı bir arama kriteri deneyin.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredHotels.map((hotel) => (
                <Grid item key={hotel.id} xs={12}>
                  <HotelCard 
                    hotel={{
                      ...hotel,
                      amenities: hotel.facilities || []
                    }} 
                    onInteraction={handleInteraction}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SearchResults;
