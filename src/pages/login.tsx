import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Link,
} from '@nextui-org/react';
import { useState, startTransition } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';

const byPassAuth = true;

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    if (byPassAuth) {
      localStorage.setItem('authToken', '1234567890');
      toast.success('Login successful! Redirecting to dashboard...');
      startTransition(() => {
        navigate('/dashboard');
      });
    }

    setIsLoading(true);

    try {
      // Simulate API call - replace with actual backend endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        // Store token in localStorage or state management
        localStorage.setItem('authToken', result.token);
        toast.success('Login successful! Redirecting to dashboard...');

        // Redirect to dashboard after successful login
        setTimeout(() => {
          startTransition(() => {
            navigate('/dashboard');
          });
        }, 1500);
      } else {
        const error = await response.json();
        toast.error(error.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6">
            <Icon icon="mdi:login" className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-slate-700">
              Welcome Back
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Sign In to Your Account
          </h1>
          <p className="text-slate-600">
            Access your Project Broadcast dashboard
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="w-full shadow-2xl border border-slate-200">
            <CardHeader className="pb-0 pt-6 px-6">
              <div className="w-full text-center">
                <h2 className="text-xl font-semibold text-slate-900">
                  Enter your credentials
                </h2>
              </div>
            </CardHeader>

            <CardBody className="px-6 pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Input
                    {...register('email')}
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    variant="bordered"
                    size="lg"
                    startContent={
                      <Icon
                        icon="mdi:email"
                        className="w-5 h-5 text-slate-400"
                      />
                    }
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    classNames={{
                      input: 'text-slate-900',
                      label: 'text-slate-700',
                    }}
                  />
                </div>

                <div>
                  <Input
                    {...register('password')}
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    variant="bordered"
                    size="lg"
                    startContent={
                      <Icon
                        icon="mdi:lock"
                        className="w-5 h-5 text-slate-400"
                      />
                    }
                    isInvalid={!!errors.password}
                    errorMessage={errors.password?.message}
                    classNames={{
                      input: 'text-slate-900',
                      label: 'text-slate-700',
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    href="#"
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3"
                  size="lg"
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-600">
                  Don't have an account?{' '}
                  <RouterLink
                    to="/signup"
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Sign up here
                  </RouterLink>
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-3">Need Help?</h3>
            <p className="text-slate-600 text-sm mb-4">
              Our support team is here to help you get started
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="bordered"
                size="sm"
                startContent={
                  <Icon icon="mdi:headphones" className="w-4 h-4" />
                }
                className="border-slate-300 text-slate-700"
                onClick={() => navigate('/support')}
              >
                Contact Support
              </Button>
              <Button
                variant="bordered"
                size="sm"
                startContent={<Icon icon="mdi:book-open" className="w-4 h-4" />}
                className="border-slate-300 text-slate-700"
                onClick={() => navigate('/docs')}
              >
                View Docs
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Login;
