const mongoose = require("mongoose");

const FormSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Garante que cada e-mail seja único no banco de dados
    },
    senha: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Form", FormSchema);
