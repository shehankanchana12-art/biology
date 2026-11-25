import { useMemo } from "react";
import * as THREE from "three";
import type { Vec3 } from "./organConfig";

type ArtProps = { active?: boolean; ghost?: boolean };

function MeshMat({ color, active, ghost }: { color: string; active?: boolean; ghost?: boolean }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive={active ? color : "#0a1322"}
      emissiveIntensity={active ? 0.55 : 0.12}
      roughness={0.42}
      metalness={0.12}
      transparent={ghost || active ? true : false}
      opacity={ghost ? 0.25 : 1}
    />
  );
}

function Tube({
  points,
  radius = 0.08,
  color,
  active,
  segments = 64,
  radial = 10,
}: {
  points: Vec3[];
  radius?: number;
  color: string;
  active?: boolean;
  segments?: number;
  radial?: number;
}) {
  const geo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)));
    return new THREE.TubeGeometry(curve, segments, radius, radial, false);
  }, [points, radius, segments, radial]);
  return (
    <mesh geometry={geo} castShadow>
      <MeshMat color={color} active={active} />
    </mesh>
  );
}

const smallIntestinePoints: Vec3[] = (() => {
  const pts: Vec3[] = [];
  for (let i = 0; i <= 110; i++) {
    const t = i / 110;
    const a = t * Math.PI * 7.5;
    const r = 0.3 - t * 0.05;
    pts.push([
      Math.cos(a) * r * 0.95,
      -0.08 + Math.sin(a) * r * 0.72 - t * 0.12,
      0.05 + Math.sin(a * 0.6) * 0.12,
    ]);
  }
  return pts;
})();

const largeIntestinePoints: Vec3[] = [
  [0.36, -1.0, 0],
  [0.4, -0.7, 0.02],
  [0.4, -0.3, 0.02],
  [0.38, 0.06, 0.02],
  [0.1, 0.16, 0.02],
  [-0.28, 0.14, 0.02],
  [-0.4, -0.2, 0.02],
  [-0.4, -0.6, 0.02],
  [-0.3, -0.9, 0.02],
  [-0.05, -1.02, 0.02],
];

const spinePoints: Vec3[] = [
  [0, 1.55, -0.22],
  [0.02, 1.2, -0.24],
  [0.01, 0.85, -0.26],
  [-0.02, 0.45, -0.25],
  [0, 0.05, -0.23],
  [0.04, -0.35, -0.2],
  [0, -0.8, -0.16],
  [0, -1.1, -0.12],
];

/* ------------------------------- organs ------------------------------- */

export function HeartArt({ active }: ArtProps) {
  return (
    <group rotation={[0, 0, -0.22]}>
      <mesh scale={[0.27, 0.33, 0.24]} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 24, 18]} />
        <MeshMat color="#f43f5e" active={active} />
      </mesh>
      <mesh scale={[0.17, 0.1, 0.14]} position={[0.14, 0.22, 0.02]}>
        <sphereGeometry args={[1, 16, 12]} />
        <MeshMat color="#fb7185" active={active} />
      </mesh>
      <mesh scale={[0.13, 0.09, 0.12]} position={[-0.14, 0.18, 0.02]}>
        <sphereGeometry args={[1, 16, 12]} />
        <MeshMat color="#fb7185" active={active} />
      </mesh>
      <Tube points={[[0, 0.26, 0], [0.03, 0.55, -0.02], [0.12, 0.7, -0.06]]} radius={0.055} color="#f87171" active={active} segments={24} />
      <Tube points={[[-0.05, 0.26, 0.02], [-0.12, 0.48, 0.06], [-0.2, 0.6, 0.05]]} radius={0.045} color="#60a5fa" active={active} segments={20} />
    </group>
  );
}

export function LungsArt({ active }: ArtProps) {
  return (
    <group>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.34, 0, 0]}>
          <mesh scale={[0.25, 0.42, 0.22]} position={[0, 0.06, 0]}>
            <sphereGeometry args={[1, 20, 16]} />
            <MeshMat color="#38bdf8" active={active} />
          </mesh>
          <mesh scale={[0.16, 0.2, 0.16]} position={[s * 0.08, -0.3, 0]}>
            <sphereGeometry args={[1, 16, 12]} />
            <MeshMat color="#0ea5e9" active={active} />
          </mesh>
        </group>
      ))}
      <Tube
        points={[
          [0, 0.42, -0.02],
          [0, 0.24, 0],
          [-0.3, 0.08, 0],
        ]}
        radius={0.045}
        color="#7dd3fc"
        active={active}
        segments={20}
      />
      <Tube
        points={[
          [0, 0.24, 0],
          [0.3, 0.08, 0],
        ]}
        radius={0.045}
        color="#7dd3fc"
        active={active}
        segments={20}
      />
    </group>
  );
}

