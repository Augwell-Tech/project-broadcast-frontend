import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { startTransition } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (path.startsWith('/dashboard')) {
      startTransition(() => {
        navigate(path);
      });
    } else {
      navigate(path);
    }
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section - Inspired by EngageLab */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Icon icon="mdi:star" className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">
                Trusted by 10,000+ businesses globally
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Maximize User Reach,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Optimize User Management
              </span>
            </h1>

            <p className="text-xl md:text-2xl mb-12 text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Project Broadcast combines technology and versatility to provide
              seamless customer interactions, enabling businesses to build
              lasting relationships and increase conversions and retention.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={() => handleNavigation('/signup')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-2xl"
              >
                Get Started for Free
              </button>
              <button
                onClick={() => handleNavigation('/pricing')}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all backdrop-blur-sm"
              >
                View Pricing
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-slate-400">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:shield-check" className="w-5 h-5" />
                <span className="text-sm">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:lock" className="w-5 h-5" />
                <span className="text-sm">Enterprise Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:clock" className="w-5 h-5" />
                <span className="text-sm">99.9% Uptime</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Inspired by EngageLab */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Project Broadcast Driving Success for 10,000+ Businesses Globally
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join the ranks of successful companies using our platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                number: '10B+',
                label: 'Messages Sent',
                icon: 'mdi:message-text',
              },
              {
                number: '99.9%',
                label: 'Delivery Rate',
                icon: 'mdi:check-circle',
              },
              { number: '150+', label: 'Countries', icon: 'mdi:earth' },
              { number: '24/7', label: 'Support', icon: 'mdi:headphones' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon icon={stat.icon} className="w-10 h-10 text-blue-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Redesigned */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Omni-Channel Customer Engagement Expert
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Project Broadcast provides enterprises with an all-in-one highly
              integrated platform that covers a full range of functions.
              Integrating multiple customer interaction channels and
              capabilities simplifies customer interaction, centralizes platform
              management, and ensures service and security.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* WhatsApp API */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon
                    icon="mdi:whatsapp"
                    className="w-8 h-8 text-green-600"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    WhatsApp Business API
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Send messages, media, and templates through WhatsApp
                    Business with our reliable API integration. Perfect for
                    customer support, notifications, and marketing campaigns.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Message templates & media',
                      'Delivery receipts',
                      'Webhook support',
                      'Global compliance',
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <Icon
                          icon="mdi:check-circle"
                          className="w-4 h-4 text-green-500"
                        />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SMS API */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon
                    icon="mdi:message-text"
                    className="w-8 h-8 text-blue-600"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    SMS Gateway API
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    High-delivery SMS API with global coverage, perfect for
                    notifications, OTP, and marketing campaigns. Built for
                    reliability and speed.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Global carrier network',
                      'Two-way messaging',
                      'Delivery tracking',
                      'Bulk SMS support',
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <Icon
                          icon="mdi:check-circle"
                          className="w-4 h-4 text-green-500"
                        />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Email API */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon icon="mdi:email" className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Email Service API
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Transactional and marketing email API with advanced features
                    for high deliverability and engagement. Professional
                    templates and analytics included.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Transactional emails',
                      'Template engine',
                      'Analytics & tracking',
                      'Spam protection',
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <Icon
                          icon="mdi:check-circle"
                          className="w-4 h-4 text-green-500"
                        />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Web Interface */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Icon icon="mdi:web" className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    Web Interface
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Intuitive web interface for quick campaigns without API
                    integration. Drag & drop builder with advanced analytics and
                    A/B testing.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'Campaign builder',
                      'Contact management',
                      'Real-time analytics',
                      'A/B testing tools',
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <Icon
                          icon="mdi:check-circle"
                          className="w-4 h-4 text-green-500"
                        />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marketing Automation Section - New */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon icon="mdi:rocket-launch" className="w-4 h-4" />
                New & Improved!
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                Try Smarter Marketing Automation!
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Our platform integrates cross-channel data to create complete
                user profiles. The platform seamlessly manages 5 messaging
                channels for better collaboration & performance.
              </p>
              <div className="space-y-4">
                {[
                  'Quickly design customer journeys through intuitive visual tools',
                  'AI-powered analytics provide real-time tracking of revenue conversions',
                  'Multi-channel auto-replenishment with up to 85% backfill rates',
                  'Custom OTP length, language and expiry date to fit different organisations',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Icon
                      icon="mdi:check-circle"
                      className="w-6 h-6 text-green-500 mt-1 flex-shrink-0"
                    />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Placeholder for marketing automation dashboard */}
              <div className="bg-gradient-to-br from-slate-100 to-blue-100 p-8 rounded-2xl">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-slate-900 text-lg">
                      Marketing Automation Dashboard
                    </h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Campaign Builder Mockup */}
                  <div className="space-y-4">
                    <div className="h-4 bg-slate-200 rounded"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>

                    {/* Visual Workflow */}
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center justify-center space-x-2 mb-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                          1
                        </div>
                        <div className="w-16 h-1 bg-blue-300"></div>
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                          2
                        </div>
                        <div className="w-16 h-1 bg-blue-300"></div>
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                          3
                        </div>
                      </div>
                      <div className="text-center text-sm text-blue-700">
                        Customer Journey Workflow
                      </div>
                    </div>

                    <div className="h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      Create New Campaign
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industry Solutions Section - New */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Tailored Solutions for Your Industry
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Project Broadcast provides enterprises with an all-in-one highly
              integrated platform that covers a full range of functions for
              different industry verticals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: 'Financial',
                icon: 'mdi:bank',
                color: 'from-green-500 to-emerald-600',
              },
              {
                name: 'E-commerce',
                icon: 'mdi:shopping',
                color: 'from-blue-500 to-cyan-600',
              },
              {
                name: 'News & Media',
                icon: 'mdi:newspaper',
                color: 'from-purple-500 to-pink-600',
              },
              {
                name: 'Travel',
                icon: 'mdi:airplane',
                color: 'from-orange-500 to-red-600',
              },
              {
                name: 'Gaming',
                icon: 'mdi:gamepad-variant',
                color: 'from-indigo-500 to-purple-600',
              },
            ].map((industry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div
                  className={`bg-gradient-to-br ${industry.color} p-6 rounded-2xl text-white text-center transform group-hover:scale-105 transition-all duration-300 shadow-lg`}
                >
                  <Icon
                    icon={industry.icon}
                    className="w-12 h-12 mx-auto mb-4"
                  />
                  <h3 className="font-semibold text-lg">{industry.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section - Redesigned */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include our web
              interface and API access.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-2 border-slate-200 hover:shadow-xl transition-all"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Starter
                </h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">$29</div>
                <div className="text-slate-600">per month</div>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  '1,000 WhatsApp messages',
                  '5,000 SMS messages',
                  '10,000 emails',
                  'Web interface access',
                  'Basic analytics',
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Icon
                      icon="mdi:check-circle"
                      className="w-5 h-5 text-green-500 mr-3"
                    />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleNavigation('/signup')}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all"
              >
                Start Free Trial
              </button>
            </motion.div>

            {/* Professional Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-500 to-cyan-500 p-8 rounded-2xl shadow-2xl relative transform scale-105"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-yellow-400 text-slate-900 px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-8 text-white">
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <div className="text-4xl font-bold mb-2">$99</div>
                <div className="text-blue-100">per month</div>
              </div>
              <ul className="space-y-4 mb-8 text-white">
                {[
                  '10,000 WhatsApp messages',
                  '50,000 SMS messages',
                  '100,000 emails',
                  'Priority support',
                  'Advanced analytics',
                  'Webhook integration',
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Icon
                      icon="mdi:check-circle"
                      className="w-5 h-5 text-yellow-300 mr-3"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleNavigation('/signup')}
                className="w-full bg-white text-blue-600 py-3 rounded-xl font-semibold hover:bg-slate-100 transition-all"
              >
                Start Free Trial
              </button>
            </motion.div>

            {/* Enterprise Plan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-lg border-2 border-slate-200 hover:shadow-xl transition-all"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Enterprise
                </h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  Custom
                </div>
                <div className="text-slate-600">contact sales</div>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  'Unlimited messages',
                  'Dedicated support',
                  'Custom integrations',
                  'SLA guarantees',
                  'White-label options',
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Icon
                      icon="mdi:check-circle"
                      className="w-5 h-5 text-green-500 mr-3"
                    />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full bg-slate-600 text-white py-3 rounded-xl font-semibold hover:bg-slate-700 transition-all">
                Contact Sales
              </button>
            </motion.div>
          </div>

          {/* View All Plans Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => handleNavigation('/pricing')}
              className="bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-all transform hover:scale-105 shadow-lg"
            >
              View All Plans & Features
            </button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
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
              Effortless Global Customer Engagement with Project Broadcast
            </h2>
            <p className="text-xl mb-8 text-slate-300 max-w-2xl mx-auto">
              Join thousands of businesses using Project Broadcast to
              communicate with their customers effectively.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleNavigation('/signup')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-2xl"
              >
                Get Started for Free
              </button>
              <button
                onClick={() => handleNavigation('/support')}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all backdrop-blur-sm"
              >
                Contact Support
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
