/**
 * Raw geometry traced from the layout drawing.
 *
 * Coordinate space == the drawing's pixel space: 1080 x 760, origin top-left.
 * Everything downstream (vertices, edges, faces) is derived from this file,
 * so this is the ONLY file to touch when you refine the trace.
 *
 * ROWS  -> a horizontal strip of plots, split evenly along x
 * COLS  -> a vertical stack of plots, split at explicit y cuts
 * POLYS -> free-form plot polygons (edges not axis-aligned)
 * AREAS -> non-sellable polygons (parks, roads reserve, owners use)
 */

/** @typedef {{ids:number[], x:[number,number], y:[number,number]}} Row */

/** Horizontal plot strips. `ids` runs left -> right. @type {Row[]} */
export const ROWS = [
  // --- west block (plots 1-7): defined as POLYS below, not here. Their tops
  //     follow the sloping north boundary and plot 1 tapers to the west
  //     diagonal, so a rectangular ROW can no longer express them. -----------

  // --- central block: 143/142/141 ----------------------------------------
  { ids: [143, 142, 141], x: [478, 600], y: [332, 408] },

  // --- north-east block: 128..134 / 127..121 ------------------------------
  // Right edge extended to x=947 so both rows sit flush on the vertical east
  // boundary (which runs straight at x=947 across this y-span).
  { ids: [128, 129, 130, 131, 132, 133, 134], x: [690, 947], y: [228, 258] },
  { ids: [127, 126, 125, 124, 123, 122, 121], x: [690, 947], y: [258, 288] },

  // --- east block: 113..120 / 112..106 -----------------------------------
  // Right edge extended to x=947 so both rows sit flush on the same vertical
  // east boundary the block above uses (straight at x=947 across this y-span).
  { ids: [113, 114, 115, 116, 117, 118, 119, 120], x: [688, 947], y: [322, 360] },
  { ids: [112, 111, 110, 109, 108, 107, 106], x: [688, 947], y: [360, 400] },

  // --- central block, north of the 7.20m road ----------------------------
  { ids: [92, 93, 94, 95, 96, 97, 98, 99], x: [428, 722], y: [440, 478] },
  { ids: [91, 90, 89, 88, 87, 86, 85, 84], x: [428, 722], y: [478, 535] },

  // --- east block, mid ---------------------------------------------------
  // Plots 105 and 79 live in POLYS: their right edges follow the east boundary,
  // which leans outward across this y-span and so cannot be a rectangle. These
  // rows hold the three interior plots each and stop on x=914.75, the shared
  // division both rows and both polygons start from, so the vertical lines
  // between plots stay aligned between the two rows.
  { ids: [102, 103, 104], x: [800, 914.75], y: [440, 488] },
  { ids: [82, 81, 80], x: [800, 914.75], y: [488, 535] },

  // --- central block, the two thin rows ----------------------------------
  { ids: [56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69], x: [428, 722], y: [558, 583] },
  {
    ids: [55, 54, 53, 52, 51, 50, 49, 48, 47, 46, 45, 44, 43, 42, 41, 40],
    x: [428, 768],
    y: [583, 608],
  },

  // --- east block, the two thin rows -------------------------------------
  // Plots 78 and 32 live in POLYS: their right edges follow the east boundary,
  // which leans further outward across this y-span. These rows keep the same
  // 20-wide even split they always had and stop on x=940, a division that was
  // already there, so none of the interior plots move.
  { ids: [71, 72, 73, 74, 75, 76, 77], x: [800, 940], y: [558, 583] },
  { ids: [39, 38, 37, 36, 35, 34, 33], x: [800, 940], y: [583, 608] },

  // --- south rows --------------------------------------------------------
  // Bottom edge extended from y=682 to y=690 so both blocks sit flush on
  // S "South Base", the site's south boundary.
  { ids: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26], x: [428, 768], y: [628, 690] },
  { ids: [27, 28, 29, 30, 31], x: [800, 962], y: [628, 690] },

  // --- 8 / 9 pair --------------------------------------------------------
  { ids: [8, 9], x: [348, 396], y: [442, 478] },
];

/** @typedef {{ids:number[], x:[number,number], cuts:number[]}} Col */

