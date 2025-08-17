import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Card, CardBody, CardHeader, Progress } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Messages',
      value: '24,892',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'mdi:message-text',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Delivery Rate',
      value: '99.2%',
      change: '+0.8%',
      changeType: 'positive',
      icon: 'mdi:check-circle',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Active Campaigns',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: 'mdi:bullhorn',
      color: 'from-purple-500 to-indigo-500',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Contacts',
      value: '12,847',
      change: '+5.2%',
      changeType: 'positive',
      icon: 'mdi:account-group',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-100',
    },
  ];

  const recentActivity = [
    {
      type: 'SMS Campaign',
      title: 'Weekly Newsletter',
      status: 'completed',
      time: '2 hours ago',
      icon: 'mdi:message-text',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      type: 'WhatsApp',
      title: 'Order Confirmation',
      status: 'sent',
      time: '4 hours ago',
      icon: 'mdi:whatsapp',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      type: 'Email',
      title: 'Welcome Series',
      status: 'in_progress',
      time: '6 hours ago',
      icon: 'mdi:email',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      type: 'SMS',
      title: 'OTP Verification',
      status: 'completed',
      time: '1 day ago',
      icon: 'mdi:message-text',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
  ];

  const quickActions = [
    {
      title: 'Create Campaign',
      description: 'Start a new messaging campaign',
      icon: 'mdi:plus-circle',
      color: 'from-blue-500 to-cyan-500',
      href: '/dashboard/campaigns',
    },
    {
      title: 'Add Contacts',
      description: 'Import or manually add contacts',
      icon: 'mdi:account-plus',
      color: 'from-green-500 to-emerald-500',
      href: '/dashboard/contacts',
    },
    {
      title: 'View Analytics',
      description: 'Check your campaign performance',
      icon: 'mdi:chart-line',
      color: 'from-purple-500 to-indigo-500',
      href: '/dashboard/analytics',
    },
    {
      title: 'API Settings',
      description: 'Manage your API keys',
      icon: 'mdi:cog',
      color: 'from-orange-500 to-red-500',
      href: '/dashboard/settings',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'sent':
        return 'text-blue-600 bg-blue-100';
      case 'in_progress':
        return 'text-yellow-600 bg-yellow-100';
      default:
        return 'text-slate-600 bg-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-8 text-white"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <Icon icon="mdi:hand-wave" className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Max!</h1>
            <p className="text-blue-100 text-lg">
              Here's what's happening with your campaigns today
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl font-bold">24,892</div>
            <div className="text-blue-100 text-sm">
              Messages sent this month
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl font-bold">99.2%</div>
            <div className="text-blue-100 text-sm">Average delivery rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="text-2xl font-bold">8</div>
            <div className="text-blue-100 text-sm">Active campaigns</div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={index} className="border border-slate-200">
            <CardBody className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}
                >
                  <Icon
                    icon={stat.icon}
                    className={`w-6 h-6 ${stat.color
                      .replace('from-', 'text-')
                      .replace(' to-', '')}`}
                  />
                </div>
                <span
                  className={`text-sm font-medium ${
                    stat.changeType === 'positive'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {stat.change}
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">
                {stat.value}
              </div>
              <div className="text-slate-600 text-sm">{stat.title}</div>
            </CardBody>
          </Card>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              isPressable
              onPress={() => navigate(action.href)}
              className="border border-slate-200 hover:shadow-lg transition-all cursor-pointer"
            >
              <CardBody className="p-6 text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon icon={action.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  {action.title}
                </h3>
                <p className="text-slate-600 text-sm">{action.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity & Performance */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="border border-slate-200">
            <CardHeader className="pb-0">
              <h3 className="text-lg font-semibold text-slate-900">
                Recent Activity
              </h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div
                      className={`w-10 h-10 ${activity.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon
                        icon={activity.icon}
                        className={`w-5 h-5 ${activity.color}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {activity.title}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                            activity.status,
                          )}`}
                        >
                          {activity.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        {activity.type} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border border-slate-200">
            <CardHeader className="pb-0">
              <h3 className="text-lg font-semibold text-slate-900">
                Performance Overview
              </h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      SMS Delivery Rate
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      99.2%
                    </span>
                  </div>
                  <Progress
                    value={99.2}
                    color="success"
                    className="w-full"
                    size="sm"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      WhatsApp Delivery Rate
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      98.7%
                    </span>
                  </div>
                  <Progress
                    value={98.7}
                    color="primary"
                    className="w-full"
                    size="sm"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      Email Open Rate
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      24.3%
                    </span>
                  </div>
                  <Progress
                    value={24.3}
                    color="secondary"
                    className="w-full"
                    size="sm"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">
                      Click Rate
                    </span>
                    <span className="text-sm font-semibold text-slate-900">
                      3.8%
                    </span>
                  </div>
                  <Progress
                    value={3.8}
                    color="warning"
                    className="w-full"
                    size="sm"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
