import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { membersAPI } from '../services/api';
import Navbar from '../components/Navbar';

const MembersList = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteModal, setDeleteModal] = useState({ show: false, memberId: null });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll();
      setMembers(response.data);
    } catch (err) {
      setError('Failed to load members');
      console.error('Error fetching members:', err);
    } finally {
      setLoading(false);
    }
  };

  const getMemberStatus = (member) => {
    const today = new Date();
    const expiry = new Date(member.expiry_date);
    
    if (expiry < today) return 'Expired';
    
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    
    if (expiry <= sevenDaysFromNow) return 'Expiring Soon';
    
    return 'Active';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-400';
      case 'Expiring Soon':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Expired':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleDelete = async () => {
    try {
      await membersAPI.delete(deleteModal.memberId);
      setMembers(members.filter(m => m._id !== deleteModal.memberId));
      setDeleteModal({ show: false, memberId: null });
    } catch (err) {
      setError('Failed to delete member');
    }
  };

  const filteredMembers = members.filter(member => {
    const status = getMemberStatus(member);
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (member.phone && member.phone.includes(searchTerm));
    const matchesFilter = filterStatus === 'all' || status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Members</h1>
            <p className="mt-2 text-gray-400">Manage your gym members</p>
          </div>
          <Link
            to="/members/add"
            className="mt-4 md:mt-0 btn-primary inline-flex items-center justify-center"
          >
            <span className="mr-2">➕</span>
            Add Member
          </Link>
        </div>

        {/* Filters */}
        <div className="card mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 bg-dark-light border border-gray-700 rounded-lg text-white focus:border-primary"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 bg-dark-light border border-gray-700 rounded-lg text-white focus:border-primary"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Expiring Soon">Expiring Soon</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Members Table */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-primary text-xl animate-pulse">Loading members...</div>
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="card text-center py-12">
            <span className="text-6xl">👥</span>
            <h3 className="mt-4 text-xl font-semibold text-white">No members found</h3>
            <p className="mt-2 text-gray-400">
              {searchTerm || filterStatus !== 'all'
                ? 'Try adjusting your search or filter'
                : 'Get started by adding your first member'}
            </p>
            {!searchTerm && filterStatus === 'all' && (
              <Link
                to="/members/add"
                className="mt-4 btn-primary inline-block"
              >
                Add Your First Member
              </Link>
            )}
          </div>
        ) : (
          <div className="card overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-dark-light">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Expiry Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredMembers.map((member) => {
                    const status = getMemberStatus(member);
                    return (
                      <tr key={member._id} className="hover:bg-dark-light/50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-white font-medium">{member.name}</div>
                            {member.phone && (
                              <div className="text-gray-400 text-sm">{member.phone}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-white">{member.plan_type}</div>
                          <div className="text-gray-400 text-sm">${member.plan_price}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {formatDate(member.expiry_date)}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            member.payment_status === 'paid'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {member.payment_status === 'paid' ? 'Paid' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => navigate(`/members/edit/${member._id}`)}
                            className="text-primary hover:text-primary-dark mr-4"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeleteModal({ show: true, memberId: member._id })}
                            className="text-red-400 hover:text-red-300"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Members Count */}
        {!loading && filteredMembers.length > 0 && (
          <div className="mt-4 text-gray-400 text-sm">
            Showing {filteredMembers.length} of {members.length} members
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="card max-w-md mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Delete</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to delete this member? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg font-semibold transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModal({ show: false, memberId: null })}
                className="flex-1 bg-dark-light hover:bg-gray-800 text-white py-2.5 rounded-lg font-semibold border border-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembersList;
