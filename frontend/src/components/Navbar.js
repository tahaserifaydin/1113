import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useFavorite } from '../contexts/FavoriteContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LanguageIcon from '@mui/icons-material/Language';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [languageMenu, setLanguageMenu] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('TR');
  const { user, logout } = useAuth();
  const { favorites } = useFavorite();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLanguageMenuOpen = (event) => {
    setLanguageMenu(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenu(null);
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    handleLanguageMenuClose();
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">Tatilim</Link>
        <div className="left-buttons">
          <Link to="/login" className="nav-button login">Giriş Yap</Link>
          <Link to="/register" className="nav-button register">Üye Ol</Link>
          <div className="language-selector">
            <button 
              className={`lang-button ${selectedLanguage === 'TR' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('TR')}
            >
              TR
            </button>
            <button 
              className={`lang-button ${selectedLanguage === 'EN' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('EN')}
            >
              EN
            </button>
          </div>
        </div>
      </div>
      <div className="navbar-container">
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Ana Sayfa
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/search" className="nav-links">
              Oteller
            </Link>
          </li>
          <li className="nav-item favorites-item">
            <Link to="/favorites" className="nav-links">
              <Badge badgeContent={favorites.length} color="error">
                <FavoriteIcon className="favorite-icon" />
              </Badge>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/admin" className="nav-links admin-link highlight-admin">
              Admin Panel
            </Link>
          </li>
          <li className="nav-item language-item">
            <div className="nav-links" onClick={handleLanguageMenuOpen}>
              <LanguageIcon className="language-icon" />
              <span className="language-text">{selectedLanguage}</span>
            </div>
            <Menu
              anchorEl={languageMenu}
              open={Boolean(languageMenu)}
              onClose={handleLanguageMenuClose}
              className="language-menu"
            >
              <MenuItem onClick={() => handleLanguageChange('TR')}>Türkçe</MenuItem>
              <MenuItem onClick={() => handleLanguageChange('EN')}>English</MenuItem>
              <MenuItem onClick={() => handleLanguageChange('DE')}>Deutsch</MenuItem>
              <MenuItem onClick={() => handleLanguageChange('FR')}>Français</MenuItem>
            </Menu>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <Link to="/profile" className="nav-links">
                  Profilim
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-links logout-btn" onClick={handleLogout}>
                  Çıkış Yap
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links">
                  Giriş Yap
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links">
                  Kayıt Ol
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
