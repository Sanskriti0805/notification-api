const mongoose = require('mongoose');

async function main() {
    const connection = mongoose.connection;

    connection.on('connected', () => {
        console.log('Connected to DB');
    });

    connection.on('error', (error) => {
        console.error('Connection error:', error);
    });

    connection.on('disconnected', () => {
        console.log('Disconnected from DB');
    });

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.error('Database connection failed:', err);
    }
}

module.exports = main;
