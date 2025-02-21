import { createI18n } from "vue-i18n"; // 使用 createI18n 替代 VueI18n

// 创建 i18n 实例
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: "zh", // 默认语言
  fallbackLocale: "zh", // 回退语言
  messages: {}, // 初始为空，动态加载语言文件
});

/**
 * 动态加载语言文件
 * @param {string} locale - 语言代码（如 'en', 'zh'）
 */
export async function loadLocaleMessages(locale) {
  try {
    const messages = await import(`../../locales/${locale}.json`); // 动态加载语言文件
    i18n.global.setLocaleMessage(locale, messages.default); // 设置语言包
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

export default i18n;