export function TracheaArt({ active }: ArtProps) {
  return (
    <group>
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.085, 0.09, 0.5, 16, 1, true]} />
        <MeshMat color="#7dd3fc" active={active} />
      </mesh>
      {[0.06, 0.16, 0.26, 0.36, 0.44].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.088, 0.012, 6, 18]} />
          <MeshMat color="#bae6fd" active={active} />
        </mesh>
      ))}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.06, 0.055, 0.14, 12]} />
        <MeshMat color="#7dd3fc" active={active} />
      </mesh>
    </group>
  );
}

export function LiverArt({ active }: ArtProps) {
  return (
    <group>
      <mesh scale={[0.44, 0.24, 0.3]} position={[0, 0.02, 0]} rotation={[0, 0, -0.12]}>
        <sphereGeometry args={[1, 22, 16]} />
        <MeshMat color="#f59e0b" active={active} />
      </mesh>
      <mesh scale={[0.2, 0.15, 0.18]} position={[-0.18, -0.14, 0.04]}>
        <sphereGeometry args={[1, 16, 12]} />
        <MeshMat color="#d97706" active={active} />
      </mesh>
      <mesh scale={[0.11, 0.07, 0.1]} position={[0.22, 0.1, 0.16]}>
        <sphereGeometry args={[1, 12, 10]} />
        <MeshMat color="#fbbf24" active={active} />
      </mesh>
    </group>
  );
}

export function StomachArt({ active }: ArtProps) {
  const points = useMemo<Vec3[]>(
    () => [
      [0.08, 0.18, 0.02],
      [-0.1, 0.1, 0.06],
      [-0.16, -0.08, 0.06],
      [-0.02, -0.2, 0.04],
      [0.14, -0.14, 0.02],
      [0.18, -0.02, 0.02],
    ],
    []
  );
  return (
    <group>
      <Tube points={points} radius={0.16} color="#fbbf24" active={active} segments={36} radial={14} />
      <mesh scale={[0.1, 0.06, 0.08]} position={[0.2, 0.02, 0.02]}>
        <sphereGeometry args={[1, 14, 10]} />
        <MeshMat color="#f59e0b" active={active} />
      </mesh>
    </group>
  );
}

export function PancreasArt({ active }: ArtProps) {
  return (
    <group rotation={[0, 0, 0.35]}>
      <mesh scale={[0.34, 0.06, 0.08]}>
        <sphereGeometry args={[1, 18, 12]} />
        <MeshMat color="#fcd34d" active={active} />
      </mesh>
      <mesh scale={[0.1, 0.08, 0.09]} position={[-0.26, 0.01, 0]}>
        <sphereGeometry args={[1, 14, 10]} />
        <MeshMat color="#fde68a" active={active} />
      </mesh>
    </group>
  );
}

export function SmallIntestineArt({ active }: ArtProps) {
  return <Tube points={smallIntestinePoints} radius={0.055} color="#fb923c" active={active} segments={220} radial={8} />;
}

export function LargeIntestineArt({ active }: ArtProps) {
  return (
    <group>
      <Tube points={largeIntestinePoints} radius={0.075} color="#ea580c" active={active} segments={90} radial={9} />
      <Tube
        points={[
          [-0.02, -0.98, 0.02],
          [0.02, -1.16, 0.04],
        ]}
        radius={0.05}
        color="#c2410c"
        active={active}
        segments={12}
      />
    </group>
  );
}

export function KidneyArt({ active }: ArtProps) {
  return (
    <group>
      {[-1, 1].map((s) => (
        <group key={s} position={[s * 0.32, 0, 0]} rotation={[0, 0, s * 0.12]}>
          <mesh scale={[0.11, 0.18, 0.1]}>
            <sphereGeometry args={[1, 18, 14]} />
            <MeshMat color="#34d399" active={active} />
          </mesh>
          <mesh scale={[0.04, 0.1, 0.05]} position={[s * -0.09, 0, 0]}>
            <sphereGeometry args={[1, 12, 10]} />
            <MeshMat color="#10b981" active={active} />
          </mesh>
          <Tube
            points={[
              [s * 0.06, -0.08, 0.02],
              [s * 0.12, -0.35, 0.05],
              [s * 0.08, -0.62, 0.08],
            ]}
            radius={0.018}
            color="#6ee7b7"
            active={active}
            segments={20}
          />
        </group>
      ))}
    </group>
  );
}

export function BladderArt({ active }: ArtProps) {
  return (
    <mesh scale={[0.2, 0.17, 0.17]}>
      <sphereGeometry args={[1, 20, 16]} />
      <MeshMat color="#22c55e" active={active} />
    </mesh>
  );
}

