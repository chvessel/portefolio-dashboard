<script setup>
import { ref, computed } from 'vue';
import BrowserWindow from '@/components/browser/BrowserWindow.vue';

const activeScreen = ref('assistant');
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
    background: active ? '#7c5cff' : 'transparent',
    color: active ? '#ffffff' : '#a29fac',
    fontWeight: active ? 600 : 500,
  };
};

const conversionStatusStyle = (status) => {
  const map = {
    Confirmed: { color: '#34d399' },
    Pending: { color: '#fbbf24' },
    Flagged: { color: '#f87171' },
  };
  return { fontSize: '12.5px', fontWeight: 600, ...(map[status] || {}) };
};

const alertDotStyle = (severity) => {
  const map = { high: '#f87171', medium: '#fbbf24', low: '#60a5fa' };
  return {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: map[severity] || '#60a5fa',
    flexShrink: 0,
  };
};

const campaigns = [
  { name: 'Summer Sale — Instagram', clicks: '12,402', conversions: '842', ctr: '6.8%' },
  { name: 'Retargeting — Google', clicks: '9,110', conversions: '615', ctr: '6.7%' },
  { name: 'New Collection — Facebook', clicks: '7,340', conversions: '389', ctr: '5.3%' },
  { name: 'Newsletter Signup', clicks: '5,020', conversions: '301', ctr: '6.0%' },
  { name: 'Brand Awareness — Google', clicks: '3,880', conversions: '142', ctr: '3.7%' },
];

const conversionsRaw = [
  { date: 'Jul 21', channel: 'Instagram', campaign: 'Summer Sale', value: '$120', status: 'Confirmed' },
  { date: 'Jul 21', channel: 'Google', campaign: 'Retargeting', value: '$85', status: 'Confirmed' },
  { date: 'Jul 22', channel: 'Facebook', campaign: 'New Collection', value: '$64', status: 'Pending' },
  { date: 'Jul 22', channel: 'Google', campaign: 'Brand Awareness', value: '$40', status: 'Flagged' },
  { date: 'Jul 23', channel: 'Instagram', campaign: 'Summer Sale', value: '$96', status: 'Confirmed' },
  { date: 'Jul 23', channel: 'Facebook', campaign: 'Newsletter Signup', value: '$52', status: 'Pending' },
  { date: 'Jul 24', channel: 'Google', campaign: 'Retargeting', value: '$110', status: 'Confirmed' },
];

const alertsRaw = [
  { severity: 'high', title: 'Invalid traffic spike detected', detail: 'Google Ads campaign "Retargeting" — 18% invalid clicks in the last hour', time: '12m ago' },
  { severity: 'high', title: 'VPN proxy traffic flagged', detail: '32 sessions from known proxy IP ranges on Instagram Ads', time: '48m ago' },
  { severity: 'medium', title: 'Conversion drop-off', detail: 'Checkout conversion rate down 6% week over week', time: '3h ago' },
  { severity: 'low', title: 'New channel connected', detail: 'Google Ads account successfully linked', time: '1d ago' },
];

const conversions = computed(() =>
  conversionsRaw.map((c) => ({ ...c, statusStyle: conversionStatusStyle(c.status) })),
);
const alerts = computed(() =>
  alertsRaw.map((a) => ({ ...a, dotStyle: alertDotStyle(a.severity) })),
);
</script>

