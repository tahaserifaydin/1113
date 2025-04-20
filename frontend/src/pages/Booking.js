import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  CreditCard,
  AccountBalance,
  Payment,
  CreditScore,
  Money,
} from '@mui/icons-material';

const steps = ['Rezervasyon Detayları', 'Ödeme Yöntemi', 'Onay'];

const Booking = () => {
  const { hotelId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [hotel, setHotel] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: location.state?.checkIn || null,
    checkOut: location.state?.checkOut || null,
    guests: location.state?.guests || 1,
    roomType: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    paymentMethod: 'credit_card',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    cardHolderName: '',
    bankTransferInfo: '',
    installmentCount: '',
  });

  useEffect(() => {
    // TODO: Implement actual API call to get hotel details
    setHotel({
      id: hotelId,
      name: 'Luxury Resort & Spa',
      location: 'Antalya, Turkey',
      rooms: [
        {
          type: 'Standart Oda',
          price: 1200,
          capacity: 2,
        },
        {
          type: 'Deluxe Oda',
          price: 1800,
          capacity: 2,
        },
        {
          type: 'Suit Oda',
          price: 2500,
          capacity: 4,
        },
      ],
    });
  }, [hotelId]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (e) => {
    setBookingDetails({
      ...bookingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      // TODO: Implement actual API call for booking
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          hotelId,
          ...bookingDetails,
        }),
      });

      if (response.ok) {
        navigate('/profile');
      } else {
        alert('Rezervasyon oluşturulurken bir hata oluştu.');
      }
    } catch (error) {
      alert('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  const calculateTotalPrice = () => {
    if (!hotel || !bookingDetails.roomType) return 0;
    const room = hotel.rooms.find(r => r.type === bookingDetails.roomType);
    if (!room) return 0;
    
    const checkIn = new Date(bookingDetails.checkIn);
    const checkOut = new Date(bookingDetails.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    return room.price * nights;
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Oda Tipi</FormLabel>
                <RadioGroup
                  name="roomType"
                  value={bookingDetails.roomType}
                  onChange={handleInputChange}
                >
                  {hotel?.rooms.map((room, index) => (
                    <FormControlLabel
                      key={index}
                      value={room.type}
                      control={<Radio />}
                      label={`${room.type} - ₺${room.price}/gece (${room.capacity} kişilik)`}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="İletişim İsmi"
                name="contactName"
                value={bookingDetails.contactName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="E-posta"
                name="contactEmail"
                type="email"
                value={bookingDetails.contactEmail}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Telefon"
                name="contactPhone"
                value={bookingDetails.contactPhone}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Ödeme Bilgileri
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Lütfen tercih ettiğiniz ödeme yöntemini seçin
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend">Ödeme Yöntemi</FormLabel>
                <RadioGroup
                  name="paymentMethod"
                  value={bookingDetails.paymentMethod}
                  onChange={handleInputChange}
                >
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12} md={6}>
                      <Paper 
                        elevation={bookingDetails.paymentMethod === 'credit_card' ? 3 : 1} 
                        sx={{ 
                          p: 2, 
                          border: bookingDetails.paymentMethod === 'credit_card' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                          borderRadius: 2,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <FormControlLabel
                          value="credit_card"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CreditCard sx={{ mr: 1, color: '#1976d2' }} />
                              <Typography variant="subtitle1">Kredi Kartı</Typography>
                            </Box>
                          }
                          sx={{ width: '100%' }}
                        />
                        {bookingDetails.paymentMethod === 'credit_card' && (
                          <Box sx={{ mt: 2, pl: 4 }}>
                            <Grid container spacing={2}>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  label="Kart Üzerindeki İsim"
                                  name="cardHolderName"
                                  value={bookingDetails.cardHolderName}
                                  onChange={handleInputChange}
                                  required
                                  variant="outlined"
                                  size="small"
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  label="Kart Numarası"
                                  name="cardNumber"
                                  value={bookingDetails.cardNumber}
                                  onChange={handleInputChange}
                                  required
                                  variant="outlined"
                                  size="small"
                                  placeholder="1234 5678 9012 3456"
                                  inputProps={{ maxLength: 19 }}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  fullWidth
                                  label="Son Kullanma Tarihi"
                                  name="cardExpiry"
                                  placeholder="AA/YY"
                                  value={bookingDetails.cardExpiry}
                                  onChange={handleInputChange}
                                  required
                                  variant="outlined"
                                  size="small"
                                  inputProps={{ maxLength: 5 }}
                                />
                              </Grid>
                              <Grid item xs={6}>
                                <TextField
                                  fullWidth
                                  label="CVC"
                                  name="cardCVC"
                                  value={bookingDetails.cardCVC}
                                  onChange={handleInputChange}
                                  required
                                  variant="outlined"
                                  size="small"
                                  inputProps={{ maxLength: 3 }}
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        )}
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Paper 
                        elevation={bookingDetails.paymentMethod === 'bank_transfer' ? 3 : 1} 
                        sx={{ 
                          p: 2, 
                          border: bookingDetails.paymentMethod === 'bank_transfer' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                          borderRadius: 2,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <FormControlLabel
                          value="bank_transfer"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <AccountBalance sx={{ mr: 1, color: '#1976d2' }} />
                              <Typography variant="subtitle1">Banka Havalesi</Typography>
                            </Box>
                          }
                          sx={{ width: '100%' }}
                        />
                        {bookingDetails.paymentMethod === 'bank_transfer' && (
                          <Box sx={{ mt: 2, pl: 4 }}>
                            <Card variant="outlined" sx={{ bgcolor: '#f5f5f5' }}>
                              <CardContent>
                                <Typography variant="subtitle2" gutterBottom fontWeight="bold">
                                  Banka Hesap Bilgileri
                                </Typography>
                                <Typography variant="body2">
                                  Banka: TATİLİM Bank
                                </Typography>
                                <Typography variant="body2">
                                  IBAN: TR00 0000 0000 0000 0000 0000 00
                                </Typography>
                                <Typography variant="body2">
                                  Hesap Sahibi: TATİLİM Turizm A.Ş.
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                  * Havale açıklamasına rezervasyon numaranızı yazmayı unutmayın.
                                </Typography>
                              </CardContent>
                            </Card>
                          </Box>
                        )}
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Paper 
                        elevation={bookingDetails.paymentMethod === 'pay_at_hotel' ? 3 : 1} 
                        sx={{ 
                          p: 2, 
                          border: bookingDetails.paymentMethod === 'pay_at_hotel' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                          borderRadius: 2,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <FormControlLabel
                          value="pay_at_hotel"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Money sx={{ mr: 1, color: '#1976d2' }} />
                              <Typography variant="subtitle1">Otelde Ödeme</Typography>
                            </Box>
                          }
                          sx={{ width: '100%' }}
                        />
                        {bookingDetails.paymentMethod === 'pay_at_hotel' && (
                          <Box sx={{ mt: 2, pl: 4 }}>
                            <Typography variant="body2" color="text.secondary">
                              Ödemenizi otele giriş sırasında nakit veya kredi kartı ile yapabilirsiniz.
                            </Typography>
                            <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                              * Yüksek sezon dönemlerinde bu ödeme yöntemi için sınırlı kontenjan bulunmaktadır.
                            </Typography>
                          </Box>
                        )}
                      </Paper>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Paper 
                        elevation={bookingDetails.paymentMethod === 'installment' ? 3 : 1} 
                        sx={{ 
                          p: 2, 
                          border: bookingDetails.paymentMethod === 'installment' ? '2px solid #1976d2' : '1px solid #e0e0e0',
                          borderRadius: 2,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <FormControlLabel
                          value="installment"
                          control={<Radio />}
                          label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <CreditScore sx={{ mr: 1, color: '#1976d2' }} />
                              <Typography variant="subtitle1">Taksitli Ödeme</Typography>
                            </Box>
                          }
                          sx={{ width: '100%' }}
                        />
                        {bookingDetails.paymentMethod === 'installment' && (
                          <Box sx={{ mt: 2, pl: 4 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              Anlaşmalı bankalarla 3, 6 veya 9 taksit seçenekleri mevcuttur.
                            </Typography>
                            <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                              <FormLabel component="legend">Taksit Sayısı</FormLabel>
                              <RadioGroup
                                row
                                name="installmentCount"
                                defaultValue="3"
                              >
                                <FormControlLabel value="3" control={<Radio size="small" />} label="3 Taksit" />
                                <FormControlLabel value="6" control={<Radio size="small" />} label="6 Taksit" />
                                <FormControlLabel value="9" control={<Radio size="small" />} label="9 Taksit" />
                              </RadioGroup>
                            </FormControl>
                            <TextField
                              fullWidth
                              label="Kart Numarası"
                              name="cardNumber"
                              value={bookingDetails.cardNumber}
                              onChange={handleInputChange}
                              required
                              variant="outlined"
                              size="small"
                              sx={{ mt: 1 }}
                            />
                          </Box>
                        )}
                      </Paper>
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Rezervasyon Özeti
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="body1">Otel:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">{hotel?.name}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1">Giriş Tarihi:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {new Date(bookingDetails.checkIn).toLocaleDateString()}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1">Çıkış Tarihi:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {new Date(bookingDetails.checkOut).toLocaleDateString()}
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1">Oda Tipi:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">{bookingDetails.roomType}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1">Misafir Sayısı:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">{bookingDetails.guests}</Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="body1">Ödeme Yöntemi:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {bookingDetails.paymentMethod === 'credit_card' 
                          ? 'Kredi Kartı' 
                          : bookingDetails.paymentMethod === 'bank_transfer'
                          ? 'Banka Havalesi'
                          : bookingDetails.paymentMethod === 'pay_at_hotel'
                          ? 'Otelde Ödeme'
                          : 'Taksitli Ödeme'}
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="h6" color="primary">
                        Toplam Tutar: ₺{calculateTotalPrice()}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        );

      default:
        return 'Unknown step';
    }
  };

  if (!hotel) {
    return <Typography>Yükleniyor...</Typography>;
  }

  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Rezervasyon
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Geri
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
            >
              Rezervasyonu Tamamla
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
            >
              İleri
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Booking;
