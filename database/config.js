const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al inicializar BD');
    }
} 

module.exports = {
    dbConnection
}