<template>
  <main class="datanest-page">
    <header class="datanest-page__hero">
      <div class="datanest-page__eyebrow">
        <span class="datanest-page__eyebrow-dot"></span>
        <span>Featured Project</span>
      </div>
      <h1 class="datanest-page__title">DataNest — AI Marketing Assistant</h1>
      <p class="datanest-page__description">
        An AI-powered analytics workspace for marketing teams — ask questions in plain language,
        track conversions across channels, and catch invalid traffic and VPN proxies before they
        skew the numbers.
      </p>
      <div class="datanest-page__tags">
        <span class="datanest-page__tag">Product &amp; UI Design</span>
        <span class="datanest-page__tag">React</span>
        <span class="datanest-page__tag">Next.js</span>
        <span class="datanest-page__tag">Node.js</span>
        <span class="datanest-page__tag">REST API</span>
      </div>
    </header>

    <div class="datanest-page__window-wrap">
      <BrowserWindow :width="1180" :height="800" url="app.datanest.ai/assistant" tab-title="DataNest">
        <div class="dn">
          <aside class="dn__sidebar">
            <div class="dn__brand">
              <div class="dn__brand-mark"></div>
              <div class="dn__brand-name">DataNest</div>
            </div>

            <nav class="dn__nav">
              <div class="dn__nav-item" :style="navStyle('dashboard')" @click="goto('dashboard')">
                <div class="dn__icon-grid">
                  <span></span><span></span><span></span><span></span>
                </div>
                <span>Dashboard</span>
              </div>
              <div class="dn__nav-item" :style="navStyle('analytics')" @click="goto('analytics')">
                <div class="dn__icon-bars">
                  <span class="dn__icon-bar dn__icon-bar--sm"></span>
                  <span class="dn__icon-bar dn__icon-bar--lg"></span>
                  <span class="dn__icon-bar dn__icon-bar--md"></span>
                </div>
                <span>Analytics</span>
              </div>
              <div class="dn__nav-item" :style="navStyle('performance')" @click="goto('performance')">
                <div class="dn__icon-triangle"></div>
                <span>Performance</span>
              </div>
              <div class="dn__nav-item" :style="navStyle('conversion')" @click="goto('conversion')">
                <div class="dn__icon-lines">
                  <span style="opacity: 0.5"></span>
                  <span style="opacity: 0.75"></span>
                  <span></span>
                </div>
                <span>Conversion List</span>
              </div>
              <div class="dn__nav-item" :style="navStyle('alerts')" @click="goto('alerts')">
                <div class="dn__icon-bell"></div>
                <span>Alerts</span>
              </div>
              <div class="dn__nav-item" :style="navStyle('assistant')" @click="goto('assistant')">
                <div class="dn__icon-diamond"></div>
                <span>AI Assistant</span>
              </div>
              <div class="dn__nav-item" :style="navStyle('settings')" @click="goto('settings')">
                <div class="dn__icon-circle"></div>
                <span>Settings</span>
              </div>

              <div class="dn__channels-label">Channels</div>
              <div class="dn__channel">
                <div class="dn__icon-square"></div>
                <span>Instagram</span>
              </div>
              <div class="dn__channel">
                <div class="dn__icon-circle-outline"></div>
                <span>Facebook</span>
              </div>
              <div class="dn__channel">
                <div class="dn__icon-circle-outline"></div>
                <span>Google</span>
              </div>
            </nav>

            <div class="dn__upgrade">
              <div class="dn__upgrade-text">Get detailed analytics for helping you, get pro</div>
              <div class="dn__upgrade-btn">Upgrade Plan</div>
            </div>
          </aside>

          <main class="dn__main">
            <div class="dn__topbar">
              <div class="dn__search">
                <div class="dn__search-icon"></div>
                <span>Search</span>
              </div>
              <div class="dn__topbar-spacer"></div>
              <div class="dn__topbar-actions">
                <div class="dn__topbar-btn"></div>
                <div class="dn__topbar-btn"></div>
                <div class="dn__topbar-btn"></div>
                <div class="dn__avatar"></div>
                <div>
                  <div class="dn__user-name">John Abraham</div>
                  <div class="dn__user-email">uirahamat098@gmail.com</div>
                </div>
              </div>
            </div>

            <template v-if="activeScreen === 'assistant'">
              <div class="dn__section-header">
                <h2 class="dn__section-title">AI Assistant</h2>
                <div class="dn__section-actions">
                  <div class="dn__btn dn__btn--ghost">New Chat</div>
                  <div class="dn__btn dn__btn--solid">Share</div>
                </div>
              </div>

              <div class="dn__assistant-hero">
                <div class="dn__assistant-avatar"></div>
                <div class="dn__assistant-heading">What can I help with?</div>
              </div>

              <div class="dn__prompt-box">
                <div class="dn__prompt-hint">
                  <div class="dn__icon-diamond dn__icon-diamond--sm"></div>
                  <span>Ask anything AI assistant</span>
                </div>
                <div class="dn__prompt-actions">
                  <div class="dn__prompt-tools">
                    <div class="dn__prompt-tool">+</div>
                    <div class="dn__prompt-tool"></div>
                    <div class="dn__prompt-tool"></div>
                  </div>
                  <div class="dn__prompt-send">
                    <div class="dn__prompt-send-circle"></div>
                    <div class="dn__prompt-send-circle dn__prompt-send-circle--accent"></div>
                  </div>
                </div>
              </div>

              <div class="dn__suggestions">
                <div class="dn__suggestion">
                  <div class="dn__suggestion-title">Conversions</div>
                  <div class="dn__suggestion-text">How do I integrate conversions?</div>
                </div>
                <div class="dn__suggestion">
                  <div class="dn__suggestion-title">Invalid Traffic</div>
                  <div class="dn__suggestion-text">Can you show me the evolution...</div>
                </div>
                <div class="dn__suggestion">
                  <div class="dn__suggestion-title">VPN Proxy</div>
                  <div class="dn__suggestion-text">What does VPN proxy stand for?</div>
                </div>
              </div>
            </template>

            <template v-else-if="activeScreen === 'dashboard'">
              <h2 class="dn__section-title dn__section-title--block">Overview</h2>
              <div class="dn__stat-grid">
                <div class="dn__stat-card">
                  <div class="dn__stat-label">Visitors</div>
                  <div class="dn__stat-value">48,204</div>
                  <div class="dn__stat-delta dn__stat-delta--up">+9.4%</div>
                </div>
                <div class="dn__stat-card">
                  <div class="dn__stat-label">Conversions</div>
                  <div class="dn__stat-value">2,318</div>
                  <div class="dn__stat-delta dn__stat-delta--up">+4.1%</div>
                </div>
                <div class="dn__stat-card">
                  <div class="dn__stat-label">Bounce Rate</div>
                  <div class="dn__stat-value">38.2%</div>
                  <div class="dn__stat-delta dn__stat-delta--down">+1.2%</div>
                </div>
                <div class="dn__stat-card">
                  <div class="dn__stat-label">Invalid Traffic</div>
                  <div class="dn__stat-value">6.8%</div>
                  <div class="dn__stat-delta dn__stat-delta--down">Flagged</div>
                </div>
              </div>

              <div class="dn__panels">
                <div class="dn__panel">
                  <div class="dn__panel-label">Traffic Trend — 7 Days</div>
                  <div class="dn__chart">
                    <div class="dn__chart-col"><div class="dn__chart-bar" style="height: 52px"></div><span>Mon</span></div>
                    <div class="dn__chart-col"><div class="dn__chart-bar" style="height: 78px"></div><span>Tue</span></div>
                    <div class="dn__chart-col"><div class="dn__chart-bar" style="height: 64px"></div><span>Wed</span></div>
                    <div class="dn__chart-col"><div class="dn__chart-bar dn__chart-bar--accent" style="height: 100px"></div><span>Thu</span></div>
                    <div class="dn__chart-col"><div class="dn__chart-bar" style="height: 88px"></div><span>Fri</span></div>
                    <div class="dn__chart-col"><div class="dn__chart-bar dn__chart-bar--accent" style="height: 112px"></div><span>Sat</span></div>
                    <div class="dn__chart-col"><div class="dn__chart-bar" style="height: 70px"></div><span>Sun</span></div>
                  </div>
                </div>
                <div class="dn__panel">
                  <div class="dn__panel-label">Traffic Sources</div>
                  <div class="dn__donut-wrap">
                    <div class="dn__donut"></div>
                  </div>
                  <div class="dn__legend">
                    <div class="dn__legend-item"><span class="dn__legend-dot dn__legend-dot--primary"></span>Instagram<span class="dn__legend-pct">45%</span></div>
                    <div class="dn__legend-item"><span class="dn__legend-dot dn__legend-dot--secondary"></span>Google<span class="dn__legend-pct">25%</span></div>
                    <div class="dn__legend-item"><span class="dn__legend-dot dn__legend-dot--tertiary"></span>Facebook<span class="dn__legend-pct">30%</span></div>
                  </div>
                </div>
              </div>
            </template>

            <template v-else-if="activeScreen === 'analytics'">
              <h2 class="dn__section-title dn__section-title--block">Analytics</h2>
              <div class="dn__table-panel">
                <div class="dn__panel-label">Top Campaigns by Conversion</div>
                <div class="dn__table-head dn__table-head--campaigns">
                  <div>Campaign</div><div>Clicks</div><div>Conversions</div><div>CTR</div>
                </div>
                <div v-for="(c, i) in campaigns" :key="i" class="dn__table-row dn__table-row--campaigns">
                  <div>{{ c.name }}</div><div>{{ c.clicks }}</div><div>{{ c.conversions }}</div>
                  <div class="dn__table-ctr">{{ c.ctr }}</div>
                </div>
              </div>
            </template>

            <template v-else-if="activeScreen === 'conversion'">
              <h2 class="dn__section-title dn__section-title--block">Conversion List</h2>
              <div class="dn__table-panel">
                <div class="dn__table-head dn__table-head--conversions">
                  <div>Date</div><div>Channel</div><div>Campaign</div><div>Value</div><div>Status</div>
                </div>
                <div v-for="(c, i) in conversions" :key="i" class="dn__table-row dn__table-row--conversions">
                  <div class="dn__table-dim">{{ c.date }}</div><div>{{ c.channel }}</div><div>{{ c.campaign }}</div><div>{{ c.value }}</div>
                  <div><span :style="c.statusStyle">{{ c.status }}</span></div>
                </div>
              </div>
            </template>

            <template v-else-if="activeScreen === 'alerts'">
              <h2 class="dn__section-title dn__section-title--block">Alerts</h2>
              <div class="dn__alerts">
                <div v-for="(a, i) in alerts" :key="i" class="dn__alert">
                  <div :style="a.dotStyle"></div>
                  <div class="dn__alert-body">
                    <div class="dn__alert-title">{{ a.title }}</div>
                    <div class="dn__alert-detail">{{ a.detail }}</div>
                  </div>
                  <div class="dn__alert-time">{{ a.time }}</div>
                </div>
              </div>
            </template>

            <template v-else-if="activeScreen === 'performance'">
              <h2 class="dn__section-title dn__section-title--block">Performance</h2>
              <div class="dn__perf-grid">
                <div class="dn__stat-card">
                  <div class="dn__stat-label">Avg. Response Time</div>
                  <div class="dn__stat-value">312ms</div>
                </div>
                <div class="dn__stat-card">
                  <div class="dn__stat-label">Uptime</div>
                  <div class="dn__stat-value dn__stat-value--accent">99.98%</div>
                </div>
                <div class="dn__stat-card">
                  <div class="dn__stat-label">Queries Today</div>
                  <div class="dn__stat-value">14,209</div>
                </div>
              </div>
            </template>

            <template v-else-if="activeScreen === 'settings'">
              <h2 class="dn__section-title dn__section-title--block">Settings</h2>
              <div class="dn__settings-list">
                <div class="dn__settings-row"><span>Profile &amp; account</span><span>›</span></div>
                <div class="dn__settings-row"><span>Notifications</span><span>›</span></div>
                <div class="dn__settings-row"><span>API keys</span><span>›</span></div>
                <div class="dn__settings-row"><span>Connected channels</span><span>›</span></div>
              </div>
            </template>
          </main>
        </div>
      </BrowserWindow>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.datanest-page {
  min-height: 100vh;
  padding: 72px 5vw 96px;
  box-sizing: border-box;
  background:
    radial-gradient(1200px 600px at 80% -10%, rgba(124, 92, 255, 0.16), transparent),
    #0a0912;
  font-family: 'Inter', system-ui, sans-serif;

  &__hero {
    max-width: 1180px;
    margin: 0 auto 44px;
  }

  &__eyebrow {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 18px;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #9b98a3;
    font-weight: 600;
  }

  &__eyebrow-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #7c5cff;
  }

  &__title {
    margin: 0 0 14px;
    font-size: 42px;
    line-height: 1.1;
    color: #f5f3f7;
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  &__description {
    margin: 0 0 24px;
    max-width: 640px;
    font-size: 16px;
    line-height: 1.6;
    color: #b3b0bb;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__tag {
    padding: 6px 14px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.04);
    color: #d6d4dd;
    font-size: 13px;
  }

  &__window-wrap {
    display: flex;
    justify-content: center;
    overflow-x: auto;
  }
}

