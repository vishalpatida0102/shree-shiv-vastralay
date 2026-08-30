import { useState, useEffect, createElement } from 'react';
import {
  Store, Phone, Instagram, Images, BarChart3, Truck, BookOpen, Search,
  Save, RotateCcw, Plus, Trash2, ChevronUp, ChevronDown, Loader, Upload,
} from 'lucide-react';
import AdminLayout from '../../components/layout/AdminLayout';
import { useConfig } from '../../context/ConfigContext';
import { configApi, uploadApi } from '../../services/api';
import { ICON_NAMES, getIcon } from '../../config/icons';
import type { SiteConfig } from '../../config/siteConfig';

const ACCENT = '#d35400';

const TABS = [
  { id: 'identity', label: 'पहचान', icon: Store },
  { id: 'contact', label: 'संपर्क', icon: Phone },
  { id: 'social', label: 'सोशल', icon: Instagram },
  { id: 'hero', label: 'हीरो स्लाइड', icon: Images },
  { id: 'stats', label: 'आँकड़े', icon: BarChart3 },
  { id: 'delivery', label: 'डिलीवरी', icon: Truck },
  { id: 'about', label: 'हमारे बारे में', icon: BookOpen },
  { id: 'seo', label: 'SEO', icon: Search },
] as const;

type TabId = (typeof TABS)[number]['id'];

// ═══════ छोटे re-usable फ़ॉर्म कंपोनेंट ═══════

function Card({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #f0f0f0',
      marginBottom: '16px',
    }}>
      <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#333', margin: '0 0 4px' }}>{title}</h3>
      {hint && <p style={{ fontSize: '12px', color: '#999', margin: '0 0 16px' }}>{hint}</p>}
      {!hint && <div style={{ height: '16px' }} />}
      {children}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#555', marginBottom: '6px' }}>
        {label}
      </label>
      {children}
      {hint && <p style={{ fontSize: '11px', color: '#aaa', margin: '5px 0 0' }}>{hint}</p>}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '11px 13px',
  border: '1.5px solid #eee',
  borderRadius: '10px',
  fontSize: '13px',
  outline: 'none',
  backgroundColor: '#fafafa',
  color: '#2D2D2D',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

function Input({ value, onChange, placeholder, type = 'text' }: {
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        border: focused ? `1.5px solid ${ACCENT}` : '1.5px solid #eee',
        backgroundColor: focused ? '#fff' : '#fafafa',
      }}
    />
  );
}

function Textarea({ value, onChange, rows = 4, placeholder }: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value}
      rows={rows}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputStyle,
        resize: 'vertical',
        lineHeight: '1.7',
        border: focused ? `1.5px solid ${ACCENT}` : '1.5px solid #eee',
        backgroundColor: focused ? '#fff' : '#fafafa',
      }}
    />
  );
}

/** इमेज: या तो अपलोड करें (Cloudinary) या सीधे URL डालें */
function ImageInput({ value, onChange, onError }: {
  value: string;
  onChange: (url: string) => void;
  onError: (msg: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await uploadApi.image(file);
      onChange(url);
    } catch {
      onError('तस्वीर अपलोड विफल');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '10px',
        backgroundColor: '#f5f5f5',
        border: '1px solid #eee',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {value
          ? <img src={value} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <Images size={20} style={{ color: '#ccc' }} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Input value={value} onChange={onChange} placeholder="इमेज URL या /public का पथ" />
        <label style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          marginTop: '8px',
          padding: '7px 12px',
          borderRadius: '8px',
          backgroundColor: '#f5f5f5',
          fontSize: '12px',
          fontWeight: '600',
          color: '#555',
          cursor: uploading ? 'default' : 'pointer',
        }}>
          {uploading
            ? <Loader size={13} className="animate-spin" />
            : <Upload size={13} />}
          {uploading ? 'अपलोड हो रहा है…' : 'अपलोड करें'}
          <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} style={{ display: 'none' }} />
        </label>
      </div>
    </div>
  );
}

function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <div style={{
        width: '38px',
        height: '38px',
        borderRadius: '10px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {createElement(getIcon(value), { size: 18, style: { color: '#555' } })}
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ ...inputStyle, cursor: 'pointer' }}
      >
        {ICON_NAMES.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
    </div>
  );
}

