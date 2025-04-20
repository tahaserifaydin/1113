const express = require('express');
const router = express.Router();

// Örnek favori verileri
let favorites = [];

// Kullanıcının favorilerini getir
router.get('/user/:userId', (req, res) => {
  const userFavorites = favorites.filter(f => f.userId === parseInt(req.params.userId));
  res.json(userFavorites);
});

// Favori ekle
router.post('/', (req, res) => {
  const { userId, hotelId } = req.body;

  // Kullanıcının zaten bu oteli favorilere ekleyip eklemediğini kontrol et
  const existingFavorite = favorites.find(
    f => f.userId === userId && f.hotelId === hotelId
  );

  if (existingFavorite) {
    return res.status(400).json({
      message: 'Bu otel zaten favorilerinizde'
    });
  }

  const newFavorite = {
    id: favorites.length + 1,
    userId,
    hotelId,
    createdAt: new Date()
  };

  favorites.push(newFavorite);
  res.status(201).json({
    success: true,
    message: 'Otel favorilere eklendi',
    favorite: newFavorite
  });
});

// Favori sil
router.delete('/:id', (req, res) => {
  const index = favorites.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Favori bulunamadı' });
  }

  favorites.splice(index, 1);
  res.json({
    success: true,
    message: 'Otel favorilerden çıkarıldı'
  });
});

module.exports = router; 