.dn {
  height: 100%;
  display: flex;
  background: #141221;
  font-family: 'Inter', system-ui, sans-serif;
  overflow: hidden;
  color: #d6d4dd;

  &__sidebar {
    width: 220px;
    flex-shrink: 0;
    background: #0f0e17;
    border-right: 1px solid rgba(124, 92, 255, 0.15);
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
    border-bottom: 1px solid rgba(124, 92, 255, 0.15);
    margin-bottom: 16px;
  }

  &__brand-mark {
    width: 26px;
    height: 26px;
    background: linear-gradient(135deg, #7c5cff, #c4b5fd);
    transform: rotate(45deg);
    border-radius: 6px;
    flex-shrink: 0;
  }

  &__brand-name {
    font-size: 15px;
    font-weight: 700;
    color: #f5f3f7;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
  }

  &__nav-item {
    user-select: none;
  }

  &__icon-grid {
    width: 14px;
    height: 14px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;

    span {
      background: currentColor;
      border-radius: 2px;
      opacity: 0.9;
    }
  }

  &__icon-bars {
    width: 14px;
    height: 14px;
    display: flex;
    align-items: flex-end;
    gap: 2px;
  }

  &__icon-bar {
    width: 3px;
    background: currentColor;
    border-radius: 1px;

    &--sm { height: 6px; }
    &--md { height: 10px; }
    &--lg { height: 14px; }
  }

  &__icon-triangle {
    width: 0;
    height: 0;
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
    border-bottom: 12px solid currentColor;
    opacity: 0.9;
  }

  &__icon-lines {
    width: 14px;
    height: 14px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    justify-content: center;

    span {
      height: 3px;
      background: currentColor;
      border-radius: 1px;
    }
  }

  &__icon-bell {
    width: 13px;
    height: 14px;
    border: 1.6px solid currentColor;
    border-radius: 7px 7px 3px 3px;
    box-sizing: border-box;
  }

  &__icon-diamond {
    width: 13px;
    height: 13px;
    background: currentColor;
    transform: rotate(45deg);
    border-radius: 3px;

    &--sm {
      width: 13px;
      height: 13px;
      background: #a78bfa;
    }
  }

  &__icon-circle {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.6px solid currentColor;
    box-sizing: border-box;
  }

  &__icon-square {
    width: 14px;
    height: 14px;
    border-radius: 4px;
    border: 1.6px solid currentColor;
    box-sizing: border-box;
  }

  &__icon-circle-outline {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.6px solid currentColor;
    box-sizing: border-box;
  }

  &__channels-label {
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #5f5c6b;
    margin: 18px 12px 6px;
  }

  &__channel {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    color: #a29fac;
    font-size: 14px;
  }

  &__upgrade {
    background: rgba(124, 92, 255, 0.12);
    border: 1px solid rgba(124, 92, 255, 0.3);
    border-radius: 12px;
    padding: 14px;
    margin-top: 12px;
  }

  &__upgrade-text {
    font-size: 12.5px;
    color: #e4e1ec;
    line-height: 1.4;
    margin-bottom: 10px;
  }

  &__upgrade-btn {
    background: #7c5cff;
    color: #fff;
    text-align: center;
    padding: 8px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 600;
  }

  &__main {
    flex: 1;
    min-width: 0;
    overflow: auto;
    padding: 22px 28px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  &__topbar {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
  }

  &__search {
    flex: 1;
    max-width: 300px;
    display: flex;
    align-items: center;
    gap: 8px;
    background: #1a1826;
    border: 1px solid rgba(124, 92, 255, 0.2);
    border-radius: 9px;
    padding: 8px 12px;
    color: #7a7885;
    font-size: 13px;
  }

  &__search-icon {
    width: 13px;
    height: 13px;
    border: 1.6px solid #8b899f;
    border-radius: 50%;
    flex-shrink: 0;
  }

  &__topbar-spacer {
    flex: 1;
  }

  &__topbar-actions {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  &__topbar-btn {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    background: #1a1826;
    border: 1px solid rgba(124, 92, 255, 0.2);
  }

  &__avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7c5cff, #f472b6);
  }

  &__user-name {
    font-size: 13px;
    color: #f5f3f7;
    font-weight: 600;
    line-height: 1.2;
  }

  &__user-email {
    font-size: 11px;
    color: #7a7885;
  }

  &__section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
  }

  &__section-title {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #f5f3f7;

    &--block {
      margin: 0 0 18px;
    }
  }

  &__section-actions {
    display: flex;
    gap: 10px;
  }

  &__btn {
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 13px;

    &--ghost {
      border: 1px solid rgba(124, 92, 255, 0.3);
      color: #d6d4dd;
    }

    &--solid {
      background: #7c5cff;
      color: #fff;
      font-weight: 600;
    }
  }

  &__assistant-hero {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  &__assistant-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7c5cff, #c4b5fd);
  }

  &__assistant-heading {
    font-size: 22px;
    font-weight: 700;
    color: #f5f3f7;
  }

  &__prompt-box {
    border: 1px solid rgba(124, 92, 255, 0.4);
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 0 0 3px rgba(124, 92, 255, 0.08);
  }

  &__prompt-hint {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    color: #8b899f;
    font-size: 13.5px;
  }

  &__prompt-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__prompt-tools {
    display: flex;
    gap: 10px;
    color: #8b899f;
  }

  &__prompt-tool {
    width: 22px;
    height: 22px;
    border: 1.4px solid currentColor;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  &__prompt-send {
    display: flex;
    gap: 8px;
  }

  &__prompt-send-circle {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #1e1c2e;
    border: 1px solid rgba(124, 92, 255, 0.25);

    &--accent {
      background: linear-gradient(135deg, #7c5cff, #a78bfa);
      border: none;
    }
  }

  &__suggestions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-top: 16px;
  }

  &__suggestion {
    background: #1a1826;
    border: 1px solid rgba(124, 92, 255, 0.15);
    border-radius: 10px;
    padding: 12px 14px;
  }

  &__suggestion-title {
    font-size: 13px;
    color: #f5f3f7;
    font-weight: 600;
    margin-bottom: 4px;
  }

  &__suggestion-text {
    font-size: 12px;
    color: #8b899f;
  }

  &__stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 16px;
  }

  &__stat-card {
    background: #1a1826;
    border: 1px solid rgba(124, 92, 255, 0.15);
    border-radius: 14px;
    padding: 16px;
  }

  &__stat-label {
    color: #9b98a3;
    font-size: 12.5px;
    margin-bottom: 8px;
  }

  &__stat-value {
    font-size: 22px;
    font-weight: 700;
    color: #f5f3f7;

    &--accent {
      color: #34d399;
    }
  }

  &__stat-delta {
    font-size: 12px;
    margin-top: 4px;

    &--up { color: #34d399; }
    &--down { color: #f87171; }
  }

  &__panels {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 16px;
  }

  &__panel {
    background: #1a1826;
    border: 1px solid rgba(124, 92, 255, 0.15);
    border-radius: 14px;
    padding: 20px;
  }

  &__panel-label {
    color: #9b98a3;
    font-size: 13px;
    margin-bottom: 16px;
  }

  &__chart {
    display: flex;
    align-items: flex-end;
    gap: 16px;
    height: 120px;
  }

  &__chart-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    span {
      font-size: 11px;
      color: #8b899f;
    }
  }

  &__chart-bar {
    width: 26px;
    background: #4c3f8a;
    border-radius: 6px;

    &--accent {
      background: #7c5cff;
    }
  }

  &__donut-wrap {
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
  }

  &__donut {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    background: conic-gradient(#7c5cff 0deg 162deg, #a78bfa 162deg 252deg, #4c3f8a 252deg 360deg);
  }

  &__legend {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 12.5px;
    color: #d6d4dd;
  }

  &__legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  &__legend-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;

    &--primary { background: #7c5cff; }
    &--secondary { background: #a78bfa; }
    &--tertiary { background: #4c3f8a; }
  }

  &__legend-pct {
    margin-left: auto;
    color: #8b899f;
  }

  &__table-panel {
    background: #1a1826;
    border: 1px solid rgba(124, 92, 255, 0.15);
    border-radius: 14px;
    padding: 20px;
  }

  &__table-head {
    display: grid;
    gap: 8px;
    font-size: 12px;
    color: #8b899f;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(124, 92, 255, 0.12);

    &--campaigns { grid-template-columns: 1.4fr 0.8fr 0.8fr 0.8fr; }
    &--conversions { grid-template-columns: 0.8fr 1fr 1.2fr 0.8fr 0.8fr; }
  }

  &__table-row {
    display: grid;
    gap: 8px;
    font-size: 13px;
    color: #d6d4dd;
    padding: 12px 0;
    border-bottom: 1px solid rgba(124, 92, 255, 0.06);

    &--campaigns { grid-template-columns: 1.4fr 0.8fr 0.8fr 0.8fr; }
    &--conversions {
      grid-template-columns: 0.8fr 1fr 1.2fr 0.8fr 0.8fr;
      padding: 13px 0;
      align-items: center;
    }
  }

  &__table-ctr {
    color: #34d399;
  }

  &__table-dim {
    color: #8b899f;
  }

  &__alerts {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__alert {
    background: #1a1826;
    border: 1px solid rgba(124, 92, 255, 0.15);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  &__alert-body {
    flex: 1;
  }

  &__alert-title {
    font-size: 13.5px;
    color: #f5f3f7;
    font-weight: 600;
    margin-bottom: 3px;
  }

  &__alert-detail {
    font-size: 12.5px;
    color: #8b899f;
  }

  &__alert-time {
    font-size: 11.5px;
    color: #7a7885;
  }

  &__perf-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
  }

  &__settings-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 520px;
  }

  &__settings-row {
    background: #1a1826;
    border: 1px solid rgba(124, 92, 255, 0.15);
    border-radius: 12px;
    padding: 16px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13.5px;
    color: #f5f3f7;

    span:last-child {
      color: #8b899f;
    }
  }
}
</style>