/** Vertical plot stacks. `ids` runs top -> bottom; `cuts` has ids.length+1 y values. @type {Col[]} */
export const COLS = [
  { ids: [145, 144], x: [428, 478], cuts: [332, 370, 408] },
  { ids: [138, 139, 140], x: [600, 652], cuts: [318, 348, 375, 405] },
  { ids: [137], x: [602, 652], cuts: [232, 288] },
  // Nestled into the north-east park's bottom-left corner: left edge on x=688,
  // plot 136's bottom on y=150 (sizes unchanged, stack translated by +2,-20).
  { ids: [135, 136], x: [688, 718], cuts: [104, 128, 150] },
  { ids: [101, 100, 83], x: [722, 768], cuts: [440, 478, 500, 535] },
  { ids: [70], x: [722, 768], cuts: [556, 583] },
  { ids: [10, 11, 12, 13, 14, 15], x: [348, 396], cuts: [478, 522, 556, 585, 615, 645, 690] },
];

/** @typedef {{id:number, points:[number,number][]}} Poly */

/**
 * Free-form plot polygons -- for plots whose edges aren't axis-aligned and so
 * can't be expressed as a ROW or COL.
 *
 * NW block (plots 1-7): the tops follow the sloping north site boundary
 * ((105,346) -> (272,323) -> (420,331)) instead of sitting flat, and plot 1's
 * west edge follows the existing-road diagonal down to the 12.00m road. Each
 * `points` list is clockwise from the top-left corner; the x cuts are the same
 * even splits the old ROW used, and each top y is the boundary height there.
 *
 * East block mid (plots 105, 79): the right edges follow the outward-leaning
 * east boundary ((950,440) -> (956,536)), so each plot's top-right and
 * bottom-right corners sit at different x. Plot 105's top-right is the
 * boundary's kink point (950,440), where the short segment above meets this
 * one; plot 79's bottom-right is the boundary height at y=535.
 *
 * East block thin rows (plots 78, 32): the same idea against the next boundary
 * segment down ((956,536) -> (962,630)), which leans out further still. The old
 * flat edge at x=960 poked through the boundary at the top of the block and
 * fell short of it at the bottom, so these two follow the lean instead. Their
 * shared corner (959,583) is the boundary height where the two rows meet.
 * @type {Poly[]}
 */
export const POLYS = [
  { id: 1, points: [[105, 346], [152.571, 339.45], [152.571, 410], [105, 410]] },
  { id: 2, points: [[152.571, 339.45], [193.143, 333.86], [193.143, 410], [152.571, 410]] },
  { id: 3, points: [[193.143, 333.86], [233.714, 328.27], [233.714, 410], [193.143, 410]] },
  { id: 4, points: [[233.714, 328.27], [272, 323], [274.286, 323.12], [274.286, 410], [233.714, 410]] },
  { id: 5, points: [[274.286, 323.12], [314.857, 325.32], [314.857, 410], [274.286, 410]] },
  { id: 6, points: [[314.857, 325.32], [355.429, 327.51], [355.429, 410], [314.857, 410]] },
  { id: 7, points: [[355.429, 327.51], [396, 329.70], [396, 410], [355.429, 410]] },
  { id: 105, points: [[914.75, 440], [950, 440], [953, 488], [914.75, 488]] },
  { id: 79, points: [[914.75, 488], [953, 488], [955.9375, 535], [914.75, 535]] },
  { id: 78, points: [[940, 558], [957.4042553, 558], [959, 583], [940, 583]] },
  { id: 32, points: [[940, 583], [959, 583], [960.5957447, 608], [940, 608]] },
];

/** Non-sellable polygons. Rendered, labelled, never selectable. */
export const AREAS = [
  {
    id: 'PARK-01',
    // West edge is the 12.00m vertical road (x=688); south edge is the 7.20m
    // park road (y=150). The top edge now follows the slanted north boundary
    // and the right edge follows the outward-leaning east boundary, meeting at
    // the perimeter's north-east corner (944,45) so both edges sit flush on it.
    label: 'PARK - 01',
    kind: 'park',
    points: [[688, 75.17], [944, 45], [946.94, 150], [688, 150]],
  },
  {
    id: 'PARK-02',
    label: 'PARK - 02',
    kind: 'park',
    points: [[600, 60], [660, 88], [660, 186], [600, 186]],
  },
  {
    id: 'OWNERS-USE',
    label: 'Owners Use',
    kind: 'reserved',
    // A clean rectangle: its west edge is vertical at x=105, flush with and
    // continuing plot 1's west border straight down, so the site's west
    // boundary reads as one unbroken line from (105,346) down to (105,615).
    points: [[105, 410], [335, 410], [335, 615], [105, 615]],
  },
  {
    id: 'PP-01',
    label: 'Public Purpose',
    kind: 'reserved',
    points: [[534, 288], [652, 288], [652, 316], [534, 316]],
  },
];

/** Drawing extents, used for the SVG viewBox. */
export const EXTENT = { width: 1080, height: 760 };
