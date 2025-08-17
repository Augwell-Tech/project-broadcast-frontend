/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Switch,
  Divider,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Settings = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  // Mock data - replace with actual API calls
  const [settings, setSettings] = useState({
    apiKey: 'sk_live_1234567890abcdef1234567890abcdef12345678',
    webhookUrl: 'https://your-domain.com/webhook',
    timezone: 'UTC',
    language: 'en',
    notifications: {
      email: true,
      sms: false,
      webhook: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      ipWhitelist: [],
    },
    billing: {
      plan: 'Pro',
      nextBilling: '2024-02-20',
      autoRenew: true,
    },
  });

  const handleRegenerateApiKey = async () => {
    setIsRegenerating(true);

    try {
      // Simulate API call - replace with actual backend endpoint
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newApiKey =
        'sk_live_' + Math.random().toString(36).substring(2, 38);
      setSettings((prev) => ({ ...prev, apiKey: newApiKey }));

      toast.success('API key regenerated successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to regenerate API key');
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleUpdateSettings = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    toast.success('Settings updated successfully');
  };

  const handleUpdateNestedSettings = (
    parentKey: string,
    childKey: string,
    value: any,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [parentKey]: {
        ...((prev[parentKey as keyof typeof prev] as Record<string, any>) ||
          {}),
        [childKey]: value,
      },
    }));
    toast.success('Settings updated successfully');
  };

  const maskApiKey = (key: string) => {
    if (showApiKey) return key;
    return key.substring(0, 12) + '...' + key.substring(key.length - 4);
  };

  const timezoneOptions = [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Asia/Tokyo',
    'Asia/Shanghai',
  ];

  const languageOptions = [
    { key: 'en', label: 'English' },
    { key: 'es', label: 'Español' },
    { key: 'fr', label: 'Français' },
    { key: 'de', label: 'Deutsch' },
    { key: 'ja', label: '日本語' },
    { key: 'zh', label: '中文' },
  ];

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
          <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600">
            Manage your account preferences and API configuration
          </p>
        </div>
      </motion.div>

      {/* API Configuration */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="border border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Icon icon="mdi:key" className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  API Configuration
                </h3>
                <p className="text-sm text-slate-600">
                  Manage your API keys and webhook settings
                </p>
              </div>
            </div>
          </CardHeader>

          <CardBody className="space-y-6">
            {/* API Key */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    API Key
                  </label>
                  <p className="text-xs text-slate-500">
                    Use this key to authenticate your API requests
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="bordered"
                    onPress={() => setShowApiKey(!showApiKey)}
                    startContent={
                      <Icon
                        icon={showApiKey ? 'mdi:eye-off' : 'mdi:eye'}
                        className="w-4 h-4"
                      />
                    }
                  >
                    {showApiKey ? 'Hide' : 'Show'}
                  </Button>
                  <Button
                    size="sm"
                    color="danger"
                    variant="bordered"
                    onPress={onOpen}
                    startContent={
                      <Icon icon="mdi:refresh" className="w-4 h-4" />
                    }
                  >
                    Regenerate
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Input
                  value={maskApiKey(settings.apiKey)}
                  readOnly
                  variant="bordered"
                  className="flex-1"
                  endContent={
                    <Button
                      size="sm"
                      variant="light"
                      onPress={() =>
                        navigator.clipboard.writeText(settings.apiKey)
                      }
                      startContent={
                        <Icon icon="mdi:content-copy" className="w-4 h-4" />
                      }
                    >
                      Copy
                    </Button>
                  }
                />
                <Chip color="success" variant="flat" size="sm">
                  Live
                </Chip>
              </div>
            </div>

            <Divider />

            {/* Webhook URL */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Webhook URL
                </label>
                <p className="text-xs text-slate-500">
                  Receive real-time notifications about message events
                </p>
              </div>

              <div className="flex gap-3">
                <Input
                  value={settings.webhookUrl}
                  onChange={(e) =>
                    handleUpdateSettings('webhookUrl', e.target.value)
                  }
                  placeholder="https://your-domain.com/webhook"
                  variant="bordered"
                  className="flex-1"
                />
                <Button
                  variant="bordered"
                  startContent={
                    <Icon icon="mdi:test-tube" className="w-4 h-4" />
                  }
                >
                  Test
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid lg:grid-cols-2 gap-6"
      >
        {/* General Preferences */}
        <Card className="border border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Icon icon="mdi:cog" className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  General Preferences
                </h3>
                <p className="text-sm text-slate-600">
                  Customize your account settings
                </p>
              </div>
            </div>
          </CardHeader>

          <CardBody className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">
                Timezone
              </label>
              <Select
                value={settings.timezone}
                onChange={(e) =>
                  handleUpdateSettings('timezone', e.target.value)
                }
                variant="bordered"
              >
                {timezoneOptions.map((tz) => (
                  <SelectItem key={tz} value={tz}>
                    {tz}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">
                Language
              </label>
              <Select
                value={settings.language}
                onChange={(e) =>
                  handleUpdateSettings('language', e.target.value)
                }
                variant="bordered"
              >
                {languageOptions.map((lang) => (
                  <SelectItem key={lang.key} value={lang.key}>
                    {lang.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          </CardBody>
        </Card>

        {/* Notifications */}
        <Card className="border border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Icon icon="mdi:bell" className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Notifications
                </h3>
                <p className="text-sm text-slate-600">
                  Choose how you want to be notified
                </p>
              </div>
            </div>
          </CardHeader>

          <CardBody className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">
                  Email Notifications
                </div>
                <div className="text-sm text-slate-500">
                  Receive notifications via email
                </div>
              </div>
              <Switch
                isSelected={settings.notifications.email}
                onValueChange={(value) =>
                  handleUpdateNestedSettings('notifications', 'email', value)
                }
                color="primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">
                  SMS Notifications
                </div>
                <div className="text-sm text-slate-500">
                  Receive notifications via SMS
                </div>
              </div>
              <Switch
                isSelected={settings.notifications.sms}
                onValueChange={(value) =>
                  handleUpdateNestedSettings('notifications', 'sms', value)
                }
                color="primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">
                  Webhook Notifications
                </div>
                <div className="text-sm text-slate-500">
                  Send notifications to your webhook
                </div>
              </div>
              <Switch
                isSelected={settings.notifications.webhook}
                onValueChange={(value) =>
                  handleUpdateNestedSettings('notifications', 'webhook', value)
                }
                color="primary"
              />
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Security & Billing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid lg:grid-cols-2 gap-6"
      >
        {/* Security */}
        <Card className="border border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Icon icon="mdi:shield" className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Security
                </h3>
                <p className="text-sm text-slate-600">
                  Manage your account security
                </p>
              </div>
            </div>
          </CardHeader>

          <CardBody className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">
                  Two-Factor Authentication
                </div>
                <div className="text-sm text-slate-500">
                  Add an extra layer of security
                </div>
              </div>
              <Switch
                isSelected={settings.security.twoFactorAuth}
                onValueChange={(value) =>
                  handleUpdateNestedSettings('security', 'twoFactorAuth', value)
                }
                color="primary"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">
                Session Timeout (minutes)
              </label>
              <Select
                value={settings.security.sessionTimeout.toString()}
                onChange={(e) =>
                  handleUpdateNestedSettings(
                    'security',
                    'sessionTimeout',
                    parseInt(e.target.value),
                  )
                }
                variant="bordered"
              >
                <SelectItem key="15" value="15">
                  15 minutes
                </SelectItem>
                <SelectItem key="30" value="30">
                  30 minutes
                </SelectItem>
                <SelectItem key="60" value="60">
                  1 hour
                </SelectItem>
                <SelectItem key="120" value="120">
                  2 hours
                </SelectItem>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700">
                IP Whitelist
              </label>
              <Textarea
                placeholder="Enter IP addresses (one per line)"
                variant="bordered"
                minRows={3}
                description="Leave empty to allow all IP addresses"
              />
            </div>
          </CardBody>
        </Card>

        {/* Billing */}
        <Card className="border border-slate-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Icon
                  icon="mdi:credit-card"
                  className="w-5 h-5 text-orange-600"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Billing
                </h3>
                <p className="text-sm text-slate-600">
                  Manage your subscription and billing
                </p>
              </div>
            </div>
          </CardHeader>

          <CardBody className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">
                  Current Plan
                </span>
                <Chip color="primary" variant="flat">
                  {settings.billing.plan}
                </Chip>
              </div>
              <div className="text-sm text-slate-500">
                Next billing date:{' '}
                {new Date(settings.billing.nextBilling).toLocaleDateString()}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-slate-900">Auto-Renew</div>
                <div className="text-sm text-slate-500">
                  Automatically renew your subscription
                </div>
              </div>
              <Switch
                isSelected={settings.billing.autoRenew}
                onValueChange={(value) =>
                  handleUpdateNestedSettings('billing', 'autoRenew', value)
                }
                color="primary"
              />
            </div>

            <div className="space-y-3">
              <Button
                variant="bordered"
                className="w-full"
                startContent={
                  <Icon icon="mdi:credit-card" className="w-4 h-4" />
                }
              >
                Manage Billing
              </Button>
              <Button
                variant="bordered"
                className="w-full"
                startContent={
                  <Icon icon="mdi:chart-line" className="w-4 h-4" />
                }
              >
                View Usage
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Card className="border border-red-200 bg-red-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Icon
                  icon="mdi:alert-triangle"
                  className="w-5 h-5 text-red-600"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-900">
                  Danger Zone
                </h3>
                <p className="text-sm text-red-700">
                  Irreversible and destructive actions
                </p>
              </div>
            </div>
          </CardHeader>

          <CardBody className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-red-200">
              <div>
                <div className="font-medium text-red-900">Delete Account</div>
                <div className="text-sm text-red-700">
                  Permanently delete your account and all associated data
                </div>
              </div>
              <Button
                color="danger"
                variant="bordered"
                startContent={<Icon icon="mdi:delete" className="w-4 h-4" />}
              >
                Delete Account
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* Regenerate API Key Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>
            <h3 className="text-lg font-semibold text-red-900">
              Regenerate API Key
            </h3>
          </ModalHeader>

          <ModalBody>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-200">
                <Icon
                  icon="mdi:alert-triangle"
                  className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0"
                />
                <div className="text-sm text-red-800">
                  <p className="font-medium mb-2">Warning:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Your current API key will be immediately invalidated
                    </li>
                    <li>All applications using this key will stop working</li>
                    <li>
                      You'll need to update all integrations with the new key
                    </li>
                    <li>This action cannot be undone</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-slate-600">
                Are you sure you want to regenerate your API key? This action
                will immediately invalidate your current key.
              </p>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button variant="bordered" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="danger"
              onPress={handleRegenerateApiKey}
              isLoading={isRegenerating}
            >
              {isRegenerating ? 'Regenerating...' : 'Regenerate API Key'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Settings;
