const express = require('express');
const router = express.Router();

// Örnek geribildirim verileri
let feedbacks = [];

// Tüm geribildirimleri getir
router.get('/', (req, res) => {
  res.json(feedbacks);
});

// Belirli bir kullanıcının geribildirimleri
router.get('/user/:userId', (req, res) => {
  const userFeedbacks = feedbacks.filter(f => f.userId === parseInt(req.params.userId));
  res.json(userFeedbacks);
});

// Yeni geribildirim ekle
router.post('/', (req, res) => {
  const { userId, userName, email, subject, message } = req.body;

  const newFeedback = {
    id: feedbacks.length + 1,
    userId,
    userName: userName || 'Anonim',
    email,
    subject,
    message,
    status: 'open',
    createdAt: new Date()
  };

  feedbacks.push(newFeedback);
  res.status(201).json({
    success: true,
    message: 'Geribildiriminiz başarıyla gönderildi',
    feedback: newFeedback
  });
});

// Geribildirim güncelle
router.put('/:id', (req, res) => {
  const index = feedbacks.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Geribildirim bulunamadı' });
  }

  feedbacks[index] = {
    ...feedbacks[index],
    ...req.body,
    updatedAt: new Date()
  };
  res.json({
    success: true,
    message: 'Geribildirim başarıyla güncellendi',
    feedback: feedbacks[index]
  });
});

// Geribildirim sil
router.delete('/:id', (req, res) => {
  const index = feedbacks.findIndex(f => f.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Geribildirim bulunamadı' });
  }

  feedbacks.splice(index, 1);
  res.json({
    success: true,
    message: 'Geribildirim başarıyla silindi'
  });
});

module.exports = router; 