import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/ViteDemo/'),
  routes: [
    { path: '/', redirect: '/home' },
    {
      name: 'home',
      path: '/home',
      component: () => import('@/components/Home.vue'),
    },
    {
      name: 'about-us',
      path: '/about-us',
      component: () => import('@/components/AboutUs.vue'),
    },
    {
      name: 'service',
      path: '/service',
      component: () => import('@/components/Service.vue'),
      redirect: '/service-detail',
      children: [
        {
          name: 'service-detail',
          path: '/service-detail',
          component: () => import('@/components/service/ServiceDetail.vue'),
        },
      ],
    },
    {
      name: 'products',
      path: '/products',
      component: () => import('@/components/Products.vue'),
      redirect: '/product-list',
      children: [
        {
          name: 'product-list',
          path: '/product-list',
          component: () => import('@/components/products/ProductList.vue'),
        },
        {
          name: 'product-detail',
          path: '/product-detail',
          component: () => import('@/components/products/ProductDetail.vue'),
        },
      ],
    },
    {
      name: 'news',
      path: '/news',
      component: () => import('@/components/News.vue'),
      redirect: '/news-list',
      children: [
        {
          name: 'news-list',
          path: '/news-list',
          component: () => import('@/components/news/NewsList.vue'),
        },
        {
          name: 'news-detail',
          path: '/news-detail',
          component: () => import('@/components/news/NewsDetail.vue'),
        },
      ],
    },
    {
      name: 'contact-us',
      path: '/contact-us',
      component: () => import('@/components/ContactUs.vue'),
    },
    // { path: "/ContactUs", component: () => import("@/components/Menu.vue") }
  ],
})

export default router