export function BrainArt({ active }: ArtProps) {
  return (
    <group>
      <mesh scale={[0.2, 0.17, 0.24]} position={[-0.1, 0.03, 0]}>
        <sphereGeometry args={[1, 22, 18]} />
        <MeshMat color="#c4b5fd" active={active} />
      </mesh>
      <mesh scale={[0.2, 0.17, 0.24]} position={[0.1, 0.03, 0]}>
        <sphereGeometry args={[1, 22, 18]} />
        <MeshMat color="#a78bfa" active={active} />
      </mesh>
      <mesh scale={[0.14, 0.09, 0.11]} position={[0, -0.16, -0.1]}>
        <sphereGeometry args={[1, 18, 14]} />
        <MeshMat color="#8b5cf6" active={active} />
      </mesh>
      <mesh position={[0, -0.28, -0.04]}>
        <cylinderGeometry args={[0.045, 0.05, 0.16, 12]} />
        <MeshMat color="#a78bfa" active={active} />
      </mesh>
    </group>
  );
}

export function SpinalCordArt({ active }: ArtProps) {
  return (
    <group>
      <Tube points={spinePoints} radius={0.035} color="#a78bfa" active={active} segments={80} radial={8} />
      {[0.45, 0.78, 1.1].map((y) => (
        <group key={y}>
          {[-1, 1].map((s) => (
            <Tube
              key={s}
              points={[
                [0, y, -0.24],
                [s * 0.22, y - 0.05, -0.15],
                [s * 0.4, y - 0.14, -0.05],
              ]}
              radius={0.012}
              color="#c4b5fd"
              active={active}
              segments={14}
            />
          ))}
        </group>
      ))}
    </group>
  );
}

export function SkeletonArt({ active }: ArtProps) {
  const ribs = [0, 1, 2, 3, 4, 5, 6];
  return (
    <group>
      <mesh scale={[0.19, 0.21, 0.2]} position={[0, 1.9, 0]}>
        <sphereGeometry args={[1, 20, 16]} />
        <MeshMat color="#e2e8f0" active={active} />
      </mesh>
      <mesh position={[0, 1.6, -0.02]}>
        <cylinderGeometry args={[0.055, 0.065, 0.22, 10]} />
        <MeshMat color="#cbd5e1" active={active} />
      </mesh>
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh key={i} position={[0, -1.05 + i * 0.17, -0.2]} scale={[1, 1, 0.7]}>
          <cylinderGeometry args={[0.055, 0.055, 0.08, 10]} />
          <MeshMat color="#e2e8f0" active={active} />
        </mesh>
      ))}
      {ribs.map((i) => {
        const y = 0.92 - i * 0.13;
        const w = 0.32 + i * 0.025;
        return [-1, 1].map((s) => (
          <Tube
            key={`${i}-${s}`}
            points={[
              [s * 0.03, y + 0.05, -0.18],
              [s * w * 0.92, y + 0.01, -0.02],
              [s * w * 0.62, y - 0.07, 0.2],
              [s * 0.06, y - 0.13, 0.23],
            ]}
            radius={0.011}
            color="#e2e8f0"
            active={active}
            segments={18}
            radial={6}
          />
        ));
      })}
      <mesh position={[0, -1.02, 0]} rotation={[Math.PI / 2.3, 0, 0]}>
        <torusGeometry args={[0.3, 0.03, 8, 26, Math.PI * 1.35]} />
        <MeshMat color="#cbd5e1" active={active} />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s}>
          <Tube
            points={[
              [s * 0.24, 1.08, -0.02],
              [s * 0.5, 0.86, 0],
              [s * 0.6, 0.38, 0.03],
              [s * 0.62, -0.08, 0.05],
            ]}
            radius={0.026}
            color="#cbd5e1"
            active={active}
            segments={22}
            radial={6}
          />
          <Tube
            points={[
              [s * 0.2, -0.98, 0],
              [s * 0.27, -1.62, 0],
              [s * 0.24, -2.25, 0],
            ]}
            radius={0.034}
            color="#cbd5e1"
            active={active}
            segments={20}
            radial={6}
          />
        </group>
      ))}
    </group>
  );
}

export function ThyroidArt({ active }: ArtProps) {
  return (
    <group>
      {[-1, 1].map((s) => (
        <mesh key={s} scale={[0.065, 0.09, 0.06]} position={[s * 0.075, 0, 0]}>
          <sphereGeometry args={[1, 14, 10]} />
          <MeshMat color="#facc15" active={active} />
        </mesh>
      ))}
      <mesh position={[0, -0.015, 0]} scale={[1, 0.5, 0.7]}>
        <boxGeometry args={[0.1, 0.07, 0.06]} />
        <MeshMat color="#eab308" active={active} />
      </mesh>
    </group>
  );
}

