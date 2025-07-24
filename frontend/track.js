async function trackRequest() {
  const requestId = document.getElementById('requestId').value.trim();
  const statusBox = document.getElementById('statusBox');

  if (!requestId) {
    statusBox.style.display = 'block';
    statusBox.innerText = 'Please enter a request ID.';
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/waste/${requestId}`);
    const data = await response.json();

    if (response.ok) {
      statusBox.style.display = 'block';
      statusBox.innerText = `Status: ${data.status}`;
    } else {
      statusBox.style.display = 'block';
      statusBox.innerText = data.message || 'Request not found';
    }
  } catch (error) {
    statusBox.style.display = 'block';
    statusBox.innerText = 'An error occurred. Please try again later.';
  }
}
