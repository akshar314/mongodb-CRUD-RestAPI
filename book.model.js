var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookSchema = new Schema({

    title: String,

    published: {
        type: Date,
        default: Date.now
    },

    keywords: Array,

    published: Boolean,

    author: {
        type: Schema.Objectid,
        ref: 'User'


    },
    detail: {
        modelNumber: Number,
        hardcover: Boolean,
        reviews: Number,
        rank: Number

    }

});


module.exports = mongoose.model('Books', BookSchema);
