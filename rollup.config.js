import resolve from 'rollup-plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import analyze from 'rollup-plugin-analyzer';
import minifyHTML from 'rollup-plugin-minify-html-literals';

const input = 'packages/all/lib/wired-elements.js';
const outDir = 'packages/all/lib';

function onwarn(warning) {
  if (warning.code === 'THIS_IS_UNDEFINED')
    return;
  console.error(warning.message);
}

export default [
  {
    input,
    output: {
      file: `${outDir}/wired-elements-bundled-full.js`,
      format: 'iife',
      name: 'WiredElements'
    },
    onwarn,
    plugins: [
      resolve()
    ]
  },
  {
    input,
    output: {
      file: `${outDir}/wired-elements-bundled.js`,
      format: 'iife',
      name: 'WiredElements'
    },
    onwarn,
    plugins: [
      resolve(),
      minifyHTML(),
      terser({
        output: {
          comments: false
        }
      }),
      analyze({filter: ({id}) => id.indexOf('lit-html') < 0
      && id.indexOf('lit-element') < 0 }),
    ]
  },
  {
    input,
    output: {
      file: `${outDir}/wired-elements-bundled.cjs.js`,
      format: 'cjs'
    },
    onwarn,
    plugins: [
      resolve(),
      terser({
        output: {
          comments: false
        }
      })
    ]
  }
];