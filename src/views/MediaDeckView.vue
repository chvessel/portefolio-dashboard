<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ProjectPageHero from '@/components/project/ProjectPageHero.vue';
import AppFrame from '@/components/project/AppFrame.vue';

const { t } = useI18n();

const activeScreen = ref('overview');
const goto = (screen) => { activeScreen.value = screen; };

const navStyle = (screen) => {
  const active = activeScreen.value === screen;
  return {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '9px 12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    background: active ? '#db2777' : 'transparent',
    color: active ? '#ffffff' : '#a98ba0',
    fontWeight: active ? 600 : 500,
  };
};

const services = [
  { name: 'Netflix', category: 'Video', price: '$15.49', renews: 'Jun 4', usage: 'High', color: '#e50914' },
  { name: 'Audible', category: 'Audiobooks', price: '$14.95', renews: 'Jun 11', usage: 'Medium', color: '#f8991c' },
  { name: 'Kindle Unlimited', category: 'E-books', price: '$11.99', renews: 'Jun 26', usage: 'High', color: '#ff9900' },
  { name: 'Notion', category: 'Notes', price: '$8.00', renews: 'Jun 30', usage: 'Medium', color: '#9ca3af' },
  { name: 'Disney+', category: 'Video', price: '$13.99', renews: 'Jun 9', usage: 'Medium', color: '#1e3a8a' },
  { name: 'Prime Video', category: 'Video', price: '$8.99', renews: 'Jun 14', usage: 'High', color: '#00a8e1' },
  { name: 'HBO Max', category: 'Video', price: '$16.99', renews: 'Jun 18', usage: 'Low', color: '#7c3aed' },
  { name: 'Hulu', category: 'Video', price: '$7.99', renews: 'Jun 22', usage: 'Low', color: '#1ce783' },
];

const activity = [
  { title: 'Stranger Things, S5', service: 'Netflix', date: 'Jun 2', duration: '52m', type: 'Watched' },
  { title: 'Atomic Habits', service: 'Audible', date: 'Jun 1', duration: '1h 20m', type: 'Listened' },
  { title: 'The Midnight Library', service: 'Kindle Unlimited', date: 'May 31', duration: '45m', type: 'Read' },
  { title: 'Q3 Planning Doc', service: 'Notion', date: 'May 30', duration: '25m', type: 'Edited' },
  { title: 'The Mandalorian, S3', service: 'Disney+', date: 'May 29', duration: '38m', type: 'Watched' },
];

const recommendations = [
  { severity: 'high', title: 'Cancel HBO Max', detail: 'Used only 40 minutes this month — that’s over $25 per hour watched', time: 'Save $16.99/mo' },
  { severity: 'medium', title: 'Downgrade Hulu', detail: 'The ad-supported plan covers your usual viewing habits', time: 'Save $4/mo' },
  { severity: 'low', title: 'Bundle Disney+ & Hulu', detail: 'A combined plan is available for both services', time: 'Save $5/mo' },
];

const alertDotStyle = (severity) => {
  const map = { high: '#f87171', medium: '#fbbf24', low: '#60a5fa' };
  return { width: '8px', height: '8px', borderRadius: '50%', background: map[severity] || '#60a5fa', flexShrink: 0 };
};
</script>

