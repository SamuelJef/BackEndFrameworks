const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


async function connect() {
    await mongoose
        .connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Conectado ao banco de dados");
        })
        .catch((err) => {
            console.log(err);
        });
}
connect()