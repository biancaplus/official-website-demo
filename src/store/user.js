import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => {
        return { count: 0, name: '测试', isAdmin: true, theme: 'light' };
    },
    getters: {
        doubleCount: state => state.count * 2,
        getIsAdmin: state => state.isAdmin,
        getCount() {
            return this.count;
        },
        getTheme() {
            return this.theme;
        }
    },
    actions: {
        increment() {
            this.count++;
        }
    }
});
