import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Switch,
  Divider,
  Progress,
} from '@nextui-org/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const campaignSchema = z.object({
  name: z.string().min(1, 'Campaign name is required'),
  description: z.string().optional(),
  channel: z.enum(['sms', 'email', 'whatsapp'], {
    required_error: 'Please select a channel',
  }),
  message: z.string().min(1, 'Message content is required'),
  subject: z.string().optional(),
  targetAudience: z
    .array(z.string())
    .min(1, 'Please select at least one audience'),
  scheduledDate: z.string().optional(),
  isScheduled: z.boolean().default(false),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

interface Campaign {
  id: string;
  name: string;
  description?: string;
  channel: 'sms' | 'email' | 'whatsapp';
  message: string;
  subject?: string;
  targetAudience: string[];
  status: 'draft' | 'scheduled' | 'sending' | 'completed' | 'paused';
  progress: number;
  totalRecipients: number;
  sentCount: number;
  deliveredCount: number;
  failedCount: number;
  createdAt: string;
  scheduledDate?: string;
  sentDate?: string;
}

const Campaigns = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [isScheduled, setIsScheduled] = useState(false);

  // Mock data - replace with actual API calls
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'Weekly Newsletter',
      description: 'Weekly updates and news for subscribers',
      channel: 'email',
      message: 'Stay updated with our latest news and offers!',
      subject: 'Weekly Newsletter - Week 15',
      targetAudience: ['Newsletter Subscribers'],
      status: 'completed',
      progress: 100,
      totalRecipients: 1250,
      sentCount: 1250,
      deliveredCount: 1238,
      failedCount: 12,
      createdAt: '2024-01-15',
      sentDate: '2024-01-20',
    },
    {
      id: '2',
      name: 'Order Confirmation',
      description: 'Confirm orders via WhatsApp',
      channel: 'whatsapp',
      message:
        'Your order #12345 has been confirmed and will be shipped today.',
      targetAudience: ['Recent Customers'],
      status: 'sending',
      progress: 75,
      totalRecipients: 89,
      sentCount: 67,
      deliveredCount: 65,
      failedCount: 2,
      createdAt: '2024-01-22',
      sentDate: '2024-01-22',
    },
    {
      id: '3',
      name: 'SMS Reminder',
      description: 'Appointment reminders',
      channel: 'sms',
      message: 'Reminder: Your appointment is tomorrow at 2 PM.',
      targetAudience: ['Appointment Bookings'],
      status: 'scheduled',
      progress: 0,
      totalRecipients: 45,
      sentCount: 0,
      deliveredCount: 0,
      failedCount: 0,
      createdAt: '2024-01-21',
      scheduledDate: '2024-01-23T10:00:00',
    },
  ]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setValue,
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
  });

  const selectedChannel = watch('channel');

  const audienceOptions = [
    'All Contacts',
    'Newsletter Subscribers',
    'Recent Customers',
    'VIP Customers',
    'Appointment Bookings',
    'Inactive Users',
  ];

  const channelConfigs = {
    sms: {
      icon: 'mdi:message-text',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      maxLength: 160,
      placeholder: 'Enter your SMS message (max 160 characters)',
    },
    email: {
      icon: 'mdi:email',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      maxLength: 1000,
      placeholder: 'Enter your email content',
    },
    whatsapp: {
      icon: 'mdi:whatsapp',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      maxLength: 1000,
      placeholder: 'Enter your WhatsApp message',
    },
  };

  const handleCreateCampaign = () => {
    setIsEditMode(false);
    setSelectedCampaign(null);
    setIsScheduled(false);
    reset();
    onOpen();
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setIsEditMode(true);
    setSelectedCampaign(campaign);
    setIsScheduled(campaign.status === 'scheduled');
    setValue('name', campaign.name);
    setValue('description', campaign.description || '');
    setValue('channel', campaign.channel);
    setValue('message', campaign.message);
    setValue('subject', campaign.subject || '');
    setValue('targetAudience', campaign.targetAudience);
    setValue('scheduledDate', campaign.scheduledDate || '');
    setValue('isScheduled', campaign.status === 'scheduled');
    onOpen();
  };

  const handleDeleteCampaign = (campaignId: string) => {
    if (confirm('Are you sure you want to delete this campaign?')) {
      setCampaigns(campaigns.filter((c) => c.id !== campaignId));
      toast.success('Campaign deleted successfully');
    }
  };

  const onSubmit = (data: CampaignFormData) => {
    if (isEditMode && selectedCampaign) {
      // Edit existing campaign
      setCampaigns(
        campaigns.map((c) =>
          c.id === selectedCampaign.id
            ? { ...c, ...data, updatedAt: new Date().toISOString() }
            : c,
        ),
      );
      toast.success('Campaign updated successfully');
    } else {
      // Create new campaign
      const newCampaign: Campaign = {
        id: Date.now().toString(),
        ...data,
        status: data.isScheduled ? 'scheduled' : 'draft',
        progress: 0,
        totalRecipients: 0,
        sentCount: 0,
        deliveredCount: 0,
        failedCount: 0,
        createdAt: new Date().toISOString(),
      };
      setCampaigns([...campaigns, newCampaign]);
      toast.success('Campaign created successfully');
    }

    onClose();
    reset();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'default';
      case 'scheduled':
        return 'warning';
      case 'sending':
        return 'primary';
      case 'completed':
        return 'success';
      case 'paused':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getChannelIcon = (channel: string) => {
    const config = channelConfigs[channel as keyof typeof channelConfigs];
    return config ? config.icon : 'mdi:help-circle';
  };

  const getChannelColor = (channel: string) => {
    const config = channelConfigs[channel as keyof typeof channelConfigs];
    return config ? config.color : 'text-slate-600';
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
          <h1 className="text-2xl font-bold text-slate-900">Campaigns</h1>
          <p className="text-slate-600">
            Create and manage your messaging campaigns
          </p>
        </div>

        <Button
          color="primary"
          startContent={<Icon icon="mdi:plus" className="w-4 h-4" />}
          onClick={handleCreateCampaign}
        >
          Create Campaign
        </Button>
      </motion.div>

      {/* Campaigns List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Card className="border border-slate-200">
          <CardHeader>
            <h3 className="text-lg font-semibold text-slate-900">
              Your Campaigns ({campaigns.length})
            </h3>
          </CardHeader>

          <CardBody>
            <Table aria-label="Campaigns table">
              <TableHeader>
                <TableColumn>CAMPAIGN</TableColumn>
                <TableColumn>CHANNEL</TableColumn>
                <TableColumn>STATUS</TableColumn>
                <TableColumn>PROGRESS</TableColumn>
                <TableColumn>RECIPIENTS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
              </TableHeader>
              <TableBody emptyContent="No campaigns found">
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">
                          {campaign.name}
                        </div>
                        <div className="text-sm text-slate-500">
                          {campaign.description || 'No description'}
                        </div>
                        <div className="text-xs text-slate-400">
                          Created{' '}
                          {new Date(campaign.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon
                          icon={getChannelIcon(campaign.channel)}
                          className={`w-5 h-5 ${getChannelColor(
                            campaign.channel,
                          )}`}
                        />
                        <span className="capitalize">{campaign.channel}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip
                        size="sm"
                        color={getStatusColor(campaign.status)}
                        variant="flat"
                      >
                        {campaign.status}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div className="w-full">
                        <Progress
                          value={campaign.progress}
                          color="primary"
                          className="w-full"
                          size="sm"
                        />
                        <div className="text-xs text-slate-500 mt-1">
                          {campaign.progress}% complete
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">
                          {campaign.totalRecipients}
                        </div>
                        <div className="text-slate-500">
                          {campaign.deliveredCount} delivered
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="light"
                          onPress={() => handleEditCampaign(campaign)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          variant="light"
                          onPress={() => handleDeleteCampaign(campaign.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </motion.div>

      {/* Create/Edit Campaign Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalContent>
          <ModalHeader>
            <h3 className="text-lg font-semibold">
              {isEditMode ? 'Edit Campaign' : 'Create New Campaign'}
            </h3>
          </ModalHeader>

          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  {...register('name')}
                  label="Campaign Name"
                  placeholder="Enter campaign name"
                  variant="bordered"
                  isInvalid={!!errors.name}
                  errorMessage={errors.name?.message}
                />

                <Select
                  {...register('channel')}
                  label="Channel"
                  placeholder="Select channel"
                  variant="bordered"
                  isInvalid={!!errors.channel}
                  errorMessage={errors.channel?.message}
                >
                  <SelectItem key="sms" value="sms">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="mdi:message-text"
                        className="w-4 h-4 text-blue-600"
                      />
                      SMS
                    </div>
                  </SelectItem>
                  <SelectItem key="email" value="email">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="mdi:email"
                        className="w-4 h-4 text-purple-600"
                      />
                      Email
                    </div>
                  </SelectItem>
                  <SelectItem key="whatsapp" value="whatsapp">
                    <div className="flex items-center gap-2">
                      <Icon
                        icon="mdi:whatsapp"
                        className="w-4 h-4 text-green-600"
                      />
                      WhatsApp
                    </div>
                  </SelectItem>
                </Select>
              </div>

              <Input
                {...register('description')}
                label="Description"
                placeholder="Enter campaign description (optional)"
                variant="bordered"
              />

              {/* Channel-specific fields */}
              {selectedChannel === 'email' && (
                <Input
                  {...register('subject')}
                  label="Email Subject"
                  placeholder="Enter email subject line"
                  variant="bordered"
                  isInvalid={!!errors.subject}
                  errorMessage={errors.subject?.message}
                />
              )}

              <Textarea
                {...register('message')}
                label="Message Content"
                placeholder={
                  channelConfigs[selectedChannel as keyof typeof channelConfigs]
                    ?.placeholder || 'Enter your message'
                }
                variant="bordered"
                minRows={4}
                maxLength={
                  channelConfigs[selectedChannel as keyof typeof channelConfigs]
                    ?.maxLength || 1000
                }
                isInvalid={!!errors.message}
                errorMessage={errors.message?.message}
                description={`${watch('message')?.length || 0}/${
                  channelConfigs[selectedChannel as keyof typeof channelConfigs]
                    ?.maxLength || 1000
                } characters`}
              />

              {/* Target Audience */}
              <Select
                {...register('targetAudience')}
                label="Target Audience"
                placeholder="Select target audience"
                variant="bordered"
                selectionMode="multiple"
                isInvalid={!!errors.targetAudience}
                errorMessage={errors.targetAudience?.message}
              >
                {audienceOptions.map((audience) => (
                  <SelectItem key={audience} value={audience}>
                    {audience}
                  </SelectItem>
                ))}
              </Select>

              <Divider />

              {/* Scheduling */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">
                    Schedule Campaign
                  </h4>
                  <p className="text-sm text-slate-600">
                    Send immediately or schedule for later
                  </p>
                </div>
                <Switch
                  isSelected={isScheduled}
                  onValueChange={setIsScheduled}
                  color="primary"
                />
              </div>

              {isScheduled && (
                <Input
                  {...register('scheduledDate')}
                  label="Scheduled Date & Time"
                  type="datetime-local"
                  variant="bordered"
                  isInvalid={!!errors.scheduledDate}
                  errorMessage={errors.scheduledDate?.message}
                />
              )}
            </form>
          </ModalBody>

          <ModalFooter>
            <Button variant="bordered" onPress={onClose}>
              Cancel
            </Button>
            <Button color="primary" onClick={handleSubmit(onSubmit)}>
              {isEditMode ? 'Update Campaign' : 'Create Campaign'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Campaigns;
