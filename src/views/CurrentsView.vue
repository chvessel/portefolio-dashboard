<script setup>
import { ref } from 'vue';
import BrowserWindow from '@/components/browser/BrowserWindow.vue';
import ProjectPageHero from '@/components/project/ProjectPageHero.vue';

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
  { name: 'Nimbus+', price: '$15.99', renews: 'Jun 4', usage: 'High', color: '#ec4899' },
  { name: 'PlayReel', price: '$9.99', renews: 'Jun 12', usage: 'Medium', color: '#f472b6' },
  { name: 'AudioWave', price: '$11.99', renews: 'Jun 18', usage: 'High', color: '#c026d3' },
  { name: 'DocuFlix', price: '$6.99', renews: 'Jun 22', usage: 'Low', color: '#a855f7' },
  { name: 'LiveArena', price: '$13.99', renews: 'Jun 27', usage: 'Low', color: '#e879f9' },
];

const watchHistory = [
  { title: 'The Long Horizon', service: 'Nimbus+', date: 'Jun 2', duration: '2h 08m', type: 'Movie' },
  { title: 'Kitchen Lore, S3', service: 'DocuFlix', date: 'Jun 1', duration: '48m', type: 'Series' },
  { title: 'Late Night Sessions', service: 'AudioWave', date: 'May 30', duration: '1h 12m', type: 'Podcast' },
  { title: 'Coastline, S1', service: 'PlayReel', date: 'May 29', duration: '3h 40m', type: 'Series' },
  { title: 'Grand Prix Live', service: 'LiveArena', date: 'May 28', duration: '2h 15m', type: 'Live' },
];

const recommendations = [
  { severity: 'high', title: 'Cancel LiveArena', detail: 'Used only 2h 15m this month — that’s $6.99/hour watched', time: 'Save $13.99/mo' },
  { severity: 'medium', title: 'Downgrade DocuFlix', detail: 'Standard plan covers your usual 1 device, 1080p habits', time: 'Save $3/mo' },
  { severity: 'low', title: 'Bundle Nimbus+ & AudioWave', detail: 'A combined plan is available for both services', time: 'Save $4.50/mo' },
];

const alertDotStyle = (severity) => {
  const map = { high: '#f87171', medium: '#fbbf24', low: '#60a5fa' };
  return { width: '8px', height: '8px', borderRadius: '50%', background: map[severity] || '#60a5fa', flexShrink: 0 };
};
</script>

<template>
  <ProjectPageHero
    eyebrow="Featured Project"
    title="Currents — Streaming Services Overview"
    description="A dashboard that gathers your subscriptions, watch history, and spending across streaming services in one overview, so you can see at a glance what you're actually using."
    :tags="['Vue3.js', 'Node.js', 'SCSS', 'REST API']"
    accent="#db2777"
    bg="#120a10"
  >
    <BrowserWindow :width="1180" :height="800" url="app.currents.fm/overview" tab-title="Currents">
      <div class="ss">
        <aside class="ss__sidebar">
          <div class="ss__brand">
            <div class="ss__brand-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M10 8.5l6 3.5-6 3.5z" />
              </svg>
            </div>
            <div class="ss__brand-name">Currents</div>
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
              <span>Watch History</span>
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
                <div class="ss__stat-value">$58.95</div>
                <div class="ss__stat-delta ss__stat-delta--down">+$4 vs last month</div>
              </div>
              <div class="ss__stat-card">
                <div class="ss__stat-label">Active subscriptions</div>
                <div class="ss__stat-value">5</div>
              </div>
              <div class="ss__stat-card">
                <div class="ss__stat-label">Hours watched</div>
                <div class="ss__stat-value">27.4h</div>
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
                <div class="ss__sub-name">{{ s.name }}</div>
                <div class="ss__sub-price">{{ s.price }}<span>/mo</span></div>
                <div class="ss__sub-renew">Renews {{ s.renews }}</div>
                <div class="ss__sub-usage" :class="`ss__sub-usage--${s.usage.toLowerCase()}`">{{ s.usage }} usage</div>
              </div>
            </div>
          </template>

          <template v-else-if="activeScreen === 'history'">
            <h2 class="ss__section-title">Watch History</h2>
            <div class="ss__table-panel">
              <div class="ss__table-head">
                <div>Title</div><div>Service</div><div>Date</div><div>Duration</div><div>Type</div>
              </div>
              <div v-for="(w, i) in watchHistory" :key="i" class="ss__table-row">
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
                  <div class="ss__legend-item"><span class="ss__legend-dot" style="background:#ec4899"></span>Nimbus+<span class="ss__legend-pct">27%</span></div>
                  <div class="ss__legend-item"><span class="ss__legend-dot" style="background:#c026d3"></span>AudioWave<span class="ss__legend-pct">20%</span></div>
                  <div class="ss__legend-item"><span class="ss__legend-dot" style="background:#e879f9"></span>LiveArena<span class="ss__legend-pct">24%</span></div>
                  <div class="ss__legend-item"><span class="ss__legend-dot" style="background:#a855f7"></span>Others<span class="ss__legend-pct">29%</span></div>
                </div>
              </div>
              <div class="ss__panel">
                <div class="ss__panel-label">Yearly Projection</div>
                <div class="ss__stat-value" style="margin-bottom: 6px">$707.40</div>
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
    </BrowserWindow>
  </ProjectPageHero>
</template>

<style lang="scss" scoped>
.ss {
  height: 100%;
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
    background: conic-gradient(#ec4899 0deg 97deg, #c026d3 97deg 169deg, #e879f9 169deg 255deg, #a855f7 255deg 360deg);
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
