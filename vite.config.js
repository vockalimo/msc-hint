import { defineConfig } from 'vite';
import path from 'path';
const buildMode = process.env.BUILD_MODE;
export default defineConfig({
    build: {
        cssCodeSplit: false,
        minify: buildMode === 'production',
        lib: {
            entry: path.resolve(__dirname, 'src/mjs/wc-msc-hint.js'),
            name: 'wc-msc-hint',
            formats: ['es'], // 输出格式推荐使用 ES 模块格式
            fileName: (format) => buildMode === 'production' ? `wc-msc-hint.min.${format}.js` : `wc-msc-hint.${format}.js`
        },
    },

});