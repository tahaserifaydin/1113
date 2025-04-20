import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Alert,
  CircularProgress,
  Divider,
  Paper
} from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import StarIcon from '@mui/icons-material/Star';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import '../styles/Complaints.css';

const Complaints = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    hotelName: '',
    rating: 0,
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setFormData(prev => ({
      ...prev,
      rating: newValue
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5002/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          hotelName: '',
          rating: 0,
          comment: ''
        });
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Şikayet gönderilirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} className="complaints-container">
        <Box className="complaints-header">
          <FeedbackIcon className="feedback-icon" />
          <Typography variant="h4" component="h1" className="page-title">
            Şikayet ve Yorumlar
          </Typography>
        </Box>
        
        <Typography variant="body1" color="text.secondary" className="description">
          Konaklama deneyiminiz ile ilgili geribildirimlerinizi bizimle paylaşın. Görüşleriniz bizim için önemli.
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        {success && (
          <Alert 
            severity="success" 
            sx={{ mb: 3 }}
            onClose={() => setSuccess(false)}
          >
            Şikayetiniz başarıyla gönderildi. En kısa sürede değerlendireceğiz. Teşekkür ederiz!
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="complaint-form">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Adınız"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                className="form-input"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="E-posta"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                className="form-input"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Otel Adı"
                name="hotelName"
                value={formData.hotelName}
                onChange={handleChange}
                variant="outlined"
                className="form-input"
              />
            </Grid>
            <Grid item xs={12}>
              <Box className="rating-container">
                <Typography variant="body1" className="rating-label">
                  Değerlendirme:
                </Typography>
                <Rating
                  name="rating"
                  value={formData.rating}
                  onChange={handleRatingChange}
                  precision={1}
                  icon={<StarIcon className="star-icon" />}
                  emptyIcon={<StarIcon className="empty-star-icon" />}
                  size="large"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={6}
                label="Yorumunuz"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                variant="outlined"
                placeholder="Lütfen deneyiminiz hakkında detaylı bilgi verin..."
                className="form-input comment-input"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                fullWidth
                className="submit-button"
                endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                size="large"
              >
                {loading ? 'Gönderiliyor...' : 'Gönder'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Complaints; 