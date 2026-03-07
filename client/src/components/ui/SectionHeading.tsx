import ScrollReveal from '../animations/ScrollReveal';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <ScrollReveal>
      <div style={{ textAlign: 'center', marginBottom: '32px', padding: '0 8px' }}>
        <span
          className="font-heading"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #B8960C, #D4AF37)',
            color: '#1a1a1a',
            fontSize: '14px',
            fontWeight: '700',
            padding: '8px 22px',
            borderRadius: '50px',
            letterSpacing: '0.5px',
            boxShadow: '0 2px 8px rgba(184,150,12,0.25)',
          }}
        >
          {title}
        </span>
        {subtitle && (
          <p style={{ color: '#4a4a4a', marginTop: '14px', fontSize: '14px', lineHeight: '1.7', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
