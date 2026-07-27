<script setup>
import { ref } from 'vue';
import BrowserWindow from '@/components/browser/BrowserWindow.vue';
import ProjectPageHero from '@/components/project/ProjectPageHero.vue';

const activeScreen = ref('dashboard');
const goto = (screen) => { activeScreen.value = screen; };

const ring = (percent) => ({
  background: `conic-gradient(#bef264 ${percent}%, rgba(255,255,255,0.08) 0)`,
});

const bills = [
  { label: 'Ready to assign', value: '200', sub: '42 bills this week', percent: 42, glow: false },
  { label: 'Pending sign offs', value: '63', sub: '17 signed off this week', percent: 68, glow: true },
  { label: 'Declined', value: '5', sub: 'Declined this week: 2', percent: 12, glow: false },
  { label: 'RFI', value: '13', sub: 'Requested this week: 2', percent: 76, glow: false },
];

const billRows = [
  { name: 'Concrete supplier — batch 4', status: 'Ready to assign', amount: '$12,400.00' },
  { name: 'Electrical subcontractor', status: 'Pending sign off', amount: '$8,215.50' },
  { name: 'Scaffolding rental', status: 'Declined', amount: '$1,980.00' },
  { name: 'Site survey — north lot', status: 'RFI', amount: '$4,600.00' },
  { name: 'Steel framing delivery', status: 'Ready to assign', amount: '$21,750.00' },
];

const invoiceRows = [
  { name: 'Riverside Tower — draw 6', status: 'Paid', amount: '$142,300.00' },
  { name: 'Harbor Offices — draw 2', status: 'Overdue', amount: '$58,900.00' },
  { name: 'Maple Residences — final', status: 'Paid', amount: '$97,450.00' },
  { name: 'Northgate Retail — draw 4', status: 'Pending', amount: '$34,120.00' },
];

const statusStyle = (status) => {
  const map = {
    Paid: { color: '#bef264' },
    'Ready to assign': { color: '#bef264' },
    Overdue: { color: '#f87171' },
    Declined: { color: '#f87171' },
    Pending: { color: '#fbbf24' },
    'Pending sign off': { color: '#fbbf24' },
    RFI: { color: '#60a5fa' },
  };
  return { fontSize: '12.5px', fontWeight: 600, ...(map[status] || {}) };
};
</script>