<template>
  <ProjectPageHero
    :eyebrow="t('portfolio.featuredProject')"
    :title="t('projects.mediadeck.title')"
    :description="t('projects.mediadeck.description')"
    :problem-label="t('portfolio.problemLabel')"
    :problem="t('projects.mediadeck.problem')"
    :tags="['Vue3.js', 'Node.js', 'SCSS', 'REST API']"
    accent="#db2777"
  >
    <AppFrame :max-width="1320">
      <div class="ss">
        <aside class="ss__sidebar">
          <div class="ss__brand">
            <div class="ss__brand-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M10 8.5l6 3.5-6 3.5z" />
              </svg>
            </div>
            <div class="ss__brand-name">MediaDeck</div>
          </div>

          <nav class="ss__nav">
            <div class="ss__nav-item" :style="navStyle('overview')" @click="goto('overview')">
              <div class="ss__icon-grid"><span></span><span></span><span></span><span></span></div>
              <span>Overview</span>
            </div>
            <div class="ss__nav-item" :style="navStyle('subscriptions')" @click="goto('subscriptions')">
              <div class="ss__icon-square"></div>
              <span>Subscriptions</span>
            </div>
            <div class="ss__nav-item" :style="navStyle('history')" @click="goto('history')">
              <div class="ss__icon-lines"><span></span><span></span><span></span></div>
              <span>Activity</span>
            </div>
            <div class="ss__nav-item" :style="navStyle('spending')" @click="goto('spending')">
              <div class="ss__icon-triangle"></div>
              <span>Spending</span>
            </div>
            <div class="ss__nav-item" :style="navStyle('recommendations')" @click="goto('recommendations')">
              <div class="ss__icon-bell"></div>
              <span>Recommendations</span>
            </div>
          </nav>
        </aside>

        <main class="ss__main">
          <div class="ss__topbar">
            <div class="ss__search"><div class="ss__search-icon"></div><span>Search titles or services</span></div>
            <div class="ss__topbar-spacer"></div>
            <div class="ss__avatar"></div>
          </div>

          <template v-if="activeScreen === 'overview'">
            <h2 class="ss__section-title">Overview</h2>
            <div class="ss__stat-grid">
              <div class="ss__stat-card">
                <div class="ss__stat-label">Monthly spend</div>
                <div class="ss__stat-value">$98.39</div>
                <div class="ss__stat-delta ss__stat-delta--down">+$6 vs last month</div>
              </div>
              <div class="ss__stat-card">
                <div class="ss__stat-label">Active subscriptions</div>
                <div class="ss__stat-value">8</div>
              </div>
              <div class="ss__stat-card">
                <div class="ss__stat-label">Hours used</div>
                <div class="ss__stat-value">34.2h</div>
                <div class="ss__stat-delta ss__stat-delta--up">this month</div>
              </div>
              <div class="ss__stat-card">
                <div class="ss__stat-label">Underused services</div>
                <div class="ss__stat-value">2</div>
                <div class="ss__stat-delta ss__stat-delta--down">Flagged</div>
              </div>
            </div>

            <div class="ss__panels">
              <div class="ss__panel">
                <div class="ss__panel-label">Spend Trend — 6 Months</div>
                <div class="ss__chart">
                  <div class="ss__chart-col"><div class="ss__chart-bar" style="height: 60px"></div><span>Jan</span></div>
                  <div class="ss__chart-col"><div class="ss__chart-bar" style="height: 74px"></div><span>Feb</span></div>
                  <div class="ss__chart-col"><div class="ss__chart-bar" style="height: 68px"></div><span>Mar</span></div>
                  <div class="ss__chart-col"><div class="ss__chart-bar ss__chart-bar--accent" style="height: 92px"></div><span>Apr</span></div>
                  <div class="ss__chart-col"><div class="ss__chart-bar" style="height: 80px"></div><span>May</span></div>
                  <div class="ss__chart-col"><div class="ss__chart-bar ss__chart-bar--accent" style="height: 100px"></div><span>Jun</span></div>
                </div>
              </div>
              <div class="ss__panel">
                <div class="ss__panel-label">Your Services</div>
                <div class="ss__service-mini" v-for="(s, i) in services.slice(0, 4)" :key="i">
                  <span class="ss__service-dot" :style="{ background: s.color }"></span>
                  <span class="ss__service-mini-name">{{ s.name }}</span>
                  <span class="ss__service-mini-price">{{ s.price }}</span>
                </div>
              </div>
            </div>
          </template>

          <template v-else-if="activeScreen === 'subscriptions'">
            <h2 class="ss__section-title">Subscriptions</h2>
            <div class="ss__sub-grid">
              <div v-for="(s, i) in services" :key="i" class="ss__sub-card">
                <div class="ss__sub-icon" :style="{ background: s.color }"></div>
                <div class="ss__sub-category">{{ s.category }}</div>
                <div class="ss__sub-name">{{ s.name }}</div>
                <div class="ss__sub-price">{{ s.price }}<span>/mo</span></div>
                <div class="ss__sub-renew">Renews {{ s.renews }}</div>
                <div class="ss__sub-usage" :class="`ss__sub-usage--${s.usage.toLowerCase()}`">{{ s.usage }} usage</div>
              </div>
            </div>
          </template>

          <template v-else-if="activeScreen === 'history'">
            <h2 class="ss__section-title">Activity</h2>
            <div class="ss__table-panel">
              <div class="ss__table-head">
                <div>Title</div><div>Service</div><div>Date</div><div>Duration</div><div>Type</div>
              </div>
              <div v-for="(w, i) in activity" :key="i" class="ss__table-row">
                <div>{{ w.title }}</div><div>{{ w.service }}</div><div class="ss__table-dim">{{ w.date }}</div>
                <div>{{ w.duration }}</div><div>{{ w.type }}</div>
              </div>
            </div>
          </template>

          <template v-else-if="activeScreen === 'spending'">
            <h2 class="ss__section-title">Spending</h2>
            <div class="ss__panels">
              <div class="ss__panel">
                <div class="ss__panel-label">Spend by Service</div>
                <div class="ss__donut-wrap"><div class="ss__donut"></div></div>
                <div class="ss__legend">
                  <div class="ss__legend-item"><span class="ss__legend-dot" style="background:#e50914"></span>Netflix<span class="ss__legend-pct">22%</span></div>
                  <div class="ss__legend-item"><span class="ss__legend-dot" style="background:#7c3aed"></span>HBO Max<span class="ss__legend-pct">17%</span></div>
                  <div class="ss__legend-item"><span class="ss__legend-dot" style="background:#f8991c"></span>Audible<span class="ss__legend-pct">15%</span></div>
                  <div class="ss__legend-item"><span class="ss__legend-dot" style="background:#a855f7"></span>Others<span class="ss__legend-pct">46%</span></div>
                </div>
              </div>
              <div class="ss__panel">
                <div class="ss__panel-label">Yearly Projection</div>
                <div class="ss__stat-value" style="margin-bottom: 6px">$1,180.68</div>
                <div class="ss__stat-label">at current subscription levels</div>
              </div>
            </div>
          </template>

          <template v-else-if="activeScreen === 'recommendations'">
            <h2 class="ss__section-title">Recommendations</h2>
            <div class="ss__alerts">
              <div v-for="(r, i) in recommendations" :key="i" class="ss__alert">
                <div :style="alertDotStyle(r.severity)"></div>
                <div class="ss__alert-body">
                  <div class="ss__alert-title">{{ r.title }}</div>
                  <div class="ss__alert-detail">{{ r.detail }}</div>
                </div>
                <div class="ss__alert-time">{{ r.time }}</div>
              </div>
            </div>
          </template>
        </main>
      </div>
    </AppFrame>
  </ProjectPageHero>
