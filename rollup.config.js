import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import copy from 'rollup-plugin-cpy';
import external from 'rollup-plugin-peer-deps-external';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

import pkg from './package.json';

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    external({
      includeDependencies: true,
    }),
    babel({
      exclude: /node_modules/,
      // We are using @babel/plugin-transform-runtime
      runtimeHelpers: true,
    }),
    copy({
      files: ['src/index.d.ts'],
      dest: 'dist',
    }),
    resolve(),
    commonjs(),
    sizeSnapshot(),
  ],
};