/** array फ़ील्ड्स के लिए: जोड़ें / हटाएँ / ऊपर-नीचे करें */
function ListEditor<T>(props: {
  items: T[];
  onChange: (items: T[]) => void;
  blank: () => T;
  addLabel: string;
  label: (item: T, i: number) => string;
  render: (item: T, update: (patch: Partial<T>) => void) => React.ReactNode;
}) {
  const { items, onChange, blank, addLabel, label, render } = props;

  const update = (i: number, patch: Partial<T>) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));

  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));

  const move = (i: number, dir: -1 | 1) => {
    const target = i + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[i], next[target]] = [next[target], next[i]];
    onChange(next);
  };

  const iconBtn: React.CSSProperties = {
    width: '28px',
    height: '28px',
    borderRadius: '7px',
    border: '1px solid #eee',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0,
  };

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{
          border: '1px solid #f0f0f0',
          borderRadius: '10px',
          padding: '14px',
          marginBottom: '10px',
          backgroundColor: '#fcfcfc',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: ACCENT }}>
              {i + 1}. {label(item, i)}
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} style={{ ...iconBtn, opacity: i === 0 ? 0.35 : 1 }}>
                <ChevronUp size={14} style={{ color: '#666' }} />
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} style={{ ...iconBtn, opacity: i === items.length - 1 ? 0.35 : 1 }}>
                <ChevronDown size={14} style={{ color: '#666' }} />
              </button>
              <button type="button" onClick={() => remove(i)} style={iconBtn}>
                <Trash2 size={14} style={{ color: '#c0392b' }} />
              </button>
            </div>
          </div>
          {render(item, (patch) => update(i, patch))}
        </div>
      ))}

      <button
        type="button"
        onClick={() => onChange([...items, blank()])}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '9px 14px',
          borderRadius: '9px',
          border: `1.5px dashed ${ACCENT}`,
          backgroundColor: 'transparent',
          color: ACCENT,
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      >
        <Plus size={14} />
        {addLabel}
      </button>
    </div>
  );
}

/** सादे string list (जैसे नोट्स, ज़रूरी जानकारी) के लिए */
function StringListEditor({ items, onChange, addLabel, placeholder }: {
  items: string[];
  onChange: (items: string[]) => void;
  addLabel: string;
  placeholder?: string;
}) {
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <Input
            value={item}
            placeholder={placeholder}
            onChange={(v) => onChange(items.map((it, idx) => (idx === i ? v : it)))}
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            style={{
              width: '40px',
              flexShrink: 0,
              borderRadius: '10px',
              border: '1.5px solid #eee',
              backgroundColor: '#fff',
              cursor: 'pointer',
            }}
          >
            <Trash2 size={14} style={{ color: '#c0392b' }} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ''])}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 13px',
          borderRadius: '9px',
          border: `1.5px dashed ${ACCENT}`,
          backgroundColor: 'transparent',
          color: ACCENT,
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer',
        }}
      >
        <Plus size={14} />
        {addLabel}
      </button>
    </div>
  );
}

// ═══════ मुख्य पेज ═══════

