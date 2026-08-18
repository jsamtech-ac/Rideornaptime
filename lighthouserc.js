// Desktop Lighthouse profile. See scripts/qa/lhci-config.cjs for the shared
// shape, and lighthouserc.mobile.js for the mobile profile.
//   npm run qa:lhci:desktop   npm run qa:lhci:mobile   npm run qa:lhci (both)
module.exports = require('./scripts/qa/lhci-config.cjs').lhciConfig('desktop')
