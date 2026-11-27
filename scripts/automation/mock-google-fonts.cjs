// Serves Google Fonts CSS from local copies so CI builds don't depend on
// fonts.googleapis.com, which intermittently returns responses next/font 14
// can't parse on GitHub runners. Vercel production builds still use Google.
//
// Used via NEXT_FONT_GOOGLE_MOCKED_RESPONSES=<this file>. next/font looks up
// mock[url]; the Proxy answers for any URL based on the family it names.
const path = require('node:path')

const file = (pkg, name) =>
  path.join(path.dirname(require.resolve(`${pkg}/package.json`)), 'files', name)

const LATIN =
  'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD'

const face = (family, style, weight, src) => `/* latin */
@font-face {
  font-family: '${family}';
  font-style: ${style};
  font-weight: ${weight};
  font-display: swap;
  src: url(${src}) format('woff2');
  unicode-range: ${LATIN};
}
`

const CSS = {
  Fredoka: face(
    'Fredoka',
    'normal',
    '300 700',
    file('@fontsource-variable/fredoka', 'fredoka-latin-wght-normal.woff2')
  ),
  'DM Sans':
    face(
      'DM Sans',
      'italic',
      '100 1000',
      file('@fontsource-variable/dm-sans', 'dm-sans-latin-wght-italic.woff2')
    ) +
    face(
      'DM Sans',
      'normal',
      '100 1000',
      file('@fontsource-variable/dm-sans', 'dm-sans-latin-wght-normal.woff2')
    ),
}

module.exports = new Proxy(
  {},
  {
    get(_target, url) {
      if (typeof url !== 'string') return undefined
      const family = decodeURIComponent(url.match(/family=([^:&]+)/)?.[1] ?? '').replace(/\+/g, ' ')
      return CSS[family]
    },
  }
)
