interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
}

export default function Skeleton({ width = '100%', height = '16px', borderRadius = '8px', style }: SkeletonProps) {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
      `}</style>
      <div
        style={{
          width,
          height,
          borderRadius,
          background: 'linear-gradient(90deg, #f0ebe0 25%, #f7f3ea 50%, #f0ebe0 75%)',
          backgroundSize: '800px 100%',
          animation: 'shimmer 1.5s infinite linear',
          ...style,
        }}
      />
    </>
  );
}

export function SareeCardSkeleton() {
  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
    }}>
      <Skeleton height="0" style={{ paddingBottom: '133%', height: 'auto' }} borderRadius="0" />
      <div style={{ padding: '10px 10px 12px' }}>
        <Skeleton width="40%" height="10px" style={{ marginBottom: '6px' }} />
        <Skeleton width="80%" height="14px" style={{ marginBottom: '8px' }} />
        <Skeleton width="50%" height="16px" />
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div style={{ paddingTop: '80px', maxWidth: '1200px', margin: '0 auto', padding: '80px 16px 100px' }}>
      <style>{`
        #pd-skel { display: block; }
        @media (min-width: 768px) { #pd-skel { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; } }
      `}</style>
      <div id="pd-skel">
        <Skeleton height="0" style={{ paddingBottom: '133%', height: 'auto' }} borderRadius="16px" />
        <div style={{ paddingTop: '20px' }}>
          <Skeleton width="70%" height="24px" style={{ marginBottom: '16px' }} />
          <Skeleton width="40%" height="28px" style={{ marginBottom: '20px' }} />
          <Skeleton width="100%" height="1px" style={{ marginBottom: '16px' }} borderRadius="0" />
          <Skeleton width="100%" height="60px" style={{ marginBottom: '20px' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
            <Skeleton height="60px" borderRadius="12px" />
            <Skeleton height="60px" borderRadius="12px" />
            <Skeleton height="60px" borderRadius="12px" />
            <Skeleton height="60px" borderRadius="12px" />
          </div>
          <Skeleton height="52px" borderRadius="14px" />
        </div>
      </div>
    </div>
  );
}
