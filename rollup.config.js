import babel from '@rollup/plugin-babel'
import styles from "rollup-plugin-styles"
import json from '@rollup/plugin-json'
const autoprefixer = require('autoprefixer')

// the entry point for the library
const input = 'src/index.js'

//
let MODE = [{ fomart: 'esm' }, { fomart: 'umd' }]

let config = []

MODE.map((m) => {
  let conf = {
    input: input,
    output: {
      // then name of your package
      name: "react-material-scheduler",
      file: `dist/index.${m.fomart}.js`,
      format: m.fomart,
      exports: "auto"
    },
    // this externelizes react to prevent rollup from compiling it
    external: [
      "react",
      "@mui/icons-material",
      "@mui/lab",
      "@mui/material",
      "@mui/system",
      "date-fns",
      "date-fns-jalali",
      "prop-types",
      /@babel\/runtime/
    ],
    plugins: [
      json(),
      // these are babel comfigurations
      babel({
        exclude: 'node_modules/**',
        plugins: ['@babel/transform-runtime', "@babel/plugin-proposal-optional-chaining"],
        babelHelpers: 'runtime'
      }),
      // this adds sourcemaps
      //sourcemaps(),
      // this adds support for styles
      styles({
        postcss: {
          plugins: [
            autoprefixer()
          ]
        }
      })
    ]
  }
  config.push(conf)
})

export default [
  ...config,
]
