import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  Grid,
  IconButton,
  Divider,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { 
  PersonAdd,
  Google as GoogleIcon, 
  Facebook as FacebookIcon,
  Visibility, 
  VisibilityOff 
} from '@mui/icons-material';
import '../styles/AuthStyles.css';
import logo from '../assets/logo.svg';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleAgreeTerms = (e) => {
    setAgreeTerms(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (!agreeTerms) {
      setError('Devam etmek için kullanım koşullarını kabul etmelisiniz');
      return;
    }

    try {
      // TODO: Implement actual API call for registration
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.');
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  };

  return (
    <div className="auth-container">
      <Paper elevation={0} className="auth-card">
        <Box className="auth-header">
          <Typography component="h1" variant="h4" className="auth-title">
            Üye Ol
          </Typography>
          <Typography component="h2" variant="h5" className="auth-subtitle">
            Tatilim'e Hoş Geldiniz
          </Typography>
        </Box>

        <Box className="auth-form">
          {error && (
            <Alert severity="error" className="auth-error">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              className="auth-input"
              required
              fullWidth
              id="username"
              label="Kullanıcı Adı"
              name="username"
              autoComplete="username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              className="auth-input"
              required
              fullWidth
              id="email"
              label="E-posta Adresi"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              className="auth-input"
              required
              fullWidth
              name="password"
              label="Şifre"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            <TextField
              className="auth-input"
              required
              fullWidth
              name="confirmPassword"
              label="Şifre Tekrar"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            
            <FormControlLabel
              control={
                <Checkbox 
                  checked={agreeTerms} 
                  onChange={handleAgreeTerms} 
                  color="primary" 
                />
              }
              label={
                <Typography variant="body2">
                  <span>Kullanım koşullarını ve </span>
                  <Link component={RouterLink} to="/privacy" className="auth-link" style={{ display: 'inline' }}>
                    gizlilik politikasını
                  </Link>
                  <span> kabul ediyorum</span>
                </Typography>
              }
              sx={{ mb: 2 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="auth-button"
              disabled={!agreeTerms}
            >
              Üye Ol
            </Button>
            
            <div className="auth-divider">veya</div>
            
            <Box className="social-buttons">
              <Button
                variant="contained"
                className="social-button google-button"
                startIcon={<GoogleIcon />}
              >
                Google ile Üye Ol
              </Button>
              <Button
                variant="contained"
                className="social-button facebook-button"
                startIcon={<FacebookIcon />}
              >
                Facebook ile Üye Ol
              </Button>
            </Box>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link component={RouterLink} to="/login" variant="body2" className="auth-link">
                Zaten hesabınız var mı? Giriş yapın
              </Link>
            </Box>
          </form>
        </Box>
      </Paper>
    </div>
  );
};

export default Register;
