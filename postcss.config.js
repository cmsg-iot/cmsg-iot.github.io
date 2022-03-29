const purgecss = require("@fullhuman/postcss-purgecss")({

  // Specify the paths to all of the template files in your project
  content:[
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    // etc.
  ],

  // include any special charactrs you're using in this regular expression
  defaultExtrator: content => content.match(/[\w-/:]+(?<!:)/g) || []
})

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    // ...process.env.NODE_ENV === 'production'
    // ? [purgecss]
    // : []
  ]
};