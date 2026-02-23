import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { membersAPI } from '../services/api';
import Navbar from '../components/Navbar';

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    plan_type: '1 month',
    plan_price: '',
    start_date: new Date().toISOString().split('T')[0],
    payment_status: 'pending'
  });

  const planPrices = {
    '1 month': 30,
    '3 month': 80,
    'yearly': 300
  };

  useEffect(() => {
    fetchMember();
  }, [id]);

  const fetchMember = async () => {
    try {
      const response = await membersAPI.getOne(id);
      const member = response.data;
      setFormData({
        name: member.name,
        phone: member.phone || '',
        plan_type: member.plan_type,
        plan_price: member.plan_price,
        start_date: new Date(member.start_date).toISOString().split('T')[0],
        payment_status: member.payment_status
      });
    } catch (err) {
      setError('Failed to load member');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'plan_type') {
      setFormData({
        ...formData,
        [name]: value,
        plan_price: planPrices[value] || ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await membersAPI.update(id, {
        ...formData,
        plan_price: parseFloat(formData.plan_price)
      });
      navigate('/members');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-primary text-xl animate-pulse">Loading member...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Edit Member</h1>
          <p className="mt-2 text-gray-400">Update member information</p>
        </div>

        {/* Form */}
        <div className="card">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Member Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-dark-light border border-gray-700 rounded-lg text-white focus:border-primary"
                placeholder="John Doe"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-dark-light border border-gray-700 rounded-lg text-white focus:border-primary"
                placeholder="+1 234 567 8900"
              />
            </div>

            {/* Plan Type */}
            <div>
              <label htmlFor="plan_type" className="block text-sm font-medium text-gray-300 mb-2">
                Plan Type *
              </label>
              <select
                id="plan_type"
                name="plan_type"
                value={formData.plan_type}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-dark-light border border-gray-700 rounded-lg text-white focus:border-primary"
              >
                <option value="1 month">1 Month</option>
                <option value="3 month">3 Month</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            {/* Plan Price */}
            <div>
              <label htmlFor="plan_price" className="block text-sm font-medium text-gray-300 mb-2">
                Plan Price ($) *
              </label>
              <input
                type="number"
                id="plan_price"
                name="plan_price"
                value={formData.plan_price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2.5 bg-dark-light border border-gray-700 rounded-lg text-white focus:border-primary"
                placeholder="30.00"
              />
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor="start_date" className="block text-sm font-medium text-gray-300 mb-2">
                Start Date *
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-dark-light border border-gray-700 rounded-lg text-white focus:border-primary"
              />
            </div>

            {/* Payment Status */}
            <div>
              <label htmlFor="payment_status" className="block text-sm font-medium text-gray-300 mb-2">
                Payment Status *
              </label>
              <select
                id="payment_status"
                name="payment_status"
                value={formData.payment_status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-dark-light border border-gray-700 rounded-lg text-white focus:border-primary"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Updating...' : 'Update Member'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/members')}
                className="flex-1 btn-secondary py-3 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMember;
