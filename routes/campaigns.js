const express = require('express');
const router = express.Router();

// Örnek kampanya verileri
let campaigns = [
  {
    id: 1,
    title: "Yaz Tatili Fırsatı",
    description: "Haziran ayında tüm otel rezervasyonlarında %25 indirim",
    discount: 25,
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=1470&auto=format&fit=crop",
    hotels: [1, 2, 3],
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Balayı Özel Paketi",
    description: "Yeni evli çiftlere özel oda + kahvaltı + spa hizmeti",
    discount: 15,
    startDate: "2025-05-01",
    endDate: "2025-12-31",
    image: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?q=80&w=1974&auto=format&fit=crop",
    hotels: [2, 4],
    createdAt: new Date()
  },
  {
    id: 3,
    title: "Erken Rezervasyon İndirimi",
    description: "3 ay önceden rezervasyon yapanlara %30 indirim",
    discount: 30,
    startDate: "2025-05-01",
    endDate: "2025-09-30",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1949&auto=format&fit=crop",
    hotels: [1, 3, 5],
    createdAt: new Date()
  }
];

// Yeni kampanya ekle
router.post('/', (req, res) => {
  const { title, description, discount, startDate, endDate, hotels, image } = req.body;

  const newCampaign = {
    id: campaigns.length + 1,
    title,
    description,
    discount,
    startDate,
    endDate,
    hotels,
    image,
    createdAt: new Date()
  };

  campaigns.push(newCampaign);
  res.status(201).json(newCampaign);
});

// Tüm kampanyaları getir
router.get('/', (req, res) => {
  res.json(campaigns);
});

// Belirli bir kampanyayı getir
router.get('/:id', (req, res) => {
  const campaign = campaigns.find(c => c.id === parseInt(req.params.id));
  if (!campaign) {
    return res.status(404).json({ message: 'Kampanya bulunamadı' });
  }
  res.json(campaign);
});

// Kampanya güncelle
router.put('/:id', (req, res) => {
  const index = campaigns.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Kampanya bulunamadı' });
  }

  campaigns[index] = {
    ...campaigns[index],
    ...req.body,
    updatedAt: new Date()
  };
  res.json(campaigns[index]);
});

// Kampanya sil
router.delete('/:id', (req, res) => {
  const index = campaigns.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Kampanya bulunamadı' });
  }

  campaigns.splice(index, 1);
  res.json({ message: 'Kampanya silindi' });
});

module.exports = router; 