import mongoose from "mongoose";

const subscrSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true,
    },
    expiration_date: {
        type: String,
        required: false,
    },
    product_link: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    time_interval: {
        type: Number,
        required: true,
    }
});



const SubscrModel = mongoose.model('Subscribe', subscrSchema);

export { SubscrModel };
