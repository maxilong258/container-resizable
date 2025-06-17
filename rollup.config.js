import typescript from '@rollup/plugin-typescript'
import vue from '@vitejs/plugin-vue'
import esbuild from 'rollup-plugin-esbuild'
import postcss from 'rollup-plugin-postcss'

export default [
  // ES模块版本
  {
    input: 'index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'es'
    },
    plugins: [
      vue({
        preprocessStyles: true
      }),
      postcss({
        extract: false,
        inject: true,
        minimize: true
      }),
      esbuild({
        target: 'es2020',
        minify: false
      }),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'dist'
      })
    ],
    external: ['vue']
  },
  // CommonJS版本
  {
    input: 'index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named'
    },
    plugins: [
      vue({
        preprocessStyles: true
      }),
      postcss({
        extract: false,
        inject: true,
        minimize: true
      }),
      esbuild({
        target: 'es2020',
        minify: false
      }),
      typescript({
        tsconfig: './tsconfig.json'
      })
    ],
    external: ['vue']
  }
] 