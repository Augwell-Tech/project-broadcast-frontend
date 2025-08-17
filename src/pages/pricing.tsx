import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { Card, CardBody, CardHeader, Switch } from '@nextui-org/react';
import { useState, startTransition } from 'react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
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

  const plans = [
    {
      name: 'Free',
      description: 'Perfect for getting started',
      price: { monthly: 0, yearly: 0 },
      features: [
        '1,000 SMS messages/month',
        '500 WhatsApp messages/month',
        '1,000 emails/month',
        'Basic analytics',
        'Email support',
        'API access',
      ],
      popular: false,
      color: 'from-slate-500 to-slate-700',
      buttonColor: 'bg-slate-600 hover:bg-slate-700',
    },
    {
      name: 'Pro',
      description: 'Best for growing businesses',
      price: { monthly: 49, yearly: 39 },
      features: [
        '10,000 SMS messages/month',
        '5,000 WhatsApp messages/month',
        '10,000 emails/month',
        'Advanced analytics',
        'Priority support',
        'Custom templates',
        'Webhook support',
        'Team collaboration',
      ],
      popular: true,
      color: 'from-blue-500 to-cyan-500',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Enterprise',
      description: 'For large-scale operations',
      price: { monthly: 199, yearly: 159 },
      features: [
        'Unlimited SMS messages',
        'Unlimited WhatsApp messages',
        'Unlimited emails',
        'Enterprise analytics',
        '24/7 phone support',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantees',
        'Advanced security',
      ],
      popular: false,
      color: 'from-purple-500 to-indigo-500',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  const getPrice = (plan: any) => {
    const price = isYearly ? plan.price.yearly : plan.price.monthly;
    return price === 0 ? 'Free' : `$${price}`;
  };

  const getPeriod = () => (isYearly ? '/month (billed yearly)' : '/month');

  const getSavings = (plan: any) => {
    if (plan.price.monthly === 0 || plan.price.yearly === 0) return null;
    const savings =
      ((plan.price.monthly - plan.price.yearly) / plan.price.monthly) * 100;
    return savings > 0 ? `Save ${Math.round(savings)}%` : null;
  };

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
              <Icon icon="mdi:currency-usd" className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">Transparent Pricing</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Simple,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Transparent Pricing
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Choose the perfect plan for your business. Scale up or down as
              needed. No hidden fees, no surprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Toggle */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Start free and upgrade as you grow
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span
                className={`text-lg font-medium ${
                  !isYearly ? 'text-slate-900' : 'text-slate-500'
                }`}
              >
                Monthly
              </span>
              <Switch
                isSelected={isYearly}
                onValueChange={setIsYearly}
                size="lg"
                color="primary"
                classNames={{
                  wrapper: 'bg-slate-200',
                  thumb: 'bg-white',
                }}
              />
              <span
                className={`text-lg font-medium ${
                  isYearly ? 'text-slate-900' : 'text-slate-500'
                }`}
              >
                Yearly
              </span>
              {isYearly && (
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  Save up to 20%
                </span>
              )}
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <Card
                  className={`w-full h-full ${
                    plan.popular ? 'ring-2 ring-blue-500 scale-105' : ''
                  }`}
                  shadow="lg"
                >
                  <CardHeader className="pb-0 pt-6 px-6">
                    <div className="w-full">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-slate-600 mb-4">{plan.description}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-slate-900">
                          {getPrice(plan)}
                        </span>
                        {plan.price.monthly !== 0 && (
                          <span className="text-slate-600 text-lg">
                            {getPeriod()}
                          </span>
                        )}
                      </div>
                      {getSavings(plan) && (
                        <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full mt-2">
                          {getSavings(plan)}
                        </span>
                      )}
                    </div>
                  </CardHeader>

                  <CardBody className="px-6 pt-6">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <Icon
                            icon="mdi:check-circle"
                            className="w-5 h-5 text-green-500 flex-shrink-0"
                          />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleNavigation('/signup')}
                      className={`w-full ${plan.buttonColor} text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg`}
                    >
                      {plan.name === 'Free'
                        ? 'Get Started Free'
                        : 'Get Started'}
                    </button>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Everything you need to know about our pricing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'Can I change my plan anytime?',
                answer:
                  'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                question: 'What happens if I exceed my monthly limits?',
                answer:
                  "We'll notify you when you're close to your limit. You can upgrade your plan or purchase additional credits.",
              },
              {
                question: 'Do you offer custom pricing for enterprise?',
                answer:
                  'Absolutely! Contact our sales team for custom enterprise solutions tailored to your specific needs.',
              },
              {
                question: 'Is there a setup fee?',
                answer:
                  'No setup fees. You only pay for what you use, starting with our free tier.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
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
              their customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => handleNavigation('/signup')}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105 shadow-2xl"
              >
                Get Started for Free
              </button>
              <button
                onClick={() => handleNavigation('/docs')}
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-slate-900 transition-all backdrop-blur-sm"
              >
                View Documentation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Pricing;
