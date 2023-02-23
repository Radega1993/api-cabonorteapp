const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  showname: {
    type: String,
    required: true
},
  price: {
      type: String,
      required: true
  },
  description: {
      type: String,
      required: true
  },
  composition: {
      type: String,
      required: true
  },
  nutritionalAdditives: {
      type: String,
      required: true
  },
  analyticalComponents: {
      type: String,
      required: true
  },
  antioxidantes: {
    type: String,
    required: false
},
  imagenURL: {
    type: String,
    required: true
  }
});

productSchema.method('toJSON', function() {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});


module.exports = mongoose.model('Product', productSchema);
