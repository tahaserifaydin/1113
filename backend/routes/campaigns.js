const express = require('express');
const router = express.Router();

// Örnek kampanya verileri
let campaigns = [
  {
    id: '1',
    title: 'Yaz Tatili Erken Rezervasyon Fırsatı',
    description: 'Yaz tatilinizi şimdiden planlayın, %25 indirim fırsatını kaçırmayın! Erken rezervasyon avantajlarıyla dream tatilinize şimdiden yer ayırın.',
    discount: 25,
    startDate: '2024-04-01',
    endDate: '2024-05-31',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1173&q=80'
  },
  {
    id: '2',
    title: 'Balayı Paketi',
    description: 'Özel anlarınızı unutulmaz kılacak balayı paketimizle sevdiğinizle romantik bir kaçamak yapın. Şampanya, spa ve özel akşam yemeği dahil.',
    discount: 15,
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: '3',
    title: 'Hafta Sonu Kaçamakları',
    description: 'Yoğun geçen bir haftanın ardından kendinizi şımartın. 2 gece konaklamalarda %20 indirim ve ücretsiz kahvaltı.',
    discount: 20,
    startDate: '2024-03-01',
    endDate: '2024-06-30',
    image: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80'
  }
];

// Tüm kampanyaları getir
router.get('/', (req, res) => {
  res.json(campaigns);
});

// Belirli bir kampanyayı getir
router.get('/:id', (req, res) => {
  const campaign = campaigns.find(c => c.id === req.params.id);
  if (!campaign) {
    return res.status(404).json({ message: 'Kampanya bulunamadı' });
  }
  res.json(campaign);
});

// Yeni kampanya ekle
router.post('/', (req, res) => {
  const newCampaign = {
    id: (campaigns.length + 1).toString(),
    ...req.body
  };
  
  campaigns.push(newCampaign);
  res.status(201).json(newCampaign);
});

// Kampanya güncelle
router.put('/:id', (req, res) => {
  const index = campaigns.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Kampanya bulunamadı' });
  }
  
  campaigns[index] = {
    ...campaigns[index],
    ...req.body
  };
  
  res.json(campaigns[index]);
});

// Kampanya sil
router.delete('/:id', (req, res) => {
  const index = campaigns.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Kampanya bulunamadı' });
  }
  
  campaigns.splice(index, 1);
  res.json({ message: 'Kampanya başarıyla silindi' });
});

module.exports = router; 