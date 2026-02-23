import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { membersAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { gym } = useAuth();
  const [stats, setStats] = useState({
    total_members: 0,
    active_members: 0,
    expired_members: 0,
    expiring_soon: 0,
    total_revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await membersAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Members',
      value: stats.total_members,
      icon: '👥',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10'
    },
    {
      title: 'Active Members',
      value: stats.active_members,
      icon: '✅',
      color: 'text-green-400',
      bg: 'bg-green-500/10'
    },
    {
      title: 'Expiring Soon',
      value: stats.expiring_soon,
      icon: '⚠️',
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10'
    },
    {
      title: 'Expired',
      value: stats.expired_members,
      icon: '❌',
      color: 'text-red-400',
      bg: 'bg-red-500/10'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.total_revenue.toLocaleString()}`,
      icon: '💰',
      color: 'text-primary',
      bg: 'bg-primary/10'
    }
  ];

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {gym?.gym_name}
          </h1>
          <p className="mt-2 text-gray-400">
            Here's an overview of your gym members
          </p>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-primary text-xl animate-pulse">Loading stats...</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <div
                key={index}
                className="card animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                    <p className={`text-3xl font-bold mt-1 ${stat.color}`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bg}`}>
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/members/add"
            className="card group hover:border-primary animate-fadeIn"
            style={{ animationDelay: '500ms' }}
          >
            <div className="flex items-center space-x-4">
              <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <span className="text-3xl">➕</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                  Add New Member
                </h3>
                <p className="text-gray-400 mt-1">
                  Register a new gym member
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/members"
            className="card group hover:border-primary animate-fadeIn"
            style={{ animationDelay: '600ms' }}
          >
            <div className="flex items-center space-x-4">
              <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <span className="text-3xl">📋</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
                  View All Members
                </h3>
                <p className="text-gray-400 mt-1">
                  Manage your gym members
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
