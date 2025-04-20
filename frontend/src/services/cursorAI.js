import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cursor-ai';

export const syncHotelsWithCursorAI = async (hotels) => {
  try {
    const response = await axios.post(`${API_URL}/sync-hotels`, { hotels });
    return response.data;
  } catch (error) {
    console.error('Error syncing hotels with Cursor.ai:', error);
    throw error;
  }
};

export const getRecommendations = async (userPreferences) => {
  try {
    const response = await axios.get(`${API_URL}/recommendations`, {
      params: userPreferences
    });
    return response.data;
  } catch (error) {
    console.error('Error getting recommendations from Cursor.ai:', error);
    throw error;
  }
};

export const trackInteraction = async (userId, hotelId, interactionType) => {
  try {
    const response = await axios.post(`${API_URL}/track-interaction`, {
      userId,
      hotelId,
      interactionType
    });
    return response.data;
  } catch (error) {
    console.error('Error tracking interaction with Cursor.ai:', error);
    throw error;
  }
};
