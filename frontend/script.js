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
    const res = await fetch('/api/waste', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    responseMsg.textContent = `✅ Request submitted successfully! Your Request ID is: ${result.requestId}`;
    form.reset();
  } catch (err) {
    responseMsg.textContent = "❌ Error submitting request.";
    console.error(err);
  }
});



