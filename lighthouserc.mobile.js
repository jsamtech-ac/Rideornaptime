// Mobile Lighthouse profile — Moto G-class CPU (4x slowdown), simulated slow 4G.
// Median of 3 runs, because mobile TBT/LCP are noisier than desktop.
module.exports = require('./scripts/qa/lhci-config.cjs').lhciConfig('mobile')
