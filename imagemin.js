import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import path from 'path';
import fs from 'fs-extra';
import { globby } from 'globby';

(async () => {
    try {
        // 源目录和目标目录
        const SOURCE_DIR = 'src/assets/images';
        const OUTPUT_DIR = 'src/assets/webp';

        // 1. 获取所有图片文件的绝对路径
        const files = await globby([`${SOURCE_DIR}/**/*.{jpg,png}`]);

        // 2. 遍历处理每个文件
        for (const filePath of files) {
            // 计算相对路径
            const relativePath = path.relative(SOURCE_DIR, filePath);
            const outputPath = path.join(OUTPUT_DIR, path.dirname(relativePath), `${path.basename(filePath, path.extname(filePath))}.webp`);

            // 3. 创建目标目录结构
            await fs.ensureDir(path.dirname(outputPath));

            // 4. 转换并保存文件
            const [result] = await imagemin([filePath], {
                destination: path.dirname(outputPath),
                plugins: [imageminWebp({ quality: 75 })]
            });

            if (result) {
                console.log(`Converted: ${relativePath} → ${path.relative(OUTPUT_DIR, outputPath)}`);
            }
        }

        console.log('\n✅ 图片转换完成');
    } catch (error) {
        console.error('\n❌ 图片转换错误:', error);
        process.exit(1);
    }
})();
