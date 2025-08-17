import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Support = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    priority: '',
    category: '',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual backend endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        "Message sent successfully! We'll get back to you within 24 hours.",
      );
      setFormData({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
        priority: '',
        category: '',
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  //   const contactMethods = [
  //     {
  //       icon: 'mdi:email',
  //       title: 'Email Support',
  //       description: 'Get help via email',
  //       contact: 'support@projectbroadcast.com',
  //       response: 'Within 24 hours',
  //       color: 'from-blue-500 to-cyan-500',
  //     },
  //     {
  //       icon: 'mdi:phone',
  //       title: 'Phone Support',
  //       description: 'Speak with our team',
  //       contact: '+1 (555) 123-4567',
  //       response: 'Mon-Fri, 9AM-6PM EST',
  //       color: 'from-green-500 to-emerald-500',
  //     },
  //     {
  //       icon: 'mdi:chat',
  //       title: 'Live Chat',
  //       description: 'Instant help available',
  //       contact: 'Available 24/7',
  //       response: 'Real-time support',
  //       color: 'from-purple-500 to-pink-500',
  //     },
  //     {
  //       icon: 'mdi:clock',
  //       title: 'Emergency Support',
  //       description: 'Critical issues only',
  //       contact: 'emergency@projectbroadcast.com',
  //       response: 'Within 2 hours',
  //       color: 'from-red-500 to-orange-500',
  //     },
  //   ];

  const faqs = [
    {
      question: 'How do I get started with Project Broadcast?',
      answer:
        'Getting started is easy! Simply sign up for a free account, verify your email, and you can begin sending messages immediately. Our onboarding wizard will guide you through the setup process.',
    },
    {
      question: 'What messaging channels do you support?',
      answer:
        'We support WhatsApp Business API, SMS Gateway, and Email services. All channels are available through our unified API and web interface, allowing you to manage multiple channels from one platform.',
    },
    {
      question: 'How is pricing calculated?',
      answer:
        'Pricing is based on the number of messages sent per month. We offer tiered pricing with volume discounts. You only pay for what you use, and there are no hidden fees or setup costs.',
    },
    {
      question: 'Do you provide technical support?',
      answer:
        'Yes! We provide comprehensive technical support including API documentation, SDKs, code examples, and dedicated support engineers for enterprise customers. Our team is available 24/7 for urgent issues.',
    },
    {
      question: 'Is my data secure?',
      answer:
        'Absolutely. We use enterprise-grade security with end-to-end encryption, GDPR compliance, and SOC 2 Type II certification. Your data is stored in secure, redundant data centers with regular backups.',
    },
    {
      question: 'Can I integrate with my existing systems?',
      answer:
        'Yes! We provide REST APIs, webhooks, and SDKs for popular programming languages. We also offer pre-built integrations for major CRM platforms, e-commerce systems, and marketing automation tools.',
    },
  ];

  const categories = [
    'Technical Support',
    'Billing & Account',
    'API Integration',
    'Feature Request',
    'Bug Report',
    'General Inquiry',
    'Partnership',
    'Other',
  ];

  const priorities = ['Low', 'Medium', 'High', 'Critical'];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Icon icon="mdi:headphones" className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">
                24/7 Support Available
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              We're Here to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Help You Succeed
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Get expert support, technical assistance, and guidance from our
              dedicated team. We're committed to ensuring your success with
              Project Broadcast.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Send Us a Message
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Have a specific question or need personalized assistance? Fill
                out the form below and we'll get back to you promptly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="border border-slate-200">
                <CardBody className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange('name', e.target.value)
                        }
                        variant="bordered"
                        isRequired
                        classNames={{
                          input: 'text-slate-900',
                          label: 'text-slate-700',
                        }}
                      />
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange('email', e.target.value)
                        }
                        variant="bordered"
                        isRequired
                        classNames={{
                          input: 'text-slate-900',
                          label: 'text-slate-700',
                        }}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Company (Optional)"
                        placeholder="Enter your company name"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange('company', e.target.value)
                        }
                        variant="bordered"
                        classNames={{
                          input: 'text-slate-900',
                          label: 'text-slate-700',
                        }}
                      />
                      <Input
                        label="Subject"
                        placeholder="Brief description of your inquiry"
                        value={formData.subject}
                        onChange={(e) =>
                          handleInputChange('subject', e.target.value)
                        }
                        variant="bordered"
                        isRequired
                        classNames={{
                          input: 'text-slate-900',
                          label: 'text-slate-700',
                        }}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Select
                        label="Category"
                        placeholder="Select a category"
                        value={formData.category}
                        onChange={(e) =>
                          handleInputChange('category', e.target.value)
                        }
                        variant="bordered"
                        isRequired
                        classNames={{
                          trigger: 'border-slate-300',
                          label: 'text-slate-700',
                        }}
                      >
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </Select>
                      <Select
                        label="Priority"
                        placeholder="Select priority level"
                        value={formData.priority}
                        onChange={(e) =>
                          handleInputChange('priority', e.target.value)
                        }
                        variant="bordered"
                        isRequired
                        classNames={{
                          trigger: 'border-slate-300',
                          label: 'text-slate-700',
                        }}
                      >
                        {priorities.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priority}
                          </SelectItem>
                        ))}
                      </Select>
                    </div>

                    <Textarea
                      label="Message"
                      placeholder="Describe your question or issue in detail..."
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange('message', e.target.value)
                      }
                      variant="bordered"
                      minRows={4}
                      isRequired
                      classNames={{
                        input: 'text-slate-900',
                        label: 'text-slate-700',
                      }}
                    />

                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        size="lg"
                        color="primary"
                        isLoading={isSubmitting}
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 text-lg font-semibold"
                      >
                        {isSubmitting ? 'Sending Message...' : 'Send Message'}
                      </Button>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      {/* <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Multiple Ways to Get Help
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose the support method that works best for you. Our team is
              ready to assist with any questions or issues.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full border border-slate-200 hover:shadow-lg transition-all">
                  <CardBody className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon icon={method.icon} className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {method.title}
                    </h3>
                    <p className="text-slate-600 mb-4">{method.description}</p>
                    <div className="space-y-2">
                      <div className="font-semibold text-slate-900">
                        {method.contact}
                      </div>
                      <div className="text-sm text-slate-500">
                        {method.response}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Find quick answers to common questions. Can't find what you're
              looking for? Contact our support team.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="border border-slate-200">
                    <CardHeader className="pb-0">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {faq.question}
                      </h3>
                    </CardHeader>
                    <CardBody className="pt-4">
                      <p className="text-slate-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-slate-300 max-w-2xl mx-auto">
              Join thousands of businesses using Project Broadcast to engage
              their customers effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/signup')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-2xl"
              >
                Start Free Trial
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all backdrop-blur-sm"
              >
                View Pricing
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Support;
