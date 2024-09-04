import * as THREE from "three";
export function getDavidStarPoints(scale = 1) {
  const points = [];

  points.push(new THREE.Vector2((-Math.sqrt(3) / 2) * scale, -0.5 * scale)); //1
  points.push(
    new THREE.Vector2((-Math.sqrt(3) / 2) * scale, (-1 - 0.5) * scale)
  ); //2
  points.push(new THREE.Vector2(0, -1 * scale)); //3
  points.push(
    new THREE.Vector2((Math.sqrt(3) / 2) * scale, (-1 - 0.5) * scale)
  ); //4
  points.push(new THREE.Vector2((Math.sqrt(3) / 2) * scale, -0.5 * scale)); //5
  points.push(new THREE.Vector2(((2 * Math.sqrt(3)) / 2) * scale, 0)); //6
  points.push(new THREE.Vector2((Math.sqrt(3) / 2) * scale, 0.5 * scale)); //7
  points.push(new THREE.Vector2((Math.sqrt(3) / 2) * scale, (1 + 0.5) * scale)); //8
  points.push(new THREE.Vector2(0, 1 * scale)); //9
  points.push(
    new THREE.Vector2((-Math.sqrt(3) / 2) * scale, (1 + 0.5) * scale)
  ); //10
  points.push(new THREE.Vector2((-Math.sqrt(3) / 2) * scale, 0.5 * scale)); //11
  points.push(new THREE.Vector2(((-2 * Math.sqrt(3)) / 2) * scale, 0)); //12

  return points;
}

export function getDavidStarEdgePoints(resolution, scale = 1) {
  const points = getDavidStarPoints(scale);
  const edgePoints = [];
  for (let i = 0; i < points.length; i++) {
    const next = (i + 1) % points.length;
    const p1 = points[i];
    const p2 = points[next];
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const step = length / resolution;
    for (let j = 0; j < resolution; j++) {
      const t = j * step;
      edgePoints.push(
        new THREE.Vector2(p1.x + (dx * t) / length, p1.y + (dy * t) / length)
      );
    }
  }
  return edgePoints;
}