<template>
  <ProjectPageHero
    eyebrow="Featured Project"
    title="Ledger — Financial Dashboard"
    description="A financial dashboard for contractors that tracks bills, invoices, and cash flow across active jobs — built to surface what needs sign-off or follow-up at a glance."
    :tags="['React', 'Node.js', 'REST API', 'SCSS']"
    accent="#84cc16"
    bg="#0c0f0a"
  >
    <BrowserWindow :width="1180" :height="800" url="app.ledger.build/dashboard" tab-title="Ledger">
      <div class="ldg">
        <aside class="ldg__rail">
          <div class="ldg__rail-mark">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 3h12v18l-2.5-1.5L13 21l-2.5-1.5L8 21l-2-1.5V3z" />
              <path d="M9 8h6M9 12h6M9 16h3" />
            </svg>
          </div>
          <div
            class="ldg__rail-btn"
            :class="{ 'ldg__rail-btn--active': activeScreen === 'dashboard' }"
            @click="goto('dashboard')"
          >
            <div class="ldg__icon-grid"><span></span><span></span><span></span><span></span></div>
          </div>
          <div
            class="ldg__rail-btn"
            :class="{ 'ldg__rail-btn--active': activeScreen === 'bills' }"
            @click="goto('bills')"
          >
            <div class="ldg__icon-doc"></div>
          </div>
          <div
            class="ldg__rail-btn"
            :class="{ 'ldg__rail-btn--active': activeScreen === 'invoices' }"
            @click="goto('invoices')"
          >
            <div class="ldg__icon-receipt"></div>
          </div>
          <div
            class="ldg__rail-btn"
            :class="{ 'ldg__rail-btn--active': activeScreen === 'reports' }"
            @click="goto('reports')"
          >
            <div class="ldg__icon-bars"></div>
          </div>
        </aside>

        <main class="ldg__main">
          <div class="ldg__topbar">
            <div>
              <h2 class="ldg__page-title">{{ activeScreen === 'dashboard' ? 'Dashboard' : activeScreen === 'bills' ? 'Bills' : activeScreen === 'invoices' ? 'Invoices' : 'Reports' }}</h2>
              <div class="ldg__breadcrumb">Financial <span>⌄</span></div>
            </div>
            <div class="ldg__topbar-spacer"></div>
            <div class="ldg__refresh">↻</div>
            <div class="ldg__avatar"></div>
          </div>

          <template v-if="activeScreen === 'dashboard'">
            <div class="ldg__section-label">Bills</div>
            <div class="ldg__bill-grid">
              <div v-for="(b, i) in bills" :key="i" class="ldg__card" :class="{ 'ldg__card--glow': b.glow }">
                <div class="ldg__card-top">
                  <span class="ldg__card-label">{{ b.label }}</span>
                  <div class="ldg__ring" :style="ring(b.percent)">
                    <div class="ldg__ring-inner">{{ b.percent }}%</div>
                  </div>
                </div>
                <div class="ldg__card-value">{{ b.value }}</div>
                <div class="ldg__card-sub">{{ b.sub }}</div>
              </div>
            </div>

            <div class="ldg__section-label">Invoices</div>
            <div class="ldg__invoice-grid">
              <div class="ldg__card ldg__card--gauge">
                <div class="ldg__card-label">Invoices signed</div>
                <div class="ldg__gauge">
                  <div class="ldg__ring ldg__ring--lg" :style="ring(45)">
                    <div class="ldg__ring-inner ldg__ring-inner--lg">45%</div>
                  </div>
                </div>
              </div>

              <div class="ldg__invoice-stack">
                <div class="ldg__card ldg__card--row">
                  <div>
                    <div class="ldg__card-label">Paid Invoices</div>
                    <div class="ldg__card-value ldg__card-value--md">$9,034.49</div>
                  </div>
                  <div class="ldg__ring ldg__ring--sm" :style="ring(58)"><div class="ldg__ring-inner ldg__ring-inner--sm">58%</div></div>
                </div>
                <div class="ldg__card ldg__card--row">
                  <div>
                    <div class="ldg__card-label">Live Jobs Value</div>
                    <div class="ldg__card-value ldg__card-value--md">$23,782.32</div>
                  </div>
                  <div class="ldg__ring ldg__ring--sm" :style="ring(85)"><div class="ldg__ring-inner ldg__ring-inner--sm">85%</div></div>
                </div>
              </div>

              <div class="ldg__card ldg__card--glow ldg__card--owed">
                <div class="ldg__card-label">Amount Owed</div>
                <div class="ldg__card-value">$933,879.45</div>
                <div class="ldg__card-sub">$126,783.89 overdue</div>
              </div>
            </div>

            <div class="ldg__panel">
              <div class="ldg__panel-label">Invoiced — 6 Months</div>
              <div class="ldg__chart">
                <div class="ldg__chart-col"><div class="ldg__chart-bar" style="height: 58px"></div><span>Jan</span></div>
                <div class="ldg__chart-col"><div class="ldg__chart-bar" style="height: 74px"></div><span>Feb</span></div>
                <div class="ldg__chart-col"><div class="ldg__chart-bar ldg__chart-bar--accent" style="height: 96px"></div><span>Mar</span></div>
                <div class="ldg__chart-col"><div class="ldg__chart-bar" style="height: 68px"></div><span>Apr</span></div>
                <div class="ldg__chart-col"><div class="ldg__chart-bar ldg__chart-bar--accent" style="height: 108px"></div><span>May</span></div>
                <div class="ldg__chart-col"><div class="ldg__chart-bar" style="height: 90px"></div><span>Jun</span></div>
              </div>
            </div>
          </template>

          <template v-else-if="activeScreen === 'bills'">
            <div class="ldg__table-panel">
              <div class="ldg__table-head"><div>Bill</div><div>Status</div><div>Amount</div></div>
              <div v-for="(r, i) in billRows" :key="i" class="ldg__table-row">
                <div>{{ r.name }}</div>
                <div><span :style="statusStyle(r.status)">{{ r.status }}</span></div>
                <div>{{ r.amount }}</div>
              </div>
            </div>
          </template>

          <template v-else-if="activeScreen === 'invoices'">
            <div class="ldg__table-panel">
              <div class="ldg__table-head"><div>Invoice</div><div>Status</div><div>Amount</div></div>
              <div v-for="(r, i) in invoiceRows" :key="i" class="ldg__table-row">
                <div>{{ r.name }}</div>
                <div><span :style="statusStyle(r.status)">{{ r.status }}</span></div>
                <div>{{ r.amount }}</div>
              </div>
            </div>
          </template>

          <template v-else-if="activeScreen === 'reports'">
            <div class="ldg__panel">
              <div class="ldg__panel-label">Cash Flow — 6 Months</div>
              <div class="ldg__chart">
                <div class="ldg__chart-col"><div class="ldg__chart-bar" style="height: 70px"></div><span>Jan</span></div>
                <div class="ldg__chart-col"><div class="ldg__chart-bar ldg__chart-bar--accent" style="height: 100px"></div><span>Feb</span></div>
                <div class="ldg__chart-col"><div class="ldg__chart-bar" style="height: 82px"></div><span>Mar</span></div>
                <div class="ldg__chart-col"><div class="ldg__chart-bar" style="height: 60px"></div><span>Apr</span></div>
                <div class="ldg__chart-col"><div class="ldg__chart-bar ldg__chart-bar--accent" style="height: 112px"></div><span>May</span></div>
                <div class="ldg__chart-col"><div class="ldg__chart-bar" style="height: 94px"></div><span>Jun</span></div>
              </div>
            </div>
          </template>
        </main>
      </div>
    </BrowserWindow>
  </ProjectPageHero>
