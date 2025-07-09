console.log("✅ leaveRoutes is loaded and active");

const express = require('express');
const Leave = require('../models/Leave');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);

// ✅ APPLY for leave
router.post('/apply', async (req, res) => {
  try {
    const { leaveType, fromDate, toDate, reason } = req.body;
    if (!leaveType || !fromDate || !toDate || !reason) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const leave = new Leave({
      leaveType,
      fromDate,
      toDate,
      reason,
      userId: req.user.id
    });

    await leave.save();
    console.log(`✅ Leave applied: ${leave._id}`);
    res.status(201).json({ message: 'Leave applied successfully', leave });
  } catch (err) {
    console.error('❌ Apply leave error:', err);
    res.status(500).json({ message: 'Server error applying leave' });
  }
});

// ✅ GET pending leaves (admin)
router.get('/pending', async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const leaves = await Leave.find({ status: 'Pending' }).populate('userId', 'name email');
    res.json(leaves);
  } catch (err) {
    console.error('❌ Fetch pending error:', err);
    res.status(500).json({ message: 'Server error fetching pending leaves' });
  }
});

// ✅ GET approved leaves (admin)
router.get('/approved', async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const leaves = await Leave.find({ status: 'Approved' }).populate('userId', 'name email');
    res.json(leaves);
  } catch (err) {
    console.error('❌ Fetch approved error:', err);
    res.status(500).json({ message: 'Server error fetching approved leaves' });
  }
});

// ✅ GET rejected leaves (admin)
router.get('/rejected', async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const leaves = await Leave.find({ status: 'Rejected' }).populate('userId', 'name email');
    res.json(leaves);
  } catch (err) {
    console.error('❌ Fetch rejected error:', err);
    res.status(500).json({ message: 'Server error fetching rejected leaves' });
  }
});

// ✅ APPROVE leave
router.put('/:id/approve', async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status: 'Approved' }, { new: true });
    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    console.log(`✅ Leave approved: ${leave._id}`);
    res.json({ message: 'Leave approved', leave });
  } catch (err) {
    console.error('❌ Approve error:', err);
    res.status(500).json({ message: 'Server error approving leave' });
  }
});

// ✅ REJECT leave
router.put('/:id/reject', async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status: 'Rejected' }, { new: true });
    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    console.log(`✅ Leave rejected: ${leave._id}`);
    res.json({ message: 'Leave rejected', leave });
  } catch (err) {
    console.error('❌ Reject error:', err);
    res.status(500).json({ message: 'Server error rejecting leave' });
  }
});

// ✅ GET balance
router.get('/balance', async (req, res) => {
  try {
    const total = { casual: 14, sick: 12, earned: 9 };
    const leaves = await Leave.find({ userId: req.user.id, status: 'Approved' });

    const used = { casual: 0, sick: 0, earned: 0 };
    leaves.forEach(leave => {
      const days = Math.ceil((new Date(leave.toDate) - new Date(leave.fromDate)) / (1000 * 60 * 60 * 24)) + 1;
      used[leave.leaveType] += days;
    });

    const balance = {
      casual: total.casual - used.casual,
      sick: total.sick - used.sick,
      earned: total.earned - used.earned
    };

    res.json(balance);
  } catch (err) {
    console.error('❌ Balance error:', err);
    res.status(500).json({ message: 'Failed to compute balance' });
  }
});
router.get('/', async (req, res) => {
  try {
    const leaves = await Leave.find({ userId: req.user.id });
    res.json(leaves);
  } catch (err) {
    console.error('Fetch leave history error:', err);
    res.status(500).json({ message: 'Server error fetching leave history' });
  }
});


module.exports = router;
