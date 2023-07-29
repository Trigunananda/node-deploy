const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: String,
  price: {
    type: Number,
    min: [0, "Wrong price"],
    required: true,
  },
  discountPercentage: {
    type: Number,
    min: [0, "Wrong min percentage"],
    max: [10, "wrong max percentage"],
  },
  rating: {
    type: Number,
    min: [0, "Wrong min rating"],
    max: [5, "wrong max rating"],
    default: 0,
  },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [String],
});

// model re 2 thing product collection ra scema ye productSchema hone wala he
exports.Product = mongoose.model("Product", productSchema);
