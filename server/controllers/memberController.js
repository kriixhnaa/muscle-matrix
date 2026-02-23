const Member = require('../models/Member');

// @desc    Add a new member
// @route   POST /api/members
// @access  Private
exports.addMember = async (req, res) => {
  try {
    const { name, phone, plan_type, plan_price, start_date, payment_status } = req.body;

    // Calculate expiry date based on plan type
    const startDate = start_date ? new Date(start_date) : new Date();
    const expiryDate = Member.calculateExpiry(startDate, plan_type);

    const member = await Member.create({
      name,
      phone,
      plan_type,
      plan_price,
      start_date: startDate,
      expiry_date: expiryDate,
      payment_status: payment_status || 'pending',
      gym_id: req.gym_id
    });

    res.status(201).json(member);
  } catch (error) {
    console.error('Add member error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all members for a gym
// @route   GET /api/members
// @access  Private
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find({ gym_id: req.gym_id }).sort({ created_at: -1 });
    res.json(members);
  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get member stats for a gym
// @route   GET /api/members/stats
// @access  Private
exports.getStats = async (req, res) => {
  try {
    const today = new Date();
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    // Get all members for this gym
    const allMembers = await Member.find({ gym_id: req.gym_id });
    
    // Calculate stats
    const total_members = allMembers.length;
    
    const active_members = allMembers.filter(member => {
      const expiry = new Date(member.expiry_date);
      return expiry >= today;
    }).length;

    const expired_members = allMembers.filter(member => {
      const expiry = new Date(member.expiry_date);
      return expiry < today;
    }).length;

    const expiring_soon = allMembers.filter(member => {
      const expiry = new Date(member.expiry_date);
      return expiry >= today && expiry <= sevenDaysFromNow;
    }).length;

    // Calculate total revenue (only paid memberships)
    const total_revenue = allMembers
      .filter(member => member.payment_status === 'paid')
      .reduce((sum, member) => sum + (member.plan_price || 0), 0);

    res.json({
      total_members,
      active_members,
      expired_members,
      expiring_soon,
      total_revenue
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update a member
// @route   PUT /api/members/:id
// @access  Private
exports.updateMember = async (req, res) => {
  try {
    const { name, phone, plan_type, plan_price, start_date, payment_status } = req.body;

    // Find member and ensure it belongs to this gym
    let member = await Member.findOne({ _id: req.params.id, gym_id: req.gym_id });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    // If plan_type or start_date changed, recalculate expiry
    let expiryDate = member.expiry_date;
    if (plan_type || start_date) {
      const newStartDate = start_date ? new Date(start_date) : new Date(member.start_date);
      const newPlanType = plan_type || member.plan_type;
      expiryDate = Member.calculateExpiry(newStartDate, newPlanType);
    }

    member = await Member.findByIdAndUpdate(
      req.params.id,
      {
        name: name || member.name,
        phone: phone !== undefined ? phone : member.phone,
        plan_type: plan_type || member.plan_type,
        plan_price: plan_price !== undefined ? plan_price : member.plan_price,
        start_date: start_date ? new Date(start_date) : member.start_date,
        expiry_date: expiryDate,
        payment_status: payment_status || member.payment_status
      },
      { new: true, runValidators: true }
    );

    res.json(member);
  } catch (error) {
    console.error('Update member error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a member
// @route   DELETE /api/members/:id
// @access  Private
exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findOne({ _id: req.params.id, gym_id: req.gym_id });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    await Member.findByIdAndDelete(req.params.id);

    res.json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error('Delete member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get single member
// @route   GET /api/members/:id
// @access  Private
exports.getMember = async (req, res) => {
  try {
    const member = await Member.findOne({ _id: req.params.id, gym_id: req.gym_id });

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(member);
  } catch (error) {
    console.error('Get member error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
