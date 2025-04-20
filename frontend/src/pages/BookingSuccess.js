import React from 'react';
import { Box, Typography, Paper, Button, Container, Divider } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link, useLocation } from 'react-router-dom';

const BookingSuccess = () => {
  const location = useLocation();
  const bookingData = location.state?.bookingData || {
    hotelName: 'Otel',
    checkIn: new Date().toLocaleDateString(),
    checkOut: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    guests: 2,
    totalPrice: 1500,
    bookingId: 'BK' + Math.floor(Math.random() * 10000)
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 72, mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Rezervasyonunuz Başarıyla Tamamlandı!
            </Typography>
            <Typography variant="body1" color="text.secondary" align="center">
              Rezervasyon detaylarınız aşağıda yer almaktadır.
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Rezervasyon Bilgileri
            </Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, my: 2 }}>
              <Typography variant="body1" color="text.secondary">
                Rezervasyon Numarası:
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {bookingData.bookingId}
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                Otel:
              </Typography>
              <Typography variant="body1">
                {bookingData.hotelName}
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                Giriş Tarihi:
              </Typography>
              <Typography variant="body1">
                {bookingData.checkIn}
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                Çıkış Tarihi:
              </Typography>
              <Typography variant="body1">
                {bookingData.checkOut}
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                Misafir Sayısı:
              </Typography>
              <Typography variant="body1">
                {bookingData.guests} kişi
              </Typography>
              
              <Typography variant="body1" color="text.secondary">
                Toplam Fiyat:
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                {bookingData.totalPrice} TL
              </Typography>
            </Box>
          </Box>

          <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Rezervasyonunuz ile ilgili tüm detaylar e-posta adresinize gönderilmiştir. 
              Sorularınız için lütfen müşteri hizmetlerimizle iletişime geçin.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              component={Link}
              to="/"
              variant="outlined"
              color="primary"
            >
              Ana Sayfaya Dön
            </Button>
            <Button
              component={Link}
              to="/profile"
              variant="contained"
              color="primary"
            >
              Rezervasyonlarım
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default BookingSuccess; 