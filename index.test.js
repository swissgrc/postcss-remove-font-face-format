const postcss = require('postcss')

const plugin = require('./')

async function run (input, output, opts = { }) {
  let result = await postcss([plugin(opts)]).process(input, { from: undefined })
  expect(result.css).toEqual(output)
  expect(result.warnings()).toHaveLength(0)
}

it('should remove format', async () => {
  await run(
    '@font-face {font-family: "Open Sans";src: url("/fonts/OpenSans-Regular-webfont.woff2") format("woff2"),url("/fonts/OpenSans-Regular-webfont.woff") format("woff");}', 
    '@font-face {font-family: "Open Sans";src: url("/fonts/OpenSans-Regular-webfont.woff") format("woff");}', 
    { format: 'woff2' })
});

it('should not remove formats if no format is passed', async () => {
  await run(
    '@font-face {font-family: "Open Sans";src: url("/fonts/OpenSans-Regular-webfont.woff") format("woff");}', 
    '@font-face {font-family: "Open Sans";src: url("/fonts/OpenSans-Regular-webfont.woff") format("woff");}', 
    { })
});

it('should ignore font-face rules without format', async () => {
  await run(
    '@font-face {font-family: MyHelvetica; src: local("Helvetica Neue Bold"), local("HelveticaNeue-Bold"), url(MgOpenModernaBold.ttf); font-weight: bold;}', 
    '@font-face {font-family: MyHelvetica; src: local("Helvetica Neue Bold"), local("HelveticaNeue-Bold"), url(MgOpenModernaBold.ttf); font-weight: bold;}', 
    { format: 'woff2' })
});

it('should ignore everything which is not a font-face', async () => {
  await run(
    'border : 1px solid black;', 
    'border : 1px solid black;', 
    { format: 'woff2' })
});

