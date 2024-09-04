import * as THREE from "three";
import { GolobalGUI } from "./GUI";
// constents
const PI = Math.PI;
const scale = 5;
const rings = 14;
const Rings = 13;
const k = (4 / 3) * (Math.sqrt(2) - 1);
const totalStripLength = 27; // real length  = 27 inch
const singleRingLength = totalStripLength / Rings;
const proximity = 0.5; // 0= at the center - 1 = at the edge
const r = totalStripLength / (2 * PI * rings);
const R = totalStripLength / (2 * PI * Rings);

export let torofluxmesh = null;
// axis
export const axisHelper = new THREE.AxesHelper(1);
axisHelper.scale.set(R * scale, R * scale, R * scale);

// innitialise gui
const gui = GolobalGUI;
const debugObject = {};
debugObject.proximity = proximity;
debugObject.resolution = 300;
debugObject.segments = 6;
debugObject.radius = 0.2;
debugObject.wireframe = false;
debugObject.Rings = Rings;

export class torofluxCurve extends THREE.Curve {
  constructor(scale = 1) {
    super();
    this.scale = scale;
  }

  getPoint(t, optionalTarget = new THREE.Vector3()) {
    //0 < t < 1;
    const normalize = t * 1 * 2 * PI;
    const div = 1 / debugObject.Rings;

    const inner_loop = normalize / div;
    const tx = Math.sin(inner_loop) + debugObject.proximity;
    const ty = Math.cos(inner_loop);
    const tz = 0;

    // turn per proximity when proximity = 0 they are all laying flat
    // and when proximity = 1 they are all stright

    const turn = ((1 - debugObject.proximity) * PI) / 2;
    const tx2 = tx;
    const ty2 = ty * Math.cos(turn) - tz * Math.sin(turn);
    const tz2 = ty * Math.sin(turn) + tz * Math.cos(turn);

    const outer_loop = t * 2 * PI;
    const tx3 = tx2 * Math.cos(outer_loop) + tz2 * Math.sin(outer_loop);
    const ty3 = ty2;
    const tz3 = -tx2 * Math.sin(outer_loop) + tz2 * Math.cos(outer_loop);

    return optionalTarget.set(tx3, ty3, tz3).multiplyScalar(this.scale);
  }
}

// create mesh
let path = new torofluxCurve(scale);
debugObject.geometry = new THREE.TubeGeometry(
  path,
  debugObject.resolution,
  debugObject.radius,
  debugObject.segments,
  false
);

const material = new THREE.MeshPhysicalMaterial({
  color: 0xf0f0f0, // Base color of aluminum (grayish)
  metalness: 1.0, // Fully metallic
  roughness: 0.4, // Medium roughness for a slightly polished look
  clearcoat: 1.0, // High clearcoat to simulate the glossy finish of aluminum
  clearcoatRoughness: 0.1, // Clearcoat roughness, can be adjusted for desired effect
  wireframe: false,
});

const wireframeMaterial = new THREE.MeshBasicMaterial({
  color: 0xf0f0f0, // Base color of aluminum (grayish)
  wireframe: true,
});

torofluxmesh = new THREE.Mesh(debugObject.geometry, material);
function update() {
  torofluxmesh.geometry.dispose();
  path = new torofluxCurve(scale);
  torofluxmesh.geometry = new THREE.TubeGeometry(
    path,
    debugObject.resolution,
    debugObject.radius,
    debugObject.segments,
    false
  );
}

//changes
gui
  .add(debugObject, "proximity")
  .min(0)
  .max(1)
  .step(0.05)
  .onChange(() => {
    update();
  });

gui
  .add(debugObject, "resolution")
  .min(50)
  .max(3000)
  .step(1)
  .onChange(() => {
    update();
  });

gui
  .add(debugObject, "segments")
  .min(2)
  .max(20)
  .step(1)
  .onChange(() => {
    update();
  });

gui
  .add(debugObject, "radius")
  .min(0.1)
  .max(0.9)
  .step(0.05)
  .onChange(() => {
    update();
  });

gui
  .add(debugObject, "Rings")
  .min(2)
  .max(13)
  .step(1)
  .onChange(() => {
    update();
  });

gui.add(debugObject, "wireframe").onChange(() => {
  torofluxmesh.material = debugObject.wireframe ? wireframeMaterial : material;
});