export function UterusArt({ active }: ArtProps) {
  return (
    <group>
      <mesh scale={[0.16, 0.22, 0.13]} position={[0, 0.08, 0]}>
        <sphereGeometry args={[1, 20, 16]} />
        <MeshMat color="#f472b6" active={active} />
      </mesh>
      <mesh position={[0, -0.16, 0.02]}>
        <cylinderGeometry args={[0.06, 0.07, 0.16, 12]} />
        <MeshMat color="#ec4899" active={active} />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s}>
          <Tube
            points={[
              [s * 0.12, 0.2, 0],
              [s * 0.26, 0.26, 0.02],
              [s * 0.36, 0.16, 0.02],
            ]}
            radius={0.02}
            color="#ec4899"
            active={active}
            segments={16}
          />
          <mesh scale={[0.09, 0.07, 0.08]} position={[s * 0.38, 0.14, 0.02]}>
            <sphereGeometry args={[1, 14, 10]} />
            <MeshMat color="#f9a8d4" active={active} />
          </mesh>
        </group>
      ))}
      <mesh scale={[0.09, 0.08, 0.09]} position={[0, -0.28, 0.02]}>
        <sphereGeometry args={[1, 14, 10]} />
        <MeshMat color="#db2777" active={active} />
      </mesh>
    </group>
  );
}

export function OvaryArt({ active }: ArtProps) {
  return (
    <group>
      {[-1, 1].map((s) => (
        <mesh key={s} scale={[0.09, 0.07, 0.08]} position={[s * 0.36, -0.45, 0.06]}>
          <sphereGeometry args={[1, 16, 12]} />
          <MeshMat color="#f9a8d4" active={active} />
        </mesh>
      ))}
    </group>
  );
}

export function TestisArt({ active }: ArtProps) {
  return (
    <group>
      <mesh scale={[0.18, 0.13, 0.12]} position={[0, -1.0, 0.16]}>
        <sphereGeometry args={[1, 18, 14]} />
        <MeshMat color="#f472b6" active={active} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} scale={[0.075, 0.1, 0.075]} position={[s * 0.09, -0.99, 0.2]}>
          <sphereGeometry args={[1, 14, 12]} />
          <MeshMat color="#f9a8d4" active={active} />
        </mesh>
      ))}
      <Tube
        points={[
          [0, -1.0, 0.22],
          [0, -0.9, 0.2],
          [0, -0.78, 0.14],
        ]}
        radius={0.025}
        color="#ec4899"
        active={active}
        segments={14}
      />
    </group>
  );
}

export function BodyGhost({ hide }: { hide: boolean }) {
  if (hide) return null;
  return (
    <group>
      <mesh position={[0, -0.03, 0]}>
        <capsuleGeometry args={[0.48, 1.15, 6, 18]} />
        <meshStandardMaterial color="#7dd3fc" transparent opacity={0.1} depthWrite={false} roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.9, 0]}>
        <sphereGeometry args={[0.32, 20, 16]} />
        <meshStandardMaterial color="#7dd3fc" transparent opacity={0.13} depthWrite={false} roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.47, 0]}>
        <cylinderGeometry args={[0.11, 0.12, 0.32, 12]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.055} depthWrite={false} />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[s * 0.58, 0.45, 0]} rotation={[0, 0, s * 0.14]}>
            <capsuleGeometry args={[0.065, 1.3, 4, 10]} />
            <meshStandardMaterial color="#7dd3fc" transparent opacity={0.07} depthWrite={false} />
          </mesh>
          <mesh position={[s * 0.24, -1.45, 0]}>
            <capsuleGeometry args={[0.08, 1.55, 4, 10]} />
            <meshStandardMaterial color="#7dd3fc" transparent opacity={0.07} depthWrite={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function OrganArt({ id, active }: { id: string; active?: boolean }) {
  switch (id) {
    case "heart":
      return <HeartArt active={active} />;
    case "lungs":
      return <LungsArt active={active} />;
    case "trachea":
      return <TracheaArt active={active} />;
    case "liver":
      return <LiverArt active={active} />;
    case "stomach":
      return <StomachArt active={active} />;
    case "pancreas":
      return <PancreasArt active={active} />;
    case "small-intestine":
      return <SmallIntestineArt active={active} />;
    case "large-intestine":
      return <LargeIntestineArt active={active} />;
    case "kidney":
      return <KidneyArt active={active} />;
    case "bladder":
      return <BladderArt active={active} />;
    case "brain":
      return <BrainArt active={active} />;
    case "spinal-cord":
      return <SpinalCordArt active={active} />;
    case "skeleton":
      return <SkeletonArt active={active} />;
    case "thyroid":
      return <ThyroidArt active={active} />;
    case "uterus":
      return <UterusArt active={active} />;
    case "ovary":
      return <OvaryArt active={active} />;
    case "testis":
      return <TestisArt active={active} />;
    default:
      return null;
  }
}
