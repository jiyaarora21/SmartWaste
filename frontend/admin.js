// URL of your backend
const API_URL = '/api/waste';

// Fetch and display all waste requests on page load
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const tableBody = document.querySelector('#requestsTable tbody');
    tableBody.innerHTML = ''; // clear previous

    data.forEach((request) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${request._id}</td>
        <td>${request.name}</td>
        <td>${request.address}</td>
        <td>${request.status}</td>
        <td>
          <select onchange="updateStatus('${request._id}', this.value)">
            <option value="">Change</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Collected">Collected</option>
          </select>
        </td>
        <td><button onclick="deleteRequest('${request._id}')">🗑️ Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching requests:', error);
  }
});

// Update status
async function updateStatus(id, newStatus) {
  if (!newStatus) return;
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    if (response.ok) {
      alert('✅ Status updated successfully!');
      location.reload();

    } else {
      throw new Error('Failed to update');
    }
  } catch (error) {
    console.error('Error updating status:', error);
  }
}

// Delete request
async function deleteRequest(id) {
  if (!confirm('Are you sure you want to delete this request?')) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('🗑️ Deleted successfully!');
      location.reload();
    } else {
      throw new Error('Delete failed');
    }
  } catch (error) {
    console.error('Error deleting request:', error);
  }
}

