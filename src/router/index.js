import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PortfolioView from '@/views/PortfolioView.vue'
import DataNestView from '@/views/DataNestView.vue'
import CortexView from '@/views/CortexView.vue'
import CurrentsView from '@/views/CurrentsView.vue'
import FolioView from '@/views/FolioView.vue'
import LedgerView from '@/views/LedgerView.vue'
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
      path: '/portfolio/datanest',
      name: 'datanest',
      component: DataNestView,
    },
    {
      path: '/portfolio/cortex',
      name: 'cortex',
      component: CortexView,
    },
    {
      path: '/portfolio/currents',
      name: 'currents',
      component: CurrentsView,
    },
    {
      path: '/portfolio/folio',
      name: 'folio',
      component: FolioView,
    },
    {
      path: '/portfolio/ledger',
      name: 'ledger',
      component: LedgerView,
    },
    {
      path: '/portfolio/dayframe',
      name: 'dayframe',
      component: DayframeView,
    },
  ],
})

export default router
