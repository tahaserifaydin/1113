const express = require('express');
const router = express.Router();

// Örnek otel verileri
let hotels = [
  {
    id: 1,
    name: 'Grand Hotel',
    location: 'İstanbul',
    description: 'Şehrin merkezinde lüks bir konaklama deneyimi',
    rating: 4.5,
    price: 1500,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1470&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1470&auto=format&fit=crop'
    ],
    facilities: ['Spa', 'Havuz', 'Fitness Merkezi', 'Restaurant'],
    createdAt: new Date()
  },
  {
    id: 2,
    name: 'Beach Resort',
    location: 'Antalya',
    description: 'Muhteşem plaj manzarasına sahip lüks resort',
    rating: 5,
    price: 2000,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1470&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1570213489059-0aac6626d401?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551918120-9739cb430c6d?q=80&w=1287&auto=format&fit=crop'
    ],
    facilities: ['Plaj', 'Su Sporları', 'Havuz', 'Restaurant', 'Bar'],
    createdAt: new Date()
  },
  {
    id: 3,
    name: 'Mountain Lodge',
    location: 'Bursa, Uludağ',
    description: 'Doğa ile iç içe huzurlu bir tatil',
    rating: 4,
    price: 1200,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1471&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1615880484746-a134be9a6ecf?q=80&w=1528&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?q=80&w=1469&auto=format&fit=crop'
    ],
    facilities: ['Kayak', 'Şömine', 'Restaurant'],
    createdAt: new Date()
  },
  {
    id: 4,
    name: 'Butik Otel',
    location: 'İzmir',
    description: 'Şık ve modern tasarımlı butik otel',
    rating: 4,
    price: 1000,
    image: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?q=80&w=1474&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?q=80&w=1474&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1374&auto=format&fit=crop'
    ],
    facilities: ['Teras Bar', 'Restaurant', 'Lounge', 'Wifi'],
    createdAt: new Date()
  },
  {
    id: 5,
    name: 'Lüks Villa',
    location: 'Bodrum',
    description: 'Özel havuzlu ve deniz manzaralı lüks villa',
    rating: 5,
    price: 3000,
    image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1632&auto=format&fit=crop',
    photos: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1632&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598928636135-d146006ff4be?q=80&w=1470&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581404817268-55eff4406d1e?q=80&w=1369&auto=format&fit=crop'
    ],
    facilities: ['Özel Havuz', 'Jakuzi', 'Bahçe', 'Mangal'],
    createdAt: new Date()
  }
];

// Tüm otelleri getir
router.get('/', (req, res) => {
  res.json(hotels);
});

// Otel detaylarını getir
router.get('/:id', (req, res) => {
  const hotel = hotels.find(h => h.id === parseInt(req.params.id));
  if (!hotel) {
    return res.status(404).json({ message: 'Otel bulunamadı' });
  }
  res.json(hotel);
});

// Yeni otel ekle
router.post('/', (req, res) => {
  const newHotel = {
    id: hotels.length + 1,
    ...req.body,
    createdAt: new Date()
  };

  hotels.push(newHotel);
  res.status(201).json(newHotel);
});

// Otel güncelle
router.put('/:id', (req, res) => {
  const index = hotels.findIndex(h => h.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Otel bulunamadı' });
  }

  hotels[index] = {
    ...hotels[index],
    ...req.body,
    updatedAt: new Date()
  };
  res.json(hotels[index]);
});

// Otel sil
router.delete('/:id', (req, res) => {
  const index = hotels.findIndex(h => h.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Otel bulunamadı' });
  }

  hotels.splice(index, 1);
  res.json({ message: 'Otel silindi' });
});

module.exports = router; 