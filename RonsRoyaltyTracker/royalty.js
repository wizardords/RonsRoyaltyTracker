<script>
  async function fetchRonsRoyalties() {
    try {
      const response = await fetch('http://localhost:3000/api/rons-royalties');
      const data = await response.json();

      const container = document.getElementById('rons-royalties');
      container.innerHTML = `
        <h2>Ron's Royalty Tracker</h2>
        <p><strong>SOL Balance:</strong> ${data.solBalance} SOL</p>
        <h3>Token Balances:</h3>
      `;

      data.tokens.forEach(token => {
        const tokenElement = document.createElement('div');
        tokenElement.className = 'token';
        tokenElement.innerHTML = `
          <span>${token.tokenName}:</span>
          <span>${token.balance.toFixed(2)} (${token.price.toFixed(2)} USD)</span>
        `;
        container.appendChild(tokenElement);
      });
    } catch (error) {
      console.error('Error fetching royalties:', error);
      document.getElementById('rons-royalties').innerHTML = `
        <p>Failed to load royalty data. Please try again later.</p>
      `;
    }
  }

  fetchRonsRoyalties();
</script>
