import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Card, CardBody, CardHeader, Input, Button } from '@nextui-org/react';
import { useState, startTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    useCase: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call - replace with actual backend endpoint
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        // Store token in localStorage or state management
        localStorage.setItem('authToken', result.token);
        toast.success(
          'Account created successfully! Redirecting to dashboard...',
        );

        // Redirect to dashboard after successful signup
        setTimeout(() => {
          startTransition(() => {
            navigate('/dashboard');
          });
        }, 1500);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Icon icon="mdi:rocket-launch" className="w-4 h-4" />
              Start Your Free Trial
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Get Started with Project Broadcast
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Start sending WhatsApp, SMS, and Email messages in minutes. No
              credit card required for your 14-day free trial.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Signup Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <Icon
                      icon="mdi:account-plus"
                      className="w-6 h-6 text-white"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      Create Your Account
                    </h2>
                    <p className="text-slate-600">
                      Join thousands of successful businesses
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Business Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="your@company.com"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Company Name *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-slate-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="useCase"
                      className="block text-sm font-semibold text-slate-700 mb-2"
                    >
                      Primary Use Case *
                    </label>
                    <select
                      id="useCase"
                      name="useCase"
                      value={formData.useCase}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select your primary use case</option>
                      <option value="customer-support">
                        Customer Support & Notifications
                      </option>
                      <option value="marketing">Marketing Campaigns</option>
                      <option value="ecommerce">
                        E-commerce & Order Updates
                      </option>
                      <option value="app-integration">App Integration</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Start Free Trial
                  </button>
                </form>
                <p className="text-sm text-slate-600 text-center mt-4">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Sign in here
                  </Link>
                </p>

                <div className="mt-8 pt-8 border-t border-slate-200">
                  <p className="text-sm text-slate-600 text-center">
                    By signing up, you agree to our{' '}
                    <a
                      href="/terms"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a
                      href="/privacy"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits Sidebar */}
            <div className="space-y-6">
              {/* Trust Indicators */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Icon
                    icon="mdi:shield-check"
                    className="w-5 h-5 text-green-500"
                  />
                  Trusted & Secure
                </h3>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="mdi:check-circle"
                      className="w-4 h-4 text-green-500"
                    />
                    <span>GDPR Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="mdi:check-circle"
                      className="w-4 h-4 text-green-500"
                    />
                    <span>Enterprise Security</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="mdi:check-circle"
                      className="w-4 h-4 text-green-500"
                    />
                    <span>99.9% Uptime</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <Icon icon="mdi:star" className="w-5 h-5 text-yellow-300" />
                  What You Get
                </h3>
                <div className="space-y-3 text-sm text-blue-100">
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="mdi:check-circle"
                      className="w-4 h-4 text-yellow-300"
                    />
                    <span>14-day free trial</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="mdi:check-circle"
                      className="w-4 h-4 text-yellow-300"
                    />
                    <span>All features included</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="mdi:check-circle"
                      className="w-4 h-4 text-yellow-300"
                    />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="mdi:check-circle"
                      className="w-4 h-4 text-yellow-300"
                    />
                    <span>24/7 support access</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <Icon
                    icon="mdi:chart-line"
                    className="w-5 h-5 text-blue-500"
                  />
                  Platform Stats
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      10,000+
                    </div>
                    <div className="text-sm text-slate-600">
                      Active Businesses
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      99.9%
                    </div>
                    <div className="text-sm text-slate-600">Delivery Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      150+
                    </div>
                    <div className="text-sm text-slate-600">Countries</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Benefits */}
          <div className="mt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Why Choose Project Broadcast?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Join thousands of businesses that trust us for their
                communication needs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: 'mdi:rocket-launch',
                  title: 'Get Started in Minutes',
                  description:
                    'No complex setup required. Start sending messages immediately.',
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: 'mdi:shield-check',
                  title: 'Free Trial',
                  description:
                    'Try all features free for 14 days. No credit card required.',
                  color: 'from-green-500 to-emerald-500',
                },
                {
                  icon: 'mdi:headphones',
                  title: '24/7 Support',
                  description:
                    'Get help whenever you need it with our expert support team.',
                  color: 'from-purple-500 to-pink-500',
                },
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-all duration-300 shadow-lg`}
                  >
                    <Icon
                      icon={benefit.icon}
                      className="w-10 h-10 text-white"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Signup;
