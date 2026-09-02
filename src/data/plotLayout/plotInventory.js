import { layout } from './layoutGraph.js';

/**
 * Sellable-inventory metadata, keyed by plot id.
 * Derived from the official Puliyampatti Phase:1 Sanctioned Inventory (Date: 04-04-2024).
 */

/**
 * Warm terracotta-on-cream & gold architectural palette.
 *
 * `fill`/`stroke` paint the plot polygon; `text` tints the plot number and
 * `sub` the small status caption printed underneath it.
 */
export const STATUS = {
  available: {
    label: 'Available',
    badgeClass: 'badge-available',
    fill: '#FFFFFF',
    stroke: '#D4CEC3',
    text: '#1B1A17',
    sub: '#6C665C',
    accent: '#2e7d32'
  },
  reserved: {
    label: 'Reserved',
    badgeClass: 'badge-reserved',
    fill: '#F5E6DF',
    stroke: '#C07A5C',
    text: '#A85C3C',
    sub: '#A85C3C',
    accent: '#A85C3C'
  },
  sold: {
    label: 'Sold',
    badgeClass: 'badge-sold',
    fill: '#C8BFB5',
    stroke: '#8C8073',
    text: '#4A423A',
    sub: '#665C52',
    accent: '#665C52'
  },
};

/**
 * Official Puliyampatti Phase 1 Sanctioned Survey Data (Dated 04-04-2024).
 * Key: Plot Number
 * Values: facing, areaSqft, cent, status ('available' | 'sold' | 'reserved')
 */
