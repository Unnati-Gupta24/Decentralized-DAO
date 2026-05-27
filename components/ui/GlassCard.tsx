import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        background: 'rgba(255, 255, 255, 0.08)',
        boxShadow: `
          0 0 30px -10px rgba(0, 0, 0, 0.4),
          0 10px 25px -15px rgba(0, 0, 0, 0.35),
          0 20px 50px -20px rgba(0, 0, 0, 0.45),
          inset 1px 1px 0 rgba(255, 255, 255, 0.1)
        `,
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: hover ? 'pointer' : 'default',
      }}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(-4px) perspective(1000px) rotateX(2deg)';
          e.currentTarget.style.boxShadow = `
            0 0 40px -5px rgba(0, 0, 0, 0.5),
            0 15px 35px -10px rgba(0, 0, 0, 0.45),
            0 30px 70px -15px rgba(0, 0, 0, 0.55),
            inset 1px 1px 0 rgba(255, 255, 255, 0.15)
          `;
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = `
            0 0 30px -10px rgba(0, 0, 0, 0.4),
            0 10px 25px -15px rgba(0, 0, 0, 0.35),
            0 20px 50px -20px rgba(0, 0, 0, 0.45),
            inset 1px 1px 0 rgba(255, 255, 255, 0.1)
          `;
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
        }
      }}
    >
      {children}
    </div>
  );
}
