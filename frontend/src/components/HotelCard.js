import React, { useState, useEffect } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  Button,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  Snackbar,
  Alert
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import HotelDetailModal from './HotelDetailModal';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const HotelCard = ({ hotel, onInteraction }) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  // Sayfa yüklendiğinde favorileri localStorage'dan kontrol et
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.some(favHotel => favHotel.id === hotel.id));
  }, [hotel.id]);

  const handleOpenDetail = () => {
    setIsDetailModalOpen(true);
    // Detay görüntüleme etkileşimini izle
    onInteraction && onInteraction('view_details');
  };

  const handleCloseDetail = () => {
    setIsDetailModalOpen(false);
  };

  const handleBookingClick = () => {
    // Rezervasyon etkileşimini izle
    onInteraction && onInteraction('book_hotel');
    
    // Otel detay sayfasına yönlendir
    navigate(`/hotel/${hotel.id}`, {
      state: {
        checkIn: dayjs().format('YYYY-MM-DD'),
        checkOut: dayjs().add(1, 'day').format('YYYY-MM-DD'),
        guests: 2
      }
    });
  };

  const handleRatingChange = (value) => {
    // Derecelendirme etkileşimini izle
    onInteraction && onInteraction('rate_hotel');
  };

  const handleFavoriteToggle = () => {
    // Favori durumunu değiştir
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    
    // localStorage'dan mevcut favorileri al
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (newFavoriteStatus) {
      // Favorilere ekle
      const updatedFavorites = [...favorites, hotel];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setSnackbarMessage(`${hotel.name} favorilerinize eklendi`);
      onInteraction && onInteraction('add_to_favorites');
    } else {
      // Favorilerden çıkar
      const updatedFavorites = favorites.filter(favHotel => favHotel.id !== hotel.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setSnackbarMessage(`${hotel.name} favorilerinizden çıkarıldı`);
      onInteraction && onInteraction('remove_from_favorites');
    }
    
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card className="hotel-card hotel-detail-card">
        <CardMedia
          component="img"
          className="hotel-image"
          image={hotel.image}
          alt={hotel.name}
          onClick={() => onInteraction && onInteraction('view_image')}
        />
        <Box className="hotel-content">
          <CardContent className="hotel-content-card">
            <Box className="hotel-header">
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography component="h5" variant="h6">
                    {hotel.name}
                  </Typography>
                  <Tooltip title={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}>
                    <IconButton 
                      onClick={handleFavoriteToggle}
                      color={isFavorite ? "error" : "default"}
                      size="small"
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: 'rgba(211, 47, 47, 0.04)' 
                        } 
                      }}
                    >
                      {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box className="hotel-location">
                  <LocationOnIcon className="location-icon" />
                  <Typography variant="body2" color="text.secondary">
                    {hotel.location}
                  </Typography>
                </Box>
                <Rating 
                  value={hotel.rating} 
                  readOnly 
                  size="small" 
                  className="hotel-rating"
                  onChange={(event, value) => handleRatingChange(value)}
                />
              </Box>
              <Box className="hotel-price">
                <Typography variant="h6" color="primary" className="price-text">
                  ₺{hotel.price}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  gecelik fiyat
                </Typography>
              </Box>
            </Box>
            <Stack direction="row" spacing={1} className="hotel-amenities">
              {hotel.amenities.map((amenity, index) => (
                <Chip 
                  key={index} 
                  label={amenity} 
                  size="small"
                  className="amenity-chip"
                  onClick={() => onInteraction && onInteraction('view_amenity')}
                />
              ))}
            </Stack>
          </CardContent>
          <Box className="hotel-actions">
            <Button variant="contained" className="detail-button" onClick={handleOpenDetail}>
              Detayları Gör
            </Button>
            <Button variant="outlined" className="book-button" onClick={handleBookingClick}>
              Hemen Rezervasyon Yap
            </Button>
          </Box>
        </Box>
      </Card>

      <HotelDetailModal
        open={isDetailModalOpen}
        onClose={handleCloseDetail}
        hotel={hotel}
      />
      
      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={isFavorite ? "success" : "info"} 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HotelCard;
