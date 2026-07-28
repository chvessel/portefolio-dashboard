<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import ProjectPageHero from '@/components/project/ProjectPageHero.vue';
import AppFrame from '@/components/project/AppFrame.vue';

const { t } = useI18n();

const tasks = ref([
  { title: 'Review Codebase', status: 'done' },
  { title: 'Write Documentation', status: 'done' },
  { title: 'Prepare Demo Presentation', status: 'todo' },
  { title: 'Plan New Project', status: 'todo' },
]);

function toggleTask(task) {
  task.status = task.status === 'done' ? 'todo' : 'done';
}

const dailyGoals = ref([
  { title: 'Finish Reading Chapter', done: true },
  { title: 'Go for a Run', done: false },
  { title: 'Drink 8 Glasses of Water', done: false },
]);

function toggleGoal(goal) {
  goal.done = !goal.done;
}

const goalProgress = computed(() => {
  const done = dailyGoals.value.filter((g) => g.done).length;
  return Math.round((done / dailyGoals.value.length) * 100);
});

const analyticsStats = [
  { label: 'Hours Coded', value: '32h' },
  { label: 'Tasks Done', value: '32' },
  { label: 'Tags', value: '12' },
  { label: 'Commits', value: '172' },
];
</script>

<template>
  <ProjectPageHero
    :eyebrow="t('portfolio.featuredProject')"
    :title="t('projects.dayframe.title')"
    :description="t('projects.dayframe.description')"
    :problem-label="t('portfolio.problemLabel')"
    :problem="t('projects.dayframe.problem')"
    :tags="['React', 'JS', 'SCSS', 'REST API']"
    accent="#f5b942"
  >
    <AppFrame :max-width="1200">
      <div class="pd">
        <header class="pd__topbar">
          <div class="pd__brand">
            <div class="pd__brand-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="17" rx="2" />
                <path d="M7 9l1.5 1.5L11 8" />
                <path d="M13.5 9.5h4" />
                <path d="M7 15l1.5 1.5L11 14" />
                <path d="M13.5 15.5h4" />
              </svg>
            </div>
            <div class="pd__brand-name">Dayframe</div>
          </div>
          <div class="pd__search"><div class="pd__search-icon"></div><span>Search</span></div>
          <div class="pd__topbar-spacer"></div>
          <div class="pd__date-range">Date Range</div>
          <div class="pd__avatar"></div>
        </header>

        <main class="pd__grid">
          <div class="pd__card pd__card--tasks">
            <div class="pd__card-head">
              <h3 class="pd__card-title">Task List</h3>
              <span class="pd__card-meta">Analytics completed</span>
            </div>

            <div class="pd__task-list">
              <div v-for="(t, i) in tasks" :key="i" class="pd__task" @click="toggleTask(t)">
                <span class="pd__task-dot" :class="`pd__task-dot--${t.status}`"></span>
                <span class="pd__task-title" :class="{ 'pd__task-title--done': t.status === 'done' }">{{ t.title }}</span>
              </div>
            </div>

            <div class="pd__chart-wrap">
              <svg class="pd__chart" viewBox="0 0 280 70" preserveAspectRatio="none">
                <polyline
                  points="4,58 44,40 84,48 124,22 164,32 204,14 244,26 276,10"
                  fill="none" stroke="#5b8def" stroke-width="2.4"
                />
                <circle cx="244" cy="26" r="4" fill="#f5b942" />
              </svg>
              <div class="pd__chart-label">
                <span>Progress this week</span>
                <span class="pd__chart-pct">64%</span>
              </div>
            </div>
          </div>

          <div class="pd__card pd__card--weather">
            <h3 class="pd__card-title">Weather</h3>
            <div class="pd__weather-main">
              <div class="pd__weather-temp">72°</div>
              <div class="pd__weather-sun"></div>
            </div>
            <div class="pd__weather-desc">Sunny</div>
            <div class="pd__weather-stats">
              <div><span>8mph</span><small>Wind</small></div>
              <div><span>42%</span><small>Humidity</small></div>
              <div><span>5</span><small>UV Index</small></div>
            </div>
          </div>

          <div class="pd__card pd__card--goals">
            <h3 class="pd__card-title">Daily Goals</h3>
            <div class="pd__goal-list">
              <div v-for="(g, i) in dailyGoals" :key="i" class="pd__goal" @click="toggleGoal(g)">
                <span class="pd__goal-radio" :class="{ 'pd__goal-radio--active': g.done }"></span>
                <span class="pd__goal-title" :class="{ 'pd__goal-title--done': g.done }">{{ g.title }}</span>
              </div>
            </div>
            <div class="pd__goal-progress"><div class="pd__goal-progress-fill" :style="{ width: goalProgress + '%' }"></div></div>
          </div>

          <div class="pd__card pd__card--analytics">
            <h3 class="pd__card-title">Analytics</h3>
            <div class="pd__analytics-grid">
              <div v-for="(a, i) in analyticsStats" :key="i" class="pd__analytics-cell">
                <div class="pd__analytics-label">{{ a.label }}</div>
                <div class="pd__analytics-value">{{ a.value }}</div>
              </div>
            </div>
          </div>

          <div class="pd__card pd__card--notes">
            <h3 class="pd__card-title">Notes</h3>
            <div class="pd__sticky">Remember to schedule a call with the client tomorrow.</div>
          </div>
        </main>
      </div>
    </AppFrame>
  </ProjectPageHero>
