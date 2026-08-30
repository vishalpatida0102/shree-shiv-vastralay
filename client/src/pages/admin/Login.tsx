import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useSiteConfig } from '../../context/ConfigContext';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { identity } = useSiteConfig();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#0a0a0a' }}>

      {/* Left Side - Branded Visual */}
      <style>{`
        #login-left { display: none; }
        @media (min-width: 1024px) { #login-left { display: flex; } }
      `}</style>
      <div
        id="login-left"
        style={{
          flex: 1,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background Image */}
        <img
          src={identity.loginBackground}
          alt={identity.name}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.92) 100%)',
        }} />

        {/* Top Logo Badge */}
        <div style={{
          position: 'absolute',
          top: '32px',
          left: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          padding: '8px 16px 8px 8px',
          borderRadius: '50px',
          border: '1px solid rgba(212,175,55,0.2)',
        }}>
          <img
            src={identity.logo}
            alt={identity.name}
            style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #D4AF37' }}
          />
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#D4AF37', fontFamily: 'Noto Serif Devanagari, serif' }}>
            {identity.name}
          </span>
        </div>

        {/* Bottom Content */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '48px 40px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
          }}>
            <div style={{ width: '28px', height: '1.5px', backgroundColor: '#D4AF37' }} />
            <span style={{ fontSize: '11px', fontWeight: '600', color: '#D4AF37', letterSpacing: '2px', textTransform: 'uppercase' }}>
              एडमिन पैनल
            </span>
          </div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#fff',
            lineHeight: '1.3',
            margin: '0 0 12px',
          }}>
            जहाँ परंपरा<br />मिलती है फैशन से।
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.7', maxWidth: '360px' }}>
            अपना स्टोर प्रबंधित करें, उत्पाद जोड़ें, और पूरे भारत में ग्राहकों से जुड़ें।
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        background: 'linear-gradient(180deg, #111 0%, #0a0a0a 50%, #111 100%)',
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>

          {/* Mobile Logo */}
          <style>{`
            #login-mobile-logo { display: flex; }
            @media (min-width: 1024px) { #login-mobile-logo { display: none !important; } }
          `}</style>
          <div id="login-mobile-logo" style={{
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '40px',
          }}>
            <img
              src={identity.logo}
              alt={identity.name}
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '2px solid #D4AF37',
                marginBottom: '12px',
                boxShadow: '0 4px 20px rgba(212,175,55,0.2)',
              }}
            />
            <span style={{ fontSize: '22px', fontWeight: '700', color: '#D4AF37', fontFamily: 'Noto Serif Devanagari, serif' }}>
              श्री शिव वस्त्रालय
            </span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: '36px' }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#fff',
              margin: '0 0 8px',
              lineHeight: '1.2',
            }}>
              वापस स्वागत है
            </h1>
            <p style={{ fontSize: '14px', color: '#666', margin: 0, lineHeight: '1.6' }}>
              अपने खाते में लॉगिन करें
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              backgroundColor: 'rgba(220,38,38,0.1)',
              border: '1px solid rgba(220,38,38,0.2)',
              color: '#ef4444',
              fontSize: '13px',
              fontWeight: '500',
              padding: '12px 16px',
              borderRadius: '12px',
              marginBottom: '20px',
              textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                ईमेल
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#555',
                }}>
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="आपका ईमेल"
                  style={{
                    width: '100%',
                    padding: '14px 16px 14px 44px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '14px',
                    color: '#fff',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#D4AF37'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
              </div>
            </div>

            {/* Password Field */}
            <div style={{ marginBottom: '28px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                पासवर्ड
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#555',
                }}>
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="अपना पासवर्ड दर्ज करें"
                  style={{
                    width: '100%',
                    padding: '14px 48px 14px 44px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    fontSize: '14px',
                    color: '#fff',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#D4AF37'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#555',
                    padding: '4px',
                    display: 'flex',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                width: '100%',
                padding: '15px 24px',
                background: 'linear-gradient(45deg, rgba(166,109,48,1), rgba(255,229,142,1) 50%, rgba(224,176,87,1) 100%)',
                color: '#1a1a1a',
                fontSize: '14px',
                fontWeight: '700',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                letterSpacing: '0.5px',
                transition: 'all 0.3s',
                boxShadow: btnHovered
                  ? '0 8px 32px rgba(184,150,12,0.4)'
                  : '0 4px 20px rgba(184,150,12,0.2)',
                transform: btnHovered ? 'translateY(-1px)' : 'translateY(0)',
              }}
            >
              {loading ? 'साइन इन हो रहा है...' : 'साइन इन'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          {/* Footer */}
          <p style={{ textAlign: 'center', color: '#444', fontSize: '13px', marginTop: '28px' }}>
            पासवर्ड भूल गए?{' '}
            <button style={{
              background: 'none',
              border: 'none',
              color: '#D4AF37',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '13px',
            }}>
              यहाँ रीसेट करें
            </button>
          </p>

          {/* Decorative Bottom */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '48px',
          }}>
            <div style={{ width: '20px', height: '1px', backgroundColor: '#333' }} />
            <span style={{ fontSize: '11px', color: '#444', letterSpacing: '1px' }}>
              श्री शिव वस्त्रालय एडमिन
            </span>
            <div style={{ width: '20px', height: '1px', backgroundColor: '#333' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