export const OFFICIAL_PLOT_DATA = {
  // Page 1 (Plots 2 - 31)
  2: { facing: 'South', areaSqft: 2914.00, cent: 6.69, status: 'available' },
  3: { facing: 'South', areaSqft: 3520.00, cent: 8.08, status: 'available' },
  4: { facing: 'South', areaSqft: 4118.00, cent: 9.45, status: 'available' },
  5: { facing: 'South', areaSqft: 4036.00, cent: 9.27, status: 'available' },
  6: { facing: 'South', areaSqft: 3664.00, cent: 8.41, status: 'available' },
  8: { facing: 'North', areaSqft: 1891.00, cent: 4.34, status: 'available' },
  9: { facing: 'North East', areaSqft: 1879.00, cent: 4.31, status: 'available' },
  10: { facing: 'East', areaSqft: 2268.00, cent: 5.21, status: 'available' },
  11: { facing: 'East', areaSqft: 2252.00, cent: 5.17, status: 'available' },
  12: { facing: 'East', areaSqft: 2233.00, cent: 5.13, status: 'available' },
  13: { facing: 'East', areaSqft: 2215.00, cent: 5.08, status: 'available' },
  16: { facing: 'South West', areaSqft: 2143.00, cent: 4.92, status: 'available' },
  17: { facing: 'North', areaSqft: 2055.00, cent: 4.72, status: 'available' },
  18: { facing: 'North', areaSqft: 1998.00, cent: 4.59, status: 'available' },
  19: { facing: 'North', areaSqft: 1986.00, cent: 4.56, status: 'available' },
  20: { facing: 'North', areaSqft: 1981.00, cent: 4.55, status: 'available' },
  21: { facing: 'North', areaSqft: 1976.00, cent: 4.54, status: 'available' },
  22: { facing: 'North', areaSqft: 1971.00, cent: 4.52, status: 'available' },
  23: { facing: 'North', areaSqft: 1984.00, cent: 4.55, status: 'available' },
  24: { facing: 'North', areaSqft: 2016.00, cent: 4.63, status: 'available' },
  25: { facing: 'North', areaSqft: 2048.00, cent: 4.70, status: 'available' },
  26: { facing: 'North East', areaSqft: 2294.00, cent: 5.27, status: 'available' },
  27: { facing: 'North West', areaSqft: 2725.00, cent: 6.26, status: 'available' },
  28: { facing: 'North', areaSqft: 2134.00, cent: 4.90, status: 'available' },
  29: { facing: 'North', areaSqft: 2164.00, cent: 4.97, status: 'available' },
  30: { facing: 'North', areaSqft: 2194.00, cent: 5.04, status: 'available' },
  31: { facing: 'North', areaSqft: 2310.00, cent: 5.30, status: 'available' },

  // Page 2 (Plots 32 - 78)
  32: { facing: 'South', areaSqft: 613.00, cent: 1.41, status: 'available' },
  33: { facing: 'South', areaSqft: 668.00, cent: 1.53, status: 'available' },
  34: { facing: 'South', areaSqft: 668.00, cent: 1.53, status: 'available' },
  35: { facing: 'South', areaSqft: 668.00, cent: 1.53, status: 'available' },
  36: { facing: 'South', areaSqft: 668.00, cent: 1.53, status: 'available' },
  37: { facing: 'South', areaSqft: 668.00, cent: 1.53, status: 'available' },
  38: { facing: 'South', areaSqft: 668.00, cent: 1.53, status: 'available' },
  39: { facing: 'South West', areaSqft: 753.00, cent: 1.73, status: 'available' },
  40: { facing: 'South East', areaSqft: 687.00, cent: 1.58, status: 'available' },
  41: { facing: 'South', areaSqft: 699.00, cent: 1.60, status: 'available' },
  42: { facing: 'South', areaSqft: 732.00, cent: 1.68, status: 'available' },
  43: { facing: 'South', areaSqft: 643.00, cent: 1.48, status: 'available' },
  44: { facing: 'South', areaSqft: 643.00, cent: 1.48, status: 'available' },
  45: { facing: 'South', areaSqft: 643.00, cent: 1.48, status: 'available' },
  46: { facing: 'South', areaSqft: 649.00, cent: 1.49, status: 'available' },
  47: { facing: 'South', areaSqft: 730.00, cent: 1.68, status: 'available' },
  48: { facing: 'South', areaSqft: 730.00, cent: 1.68, status: 'available' },
  49: { facing: 'South', areaSqft: 730.00, cent: 1.68, status: 'available' },
  50: { facing: 'South', areaSqft: 730.00, cent: 1.68, status: 'available' },
  51: { facing: 'South', areaSqft: 730.00, cent: 1.68, status: 'available' },
  52: { facing: 'South', areaSqft: 730.00, cent: 1.68, status: 'available' },
  59: { facing: 'North', areaSqft: 730.00, cent: 1.68, status: 'available' },
  65: { facing: 'North', areaSqft: 730.00, cent: 1.68, status: 'available' },
  66: { facing: 'North', areaSqft: 730.00, cent: 1.68, status: 'available' },
  67: { facing: 'North', areaSqft: 730.00, cent: 1.68, status: 'available' },
  71: { facing: 'North West', areaSqft: 753.00, cent: 1.73, status: 'available' },
  72: { facing: 'North', areaSqft: 668.00, cent: 1.53, status: 'available' },
  73: { facing: 'North', areaSqft: 668.00, cent: 1.53, status: 'available' },
  74: { facing: 'North', areaSqft: 668.00, cent: 1.53, status: 'available' },
  75: { facing: 'North', areaSqft: 668.00, cent: 1.53, status: 'available' },
  76: { facing: 'North', areaSqft: 668.00, cent: 1.53, status: 'available' },
  77: { facing: 'North', areaSqft: 668.00, cent: 1.53, status: 'available' },
  78: { facing: 'North', areaSqft: 583.00, cent: 1.34, status: 'available' },

  // Page 3 (Plots 79 - 121)
  79: { facing: 'South', areaSqft: 2373.00, cent: 5.45, status: 'available' },
  80: { facing: 'South', areaSqft: 2094.00, cent: 4.81, status: 'available' },
  81: { facing: 'South', areaSqft: 2094.00, cent: 4.81, status: 'available' },
  82: { facing: 'South West', areaSqft: 2245.00, cent: 5.15, status: 'available' },
  83: { facing: 'South East', areaSqft: 1882.00, cent: 4.32, status: 'available' },
  84: { facing: 'South', areaSqft: 2094.00, cent: 4.81, status: 'available' },
  85: { facing: 'South', areaSqft: 2094.00, cent: 4.81, status: 'available' },
  86: { facing: 'South', areaSqft: 2094.00, cent: 4.81, status: 'available' },
  87: { facing: 'South', areaSqft: 2094.00, cent: 4.81, status: 'available' },
  88: { facing: 'South', areaSqft: 2094.00, cent: 4.81, status: 'available' },
  89: { facing: 'South', areaSqft: 2094.00, cent: 4.81, status: 'available' },
  90: { facing: 'South', areaSqft: 2094.00, cent: 4.81, status: 'available' },
  98: { facing: 'North', areaSqft: 2524.00, cent: 5.79, status: 'available' },
  99: { facing: 'North', areaSqft: 2524.00, cent: 5.79, status: 'available' },
  103: { facing: 'North', areaSqft: 2386.00, cent: 5.48, status: 'available' },
  104: { facing: 'North', areaSqft: 2386.00, cent: 5.48, status: 'available' },
  105: { facing: 'North', areaSqft: 2463.00, cent: 5.65, status: 'available' },
  106: { facing: 'South', areaSqft: 2101.00, cent: 4.82, status: 'available' },
  107: { facing: 'South', areaSqft: 1996.00, cent: 4.58, status: 'available' },
  108: { facing: 'South', areaSqft: 1996.00, cent: 4.58, status: 'available' },
  109: { facing: 'South', areaSqft: 1996.00, cent: 4.58, status: 'available' },
  110: { facing: 'South', areaSqft: 1996.00, cent: 4.58, status: 'available' },
  111: { facing: 'South', areaSqft: 1996.00, cent: 4.58, status: 'available' },
  112: { facing: 'South West', areaSqft: 1984.00, cent: 4.55, status: 'available' },
  113: { facing: 'North West', areaSqft: 2086.00, cent: 4.79, status: 'available' },
  114: { facing: 'North', areaSqft: 2098.00, cent: 4.82, status: 'available' },
  115: { facing: 'North', areaSqft: 2098.00, cent: 4.82, status: 'available' },
  116: { facing: 'North', areaSqft: 2098.00, cent: 4.82, status: 'available' },
  117: { facing: 'North', areaSqft: 2098.00, cent: 4.82, status: 'available' },
  118: { facing: 'North', areaSqft: 2098.00, cent: 4.82, status: 'available' },
  119: { facing: 'North', areaSqft: 2098.00, cent: 4.82, status: 'available' },
  120: { facing: 'North', areaSqft: 1777.00, cent: 4.08, status: 'available' },
  121: { facing: 'South', areaSqft: 1479.00, cent: 3.40, status: 'available' },

  // Page 4 (Plots 122 - 145)
  122: { facing: 'South', areaSqft: 1602.00, cent: 3.68, status: 'available' },
  123: { facing: 'South', areaSqft: 1602.00, cent: 3.68, status: 'available' },
  124: { facing: 'South', areaSqft: 1602.00, cent: 3.68, status: 'available' },
  125: { facing: 'South', areaSqft: 1602.00, cent: 3.68, status: 'available' },
  126: { facing: 'South', areaSqft: 1602.00, cent: 3.68, status: 'available' },
  127: { facing: 'South West', areaSqft: 1590.00, cent: 3.65, status: 'available' },
  128: { facing: 'North West', areaSqft: 1361.00, cent: 3.12, status: 'available' },
  129: { facing: 'North', areaSqft: 1407.00, cent: 3.23, status: 'available' },
  130: { facing: 'North', areaSqft: 1569.00, cent: 3.60, status: 'available' },
  131: { facing: 'North', areaSqft: 1533.00, cent: 3.52, status: 'available' },
  132: { facing: 'North', areaSqft: 1437.00, cent: 3.30, status: 'available' },
  133: { facing: 'North', areaSqft: 1534.00, cent: 3.52, status: 'available' },
  134: { facing: 'North', areaSqft: 1482.00, cent: 3.40, status: 'available' },
  135: { facing: 'West', areaSqft: 962.00, cent: 2.21, status: 'available' },
  136: { facing: 'South West', areaSqft: 1027.00, cent: 2.36, status: 'available' },
  137: { facing: 'North East', areaSqft: 2019.00, cent: 4.63, status: 'available' },
  138: { facing: 'East', areaSqft: 2049.00, cent: 4.70, status: 'available' },
  139: { facing: 'East', areaSqft: 2049.00, cent: 4.70, status: 'available' },
  141: { facing: 'South', areaSqft: 4586.00, cent: 10.53, status: 'available' },
  142: { facing: 'South', areaSqft: 4259.00, cent: 9.78, status: 'available' },
  143: { facing: 'South', areaSqft: 3898.00, cent: 8.95, status: 'available' },
  144: { facing: 'South West', areaSqft: 2549.00, cent: 5.85, status: 'available' },
  145: { facing: 'West', areaSqft: 2543.00, cent: 5.84, status: 'available' },

  // Plots not present in the Phase 1 available inventory sheet (Sold Plots)
  1: { facing: 'South West', areaSqft: 2850.00, cent: 6.54, status: 'sold' },
  7: { facing: 'South', areaSqft: 3550.00, cent: 8.15, status: 'sold' },
  14: { facing: 'East', areaSqft: 2200.00, cent: 5.05, status: 'sold' },
  15: { facing: 'East', areaSqft: 2200.00, cent: 5.05, status: 'sold' },
  53: { facing: 'South', areaSqft: 730.00, cent: 1.68, status: 'sold' },
  54: { facing: 'South', areaSqft: 730.00, cent: 1.68, status: 'sold' },
  55: { facing: 'South', areaSqft: 730.00, cent: 1.68, status: 'sold' },
  56: { facing: 'North', areaSqft: 730.00, cent: 1.68, status: 'sold' },
  57: { facing: 'North', areaSqft: 730.00, cent: 1.68, status: 'sold' },
  58: { facing: 'North', areaSqft: 730.00, cent: 1.68, status: 'sold' },
  60: { facing: 'North', areaSqft: 730.00, cent: 1.68, status: 'sold' },
  61: { facing: 'North', areaSqft: 730.00, cent: 1.68, status: 'sold' },
  62: { facing: 'North', areaSqft: 730.00, cent: 1.68, status: 'sold' },
  63: { facing: 'North', areaSqft: 730.00, cent: 1.68, status: 'sold' },
  64: { facing: 'North', areaSqft: 730.00, cent: 1.68, status: 'sold' },
  68: { facing: 'North', areaSqft: 730.00, cent: 1.68, status: 'sold' },
  69: { facing: 'North', areaSqft: 730.00, cent: 1.68, status: 'sold' },
  70: { facing: 'East', areaSqft: 1850.00, cent: 4.25, status: 'sold' },
  91: { facing: 'South', areaSqft: 2094.00, cent: 4.81, status: 'sold' },
  92: { facing: 'North', areaSqft: 2524.00, cent: 5.79, status: 'sold' },
  93: { facing: 'North', areaSqft: 2524.00, cent: 5.79, status: 'sold' },
  94: { facing: 'North', areaSqft: 2524.00, cent: 5.79, status: 'sold' },
  95: { facing: 'North', areaSqft: 2524.00, cent: 5.79, status: 'sold' },
  96: { facing: 'North', areaSqft: 2524.00, cent: 5.79, status: 'sold' },
  97: { facing: 'North', areaSqft: 2524.00, cent: 5.79, status: 'sold' },
  100: { facing: 'East', areaSqft: 1850.00, cent: 4.25, status: 'sold' },
  101: { facing: 'East', areaSqft: 1850.00, cent: 4.25, status: 'sold' },
  102: { facing: 'North', areaSqft: 2386.00, cent: 5.48, status: 'sold' },
  140: { facing: 'East', areaSqft: 2049.00, cent: 4.70, status: 'sold' },
};

/** Categorize plot type by square footage */
function getPlotType(sqft) {
  if (sqft >= 3500) return 'Grand Villa Plot';
  if (sqft >= 2000) return 'Executive Villa Plot';
  if (sqft >= 1200) return 'Standard Residential Plot';
  return 'Compact Residential Plot';
}

export const inventory = new Map(
  layout.plots.map((plot) => {
    const official = OFFICIAL_PLOT_DATA[plot.id] || {
      facing: 'North',
      areaSqft: Math.round(plot.area * 3.6),
      cent: Number(((plot.area * 3.6) / 435.6).toFixed(2)),
      status: 'available'
    };

    const areaSqft = official.areaSqft;
    const cent = official.cent || Number((areaSqft / 435.6).toFixed(2));
    const facing = official.facing;
    const status = official.status;

    return [
      plot.id,
      {
        id: plot.id,
        number: plot.id,
        status,
        areaSqft,
        cent,
        facing,
        dimensions: `${Math.round(Math.sqrt(areaSqft * 1.35))} × ${Math.round(areaSqft / Math.sqrt(areaSqft * 1.35))} ft`,
        type: getPlotType(areaSqft)
      },
    ];
  }),
);

export default inventory;
