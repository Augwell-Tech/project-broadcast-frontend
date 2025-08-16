import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const Docs = () => {
  const apiDocs = [
    {
      title: 'WhatsApp Business API',
      description: 'Integrate WhatsApp messaging into your applications',
      icon: 'mdi:whatsapp',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      features: [
        'Message templates & media',
        'Delivery receipts',
        'Webhook support',
        'Global compliance',
      ],
    },
    {
      title: 'SMS Gateway API',
      description: 'Send SMS messages worldwide with high delivery rates',
      icon: 'mdi:message-text',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      features: [
        'Global carrier network',
        'Two-way messaging',
        'Delivery tracking',
        'Bulk SMS support',
      ],
    },
    {
      title: 'Email Service API',
      description: 'Transactional and marketing emails with advanced features',
      icon: 'mdi:email',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      features: [
        'Transactional emails',
        'Template engine',
        'Analytics & tracking',
        'Spam protection',
      ],
    },
  ];

  const quickStartSteps = [
    {
      step: '1',
      title: 'Sign Up',
      description: 'Create your account and verify your email',
    },
    {
      step: '2',
      title: 'Get API Keys',
      description: 'Access your API keys from the dashboard',
    },
    {
      step: '3',
      title: 'Integrate',
      description: 'Use our SDKs or make direct API calls',
    },
    {
      step: '4',
      title: 'Send Messages',
      description: 'Start sending messages to your users',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Icon icon="mdi:book-open" className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">Developer Resources</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Project Broadcast
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Documentation
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to integrate WhatsApp, SMS, and Email APIs
              into your applications. Comprehensive guides, SDKs, and examples
              to get you started quickly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Quick Start Guide
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get up and running with Project Broadcast APIs in just a few
              minutes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {quickStartSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* API Documentation */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              API Documentation
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive guides for each of our communication APIs with
              detailed examples and best practices
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {apiDocs.map((api, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 hover:shadow-2xl transition-all group cursor-pointer"
              >
                <div
                  className={`w-16 h-16 ${api.bgColor} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon icon={api.icon} className={`w-8 h-8 ${api.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4 text-center">
                  {api.title}
                </h3>
                <p className="text-slate-600 mb-6 text-center leading-relaxed">
                  {api.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {api.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-slate-600"
                    >
                      <Icon
                        icon="mdi:check-circle"
                        className="w-4 h-4 text-green-500 mr-3 flex-shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-lg">
                  View Documentation
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SDKs & Libraries */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              SDKs & Libraries
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Use our official SDKs for faster integration and better developer
              experience. Available in multiple programming languages with
              comprehensive examples.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Node.js',
                icon: 'logos:nodejs-icon',
                color: 'bg-green-100',
                desc: 'JavaScript runtime',
              },
              {
                name: 'Python',
                icon: 'logos:python',
                color: 'bg-blue-100',
                desc: 'Python 3.7+',
              },
              {
                name: 'PHP',
                icon: 'logos:php',
                color: 'bg-purple-100',
                desc: 'PHP 7.4+',
              },
              {
                name: 'Java',
                icon: 'logos:java',
                color: 'bg-orange-100',
                desc: 'Java 8+',
              },
            ].map((sdk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-slate-50 p-6 rounded-2xl text-center hover:bg-slate-100 transition-all cursor-pointer group border border-slate-200"
              >
                <div
                  className={`w-16 h-16 ${sdk.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon icon={sdk.icon} className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  {sdk.name}
                </h3>
                <p className="text-sm text-slate-600">{sdk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples Section - New */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Quick Code Examples
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how easy it is to integrate our APIs with simple code examples
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* WhatsApp Example */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Icon
                    icon="mdi:whatsapp"
                    className="w-5 h-5 text-green-600"
                  />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  WhatsApp Message
                </h3>
              </div>

              {/* Code Placeholder */}
              <div className="bg-slate-900 rounded-xl p-4 text-green-400 font-mono text-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-400">JavaScript</span>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-blue-400">const</div>
                  <div className="text-yellow-400">response</div>
                  <div className="text-slate-400">= await</div>
                  <div className="text-green-400">
                    projectBroadcast.whatsapp.send(
                  </div>
                  <div className="text-slate-400 ml-4">to: '+1234567890',</div>
                  <div className="text-slate-400 ml-4">
                    template: 'welcome_message',
                  </div>
                  <div className="text-slate-400 ml-4">
                    variables: name: 'John'
                  </div>
                  <div className="text-green-400">);</div>
                </div>
              </div>
            </motion.div>

            {/* SMS Example */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Icon
                    icon="mdi:message-text"
                    className="w-5 h-5 text-blue-600"
                  />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">
                  SMS Message
                </h3>
              </div>

              {/* Code Placeholder */}
              <div className="bg-slate-900 rounded-xl p-4 text-green-400 font-mono text-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-slate-400">Python</span>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-blue-400">response</div>
                  <div className="text-slate-400">=</div>
                  <div className="text-green-400">
                    project_broadcast.sms.send(
                  </div>
                  <div className="text-slate-400 ml-4">to='+1234567890',</div>
                  <div className="text-slate-400 ml-4">
                    message='Your OTP is: 123456',
                  </div>
                  <div className="text-slate-400 ml-4">sender='Company'</div>
                  <div className="text-green-400">)</div>
                </div>
              </div>
            </motion.div>
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
              Need Help Getting Started?
            </h2>
            <p className="text-xl mb-8 text-slate-300 max-w-2xl mx-auto">
              Our developer support team is here to help you integrate Project
              Broadcast APIs successfully. Get expert guidance and best
              practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-2xl">
                Contact Support
              </button>
              <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all backdrop-blur-sm">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Docs;
