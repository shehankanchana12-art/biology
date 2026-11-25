import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { MODEL_BASE, type ModelSpec } from "./modelRegistry";

let loader: GLTFLoader | null = null;

function getLoader() {
  if (loader) return loader;
  const l = new GLTFLoader();
  const draco = new DRACOLoader();
  draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.7/");
  l.setDRACOLoader(draco);
  loader = l;
  return l;
}

const cache = new Map<string, Promise<THREE.Object3D>>();

function fetchModel(spec: ModelSpec) {
  const url = `${MODEL_BASE}${spec.file}`;
  let pending = cache.get(url);
  if (!pending) {
    pending = new Promise<THREE.Object3D>((resolve, reject) => {
      getLoader().load(
        url,
        (gltf) => resolve(gltf.scene),
        undefined,
        (err) => reject(err)
      );
    });
    cache.set(url, pending);
  }
  return pending;
}

type Props = {
  spec: ModelSpec;
  active: boolean;
  hovered: boolean;
};

/**
 * Loads an exported Blender model (glTF/GLB), centres it on its own bounding
 * box and scales it to the organ's slot so every model fits the body scene
 * regardless of the units it was authored in.
 */
export function OrganModel({ spec, active, hovered }: Props) {
  const [object, setObject] = useState<THREE.Group | null>(null);
  const originals = useRef<{ material: THREE.Material; emissive: THREE.Color | null }[]>([]);

  useEffect(() => {
    let alive = true;
    setObject(null);
    originals.current = [];

    fetchModel(spec)
      .then((scene) => {
        if (!alive) return;
        const root = scene.clone(true);
        const materials: { material: THREE.Material; emissive: THREE.Color | null }[] = [];

        root.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (!mesh.isMesh) return;
          mesh.castShadow = false;
          mesh.receiveShadow = false;
          const source = mesh.material;
          const cloned = Array.isArray(source)
            ? source.map((m) => m.clone())
            : source.clone();
          mesh.material = cloned;
          const list = Array.isArray(cloned) ? cloned : [cloned];
          for (const material of list) {
            const standard = material as THREE.MeshStandardMaterial;
            materials.push({
              material,
              emissive: standard.emissive ? standard.emissive.clone() : null,
            });
            material.side = THREE.FrontSide;
          }
        });

        const box = new THREE.Box3().setFromObject(root);
        const size = new THREE.Vector3();
        const centre = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(centre);

        const longest = Math.max(size.x, size.y, size.z) || 1;
        const target = spec.size ?? 0.55;

        root.position.set(-centre.x, -centre.y, -centre.z);

        const group = new THREE.Group();
        group.add(root);
        group.scale.setScalar((target / longest) * (spec.scale ?? 1));
        if (spec.rotation) group.rotation.set(...spec.rotation);

        originals.current = materials;
        setObject(group);
      })
      .catch(() => {
        if (alive) setObject(null);
      });

    return () => {
      alive = false;
    };
  }, [spec]);

  useEffect(() => {
    const colour = active ? 0x2dd4bf : hovered ? 0x14b8a6 : null;
    const strength = active ? 0.5 : 0.22;
    for (const item of originals.current) {
      const standard = item.material as THREE.MeshStandardMaterial;
      if (!standard.emissive) continue;
      if (colour === null) {
        if (item.emissive) standard.emissive.copy(item.emissive);
      } else {
        standard.emissive.setHex(colour);
      }
      standard.emissiveIntensity = colour === null ? 1 : strength;
    }
  }, [active, hovered, object]);

  if (!object) return null;
  return <primitive object={object} />;
}