</template>

<style lang="scss" scoped>
.pd {
  min-height: 700px;
  display: flex;
  flex-direction: column;
  background: #12151d;
  font-family: 'Inter', system-ui, sans-serif;
  overflow: hidden;
  color: #e6e8ee;

  &__topbar {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 14px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    flex-shrink: 0;
  }

  &__brand { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

  &__brand-mark {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(245, 185, 66, 0.14);
    color: #f5b942;

    svg { width: 16px; height: 16px; }
  }

  &__brand-name { font-size: 14.5px; font-weight: 700; color: #f2f4f8; }

  &__search {
    flex: 1; max-width: 260px; display: flex; align-items: center; gap: 8px;
    background: #1b1f29; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 8px;
    padding: 7px 12px; color: #7d8598; font-size: 13px;
  }

  &__search-icon { width: 12px; height: 12px; border: 1.6px solid #7d8598; border-radius: 50%; flex-shrink: 0; }

  &__topbar-spacer { flex: 1; }

  &__date-range {
    padding: 7px 14px; border-radius: 999px; background: #1b1f29; border: 1px solid rgba(245, 185, 66, 0.3);
    color: #f5b942; font-size: 12px; font-weight: 600;
  }

  &__avatar { width: 28px; height: 28px; border-radius: 50%; background: linear-gradient(135deg, #f5b942, #d97706); }

  &__grid {
    flex: 1; overflow: auto; padding: 20px; box-sizing: border-box;
    display: grid; grid-template-columns: 1fr 1fr 1fr; grid-template-rows: auto auto; gap: 16px;
  }

  &__card {
    background: #1b1f29; border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 14px; padding: 18px;

    &--tasks { grid-column: 1 / 3; grid-row: 1; }
    &--weather { grid-column: 3; grid-row: 1; }
    &--goals { grid-column: 1; grid-row: 2; }
    &--analytics { grid-column: 2; grid-row: 2; }
    &--notes { grid-column: 3; grid-row: 2; }
  }

  &__card-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  &__card-title { font-size: 14.5px; font-weight: 700; color: #f2f4f8; margin: 0 0 14px; }
  &__card-meta { font-size: 11px; color: #6a94e0; }

  &__task-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
  &__task { display: flex; align-items: center; gap: 10px; cursor: pointer; }

  &__task-dot {
    width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0; border: 1.6px solid transparent;
    &--done { background: #34d399; }
    &--todo { background: transparent; border-color: #f87171; }
  }

  &__task-title { font-size: 13px; color: #d3d7e0; &--done { color: #7d8598; text-decoration: line-through; } }

  &__chart-wrap { border-top: 1px solid rgba(255, 255, 255, 0.06); padding-top: 12px; }
  &__chart { width: 100%; height: 60px; display: block; }
  &__chart-label { display: flex; justify-content: space-between; font-size: 11px; color: #7d8598; margin-top: 4px; }
  &__chart-pct { color: #f5b942; font-weight: 700; }

  &__weather-main { display: flex; align-items: center; justify-content: space-between; }
  &__weather-temp { font-size: 34px; font-weight: 700; color: #f2f4f8; }
  &__weather-sun {
    width: 40px; height: 40px; border-radius: 50%; background: radial-gradient(circle, #ffd873, #f5b942);
    box-shadow: 0 0 20px rgba(245, 185, 66, 0.5);
  }
  &__weather-desc { font-size: 12.5px; color: #7d8598; margin: 4px 0 18px; }

  &__weather-stats {
    display: flex; justify-content: space-between; text-align: center;
    div { display: flex; flex-direction: column; gap: 2px; }
    span { font-size: 13px; font-weight: 700; color: #f2f4f8; }
    small { font-size: 10px; color: #7d8598; }
  }

  &__goal-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
  &__goal { display: flex; align-items: center; gap: 10px; cursor: pointer; }

  &__goal-radio {
    width: 15px; height: 15px; border-radius: 50%; border: 1.6px solid #4a5568; flex-shrink: 0;
    &--active { border-color: #f5b942; background: radial-gradient(circle, #f5b942 40%, transparent 44%); }
  }

  &__goal-title { font-size: 13px; color: #d3d7e0; &--done { color: #7d8598; } }

  &__goal-progress { height: 5px; border-radius: 3px; background: rgba(255, 255, 255, 0.08); overflow: hidden; }
  &__goal-progress-fill { height: 100%; background: linear-gradient(90deg, #f5b942, #d97706); transition: width 0.2s ease; }

  &__analytics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  &__analytics-cell { background: #12151d; border-radius: 10px; padding: 10px 12px; }
  &__analytics-label { font-size: 10.5px; color: #7d8598; margin-bottom: 4px; }
  &__analytics-value { font-size: 17px; font-weight: 700; color: #f2f4f8; }

  &__sticky {
    background: #f5d76e; color: #4a3f10; border-radius: 6px; padding: 14px;
    font-size: 12.5px; line-height: 1.6; font-family: 'Comic Sans MS', 'Segoe Print', cursive, sans-serif;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
    transform: rotate(-1.5deg);
  }
}
</style>