</template>

<style lang="scss" scoped>
.ldg {
  height: 100%;
  display: flex;
  background: #101210;
  font-family: 'Inter', system-ui, sans-serif;
  overflow: hidden;
  color: #d8ddd6;

  &__rail {
    width: 64px;
    flex-shrink: 0;
    background: #0a0c0a;
    border-right: 1px solid rgba(190, 230, 100, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    padding: 18px 0;
  }

  &__rail-mark {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(190, 230, 100, 0.14);
    color: #bef264;
    margin-bottom: 10px;

    svg { width: 20px; height: 20px; }
  }

  &__rail-btn {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6b7a63;
    cursor: pointer;

    &--active {
      background: rgba(190, 230, 100, 0.14);
      color: #bef264;
    }
  }

  &__icon-grid {
    width: 14px; height: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 2px;
    span { background: currentColor; border-radius: 2px; opacity: 0.9; }
  }

  &__icon-doc { width: 12px; height: 15px; border: 1.6px solid currentColor; border-radius: 2px; box-sizing: border-box; }

  &__icon-receipt {
    width: 13px; height: 15px; border: 1.6px solid currentColor; border-radius: 2px 2px 0 0; box-sizing: border-box;
    position: relative;
    &::after {
      content: ''; position: absolute; bottom: -3px; left: 0; width: 100%; height: 4px;
      background: repeating-linear-gradient(-45deg, transparent, transparent 1px, currentColor 1px, currentColor 2px);
    }
  }

  &__icon-bars {
    width: 14px; height: 14px; display: flex; align-items: flex-end; gap: 2px;
    &::before, &::after { content: ''; width: 3px; background: currentColor; border-radius: 1px; }
    &::before { height: 8px; }
    &::after { height: 14px; }
  }

  &__main { flex: 1; min-width: 0; overflow: auto; padding: 22px 28px; box-sizing: border-box; }

  &__topbar { display: flex; align-items: center; gap: 14px; margin-bottom: 22px; }

  &__page-title { font-size: 19px; font-weight: 700; color: #f2f6ef; margin: 0 0 2px; }
  &__breadcrumb { font-size: 12px; color: #8a9682; span { margin-left: 4px; } }

  &__topbar-spacer { flex: 1; }

  &__refresh {
    width: 30px; height: 30px; border-radius: 8px; background: #1a1e19; border: 1px solid rgba(190, 230, 100, 0.15);
    display: flex; align-items: center; justify-content: center; color: #8a9682; font-size: 14px;
  }

  &__avatar { width: 30px; height: 30px; border-radius: 50%; background: linear-gradient(135deg, #bef264, #4d7c0f); flex-shrink: 0; }

  &__section-label {
    font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: #8a9682; font-weight: 700;
    margin: 0 0 12px;
  }

  &__bill-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 26px; }

  &__card {
    background: #171a16; border: 1px solid rgba(190, 230, 100, 0.1); border-radius: 14px; padding: 16px;
    position: relative; overflow: hidden;

    &--glow {
      box-shadow: 0 0 50px rgba(190, 230, 100, 0.16);
      background: linear-gradient(160deg, #171a16 60%, rgba(190, 230, 100, 0.1));
    }

    &--row { display: flex; align-items: center; justify-content: space-between; }
    &--gauge { display: flex; flex-direction: column; align-items: center; text-align: center; }
    &--owed { display: flex; flex-direction: column; justify-content: center; }
  }

  &__card-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 14px; }
  &__card-label { font-size: 12px; color: #8a9682; }
  &__card-value { font-size: 22px; font-weight: 700; color: #f2f6ef; }
  &__card-value--md { font-size: 17px; }
  &__card-sub { font-size: 11.5px; color: #6b7a63; margin-top: 4px; }

  &__ring {
    position: relative; width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;

    &--sm { width: 40px; height: 40px; }
    &--lg { width: 120px; height: 120px; margin: 10px 0; }
  }

  &__ring-inner {
    position: absolute; inset: 4px; border-radius: 50%; background: #171a16;
    display: flex; align-items: center; justify-content: center;
    font-size: 8px; font-weight: 700; color: #bef264;

    &--sm { inset: 5px; font-size: 10.5px; }
    &--lg { inset: 14px; font-size: 22px; }
  }

  &__gauge { display: flex; justify-content: center; }

  &__invoice-grid { display: grid; grid-template-columns: 1fr 1.2fr 1fr; gap: 14px; margin-bottom: 24px; }

  &__invoice-stack { display: flex; flex-direction: column; gap: 14px; }

  &__panel { background: #171a16; border: 1px solid rgba(190, 230, 100, 0.1); border-radius: 14px; padding: 20px; }
  &__panel-label { color: #8a9682; font-size: 13px; margin-bottom: 16px; }

  &__chart { display: flex; align-items: flex-end; gap: 16px; height: 120px; }
  &__chart-col { display: flex; flex-direction: column; align-items: center; gap: 8px; span { font-size: 11px; color: #8a9682; } }
  &__chart-bar { width: 26px; background: #3f4a34; border-radius: 6px; &--accent { background: linear-gradient(180deg, #bef264, #84cc16); } }

  &__table-panel { background: #171a16; border: 1px solid rgba(190, 230, 100, 0.1); border-radius: 14px; padding: 20px; }

  &__table-head {
    display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; font-size: 12px; color: #8a9682;
    padding-bottom: 10px; border-bottom: 1px solid rgba(190, 230, 100, 0.1);
  }

  &__table-row {
    display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 8px; font-size: 13px; color: #d8ddd6;
    padding: 13px 0; border-bottom: 1px solid rgba(190, 230, 100, 0.06); align-items: center;
  }
}
</style>
