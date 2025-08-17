import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Select,
  SelectItem,
  Chip,
  Progress,
  Divider,
} from '@nextui-org/react';
import { useState } from 'react';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedChannel, setSelectedChannel] = useState('all');

  // Mock data - replace with actual API calls
  const analyticsData = {
    overview: {
      totalMessages: 24892,
      deliveryRate: 99.2,
      totalCost: 1245.6,
      activeCampaigns: 8,
    },
    byChannel: {
      sms: {
        sent: 15680,
        delivered: 15580,
        failed: 100,
        cost: 784.0,
        deliveryRate: 99.4,
      },
      email: {
        sent: 7200,
        delivered: 7120,
        failed: 80,
        cost: 72.0,
        deliveryRate: 98.9,
      },
      whatsapp: {
        sent: 2012,
        delivered: 2000,
        failed: 12,
        cost: 389.6,
        deliveryRate: 99.4,
      },
    },
    monthlyTrends: [
      { month: 'Jan', sms: 1200, email: 800, whatsapp: 150 },
      { month: 'Feb', sms: 1350, email: 900, whatsapp: 180 },
      { month: 'Mar', sms: 1420, email: 950, whatsapp: 200 },
      { month: 'Apr', sms: 1380, email: 920, whatsapp: 190 },
      { month: 'May', sms: 1500, email: 1000, whatsapp: 220 },
      { month: 'Jun', sms: 1568, email: 1050, whatsapp: 235 },
    ],
    topCampaigns: [
      {
        name: 'Weekly Newsletter',
        channel: 'email',
        sent: 1250,
        delivered: 1238,
        openRate: 24.3,
        clickRate: 3.8,
      },
      {
        name: 'Order Confirmation',
        channel: 'whatsapp',
        sent: 89,
        delivered: 87,
        openRate: 98.7,
        clickRate: 12.4,
      },
      {
        name: 'SMS Reminder',
        channel: 'sms',
        sent: 45,
        delivered: 44,
        openRate: 97.8,
        clickRate: 0,
      },
    ],
  };

  const timeRangeOptions = [
    { key: '7d', label: 'Last 7 days' },
    { key: '30d', label: 'Last 30 days' },
    { key: '90d', label: 'Last 90 days' },
    { key: '1y', label: 'Last year' },
  ];

  const channelOptions = [
    { key: 'all', label: 'All Channels' },
    { key: 'sms', label: 'SMS' },
    { key: 'email', label: 'Email' },
    { key: 'whatsapp', label: 'WhatsApp' },
  ];

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'sms':
        return 'mdi:message-text';
      case 'email':
        return 'mdi:email';
      case 'whatsapp':
        return 'mdi:whatsapp';
      default:
        return 'mdi:help-circle';
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case 'sms':
        return 'text-blue-600';
      case 'email':
        return 'text-purple-600';
      case 'whatsapp':
        return 'text-green-600';
      default:
        return 'text-slate-600';
    }
  };

  const getChannelBgColor = (channel: string) => {
    switch (channel) {
      case 'sms':
        return 'bg-blue-100';
      case 'email':
        return 'bg-purple-100';
      case 'whatsapp':
        return 'bg-green-100';
      default:
        return 'bg-slate-100';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Analytics</h1>
          <p className="text-slate-600">
            Track your campaign performance and insights
          </p>
        </div>

        <div className="flex gap-3">
          <Select
            placeholder="Time Range"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="w-40"
          >
            {timeRangeOptions.map((option) => (
              <SelectItem key={option.key} value={option.key}>
                {option.label}
              </SelectItem>
            ))}
          </Select>

          <Select
            placeholder="Channel"
            value={selectedChannel}
            onChange={(e) => setSelectedChannel(e.target.value)}
            className="w-40"
          >
            {channelOptions.map((option) => (
              <SelectItem key={option.key} value={option.key}>
                {option.label}
              </SelectItem>
            ))}
          </Select>

          <Button
            variant="bordered"
            startContent={<Icon icon="mdi:download" className="w-4 h-4" />}
            className="border-slate-300 text-slate-700"
          >
            Export
          </Button>
        </div>
      </motion.div>

      {/* Overview Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="border border-slate-200">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Icon
                  icon="mdi:message-text"
                  className="w-6 h-6 text-blue-600"
                />
              </div>
              <span className="text-sm font-medium text-green-600">+12.5%</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {formatNumber(analyticsData.overview.totalMessages)}
            </div>
            <div className="text-slate-600 text-sm">Total Messages</div>
          </CardBody>
        </Card>

        <Card className="border border-slate-200">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Icon
                  icon="mdi:check-circle"
                  className="w-6 h-6 text-green-600"
                />
              </div>
              <span className="text-sm font-medium text-green-600">+0.8%</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {analyticsData.overview.deliveryRate}%
            </div>
            <div className="text-slate-600 text-sm">Delivery Rate</div>
          </CardBody>
        </Card>

        <Card className="border border-slate-200">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Icon
                  icon="mdi:currency-usd"
                  className="w-6 h-6 text-purple-600"
                />
              </div>
              <span className="text-sm font-medium text-red-600">+5.2%</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {formatCurrency(analyticsData.overview.totalCost)}
            </div>
            <div className="text-slate-600 text-sm">Total Cost</div>
          </CardBody>
        </Card>

        <Card className="border border-slate-200">
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Icon icon="mdi:bullhorn" className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-sm font-medium text-green-600">+2</span>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">
              {analyticsData.overview.activeCampaigns}
            </div>
            <div className="text-slate-600 text-sm">Active Campaigns</div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Channel Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid lg:grid-cols-2 gap-6"
      >
        {/* Channel Breakdown */}
        <Card className="border border-slate-200">
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900">
              Channel Performance
            </h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              {Object.entries(analyticsData.byChannel).map(
                ([channel, data]) => (
                  <div key={channel} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 ${getChannelBgColor(
                            channel,
                          )} rounded-xl flex items-center justify-center`}
                        >
                          <Icon
                            icon={getChannelIcon(channel)}
                            className={`w-5 h-5 ${getChannelColor(channel)}`}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900 capitalize">
                            {channel}
                          </div>
                          <div className="text-sm text-slate-500">
                            {formatNumber(data.sent)} sent •{' '}
                            {formatNumber(data.delivered)} delivered
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-slate-900">
                          {data.deliveryRate}%
                        </div>
                        <div className="text-sm text-slate-500">
                          {formatCurrency(data.cost)}
                        </div>
                      </div>
                    </div>
                    <Progress
                      value={data.deliveryRate}
                      color="success"
                      className="w-full"
                      size="sm"
                    />
                  </div>
                ),
              )}
            </div>
          </CardBody>
        </Card>

        {/* Top Campaigns */}
        <Card className="border border-slate-200">
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900">
              Top Performing Campaigns
            </h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {analyticsData.topCampaigns.map((campaign, index) => (
                <div key={index} className="p-4 rounded-xl bg-slate-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-medium text-slate-900">
                        {campaign.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Icon
                          icon={getChannelIcon(campaign.channel)}
                          className={`w-4 h-4 ${getChannelColor(
                            campaign.channel,
                          )}`}
                        />
                        <span className="text-sm text-slate-500 capitalize">
                          {campaign.channel}
                        </span>
                      </div>
                    </div>
                    <Chip size="sm" color="primary" variant="flat">
                      #{index + 1}
                    </Chip>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-slate-500">Sent</div>
                      <div className="font-medium text-slate-900">
                        {formatNumber(campaign.sent)}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500">Open Rate</div>
                      <div className="font-medium text-slate-900">
                        {campaign.openRate}%
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-500">Click Rate</div>
                      <div className="font-medium text-slate-900">
                        {campaign.clickRate}%
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Monthly Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="border border-slate-200">
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900">
              Monthly Trends
            </h3>
            <p className="text-sm text-slate-600">
              Message volume by channel over time
            </p>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {analyticsData.monthlyTrends.map((month, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {month.month}
                    </span>
                    <div className="flex gap-4 text-slate-500">
                      <span>SMS: {formatNumber(month.sms)}</span>
                      <span>Email: {formatNumber(month.email)}</span>
                      <span>WhatsApp: {formatNumber(month.whatsapp)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 h-4">
                    <div
                      className="bg-blue-500 rounded"
                      style={{ width: `${(month.sms / 2000) * 100}%` }}
                    ></div>
                    <div
                      className="bg-purple-500 rounded"
                      style={{ width: `${(month.email / 2000) * 100}%` }}
                    ></div>
                    <div
                      className="bg-green-500 rounded"
                      style={{ width: `${(month.whatsapp / 2000) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <Divider className="my-6" />

            <div className="flex items-center justify-center gap-6 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span>SMS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span>Email</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>WhatsApp</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Cost Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid lg:grid-cols-2 gap-6"
      >
        {/* Cost Breakdown */}
        <Card className="border border-slate-200">
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900">
              Cost Breakdown
            </h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {Object.entries(analyticsData.byChannel).map(
                ([channel, data]) => (
                  <div
                    key={channel}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 ${getChannelBgColor(
                          channel,
                        )} rounded-lg flex items-center justify-center`}
                      >
                        <Icon
                          icon={getChannelIcon(channel)}
                          className={`w-4 h-4 ${getChannelColor(channel)}`}
                        />
                      </div>
                      <span className="font-medium text-slate-900 capitalize">
                        {channel}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-slate-900">
                        {formatCurrency(data.cost)}
                      </div>
                      <div className="text-sm text-slate-500">
                        {(
                          (data.cost / analyticsData.overview.totalCost) *
                          100
                        ).toFixed(1)}
                        %
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </CardBody>
        </Card>

        {/* Delivery Insights */}
        <Card className="border border-slate-200">
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900">
              Delivery Insights
            </h3>
          </CardHeader>
          <CardBody>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    Overall Success Rate
                  </span>
                  <span className="text-sm font-semibold text-slate-900">
                    {analyticsData.overview.deliveryRate}%
                  </span>
                </div>
                <Progress
                  value={analyticsData.overview.deliveryRate}
                  color="success"
                  className="w-full"
                  size="lg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-green-50">
                  <div className="text-2xl font-bold text-green-600">
                    {formatNumber(analyticsData.overview.totalMessages)}
                  </div>
                  <div className="text-sm text-green-700">Messages Sent</div>
                </div>

                <div className="text-center p-4 rounded-xl bg-blue-50">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatNumber(
                      analyticsData.overview.totalMessages *
                        (analyticsData.overview.deliveryRate / 100),
                    )}
                  </div>
                  <div className="text-sm text-blue-700">
                    Successfully Delivered
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

export default Analytics;