</template>

<style lang="scss" scoped>
.ss {
  min-height: 760px;
  display: flex;
  background: #1a0f17;
  font-family: 'Inter', system-ui, sans-serif;
  overflow: hidden;
  color: #e3d5df;

  &__sidebar {
    width: 220px;
    flex-shrink: 0;
    background: #150c13;
    border-right: 1px solid rgba(219, 39, 119, 0.15);
    display: flex;
    flex-direction: column;
    padding: 20px 14px;
    box-sizing: border-box;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0 8px 22px;
    border-bottom: 1px solid rgba(219, 39, 119, 0.15);
    margin-bottom: 16px;
  }

  &__brand-mark {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(219, 39, 119, 0.14);
    color: #f472b6;

    svg { width: 18px; height: 18px; }
  }

  &__brand-name { font-size: 15px; font-weight: 700; color: #fbeaf3; }

  &__nav { display: flex; flex-direction: column; gap: 2px; }

  &__icon-grid {
    width: 14px; height: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
    span { background: currentColor; border-radius: 2px; opacity: 0.9; }
  }

  &__icon-square { width: 14px; height: 14px; border-radius: 4px; border: 1.6px solid currentColor; box-sizing: border-box; }

  &__icon-lines {
    width: 14px; height: 14px; display: flex; flex-direction: column; gap: 2px; justify-content: center;
    span { height: 3px; background: currentColor; border-radius: 1px; }
  }

  &__icon-triangle {
    width: 0; height: 0; border-left: 7px solid transparent; border-right: 7px solid transparent;
    border-bottom: 12px solid currentColor; opacity: 0.9;
  }

  &__icon-bell {
    width: 13px; height: 14px; border: 1.6px solid currentColor; border-radius: 7px 7px 3px 3px; box-sizing: border-box;
  }

  &__main {
    flex: 1; min-width: 0; overflow: auto; padding: 22px 28px; box-sizing: border-box;
    display: flex; flex-direction: column;
  }

  &__topbar { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; }

  &__search {
    flex: 1; max-width: 300px; display: flex; align-items: center; gap: 8px;
    background: #241521; border: 1px solid rgba(219, 39, 119, 0.2); border-radius: 9px;
    padding: 8px 12px; color: #a98ba0; font-size: 13px;
  }

  &__search-icon { width: 13px; height: 13px; border: 1.6px solid #a98ba0; border-radius: 50%; flex-shrink: 0; }

  &__topbar-spacer { flex: 1; }

  &__avatar {
    width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #db2777, #a855f7); flex-shrink: 0;
  }

  &__section-title { margin: 0 0 18px; font-size: 20px; font-weight: 700; color: #fbeaf3; }

  &__stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 16px; }

  &__stat-card {
    background: #241521; border: 1px solid rgba(219, 39, 119, 0.15); border-radius: 14px; padding: 16px;
  }

  &__stat-label { color: #b79aad; font-size: 12.5px; margin-bottom: 8px; }
  &__stat-value { font-size: 22px; font-weight: 700; color: #fbeaf3; }

  &__stat-delta {
    font-size: 12px; margin-top: 4px;
    &--up { color: #34d399; }
    &--down { color: #f87171; }
  }

  &__panels { display: grid; grid-template-columns: 1.4fr 1fr; gap: 16px; }

  &__panel {
    background: #241521; border: 1px solid rgba(219, 39, 119, 0.15); border-radius: 14px; padding: 20px;
  }

  &__panel-label { color: #b79aad; font-size: 13px; margin-bottom: 16px; }

  &__chart { display: flex; align-items: flex-end; gap: 16px; height: 120px; }

  &__chart-col {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    span { font-size: 11px; color: #b79aad; }
  }

  &__chart-bar {
    width: 26px; background: #6b2149; border-radius: 6px;
    &--accent { background: #db2777; }
  }

  &__service-mini {
    display: flex; align-items: center; gap: 10px; padding: 9px 0;
    border-bottom: 1px solid rgba(219, 39, 119, 0.08);
    &:last-child { border-bottom: none; }
  }

  &__service-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
  &__service-mini-name { flex: 1; font-size: 13px; color: #e3d5df; }
  &__service-mini-price { font-size: 12.5px; color: #b79aad; }

  &__sub-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }

  &__sub-card {
    background: #241521; border: 1px solid rgba(219, 39, 119, 0.15); border-radius: 14px; padding: 18px;
  }

  &__sub-icon { width: 30px; height: 30px; border-radius: 8px; margin-bottom: 12px; }
  &__sub-category {
    font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.06em; color: #d199bb; font-weight: 700; margin-bottom: 4px;
  }
  &__sub-name { font-size: 14.5px; font-weight: 700; color: #fbeaf3; margin-bottom: 4px; }
  &__sub-price { font-size: 19px; font-weight: 700; color: #fbeaf3; margin-bottom: 4px;
    span { font-size: 12px; font-weight: 400; color: #b79aad; }
  }
  &__sub-renew { font-size: 12px; color: #b79aad; margin-bottom: 10px; }

  &__sub-usage {
    display: inline-block; font-size: 11.5px; font-weight: 600; padding: 3px 10px; border-radius: 999px;
    &--high { background: rgba(248, 113, 113, 0.12); color: #f87171; }
    &--medium { background: rgba(251, 191, 36, 0.12); color: #fbbf24; }
    &--low { background: rgba(96, 165, 250, 0.12); color: #60a5fa; }
  }

  &__table-panel {
    background: #241521; border: 1px solid rgba(219, 39, 119, 0.15); border-radius: 14px; padding: 20px;
  }

  &__table-head {
    display: grid; grid-template-columns: 1.6fr 1fr 0.8fr 0.8fr 0.8fr; gap: 8px; font-size: 12px; color: #b79aad;
    padding-bottom: 10px; border-bottom: 1px solid rgba(219, 39, 119, 0.12);
  }

  &__table-row {
    display: grid; grid-template-columns: 1.6fr 1fr 0.8fr 0.8fr 0.8fr; gap: 8px; font-size: 13px; color: #e3d5df;
    padding: 13px 0; border-bottom: 1px solid rgba(219, 39, 119, 0.06); align-items: center;
  }

  &__table-dim { color: #b79aad; }

  &__donut-wrap { display: flex; justify-content: center; margin-bottom: 16px; }

  &__donut {
    width: 130px; height: 130px; border-radius: 50%;
    background: conic-gradient(#e50914 0deg 79deg, #7c3aed 79deg 140deg, #f8991c 140deg 194deg, #a855f7 194deg 360deg);
  }

  &__legend { display: flex; flex-direction: column; gap: 8px; font-size: 12.5px; color: #e3d5df; }
  &__legend-item { display: flex; align-items: center; gap: 6px; }
  &__legend-dot { width: 7px; height: 7px; border-radius: 50%; }
  &__legend-pct { margin-left: auto; color: #b79aad; }

  &__alerts { display: flex; flex-direction: column; gap: 12px; }

  &__alert {
    background: #241521; border: 1px solid rgba(219, 39, 119, 0.15); border-radius: 12px; padding: 16px;
    display: flex; align-items: center; gap: 14px;
  }

  &__alert-body { flex: 1; }
  &__alert-title { font-size: 13.5px; color: #fbeaf3; font-weight: 600; margin-bottom: 3px; }
  &__alert-detail { font-size: 12.5px; color: #b79aad; }
  &__alert-time { font-size: 11.5px; color: #d199bb; font-weight: 600; white-space: nowrap; }
}
</style>
