import React, { useMemo } from 'react';
import sai3dHtml from '../../sai_residency_3d.html?raw';

export default function Hero3DCanvas() {
  // Ensure the 3D stage spans 100% width and height of the Hero Banner section
  const fullHeroHtml = useMemo(() => {
    return sai3dHtml.replace(
      /\.stage\s*\{[^}]*\}/,
      `.stage {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        perspective: 1200px;
        overflow: hidden;
        background: #05070c;
      }`
    );
  }, []);

  return (
    <div
      className="hero-3d-background"
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        overflow: 'hidden',
        zIndex: 0
      }}
    >
      <iframe
        srcDoc={fullHeroHtml}
        title="Sai Residency 3D Gateway"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          pointerEvents: 'auto',
          display: 'block'
        }}
      />
    </div>
  );
}
