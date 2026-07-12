'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    THREE?: any;
    __rl3d_status?: string;
  }
}

const THREE_CDN = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

function loadThree(): Promise<any> {
  if (typeof window === 'undefined') return Promise.reject('SSR');
  if (window.THREE) return Promise.resolve(window.THREE);
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(
      `script[data-rl-three="1"]`
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => resolve(window.THREE));
      existing.addEventListener('error', reject);
      return;
    }
    const s = document.createElement('script');
    s.src = THREE_CDN;
    s.async = true;
    s.dataset.rlThree = '1';
    s.onload = () => resolve(window.THREE);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

export function Hero3D() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let mounted = true;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    loadThree()
      .then((THREE) => {
        if (!mounted) return;
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap || !THREE) return;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: 'low-power'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
        camera.position.set(0, 0, 5.5);

        const geo = new THREE.IcosahedronGeometry(2, 1);
        const mesh = new THREE.Mesh(
          geo,
          new THREE.MeshPhongMaterial({
            color: 0xf97316,
            shininess: 80,
            specular: 0xffad5c,
            flatShading: true
          })
        );
        scene.add(mesh);

        const wire = new THREE.Mesh(
          geo,
          new THREE.MeshBasicMaterial({
            color: 0xff9a50,
            wireframe: true,
            opacity: 0.08,
            transparent: true
          })
        );
        scene.add(wire);

        const ring = (r: number, op: number, rx: number, rz: number) => {
          const m = new THREE.Mesh(
            new THREE.TorusGeometry(r, 0.012, 6, 60),
            new THREE.MeshBasicMaterial({ color: 0xf97316, opacity: op, transparent: true })
          );
          m.rotation.x = rx;
          m.rotation.z = rz;
          scene.add(m);
          return m;
        };
        const r1 = ring(3.2, 0.14, 0.4, 0);
        const r2 = ring(3.9, 0.06, -0.3, 0.5);

        scene.add(new THREE.AmbientLight(0x111111, 1));
        const pl1 = new THREE.PointLight(0xf97316, 4, 20);
        pl1.position.set(3, 4, 3);
        scene.add(pl1);
        const pl2 = new THREE.PointLight(0xffad5c, 2, 20);
        pl2.position.set(-4, -2, 1);
        scene.add(pl2);

        const resize = () => {
          const w = wrap.offsetWidth || 500;
          const h = wrap.offsetHeight || 500;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        resize();

        let ro: ResizeObserver | null = null;
        if (typeof ResizeObserver !== 'undefined') {
          ro = new ResizeObserver(resize);
          ro.observe(wrap);
        } else {
          window.addEventListener('resize', resize);
        }

        let raf = 0;
        let t = 0;
        let last = 0;
        const RATE = 1000 / 30;
        let paused = false;

        const onVis = () => {
          paused = document.hidden;
        };
        document.addEventListener('visibilitychange', onVis);

        let io: IntersectionObserver | null = null;
        if (typeof IntersectionObserver !== 'undefined') {
          io = new IntersectionObserver((entries) => {
            paused = !entries[0].isIntersecting;
          });
          io.observe(wrap);
        }

        const anim = (now: number) => {
          raf = requestAnimationFrame(anim);
          if (paused || (!reduced && now - last < RATE)) return;
          last = now;
          if (!reduced) {
            t += 0.006;
            mesh.rotation.x = wire.rotation.x = t * 0.28;
            mesh.rotation.y = wire.rotation.y = t * 0.48;
            mesh.position.y = wire.position.y = Math.sin(t * 0.7) * 0.22;
            r1.rotation.z = t * 0.15;
            r2.rotation.y = t * 0.20;
            pl1.position.x = Math.sin(t) * 4;
            pl1.position.z = Math.cos(t) * 3;
          }
          renderer.render(scene, camera);
        };
        raf = requestAnimationFrame(anim);
        window.__rl3d_status = 'running';

        cleanupRef.current = () => {
          if (raf) cancelAnimationFrame(raf);
          if (ro) ro.disconnect();
          if (io) io.disconnect();
          document.removeEventListener('visibilitychange', onVis);
          window.removeEventListener('resize', resize);
          try {
            geo.dispose();
            renderer.dispose();
          } catch {
            /* ignore */
          }
        };
      })
      .catch(() => {
        // Silent — if Three.js CDN fails to load, the fallback gradient will show through
        window.__rl3d_status = 'failed';
      });

    return () => {
      mounted = false;
      if (cleanupRef.current) cleanupRef.current();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      id="rl-hero-3d"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: '60%',
        pointerEvents: 'none',
        zIndex: 1
      }}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        id="rl-hero-canvas"
        style={{ width: '100%', height: '100%', display: 'block' }}
      />
    </div>
  );
}
