const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 3000;
app.use(cors());

// Solscan API Key and Wallet Address
const SOLSCAN_API_KEY = process.env.SOLSCAN_API_KEY;
const WALLET_ADDRESS = '45Y2i9ujmHYxrX6GvNC6EjUX57kd9zPw8GFsTLVrTJH5';

// Fetch royalty data
app.get('/api/rons-royalties', async (req, res) => {
  try {
    // Fetch token balances
    const tokenResponse = await axios.get(
      `https://api.solscan.io/account/token?address=${WALLET_ADDRESS}`,
      {
        headers: { token: SOLSCAN_API_KEY },
      }
    );

    // Fetch SOL balance
    const solResponse = await axios.get(
      `https://api.solscan.io/account?address=${WALLET_ADDRESS}`,
      {
        headers: { token: SOLSCAN_API_KEY },
      }
    );

    // Parse results
    const solBalance = solResponse.data.lamports / 1e9; // Convert lamports to SOL
    const tokens = tokenResponse.data.data.map(token => ({
      tokenName: token.tokenName || 'Unknown Token',
      balance: token.tokenAmount.uiAmount || 0,
      price: token.tokenAmount.priceUsd || 0,
    }));

    res.json({ solBalance, tokens });
  } catch (error) {
    console.error('Error fetching royalties:', error.message);
    res.status(500).json({ error: 'Failed to fetch royalties' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
