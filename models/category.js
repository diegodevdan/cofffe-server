const {Schema, model} = require('mongoose');

const CategorySchema = Schema({
    name:{
        type: String,
        required: [true, 'The name is required'],
        unique: true
    },
    state:{
        type: Boolean,
        default: true,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
})


CategorySchema.methods.toJSON = function(){
    const {__v ,_id, state, ...category } = this.toObject();
    // return category;

    //You know what it means
    return {id:_id,...category};
}

module.exports = model('Category',CategorySchema)