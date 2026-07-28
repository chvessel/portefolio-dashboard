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
      path: '/portefolio',
      name: 'portfolio',
      component: PortfolioView,
    },
    {
      path: '/portefolio/conversion',
      name: 'conversion',
      component: ConversionView,
    },
    {
      path: '/portefolio/ghost',
      name: 'ghost',
      component: GhostView,
    },
    {
      path: '/portefolio/mediadeck',
      name: 'mediadeck',
      component: MediaDeckView,
    },
    {
      path: '/portefolio/spine',
      name: 'spine',
      component: SpineView,
    },
    {
      path: '/portefolio/moneta',
      name: 'moneta',
      component: MonetaView,
    },
    {
      path: '/portefolio/dayframe',
      name: 'dayframe',
      component: DayframeView,
    },
  ],
})

export default router
