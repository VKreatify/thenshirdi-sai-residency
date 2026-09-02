/**
 * Non-plot geometry traced from the drawing: the site perimeter, the road
 * network, and the existing road on the west edge.
 *
 * Same coordinate space as layoutBands.js (1080 x 760, origin top-left), so
 * plot rectangles and this frame line up without any transform.
 */

/**
 * The site perimeter, traced clockwise from the north-west corner of plot 1.
 * Closed polyline; drawn as a thick stroke with no fill.
 */
export const SITE_BOUNDARY = [
  // north edge above plots 1-7, rising to a shallow peak then easing down
  [105, 346],
  [272, 323],
  [420, 331],
  [530, 320],
  // step up into the Public Purpose pocket
  [534, 288],
  [600, 288],
  // west side of the PARK-02 / 12.00m road corridor
  [600, 186],
  [600, 58],
  // PARK-02 top edge, slanting down to the north road corridor
  [660, 87],
  [664, 78],
  // long slanted north edge over PARK-01
  [944, 45],
  // east edge, easing outward as it runs south
  [947, 152],
  [947, 402],
  [950, 440],
  [956, 536],
  [962, 630],
  [965, 690],
  // south edge
  [348, 690],
  // west side of the southern spur; the west ledge sits at the mid-height of
  // the plots two rows down (y = 615).
  [348, 615],
  [335, 615],
  // West side: a single straight vertical edge at x = 105, flush with (and
  // continuing) both Owners Use's west border and plot 1's west border. From
  // Owners Use's bottom-left (105,615) up through the shared corner (105,410)
  // -- where plot 1's bottom-left and the 12.00m road meet -- then the polygon
  // closes up to (105,346) = plot 1's top-left. One unbroken west line.
  [105, 615],
  [105, 410],
];

/**
 * Road bands. `rx` gives the stadium-shaped ends the drawing uses on the
 * north-east loop roads. Purely decorative - never hit-tested.
 */
export const ROADS = [
  // --- main 12.00m spine ---------------------------------------------------
  { id: 'r-main-12', x: 105, y: 410, w: 845, h: 30 },

  // --- vertical roads ------------------------------------------------------
  { id: 'r-9-north', x: 396, y: 331, w: 32, h: 79 },
  { id: 'r-9-south', x: 396, y: 440, w: 32, h: 250 },
  { id: 'r-12-vert', x: 652, y: 150, w: 36, h: 260 },
  { id: 'r-10-vert', x: 768, y: 440, w: 32, h: 250 },
  { id: 'r-12-vert-n', x: 660, y: 78, w: 28, h: 72 },

  // --- north-east loop road (rounded ends) --------------------------------
  { id: 'r-720-113', x: 688, y: 288, w: 250, h: 34, rx: 6 },

  // --- 7.20m roads, central + east blocks ---------------------------------
  { id: 'r-720-c1', x: 428, y: 535, w: 340, h: 23 },
  { id: 'r-720-e1', x: 800, y: 535, w: 156, h: 23 },
  { id: 'r-720-c2', x: 428, y: 608, w: 340, h: 20 },
  { id: 'r-720-e2', x: 800, y: 160, w: 160, h: 20 },
];

/**
 * Road name labels. `rotate` is degrees clockwise about the anchor point;
 * -90 matches the drawing's bottom-up vertical text.
 */
export const ROAD_LABELS = [
  { text: '12.00m Wide Layout Road', x: 590, y: 425 },
  { text: '12.00m Wide Layout Road', x: 858, y: 425 },
  { text: '7.20m Wide Layout Road', x: 545, y: 549 },
  { text: '7.20m Wide Layout Road', x: 878, y: 549 },
  { text: '7.20m Wide Layout Road', x: 545, y: 621 },
  { text: '7.20m Wide Layout Road', x: 878, y: 621 },
  { text: '7.20m Wide Layout Road', x: 812, y: 302 },
  { text: '7.20m Wide Layout Road', x: 815, y: 170 },
  { text: '7.20m Wide Layout Road', x: 815, y: 208 },
  { text: '9.00m Wide Layout Road', x: 412, y: 386, rotate: -90, fontSize: 6.2 },
  { text: '9.00m Wide Layout Road', x: 412, y: 520, rotate: -90 },
  { text: '12.00m Wide Layout Road', x: 670, y: 352, rotate: -90 },
  { text: '12.00m Wide Layout Road', x: 672, y: 132, rotate: -90 },
  { text: '10.00m Wide Layout Road', x: 784, y: 540, rotate: -90 },
];

/**
 * The 18.30m existing road running diagonally off the south-west corner:
 * the road band, its label, and the flow arrows.
 */
export const EXISTING_ROAD = {
  band: { x: 48, y: 352, w: 56, h: 311, rotate: -19.14 },
  label: { text: '12.00m Wide Existing Road', x: 96, y: 500, rotate: 71 },
};

/** The sheet border the drawing is framed with. */
export const SHEET_FRAME = { x: 12, y: 20, w: 1056, h: 724 };
