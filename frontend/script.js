const form = document.getElementById('wasteForm');
const responseMsg = document.getElementById('responseMsg');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    address: document.getElementById('address').value,
    typeOfWaste: document.getElementById('typeOfWaste').value
  };

  try {
    const res = await fetch('http://localhost:5000/api/waste', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    responseMsg.textContent = "✅ Request submitted successfully!";
    form.reset();
  } catch (err) {
    responseMsg.textContent = "❌ Error submitting request.";
    console.error(err);
  }
});

async function trackRequest() {
    const requestId = document.getElementById("requestIdInput").value.trim();
    const statusDisplay = document.getElementById("statusDisplay");

    if (!requestId) {
        statusDisplay.style.display = 'block';
        statusDisplay.innerText = "❗ Please enter a valid Request ID.";
        return;
    }

    try {
        const res = await fetch(`http://localhost:5000/api/waste/${requestId}`);
        if (!res.ok) throw new Error("Request not found");
        
        const data = await res.json();
        statusDisplay.style.display = 'block';
        statusDisplay.innerText = `📦 Status: ${data.status}`;
    } catch (err) {
        statusDisplay.style.display = 'block';
        statusDisplay.innerText = `❌ Error: ${err.message}`;
    }
}
