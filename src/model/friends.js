import mongoose from 'mongoose';

export const Friends = mongoose.model('friends', {
    name: {
        type: String,
        trim: true,
        required: true,
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true,

    }
})