import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PortfolioView from '@/views/PortfolioView.vue'
import ConversionView from '@/views/ConversionView.vue'
import GhostView from '@/views/GhostView.vue'
import MediaDeckView from '@/views/MediaDeckView.vue'
import SpineView from '@/views/SpineView.vue'
import MonetaView from '@/views/MonetaView.vue'
import DayframeView from '@/views/DayframeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioView,
    },
    {
      path: '/portfolio/conversion',
      name: 'conversion',
      component: ConversionView,
    },
    {
      path: '/portfolio/ghost',
      name: 'ghost',
      component: GhostView,
    },
    {
      path: '/portfolio/mediadeck',
      name: 'mediadeck',
      component: MediaDeckView,
    },
    {
      path: '/portfolio/spine',
      name: 'spine',
      component: SpineView,
    },
    {
      path: '/portfolio/moneta',
      name: 'moneta',
      component: MonetaView,
    },
    {
      path: '/portfolio/dayframe',
      name: 'dayframe',
      component: DayframeView,
    },
  ],
})

export default router
