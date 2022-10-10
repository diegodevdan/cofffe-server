const {Schema, model} = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required'],
    },
    image: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        enum: ['USER_ROL', 'ADMIN_ROL', 'SALES_ROL']
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    }
})

UserSchema.methods.toJSON = function(){
    const {__v, password,_id, ...user } = this.toObject();
    // return user;

    //You know what it means
    return {uid:_id,...user};
}

module.exports = model('User',UserSchema);