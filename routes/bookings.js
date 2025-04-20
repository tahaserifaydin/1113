const express = require('express');
const router = express.Router();

// Örnek rezervasyon verileri
let bookings = [];

// Tüm rezervasyonları getir
router.get('/', (req, res) => {
  res.json(bookings);
});

// Belirli bir kullanıcının rezervasyonlarını getir
router.get('/user/:userId', (req, res) => {
  const userBookings = bookings.filter(b => b.userId === parseInt(req.params.userId));
  res.json(userBookings);
});

// Belirli bir rezervasyonu getir
router.get('/:id', (req, res) => {
  const booking = bookings.find(b => b.id === parseInt(req.params.id));
  if (!booking) {
    return res.status(404).json({ message: 'Rezervasyon bulunamadı' });
  }
  res.json(booking);
});

// Yeni rezervasyon ekle
router.post('/', (req, res) => {
  const { hotelId, userId, checkIn, checkOut, guests, totalPrice, paymentMethod } = req.body;

  const newBooking = {
    id: bookings.length + 1,
    hotelId,
    userId,
    checkIn,
    checkOut,
    guests,
    totalPrice,
    paymentMethod,
    status: 'confirmed',
    createdAt: new Date()
  };

  bookings.push(newBooking);
  res.status(201).json({
    success: true,
    message: 'Rezervasyon başarıyla oluşturuldu',
    booking: newBooking
  });
});

// Rezervasyon güncelle
router.put('/:id', (req, res) => {
  const index = bookings.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Rezervasyon bulunamadı' });
  }

  bookings[index] = {
    ...bookings[index],
    ...req.body,
    updatedAt: new Date()
  };
  res.json({
    success: true,
    message: 'Rezervasyon başarıyla güncellendi',
    booking: bookings[index]
  });
});

// Rezervasyon iptal et
router.delete('/:id', (req, res) => {
  const index = bookings.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Rezervasyon bulunamadı' });
  }

  bookings.splice(index, 1);
  res.json({
    success: true,
    message: 'Rezervasyon başarıyla iptal edildi'
  });
});

module.exports = router; 