import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
    movie: {
        type: String,
        required: true,
        ref: "Movie"
    },
    ShowDateTime: {
        type: Date,
        required: true,
    },
    showPrice: {
        type: Number,
        required: true
    },
    occupiedSeats: {   // Save in DB even default value is {}
        type: Object,
        default: {}
    }
},{minimize: false})

const Show = mongoose.model("Show",showSchema);

export default Show;