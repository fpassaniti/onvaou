import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import {terser} from 'rollup-plugin-terser';
import preprocess from 'svelte-preprocess';
import postcss from 'rollup-plugin-postcss';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import json from '@rollup/plugin-json';

const production = !process.env.ROLLUP_WATCH;

const preprocessOptions = {
    transformers: {
        scss: {
            includePaths: [
                'node_modules',
                'src'
            ]
        },
        postcss: {
            plugins: [
                require('autoprefixer'),
            ]
        }
    },
}

export default {
    input: 'src/main.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [
        json(),
        commonjs(),
        nodePolyfills(),
        svelte({
            dev: !production,
            css: css => {
                css.write('bundle.css');
            },
            preprocess: preprocess(preprocessOptions)
        }),
        postcss(),
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        !production && serve(),
        !production && livereload('public'),
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};

function serve() {
    let started = false;

    return {
        writeBundle() {
            if (!started) {
                started = true;

                require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                    stdio: ['ignore', 'inherit', 'inherit'],
                    shell: true
                });
            }
        }
    };
}
