const express = require('express');
const router = express.Router();

// Örnek şikayet verileri
let complaints = [
  {
    _id: '1',
    name: 'Mehmet Yılmaz',
    email: 'mehmet@example.com',
    hotelName: 'Grand Hotel',
    rating: 2,
    comment: 'Oda temizliği yetersizdi ve personel ilgisizdi. Tekrar tercih etmem.',
    createdAt: new Date('2024-04-10')
  },
  {
    _id: '2',
    name: 'Ayşe Demir',
    email: 'ayse@example.com',
    hotelName: 'Lüks Resort',
    rating: 4,
    comment: 'Genel olarak güzeldi, havuz biraz küçüktü ama temizlik ve hizmet iyiydi.',
    createdAt: new Date('2024-03-25')
  },
  {
    _id: '3',
    name: 'Ahmet Kaya',
    email: 'ahmet@example.com',
    hotelName: 'Deniz View Hotel',
    rating: 1,
    comment: 'Fotoğraflardaki gibi değildi, çok gürültülüydü ve yemekler kötüydü. Kesinlikle tavsiye etmem!',
    createdAt: new Date('2024-04-15')
  },
  {
    _id: '4',
    name: 'Zeynep Tekin',
    email: 'zeynep@example.com',
    hotelName: 'Premium Resort',
    rating: 5,
    comment: 'Harika bir tatil deneyimiydi! Personel çok ilgiliydi, odalar temiz ve manzara muhteşemdi. Kesinlikle tekrar geleceğim.',
    createdAt: new Date('2024-04-01')
  },
  {
    _id: '5',
    name: 'Ali Yıldız',
    email: 'ali@example.com',
    hotelName: 'Grand Hotel',
    rating: 3,
    comment: 'Ortalama bir deneyimdi. Kahvaltı çeşitleri artırılabilir. Lokasyon olarak merkeze yakın olması avantajlıydı.',
    createdAt: new Date('2024-03-20')
  }
];

// Tüm şikayetleri getir
router.get('/', (req, res) => {
  res.json(complaints);
});

// Yeni şikayet ekle
router.post('/', (req, res) => {
  const newComplaint = {
    _id: (complaints.length + 1).toString(),
    ...req.body,
    createdAt: new Date()
  };
  
  complaints.push(newComplaint);
  res.status(201).json(newComplaint);
});

// Şikayet sil
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const initialLength = complaints.length;
  
  complaints = complaints.filter(complaint => complaint._id !== id);
  
  if (complaints.length < initialLength) {
    res.json({ message: 'Şikayet başarıyla silindi' });
  } else {
    res.status(404).json({ message: 'Şikayet bulunamadı' });
  }
});

module.exports = router; 