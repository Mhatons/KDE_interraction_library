

// import resolve from '@rollup/plugin-node-resolve';
// import commonjs from '@rollup/plugin-commonjs';
// import typescript from '@rollup/plugin-typescript';
// import json from '@rollup/plugin-json';


// export default {
//   input: 'src/index.ts',
//   output: [
//     {
//       file: 'dist/esm/index.mjs',
//       format: 'esm',
//       sourcemap: true,
//     },
//     {
//       file: 'dist/cjs/index.cjs',
//       format: 'cjs',
//       sourcemap: true,
//     },
//   ],
//   plugins: [
//     resolve(),
//     commonjs(),
//     typescript({ tsconfig: './tsconfig.json' }),
//   ],
//   external: ['tslib'], // Avoid bundling tslib
// };


import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/esm/index.js',
      format: 'es',
    },
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
    },
  ],
  plugins: [resolve(), commonjs(), json(), typescript()],
};

