import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tab,
  Tabs,
  Card,
  CardContent,
  Button,
  Rating,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import {
  Person,
  History,
  Comment,
  Star,
} from '@mui/icons-material';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewDialog, setReviewDialog] = useState({
    open: false,
    booking: null,
    rating: 0,
    comment: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
    fetchBookings();
    fetchReviews();
  }, []);

  const fetchUserData = async () => {
    try {
      // TODO: Implement actual API call
      const response = await fetch('/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (err) {
      setError('Kullanıcı bilgileri yüklenirken bir hata oluştu.');
    }
  };

  const fetchBookings = async () => {
    try {
      // TODO: Implement actual API call
      const response = await fetch('/api/user/bookings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (err) {
      setError('Rezervasyonlar yüklenirken bir hata oluştu.');
    }
  };

  const fetchReviews = async () => {
    try {
      // TODO: Implement actual API call
      const response = await fetch('/api/user/reviews', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (err) {
      setError('Değerlendirmeler yüklenirken bir hata oluştu.');
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleReviewDialogOpen = (booking) => {
    setReviewDialog({
      open: true,
      booking,
      rating: 0,
      comment: '',
    });
  };

  const handleReviewDialogClose = () => {
    setReviewDialog({
      open: false,
      booking: null,
      rating: 0,
      comment: '',
    });
  };

  const handleReviewSubmit = async () => {
    try {
      // TODO: Implement actual API call
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          hotelId: reviewDialog.booking.hotelId,
          rating: reviewDialog.rating,
          comment: reviewDialog.comment,
        }),
      });

      if (response.ok) {
        fetchReviews();
        handleReviewDialogClose();
      }
    } catch (err) {
      setError('Değerlendirme gönderilirken bir hata oluştu.');
    }
  };

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Person sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              {user?.username}
            </Typography>
            <Typography color="text.secondary" gutterBottom>
              {user?.email}
            </Typography>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
              Profili Düzenle
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
            >
              <Tab icon={<History />} label="Rezervasyonlar" />
              <Tab icon={<Comment />} label="Değerlendirmeler" />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Grid container spacing={2}>
                {bookings.map((booking) => (
                  <Grid item xs={12} key={booking.id}>
                    <Card>
                      <CardContent>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={8}>
                            <Typography variant="h6">
                              {booking.hotelName}
                            </Typography>
                            <Typography color="text.secondary" gutterBottom>
                              {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2">
                              Oda Tipi: {booking.roomType}
                            </Typography>
                            <Typography variant="body2">
                              Misafir Sayısı: {booking.guests}
                            </Typography>
                            <Typography variant="body2" color="primary">
                              Toplam: ₺{booking.totalPrice}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={4} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {booking.status === 'completed' && !booking.hasReview && (
                              <Button
                                variant="contained"
                                startIcon={<Star />}
                                onClick={() => handleReviewDialogOpen(booking)}
                              >
                                Değerlendir
                              </Button>
                            )}
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Grid container spacing={2}>
                {reviews.map((review) => (
                  <Grid item xs={12} key={review.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {review.hotelName}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Rating value={review.rating} readOnly />
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {new Date(review.date).toLocaleDateString()}
                          </Typography>
                        </Box>
                        <Typography variant="body1">
                          {review.comment}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>

      {/* Review Dialog */}
      <Dialog open={reviewDialog.open} onClose={handleReviewDialogClose}>
        <DialogTitle>Değerlendirme Yap</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <Typography variant="subtitle1">
              {reviewDialog.booking?.hotelName}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Rating
                value={reviewDialog.rating}
                onChange={(event, newValue) => {
                  setReviewDialog(prev => ({
                    ...prev,
                    rating: newValue
                  }));
                }}
              />
            </Box>
            <TextField
              multiline
              rows={4}
              label="Yorumunuz"
              value={reviewDialog.comment}
              onChange={(e) => {
                setReviewDialog(prev => ({
                  ...prev,
                  comment: e.target.value
                }));
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReviewDialogClose}>İptal</Button>
          <Button
            onClick={handleReviewSubmit}
            variant="contained"
            disabled={!reviewDialog.rating || !reviewDialog.comment}
          >
            Gönder
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
