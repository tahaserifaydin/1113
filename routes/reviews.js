const express = require('express');
const router = express.Router();

// Örnek yorum verileri
let reviews = [
  {
    id: 1,
    hotelId: 1,
    userId: 2,
    userName: 'Ahmet Yılmaz',
    rating: 4,
    comment: 'Çok güzel bir otel, hizmet kalitesi yüksek. Tekrar geleceğim.',
    date: new Date('2025-02-15')
  },
  {
    id: 2,
    hotelId: 1,
    userId: 3,
    userName: 'Ayşe Demir',
    rating: 5,
    comment: 'Harika bir konaklama deneyimi! Personel çok ilgiliydi.',
    date: new Date('2025-03-20')
  },
  {
    id: 3,
    hotelId: 2,
    userId: 4,
    userName: 'Mehmet Kaya',
    rating: 3,
    comment: 'Otel güzel ama biraz gürültülüydü. Yine de fiyatına değer.',
    date: new Date('2025-01-10')
  }
];

// Tüm yorumları getir
router.get('/', (req, res) => {
  res.json(reviews);
});

// Belirli bir otelin yorumlarını getir
router.get('/hotel/:hotelId', (req, res) => {
  const hotelReviews = reviews.filter(r => r.hotelId === parseInt(req.params.hotelId));
  res.json(hotelReviews);
});

// Belirli bir yorumu getir
router.get('/:id', (req, res) => {
  const review = reviews.find(r => r.id === parseInt(req.params.id));
  if (!review) {
    return res.status(404).json({ message: 'Yorum bulunamadı' });
  }
  res.json(review);
});

// Yeni yorum ekle
router.post('/', (req, res) => {
  const { hotelId, userId, userName, rating, comment } = req.body;

  const newReview = {
    id: reviews.length + 1,
    hotelId,
    userId,
    userName,
    rating,
    comment,
    date: new Date()
  };

  reviews.push(newReview);
  res.status(201).json(newReview);
});

// Yorum sil
router.delete('/:id', (req, res) => {
  const index = reviews.findIndex(r => r.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Yorum bulunamadı' });
  }

  reviews.splice(index, 1);
  res.json({ message: 'Yorum silindi' });
});

module.exports = router; 