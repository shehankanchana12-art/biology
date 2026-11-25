import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { MathUtils } from "three";
import { BodyGhost, OrganArt } from "./OrganArt";
import { ORGAN_VISUALS, finalPosition, visualById, type OrganVisual } from "./organConfig";
import { anatomyById } from "../data/anatomy";

type SceneProps = {
  sex: "male" | "female";
  exploded: boolean;
  selected: string | null;
  hiddenSystems: string[];
  onSelect: (id: string | null) => void;
};

function OrganNode({
  v,
  exploded,
  selected,
  hidden,
  onSelect,
}: {
  v: OrganVisual;
  exploded: boolean;
  selected: string | null;
  hidden: boolean;
  onSelect: (id: string | null) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const scale = useRef(1);
  const [hovered, setHovered] = useState(false);
  const active = selected === v.id;
  const entry = anatomyById(v.id);

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    progress.current = MathUtils.damp(progress.current, exploded ? 1 : 0, 5.5, dt);
    g.position.set(
      v.base[0] + v.explode[0] * progress.current,
      v.base[1] + v.explode[1] * progress.current,
      v.base[2] + v.explode[2] * progress.current
    );
    const target = hidden ? 0.001 : active ? 1.22 : hovered ? 1.08 : 1;
    scale.current = MathUtils.damp(scale.current, target, 9, dt);
    g.scale.setScalar(scale.current);
    g.visible = scale.current > 0.01;
  });

  return (
    <group ref={ref}>
      <group
        onClick={(e) => {
          e.stopPropagation();
          if (hidden) return;
          onSelect(active ? null : v.id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (hidden) return;
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <OrganArt id={v.id} active={active || hovered} />
      </group>
      {(active || hovered) && !hidden && entry && (
        <Html
          center
          position={[0, v.labelY ?? 0.3, 0]}
          distanceFactor={8}
          zIndexRange={[30, 0]}
          style={{ pointerEvents: "none" }}
        >
          <div className="pointer-events-none whitespace-nowrap rounded-md border border-white/15 bg-[#070d17]/95 px-2 py-1 text-center shadow-lg">
            <div className="text-[11px] font-medium leading-tight text-white">{entry.name}</div>
            <div className="text-[8px] italic leading-tight text-sky-300/80">{entry.term}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

function CameraRig({ selected, exploded }: { selected: string | null; exploded: boolean }) {
  const camera = useThree((s) => s.camera);
  const controls = useThree((s) => s.controls) as unknown as {
    target: THREE.Vector3;
    update: () => void;
  } | null;
  const animating = useRef(true);
  const goal = useRef(new THREE.Vector3(0, 0.6, 6.8));
  const look = useRef(new THREE.Vector3(0, 0.35, 0));

  useEffect(() => {
    animating.current = true;
  }, [selected, exploded]);

  useFrame((_, dt) => {
    const focus = selected ? visualById(selected) : null;
    if (focus && focus.id !== "skeleton") {
      const p = finalPosition(focus, exploded);
      look.current.set(p[0], p[1], p[2]);
      goal.current.set(p[0] + (p[0] >= 0 ? 0.75 : -0.75), p[1] + 0.4, p[2] + 2.3);
    } else if (focus?.id === "skeleton") {
      goal.current.set(0, 0.5, 7.8);
      look.current.set(0, 0.1, 0);
    } else {
      goal.current.set(0, 0.6, exploded ? 8.6 : 6.8);
      look.current.set(0, exploded ? 0.05 : 0.3, 0);
    }

    if (!animating.current) return;
    const l = 1 - Math.exp(-4.5 * dt);
    camera.position.lerp(goal.current, l);
    if (controls) {
      controls.target.lerp(look.current, l);
      controls.update();
    }
    if (camera.position.distanceTo(goal.current) < 0.02) animating.current = false;
  });

  return null;
}

function LabRings() {
  return (
    <group position={[0, -2.15, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.15, 1.19, 72]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.35} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.55, 1.56, 72]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.1, 64]} />
        <meshBasicMaterial color="#0b1a2a" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

function SceneContent({ sex, exploded, selected, hiddenSystems, onSelect }: SceneProps) {
  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 7, 6]} intensity={1.6} color="#e0f2fe" />
      <directionalLight position={[-5, 2, 3]} intensity={0.7} color="#2dd4bf" />
      <pointLight position={[0, -2, 4]} intensity={1.4} color="#6366f1" distance={12} />
      <pointLight position={[3, 3, -3]} intensity={0.9} color="#f472b6" distance={12} />

      <BodyGhost hide={false} />
      <LabRings />

      {ORGAN_VISUALS.filter((v) => !v.sex || v.sex === sex).map((v) => (
        <OrganNode
          key={v.id}
          v={v}
          exploded={exploded}
          selected={selected}
          hidden={hiddenSystems.includes(v.system)}
          onSelect={onSelect}
        />
      ))}

      <CameraRig selected={selected} exploded={exploded} />
      <OrbitControls
        makeDefault
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        minDistance={2.2}
        maxDistance={11}
        minPolarAngle={0.35}
        maxPolarAngle={Math.PI / 1.65}
        target={[0, 0.35, 0]}
      />
    </>
  );
}

export function AnatomyScene(props: SceneProps) {
  return (
    <Canvas
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.55, 6.8], fov: 38, near: 0.1, far: 60 }}
      onPointerMissed={() => props.onSelect(null)}
    >
      <Suspense fallback={null}>
        <SceneContent {...props} />
      </Suspense>
    </Canvas>
  );
}
