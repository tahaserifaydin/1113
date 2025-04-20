const express = require('express');
const router = express.Router();

// Örnek şikayet verileri
let complaints = [
  {
    _id: 1,
    name: 'Mehmet Yılmaz',
    email: 'mehmet@example.com',
    hotelName: 'Grand Hotel',
    rating: 2,
    comment: 'Odalar temiz değildi ve personel ilgisizdi. Bir daha tercih etmeyeceğim.',
    createdAt: new Date('2025-03-15')
  },
  {
    _id: 2,
    name: 'Ayşe Demir',
    email: 'ayse@example.com',
    hotelName: 'Beach Resort',
    rating: 3,
    comment: 'Plaj güzeldi ama yemekler kötüydü. Menü yeterince çeşitli değildi.',
    createdAt: new Date('2025-02-22')
  },
  {
    _id: 3,
    name: 'Ali Kaya',
    email: 'ali@example.com',
    hotelName: 'Mountain Lodge',
    rating: 1,
    comment: 'Isıtma sistemi çalışmıyordu ve oda çok soğuktu. Defalarca bildirmemize rağmen düzeltilmedi.',
    createdAt: new Date('2025-04-05')
  }
];

// Tüm şikayetleri getir
router.get('/', (req, res) => {
  res.json(complaints);
});

// Yeni şikayet ekle
router.post('/', (req, res) => {
  const { name, email, hotelName, rating, comment } = req.body;

  const newComplaint = {
    _id: complaints.length + 1,
    name,
    email,
    hotelName,
    rating,
    comment,
    createdAt: new Date()
  };

  complaints.push(newComplaint);
  res.status(201).json({
    success: true,
    message: 'Şikayetiniz başarıyla kaydedildi',
    complaint: newComplaint
  });
});

// Şikayet sil
router.delete('/:id', (req, res) => {
  const index = complaints.findIndex(c => c._id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Şikayet bulunamadı' });
  }

  complaints.splice(index, 1);
  res.json({
    success: true,
    message: 'Şikayet başarıyla silindi'
  });
});

module.exports = router; 