export default function AdminSettings() {
  const { config, refresh } = useConfig();
  const [form, setForm] = useState<SiteConfig>(config);
  const [dirty, setDirty] = useState(false);
  const [tab, setTab] = useState<TabId>('identity');
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // सर्वर से ताज़ा config आने पर फ़ॉर्म भरें — लेकिन एडमिन की बिना-सहेजी एडिट न मिटाएँ
  useEffect(() => {
    if (!dirty) setForm(config);
  }, [config, dirty]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  /** किसी एक सेक्शन के कुछ फ़ील्ड बदलें */
  function patch<K extends keyof SiteConfig>(section: K, value: Partial<SiteConfig[K]>) {
    setDirty(true);
    setForm((f) => ({ ...f, [section]: { ...(f[section] as object), ...value } }));
  }

  /** पूरा सेक्शन बदलें (array सेक्शन जैसे stats के लिए) */
  function replace<K extends keyof SiteConfig>(section: K, value: SiteConfig[K]) {
    setDirty(true);
    setForm((f) => ({ ...f, [section]: value }));
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      await configApi.update(form);
      setDirty(false);
      await refresh();
      showToast('सेटिंग्स सहेजी गईं — वेबसाइट पर लाइव है');
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'सहेजने में विफल', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm('सारी सेटिंग्स डिफ़ॉल्ट पर वापस ले जाएँ? यह पूर्ववत नहीं होगा।')) return;
    setResetting(true);
    try {
      const fresh = await configApi.reset();
      setForm(fresh);
      setDirty(false);
      await refresh();
      showToast('डिफ़ॉल्ट सेटिंग्स वापस आ गईं');
    } catch {
      showToast('रीसेट विफल', 'error');
    } finally {
      setResetting(false);
    }
  };

  const primaryBtn: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '11px 20px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: ACCENT,
    color: '#fff',
    fontSize: '13px',
    fontWeight: '600',
    cursor: saving ? 'default' : 'pointer',
    opacity: saving ? 0.7 : 1,
  };

  return (
    <AdminLayout title="वेबसाइट सेटिंग्स">
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: '76px',
          right: '20px',
          zIndex: 60,
          padding: '12px 18px',
          borderRadius: '10px',
          backgroundColor: toast.type === 'success' ? '#27ae60' : '#c0392b',
          color: '#fff',
          fontSize: '13px',
          fontWeight: '600',
          boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
        }}>
          {toast.message}
        </div>
      )}

      {/* Action bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '18px',
      }}>
        <p style={{ fontSize: '13px', color: '#777', margin: 0 }}>
          वेबसाइट का सारा स्टैटिक कंटेंट यहीं से बदलें — सहेजते ही लाइव हो जाएगा।
          {dirty && <strong style={{ color: ACCENT }}> (बिना सहेजे बदलाव हैं)</strong>}
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" onClick={handleReset} disabled={resetting} style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '7px',
            padding: '11px 16px',
            borderRadius: '10px',
            border: '1.5px solid #eee',
            backgroundColor: '#fff',
            color: '#666',
            fontSize: '13px',
            fontWeight: '600',
            cursor: resetting ? 'default' : 'pointer',
          }}>
            {resetting ? <Loader size={15} className="animate-spin" /> : <RotateCcw size={15} />}
            डिफ़ॉल्ट
          </button>
          <button type="button" onClick={handleSave} disabled={saving} style={primaryBtn}>
            {saving ? <Loader size={15} className="animate-spin" /> : <Save size={15} />}
            {saving ? 'सहेजा जा रहा है…' : 'सहेजें'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        overflowX: 'auto',
        paddingBottom: '10px',
        marginBottom: '16px',
      }}>
        {TABS.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '7px',
                padding: '9px 14px',
                borderRadius: '10px',
                border: active ? `1.5px solid ${ACCENT}` : '1.5px solid #eee',
                backgroundColor: active ? 'rgba(211,84,0,0.06)' : '#fff',
                color: active ? ACCENT : '#666',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <Icon size={15} />
              {t.label}
            </button>
          );
        })}
      </div>

      <div style={{ maxWidth: '760px' }}>

        {/* ═══════ पहचान ═══════ */}
        {tab === 'identity' && (
          <Card title="दुकान की पहचान" hint="नाम, टैगलाइन और लोगो — पूरी वेबसाइट पर यही दिखते हैं">
            <Field label="नाम (हिंदी)">
              <Input value={form.identity.name} onChange={(v) => patch('identity', { name: v })} />
            </Field>
            <Field label="नाम (English)">
              <Input value={form.identity.nameEn} onChange={(v) => patch('identity', { nameEn: v })} />
            </Field>
            <Field label="टैगलाइन (हिंदी)">
              <Input value={form.identity.tagline} onChange={(v) => patch('identity', { tagline: v })} />
            </Field>
            <Field label="टैगलाइन (English)">
              <Input value={form.identity.taglineEn} onChange={(v) => patch('identity', { taglineEn: v })} />
            </Field>
            <Field label="लोगो" hint="नेवबार, फ़ुटर, हीरो, About पेज और ब्राउज़र टैब — सब जगह यही लगेगा">
              <ImageInput
                value={form.identity.logo}
                onChange={(v) => patch('identity', { logo: v })}
                onError={(m) => showToast(m, 'error')}
              />
            </Field>
            <Field label="एडमिन लॉगिन का बैकग्राउंड" hint="सिर्फ़ /admin लॉगिन स्क्रीन पर दिखता है">
              <ImageInput
                value={form.identity.loginBackground}
                onChange={(v) => patch('identity', { loginBackground: v })}
                onError={(m) => showToast(m, 'error')}
              />
            </Field>
          </Card>
        )}

        {/* ═══════ संपर्क ═══════ */}
        {tab === 'contact' && (
          <>
            <Card title="संपर्क जानकारी" hint="फ़ुटर, संपर्क पेज और प्रोडक्ट पेज पर दिखती है">
              <Field label="मुख्य फ़ोन" hint="देश कोड के साथ, जैसे +91XXXXXXXXXX">
                <Input value={form.contact.phone} onChange={(v) => patch('contact', { phone: v })} />
              </Field>
              <Field label="दूसरा फ़ोन" hint="खाली छोड़ें तो नहीं दिखेगा">
                <Input value={form.contact.phone2} onChange={(v) => patch('contact', { phone2: v })} />
              </Field>
              <Field label="WhatsApp नंबर" hint="सारे WhatsApp बटन इसी नंबर पर जाएँगे">
                <Input value={form.contact.whatsapp} onChange={(v) => patch('contact', { whatsapp: v })} />
              </Field>
              <Field label="ईमेल">
                <Input value={form.contact.email} onChange={(v) => patch('contact', { email: v })} />
              </Field>
              <Field label="पता">
                <Textarea rows={2} value={form.contact.address} onChange={(v) => patch('contact', { address: v })} />
              </Field>
              <Field label="Google Maps embed URL" hint="Google Maps → शेयर → नक्शा एम्बेड करें → src=&quot;…&quot; वाला लिंक">
                <Textarea rows={3} value={form.contact.mapUrl} onChange={(v) => patch('contact', { mapUrl: v })} />
              </Field>
            </Card>

            <Card title="दुकान का समय" hint="संपर्क पेज पर दिखता है">
              <ListEditor
                items={form.contact.timings}
                onChange={(items) => patch('contact', { timings: items })}
                blank={() => ({ label: '', hours: '' })}
                addLabel="समय जोड़ें"
                label={(t) => t.label || 'नया'}
                render={(t, update) => (
                  <>
                    <Field label="दिन">
                      <Input value={t.label} onChange={(v) => update({ label: v })} placeholder="सोम - शनि" />
                    </Field>
                    <Field label="समय">
                      <Input value={t.hours} onChange={(v) => update({ hours: v })} placeholder="सुबह 10:00 - रात 9:00" />
                    </Field>
                  </>
                )}
              />
            </Card>

            <Card title="WhatsApp के तैयार मैसेज" hint="ग्राहक जब WhatsApp बटन दबाता है तो यही टेक्स्ट पहले से भरा मिलता है">
              <Field label="सामान्य पूछताछ" hint="फ़्लोटिंग बटन और संपर्क पेज">
                <Textarea rows={2} value={form.whatsappMessages.general} onChange={(v) => patch('whatsappMessages', { general: v })} />
              </Field>
              <Field label="ऑर्डर करने के लिए" hint="होमपेज का डिलीवरी सेक्शन">
                <Textarea rows={2} value={form.whatsappMessages.order} onChange={(v) => patch('whatsappMessages', { order: v })} />
              </Field>
              <Field label="साड़ी के बारे में" hint="प्रोडक्ट पेज। {name}, {price} और {link} अपने आप भर जाते हैं">
                <Textarea rows={4} value={form.whatsappMessages.product} onChange={(v) => patch('whatsappMessages', { product: v })} />
              </Field>
            </Card>
          </>
        )}

        {/* ═══════ सोशल ═══════ */}
        {tab === 'social' && (
          <Card title="सोशल मीडिया" hint="पूरा URL डालें। खाली छोड़ने पर लिंक नहीं दिखेगा">
            <Field label="Instagram">
              <Input value={form.social.instagram} onChange={(v) => patch('social', { instagram: v })} placeholder="https://instagram.com/…" />
            </Field>
            <Field label="Facebook">
              <Input value={form.social.facebook} onChange={(v) => patch('social', { facebook: v })} placeholder="https://facebook.com/…" />
            </Field>
            <Field label="YouTube">
              <Input value={form.social.youtube} onChange={(v) => patch('social', { youtube: v })} placeholder="https://youtube.com/@…" />
            </Field>
          </Card>
        )}

        {/* ═══════ हीरो स्लाइड ═══════ */}
        {tab === 'hero' && (
          <>
            <Card title="होमपेज की स्लाइड" hint="हर 5 सेकंड में बदलती हैं। क्रम बदलने के लिए तीर दबाएँ">
              <ListEditor
                items={form.hero.slides}
                onChange={(items) => patch('hero', { slides: items })}
                blank={() => ({ image: '', title: '', subtitle: '', isLogo: false })}
                addLabel="स्लाइड जोड़ें"
                label={(s) => s.title || 'नई स्लाइड'}
                render={(s, update) => (
                  <>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={s.isLogo}
                        onChange={(e) => update({ isLogo: e.target.checked })}
                        style={{ width: '15px', height: '15px', accentColor: ACCENT }}
                      />
                      <span style={{ fontSize: '12px', color: '#555' }}>
                        इमेज की जगह लोगो + गोल्डन बैकग्राउंड दिखाएँ
                      </span>
                    </label>
                    {!s.isLogo && (
                      <Field label="बैकग्राउंड इमेज" hint="चौड़ी इमेज बेहतर रहती है (कम से कम 1600px)">
                        <ImageInput value={s.image} onChange={(v) => update({ image: v })} onError={(m) => showToast(m, 'error')} />
                      </Field>
                    )}
                    <Field label="शीर्षक">
                      <Input value={s.title} onChange={(v) => update({ title: v })} />
                    </Field>
                    <Field label="उपशीर्षक">
                      <Textarea rows={2} value={s.subtitle} onChange={(v) => update({ subtitle: v })} />
                    </Field>
                  </>
                )}
              />
            </Card>

            <Card title="हीरो बटन">
              <Field label="बटन का टेक्स्ट">
                <Input value={form.hero.ctaText} onChange={(v) => patch('hero', { ctaText: v })} />
              </Field>
              <Field label="बटन का लिंक" hint="वेबसाइट का पथ, जैसे /sarees">
                <Input value={form.hero.ctaLink} onChange={(v) => patch('hero', { ctaLink: v })} />
              </Field>
            </Card>
          </>
        )}

        {/* ═══════ आँकड़े ═══════ */}
        {tab === 'stats' && (
          <Card title="काउंटर" hint="होमपेज और About पेज पर गिनती के साथ दिखते हैं">
            <ListEditor
              items={form.stats}
              onChange={(items) => replace('stats', items)}
              blank={() => ({ value: 0, suffix: '+', label: '' })}
              addLabel="आँकड़ा जोड़ें"
              label={(s) => s.label || 'नया'}
              render={(s, update) => (
                <>
                  <Field label="लेबल">
                    <Input value={s.label} onChange={(v) => update({ label: v })} placeholder="खुश ग्राहक" />
                  </Field>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 2 }}>
                      <Field label="संख्या">
                        <Input type="number" value={s.value} onChange={(v) => update({ value: Number(v) || 0 })} />
                      </Field>
                    </div>
                    <div style={{ flex: 1 }}>
                      <Field label="सफ़िक्स">
                        <Input value={s.suffix} onChange={(v) => update({ suffix: v })} placeholder="+" />
                      </Field>
                    </div>
                  </div>
                </>
              )}
            />
          </Card>
        )}

        {/* ═══════ डिलीवरी ═══════ */}
        {tab === 'delivery' && (
          <>
            <Card title="डिलीवरी की खास बातें" hint="होमपेज पर 4 कार्ड के रूप में दिखती हैं">
              <ListEditor
                items={form.delivery.highlights}
                onChange={(items) => patch('delivery', { highlights: items })}
                blank={() => ({ icon: 'Truck', title: '', desc: '', color: '#D4AF37' })}
                addLabel="कार्ड जोड़ें"
                label={(h) => h.title || 'नया कार्ड'}
                render={(h, update) => (
                  <>
                    <Field label="आइकॉन">
                      <IconPicker value={h.icon} onChange={(v) => update({ icon: v })} />
                    </Field>
                    <Field label="शीर्षक">
                      <Input value={h.title} onChange={(v) => update({ title: v })} placeholder="₹80 प्रति साड़ी" />
                    </Field>
                    <Field label="विवरण">
                      <Input value={h.desc} onChange={(v) => update({ desc: v })} placeholder="पूरे भारत में डिलीवरी" />
                    </Field>
                    <Field label="रंग" hint="आइकॉन का रंग">
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input
                          type="color"
                          value={h.color}
                          onChange={(e) => update({ color: e.target.value })}
                          style={{ width: '44px', height: '38px', border: '1.5px solid #eee', borderRadius: '10px', padding: '3px', cursor: 'pointer', backgroundColor: '#fff' }}
                        />
                        <Input value={h.color} onChange={(v) => update({ color: v })} />
                      </div>
                    </Field>
                  </>
                )}
              />
            </Card>

            <Card title="ऑर्डर कैसे करें" hint="नंबर अपने आप लगते हैं — क्रम तीर से बदलें">
              <ListEditor
                items={form.delivery.steps}
                onChange={(items) => patch('delivery', { steps: items })}
                blank={() => ({ title: '', desc: '' })}
                addLabel="स्टेप जोड़ें"
                label={(s) => s.title || 'नया स्टेप'}
                render={(s, update) => (
                  <>
                    <Field label="शीर्षक">
                      <Input value={s.title} onChange={(v) => update({ title: v })} />
                    </Field>
                    <Field label="विवरण">
                      <Input value={s.desc} onChange={(v) => update({ desc: v })} />
                    </Field>
                  </>
                )}
              />
            </Card>

            <Card title="ऑर्डर के लिए ज़रूरी जानकारी" hint="ग्राहक से क्या-क्या माँगना है">
              <StringListEditor
                items={form.delivery.requiredFields}
                onChange={(items) => patch('delivery', { requiredFields: items })}
                addLabel="जोड़ें"
                placeholder="पिनकोड"
              />
            </Card>

            <Card title="ज़रूरी सूचनाएँ" hint="जैसे — COD उपलब्ध नहीं है">
              <StringListEditor
                items={form.delivery.notes}
                onChange={(items) => patch('delivery', { notes: items })}
                addLabel="सूचना जोड़ें"
              />
            </Card>

            <Card title="WhatsApp बटन">
              <Field label="बटन का टेक्स्ट">
                <Input value={form.delivery.ctaText} onChange={(v) => patch('delivery', { ctaText: v })} />
              </Field>
            </Card>
          </>
        )}

        {/* ═══════ हमारे बारे में ═══════ */}
        {tab === 'about' && (
          <>
            <Card title="हमारी कहानी" hint="About पेज का मुख्य पैराग्राफ">
              <Field label="कहानी">
                <Textarea rows={7} value={form.about.story} onChange={(v) => patch('about', { story: v })} />
              </Field>
              <Field label="कोट" hint="About पेज के बीच में बड़े अक्षरों में दिखता है">
                <Textarea rows={3} value={form.about.quote} onChange={(v) => patch('about', { quote: v })} />
              </Field>
              <Field label="कोट का बैकग्राउंड" hint="कोट के पीछे दिखने वाली तस्वीर">
                <ImageInput
                  value={form.about.parallaxImage}
                  onChange={(v) => patch('about', { parallaxImage: v })}
                  onError={(m) => showToast(m, 'error')}
                />
              </Field>
            </Card>

            <Card title="हाइलाइट्स" hint="ब्रांड की छोटी-छोटी खूबियाँ">
              <StringListEditor
                items={form.about.highlights}
                onChange={(items) => patch('about', { highlights: items })}
                addLabel="हाइलाइट जोड़ें"
                placeholder="Bridal Collection"
              />
            </Card>

            <Card title="हमारे मूल्य" hint="आइकॉन वाले कार्ड — गुणवत्ता, परंपरा, विश्वास जैसे">
              <ListEditor
                items={form.about.values}
                onChange={(items) => patch('about', { values: items })}
                blank={() => ({ icon: 'Gem', color: '#D4AF37', bg: 'rgba(212,175,55,0.08)', title: '', desc: '' })}
                addLabel="मूल्य जोड़ें"
                label={(v) => v.title || 'नया'}
                render={(v, update) => (
                  <>
                    <Field label="आइकॉन">
                      <IconPicker value={v.icon} onChange={(val) => update({ icon: val })} />
                    </Field>
                    <Field label="शीर्षक">
                      <Input value={v.title} onChange={(val) => update({ title: val })} />
                    </Field>
                    <Field label="विवरण">
                      <Textarea rows={3} value={v.desc} onChange={(val) => update({ desc: val })} />
                    </Field>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <div style={{ flex: 1 }}>
                        <Field label="आइकॉन का रंग">
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input
                              type="color"
                              value={v.color}
                              onChange={(e) => update({ color: e.target.value })}
                              style={{ width: '44px', height: '38px', border: '1.5px solid #eee', borderRadius: '10px', padding: '3px', cursor: 'pointer', backgroundColor: '#fff' }}
                            />
                            <Input value={v.color} onChange={(val) => update({ color: val })} />
                          </div>
                        </Field>
                      </div>
                      <div style={{ flex: 1 }}>
                        <Field label="बैकग्राउंड" hint="हल्का rgba रंग">
                          <Input value={v.bg} onChange={(val) => update({ bg: val })} />
                        </Field>
                      </div>
                    </div>
                  </>
                )}
              />
            </Card>

            <Card title="हमें क्यों चुनें?" hint="नंबर वाली सूची — क्रम अपने आप लगता है">
              <ListEditor
                items={form.about.whyChooseUs}
                onChange={(items) => patch('about', { whyChooseUs: items })}
                blank={() => ({ title: '', desc: '' })}
                addLabel="कारण जोड़ें"
                label={(w) => w.title || 'नया'}
                render={(w, update) => (
                  <>
                    <Field label="शीर्षक">
                      <Input value={w.title} onChange={(v) => update({ title: v })} />
                    </Field>
                    <Field label="विवरण">
                      <Textarea rows={2} value={w.desc} onChange={(v) => update({ desc: v })} />
                    </Field>
                  </>
                )}
              />
            </Card>
          </>
        )}

        {/* ═══════ SEO ═══════ */}
        {tab === 'seo' && (
          <Card title="SEO और शेयरिंग" hint="Google और सोशल मीडिया पर वेबसाइट कैसी दिखेगी">
            <Field label="मुख्य टाइटल" hint="होमपेज का ब्राउज़र टाइटल। बाकी पेजों पर '<पेज> | <दुकान का नाम>' लगेगा">
              <Input value={form.seo.title} onChange={(v) => patch('seo', { title: v })} />
            </Field>
            <Field label="विवरण" hint="Google में नाम के नीचे यही लाइन दिखती है — 150-160 अक्षर सही रहते हैं">
              <Textarea rows={3} value={form.seo.description} onChange={(v) => patch('seo', { description: v })} />
            </Field>
            <Field label="शेयर इमेज (OG image)" hint="WhatsApp/Facebook पर लिंक शेयर करते समय दिखने वाली तस्वीर — 1200×630px">
              <ImageInput
                value={form.seo.ogImage}
                onChange={(v) => patch('seo', { ogImage: v })}
                onError={(m) => showToast(m, 'error')}
              />
            </Field>
          </Card>
        )}

        {/* नीचे भी सहेजें — लंबे फ़ॉर्म में ऊपर स्क्रॉल न करना पड़े */}
        <div style={{ marginTop: '8px', marginBottom: '32px' }}>
          <button type="button" onClick={handleSave} disabled={saving} style={primaryBtn}>
            {saving ? <Loader size={15} className="animate-spin" /> : <Save size={15} />}
            {saving ? 'सहेजा जा रहा है…' : 'सहेजें'}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
