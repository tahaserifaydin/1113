const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        city: String,
        country: String,
        coordinates: {
            lat: Number,
            lng: Number
        }
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['hotel', 'resort', 'villa', 'apartment'],
        required: true
    },
    stars: {
        type: Number,
        min: 1,
        max: 5
    },
    amenities: [{
        type: String
    }],
    rooms: [{
        type: {
            type: String,
            required: true
        },
        capacity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        available: {
            type: Boolean,
            default: true
        }
    }],
    images: [{
        url: String,
        caption: String
    }],
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: String,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    averageRating: {
        type: Number,
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    priceRange: {
        min: Number,
        max: Number
    }
});

hotelSchema.index({ 'location.city': 1, 'location.country': 1 });
hotelSchema.index({ 'priceRange.min': 1, 'priceRange.max': 1 });
hotelSchema.index({ averageRating: -1 });

module.exports = mongoose.model('Hotel', hotelSchema);
