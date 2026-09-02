import { ROWS, COLS, POLYS, AREAS, EXTENT } from './layoutBands.js';

/**
 * Builds the layout graph from the raw bands.
 *
 * A "vertex" is a deduplicated corner point. Plots and areas reference vertices
 * by index, so two plots sharing a boundary literally share vertex ids — which
 * is what makes neighbour lookup and edge dedup work.
 *
 * Runs once at module load (a few hundred points); no need to memoize.
 */

const QUANT = 0.5; // points within 0.5px collapse to one vertex

const vertices = [];
const vertexIndex = new Map();

/** @returns {number} index of the (deduplicated) vertex */
function addVertex(x, y) {
  const key = `${Math.round(x / QUANT)}:${Math.round(y / QUANT)}`;
  const hit = vertexIndex.get(key);
  if (hit !== undefined) return hit;
  const id = vertices.length;
  vertices.push({ id, x, y });
  vertexIndex.set(key, id);
  return id;
}

/** Rectangle -> 4 vertex ids, clockwise from top-left. */
function rectVertices(x0, y0, x1, y1) {
  return [addVertex(x0, y0), addVertex(x1, y0), addVertex(x1, y1), addVertex(x0, y1)];
}

const plots = [];

for (const { ids, x, y } of ROWS) {
  const [x0, x1] = x;
  const [y0, y1] = y;
  const step = (x1 - x0) / ids.length;
  ids.forEach((plotId, i) => {
    plots.push({
      id: plotId,
      vertices: rectVertices(x0 + i * step, y0, x0 + (i + 1) * step, y1),
    });
  });
}

for (const { ids, x, cuts } of COLS) {
  const [x0, x1] = x;
  ids.forEach((plotId, i) => {
    plots.push({ id: plotId, vertices: rectVertices(x0, cuts[i], x1, cuts[i + 1]) });
  });
}

// Free-form polygon plots (e.g. the NW block, plots 1-7): vertices are listed
// explicitly rather than derived from a rectangle, so sloped/tapered edges work.
for (const { id, points } of POLYS) {
  plots.push({ id, vertices: points.map(([x, y]) => addVertex(x, y)) });
}

const areas = AREAS.map((area) => ({
  ...area,
  vertices: area.points.map(([x, y]) => addVertex(x, y)),
}));

/** Attach derived geometry: polygon points, centroid, area. */
function decorate(face) {
  const pts = face.vertices.map((v) => vertices[v]);
  let cx = 0;
  let cy = 0;
  let twiceArea = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    const cross = a.x * b.y - b.x * a.y;
    twiceArea += cross;
    cx += (a.x + b.x) * cross;
    cy += (a.y + b.y) * cross;
  }
  // Degenerate polygons fall back to the bounding-box centre.
  const centroid =
    Math.abs(twiceArea) < 1e-6
      ? {
          x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
          y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
        }
      : { x: cx / (3 * twiceArea), y: cy / (3 * twiceArea) };

  return {
    ...face,
    points: pts.map((p) => [p.x, p.y]),
    pathData: pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + ' Z',
    centroid,
    area: Math.abs(twiceArea) / 2,
  };
}

const decoratedPlots = plots.map(decorate).sort((a, b) => a.id - b.id);
const decoratedAreas = areas.map(decorate);

/**
 * Undirected edges, deduplicated. `faces` lists every plot id touching the edge,
 * so an edge with 2 faces is an interior boundary and 1 face is a layout perimeter.
 */
const edgeMap = new Map();
for (const plot of decoratedPlots) {
  const vs = plot.vertices;
  for (let i = 0; i < vs.length; i++) {
    const a = vs[i];
    const b = vs[(i + 1) % vs.length];
    const key = a < b ? `${a}-${b}` : `${b}-${a}`;
    const existing = edgeMap.get(key);
    if (existing) existing.faces.push(plot.id);
    else edgeMap.set(key, { a: Math.min(a, b), b: Math.max(a, b), faces: [plot.id] });
  }
}
const edges = [...edgeMap.values()];

/** plot id -> plot ids sharing at least one full edge. */
const neighbors = new Map(decoratedPlots.map((p) => [p.id, new Set()]));
for (const edge of edges) {
  if (edge.faces.length < 2) continue;
  for (const f of edge.faces) {
    for (const g of edge.faces) {
      if (f !== g) neighbors.get(f)?.add(g);
    }
  }
}

export const layout = {
  extent: EXTENT,
  vertices,
  edges,
  plots: decoratedPlots,
  areas: decoratedAreas,
  neighbors: new Map([...neighbors].map(([k, v]) => [k, [...v].sort((a, b) => a - b)])),
};

export const plotById = new Map(decoratedPlots.map((p) => [p.id, p]));

export default layout;
