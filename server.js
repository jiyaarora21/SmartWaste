console.log("🚀 SmartWaste backend starting...");
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');


// ... previous+ code

// ... existing server start code


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

const wasteRoutes = require('./routes/wasteRoutes');
app.use('/api/waste', wasteRoutes);
app.get('/', (req, res) => {
    res.send('🚀 SmartWaste API is running');
});


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch((err) => console.error('❌ MongoDB connection failed:', err));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`🟢 Server is running on port ${PORT}`);
});
