import React, { useState } from 'react';
import { X, Mail, Shield, Coffee, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ModalStep = 'login' | 'subscribe' | 'verify';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<ModalStep>('login');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');

  const { login, subscribe, verify, resendVerification } = useAuth();

  const resetModal = () => {
    setStep('login');
    setEmail('');
    setVerificationCode('');
    setPendingEmail('');
    setIsLoading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    const result = await login(email);
    setIsLoading(false);

    if (result.success) {
      toast.success(result.message || 'Login successful!');
      handleClose();
    } else if (result.needsVerification) {
      setPendingEmail(email);
      setStep('verify');
      toast.success('Verification code sent to your email!');
    } else {
      toast.error(result.message || 'Login failed');
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    const result = await subscribe(email);
    setIsLoading(false);

    if (result.success) {
      setPendingEmail(email);
      setStep('verify');
      toast.success(result.message || 'Verification code sent!');
    } else {
      toast.error(result.message || 'Subscription failed');
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim()) return;

    setIsLoading(true);
    const result = await verify(verificationCode);
    setIsLoading(false);

    if (result.success) {
      toast.success(result.message || 'Verification successful!');
      handleClose();
    } else {
      toast.error(result.message || 'Verification failed');
    }
  };

  const handleResendCode = async () => {
    if (!pendingEmail) return;

    setIsLoading(true);
    const result = await resendVerification(pendingEmail);
    setIsLoading(false);

    if (result.success) {
      toast.success(result.message || 'Code resent!');
    } else {
      toast.error(result.message || 'Failed to resend code');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'login' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-emerald-400 mb-2">Login to Big(O) Calculator</h2>
              <p className="text-slate-300">Enter your email to receive a verification code</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@gmail.com"
                  className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? 'Processing...' : 'Continue'}
              </button>
            </form>

            <div className="text-center">
              <button
                onClick={() => setStep('subscribe')}
                className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors"
              >
                Don't have an account? Subscribe here
              </button>
            </div>
          </div>
        )}

        {step === 'subscribe' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Start Your Daily Prep Journey</h2>
              <p className="text-slate-300">Just verify your email and you're all set! No payment, no hassle.</p>
            </div>

            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex space-x-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@gmail.com"
                  className="flex-1 min-w-0 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full">
                <Coffee className="w-5 h-5" />
                <span className="font-medium">1 Coffee/month ($5) FREE Now!</span>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setStep('login')}
                className="text-slate-400 hover:text-slate-300 text-sm transition-colors"
              >
                Already have an account? Login here
              </button>
            </div>
          </div>
        )}

        {step === 'verify' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-emerald-400 mb-2">Verify Your Email</h2>
              <p className="text-slate-300">Enter the verification code sent to your email</p>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="6-digit verification code"
                  className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  maxLength={6}
                  required
                />
              </div>

              <div className="p-3 bg-green-900/30 border border-green-700 rounded-lg">
                <p className="text-green-400 text-sm text-center">
                  Verification code sent. Please check your email.
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setStep('login')}
                  className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 inline mr-2" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Login'}
                </button>
              </div>
            </form>

            <div className="text-center">
              <button
                onClick={handleResendCode}
                disabled={isLoading}
                className="text-emerald-400 hover:text-emerald-300 text-sm transition-colors disabled:opacity-50"
              >
                Didn't receive code? Resend
              </button>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full">
                <Coffee className="w-5 h-5" />
                <span className="font-medium">1 Coffee/month ($5) FREE Now!</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
