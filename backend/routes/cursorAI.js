const express = require('express');
const router = express.Router();
const axios = require('axios');
const { CursorAI } = require('cursor-ai-sdk');

// Cursor.ai yapılandırması
const cursorAI = new CursorAI(process.env.CURSOR_AI_API_KEY);

// Otel verilerini Cursor.ai'ye gönder
router.post('/sync-hotels', async (req, res) => {
  try {
    const hotels = req.body.hotels;
    
    // Her otel için Cursor.ai'de kayıt oluştur
    for (const hotel of hotels) {
      await cursorAI.createEntity('hotel', {
        name: hotel.name,
        location: hotel.location,
        rating: hotel.rating,
        price: hotel.price,
        amenities: hotel.amenities,
        image: hotel.image
      });
    }

    res.status(200).json({ message: 'Hotels synced with Cursor.ai successfully' });
  } catch (error) {
    console.error('Error syncing hotels with Cursor.ai:', error);
    res.status(500).json({ error: 'Failed to sync hotels with Cursor.ai' });
  }
});

// Cursor.ai'den otel önerilerini al
router.get('/recommendations', async (req, res) => {
  try {
    const userPreferences = req.query;
    
    // Cursor.ai'den önerileri al
    const recommendations = await cursorAI.getRecommendations('hotel', userPreferences);
    
    res.status(200).json(recommendations);
  } catch (error) {
    console.error('Error getting recommendations from Cursor.ai:', error);
    res.status(500).json({ error: 'Failed to get recommendations' });
  }
});

// Kullanıcı etkileşimlerini Cursor.ai'ye gönder
router.post('/track-interaction', async (req, res) => {
  try {
    const { userId, hotelId, interactionType } = req.body;
    
    // Etkileşimi Cursor.ai'ye gönder
    await cursorAI.trackInteraction({
      userId,
      entityId: hotelId,
      entityType: 'hotel',
      interactionType
    });
    
    res.status(200).json({ message: 'Interaction tracked successfully' });
  } catch (error) {
    console.error('Error tracking interaction with Cursor.ai:', error);
    res.status(500).json({ error: 'Failed to track interaction' });
  }
});

module.exports = router;
