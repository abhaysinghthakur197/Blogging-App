const { Schema, model } = require('mongoose')

// crypto node js package for password hashing
const {createHmac,randomBytes} = require('crypto')
//  *** //

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImageURL: {
        type: String,
        default: './public/default.png',
    },
    role: {
        type: String,
        enum: ["USER","ADMIN"],
        default: "USER",
    }


}, {timestamps: true});

// mongoose pre function
// It is used to save the password in hash form  
userSchema.pre("save", function (next) {
    const user = this;

    if(!user.isModified("password")) return ;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt)
          .update(user.password)
          .digest("hex");

    this.salt = salt;
    this.password = hashedPassword;

    next();

})

// *******  //


const User = model('user',userSchema);

module.exports = User;


