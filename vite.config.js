import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        vue(),
        AutoImport({
            resolvers: [VantResolver()]
        }),
        Components({
            resolvers: [VantResolver()]
        })
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    }
    // server: {
    //   proxy: {
    //     // 在此处为需要解决跨域的 API 配置代理
    //     "/LhXthService": {
    //       target: `http://10.153.105.27:82/XthService`,
    //       changeOrigin: true,
    //       ws: true,
    //       pathRewrite: {
    //         "^/LhXthService": ""
    //       }
    //     }
    //   }
    // }
});
