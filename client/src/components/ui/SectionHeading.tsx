import ScrollReveal from '../animations/ScrollReveal';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <ScrollReveal>
      <div style={{ textAlign: 'center', marginBottom: '32px', padding: '0 8px' }}>
        <h2 className="font-heading" style={{ fontSize: '24px', fontWeight: '700', color: '#800020', lineHeight: '1.3' }}>
          {title}
        </h2>
        <div style={{ width: '48px', height: '3px', backgroundColor: '#D4AF37', margin: '12px auto 0', borderRadius: '2px' }} />
        {subtitle && (
          <p style={{ color: '#4a4a4a', marginTop: '12px', fontSize: '14px', lineHeight: '1.7', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
