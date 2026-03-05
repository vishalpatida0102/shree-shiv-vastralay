import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[380px]">
          <div className="text-center mb-14">
            <h1 className="text-[38px] font-bold text-[#2d2d2d] leading-tight">
              Welcome Back{' '}
              <span className="inline-block">👋</span>
            </h1>
            <p className="text-[#999] text-sm mt-3 leading-relaxed max-w-[260px] mx-auto">
              Sign in to manage your Nagpur Wala store
            </p>
          </div>

          <form onSubmit={handleSubmit}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-[18px] border border-[#ddd] rounded-lg focus:outline-none focus:border-[#bbb] text-sm bg-white text-[#333] placeholder-[#bbb]"
                placeholder="Enter your email"
              />

              <div className="relative" style={{ marginTop: '24px' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-5 py-[18px] border border-[#ddd] rounded-lg focus:outline-none focus:border-[#bbb] text-sm pr-14 bg-white text-[#333] placeholder-[#bbb]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#ccc] hover:text-[#888]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

            <button
              type="submit"
              style={{ marginTop: '40px' }}
              className="w-full bg-gradient-to-r from-[#d35400] to-[#e67e22] text-white font-bold py-[18px] rounded-full text-sm uppercase tracking-widest shadow-[0_8px_30px_rgba(211,84,0,0.3)] hover:shadow-[0_8px_30px_rgba(211,84,0,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-[#bbb] text-sm mt-8">
            Forgot password?{' '}
            <button className="text-[#444] font-semibold hover:underline">
              Reset here
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Branded Image */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8">
        <div className="relative w-full max-w-lg rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800"
            alt="Nagpur Wala Sarees"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-maroon/30 to-transparent" />

          {/* Logo Badge */}
          <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-lg">
            <span className="font-heading text-base font-bold text-maroon">
              नागपुर वाला
            </span>
          </div>

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h2 className="text-white text-2xl md:text-3xl font-bold leading-tight mb-3">
              Where tradition meets fashion.
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Nagpur Wala — Exclusive Sarees & Bridal Collection. Manage your store, add products, and connect with customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
