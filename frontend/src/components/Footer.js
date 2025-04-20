import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <Box component="footer" className="footer">
      <Container maxWidth="lg">
        <Box className="footer-content">
          <Box className="footer-section">
            <Typography variant="h6" className="footer-title">Tatilim</Typography>
            <Typography variant="body2" className="footer-text">
              Seyahat etmek hiç bu kadar kolay olmamıştı. En iyi otel fırsatlarını keşfedin.
            </Typography>
          </Box>
          
          <Box className="footer-section">
            <Typography variant="h6" className="footer-title">Hızlı Bağlantılar</Typography>
            <Link href="/" className="footer-link">Ana Sayfa</Link>
            <Link href="/search" className="footer-link">Oteller</Link>
            <Link href="/favorites" className="footer-link">Favorilerim</Link>
            <Link href="/profile" className="footer-link">Profilim</Link>
          </Box>
          
          <Box className="footer-section">
            <Typography variant="h6" className="footer-title">İletişim</Typography>
            <Typography variant="body2" className="footer-text">Email: iletisim@tatilim.com</Typography>
            <Typography variant="body2" className="footer-text">Telefon: +90 (212) 123 4567</Typography>
            <Typography variant="body2" className="footer-text">Adres: İstanbul, Türkiye</Typography>
          </Box>
        </Box>
        
        <Box className="footer-bottom">
          <Typography variant="body2" align="center">
            &copy; {new Date().getFullYear()} Tatilim. Tüm hakları saklıdır.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
