const WasteRequest = require('../models/WasteRequest');

// POST /api/waste
exports.createWasteRequest = async (req, res) => {
  try {
    const request = new WasteRequest(req.body);
    const savedRequest = await request.save();
    res.status(201).json(savedRequest);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /api/waste
exports.getAllWasteRequests = async (req, res) => {
  try {
    const requests = await WasteRequest.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /api/waste/:id
exports.updateWasteStatus = async (req, res) => {
  try {
    const request = await WasteRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.status(200).json(request);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/waste/:id
exports.deleteWasteRequest = async (req, res) => {
  try {
    await WasteRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Request deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/waste/:id
exports.getWasteRequestById = async (req, res) => {
  try {
    const request = await WasteRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.status(200).json(request);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
