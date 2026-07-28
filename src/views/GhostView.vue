<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ProjectPageHero from '@/components/project/ProjectPageHero.vue';
import AppFrame from '@/components/project/AppFrame.vue';

const { t } = useI18n();

const activeScreen = ref('chat');
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
    background: active ? '#0d9488' : 'transparent',
    color: active ? '#ffffff' : '#94a3a8',
    fontWeight: active ? 600 : 500,
  };
};

const draft = ref('');

const messages = [
  { from: 'user', text: 'Can you summarize last week’s support tickets by topic?' },
  { from: 'ai', text: 'Sure — top three topics were billing questions (38%), password resets (24%), and API rate limits (19%). Want me to draft a reply template for the billing ones?' },
  { from: 'user', text: 'Yes, keep it under 4 sentences and friendly.' },
  { from: 'ai', text: 'Here’s a short draft:\n\n"Thanks for reaching out about your billing question! I’ve looked into your account and here’s what’s happening — [details]. Let me know if you’d like me to walk through your next invoice together."' },
];

const historyItems = [
  { title: 'Support ticket summary', snippet: 'Top topics were billing, password resets...', time: '2h ago' },
  { title: 'Talked through a hard decision', snippet: 'Weighing a job offer against staying put', time: 'Yesterday' },
  { title: 'Sprint retro notes', snippet: 'Key blockers: staging env, design handoff', time: '2 days ago' },
  { title: 'Evening check-in', snippet: 'Unpacking a stressful conversation with a friend', time: '4 days ago' },
  { title: 'Apartment move checklist', snippet: 'Turned a messy to-do list into a step-by-step plan', time: '1 week ago' },
];

const promptItems = [
  { title: 'Summarize thread', desc: 'Condense a long conversation into key points' },
  { title: 'Talk it through', desc: 'Think out loud about something that\'s on your mind' },
  { title: 'Decision helper', desc: 'Weigh a tough choice without the judgment' },
  { title: 'Meeting notes', desc: 'Extract decisions and action items' },
  { title: 'Explain simply', desc: 'Rewrite a technical answer for non-experts' },
  { title: 'Untangle a problem', desc: 'Break something overwhelming into next steps' },
];

const responseModes = [
  { name: 'Focused', desc: 'Short, precise answers for quick questions', selected: true },
  { name: 'Balanced', desc: 'A mix of speed and detail for everyday use', selected: false },
  { name: 'Thorough', desc: 'Best for complex, multi-step questions', selected: false },
];
</script>

<template>
  <ProjectPageHero
    :eyebrow="t('portfolio.featuredProject')"
    :title="t('projects.ghost.title')"
    :description="t('projects.ghost.description')"
    :problem-label="t('portfolio.problemLabel')"
    :problem="t('projects.ghost.problem')"
    :tags="['Vue3.js', 'Node.js', 'REST API', 'JS']"
    accent="#14b8a6"
  >
    <AppFrame :max-width="1320">
      <div class="cx">
        <aside class="cx__sidebar">
          <div class="cx__brand">
            <div class="cx__brand-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 3 3" />
                <path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-3 3" />
                <path d="M9 4v16M15 4v16" />
                <path d="M9 9h2M9 14h2M13 9h2M13 14h2" />
              </svg>
            </div>
            <div class="cx__brand-name">Ghost</div>
          </div>

          <div class="cx__new-chat">+ New chat</div>

          <nav class="cx__nav">
            <div class="cx__nav-item" :style="navStyle('chat')" @click="goto('chat')">
              <div class="cx__icon-bubble"></div>
              <span>Chat</span>
            </div>
            <div class="cx__nav-item" :style="navStyle('history')" @click="goto('history')">
              <div class="cx__icon-clock"></div>
              <span>History</span>
            </div>
            <div class="cx__nav-item" :style="navStyle('prompts')" @click="goto('prompts')">
              <div class="cx__icon-grid">
                <span></span><span></span><span></span><span></span>
              </div>
              <span>Templates</span>
            </div>
            <div class="cx__nav-item" :style="navStyle('settings')" @click="goto('settings')">
              <div class="cx__icon-circle"></div>
              <span>Settings</span>
            </div>
          </nav>

          <div class="cx__usage">
            <div class="cx__usage-label">Monthly usage</div>
            <div class="cx__usage-bar"><div class="cx__usage-fill"></div></div>
            <div class="cx__usage-value">6,420 / 10,000 messages</div>
          </div>
        </aside>

        <main class="cx__main">
          <template v-if="activeScreen === 'chat'">
            <div class="cx__chat-header">
              <div class="cx__status-pill">
                <span class="cx__status-dot"></span>
                <span>Active</span>
              </div>
              <div class="cx__section-actions">
                <div class="cx__btn cx__btn--ghost">Share</div>
                <div class="cx__btn cx__btn--solid">Export</div>
              </div>
            </div>

            <div class="cx__thread">
              <div v-for="(m, i) in messages" :key="i" class="cx__message" :class="`cx__message--${m.from}`">
                <div class="cx__avatar" :class="`cx__avatar--${m.from}`"></div>
                <div class="cx__bubble" :class="`cx__bubble--${m.from}`">{{ m.text }}</div>
              </div>
            </div>

            <div class="cx__composer">
              <input
                v-model="draft"
                class="cx__composer-input"
                type="text"
                placeholder="Ask a question or describe what you need..."
              />
              <div class="cx__composer-send">↑</div>
            </div>
          </template>

          <template v-else-if="activeScreen === 'history'">
            <h2 class="cx__section-title cx__section-title--block">History</h2>
            <div class="cx__history-list">
              <div v-for="(h, i) in historyItems" :key="i" class="cx__history-item">
                <div class="cx__icon-bubble cx__icon-bubble--muted"></div>
                <div class="cx__history-body">
                  <div class="cx__history-title">{{ h.title }}</div>
                  <div class="cx__history-snippet">{{ h.snippet }}</div>
                </div>
                <div class="cx__history-time">{{ h.time }}</div>
              </div>
            </div>
          </template>

          <template v-else-if="activeScreen === 'prompts'">
            <h2 class="cx__section-title cx__section-title--block">Templates</h2>
            <div class="cx__prompt-grid">
              <div v-for="(p, i) in promptItems" :key="i" class="cx__prompt-card">
                <div class="cx__prompt-title">{{ p.title }}</div>
                <div class="cx__prompt-desc">{{ p.desc }}</div>
              </div>
            </div>
          </template>

          <template v-else-if="activeScreen === 'settings'">
            <h2 class="cx__section-title cx__section-title--block">Settings</h2>

            <div class="cx__settings-label">Response mode</div>
            <div class="cx__model-list">
              <div v-for="(m, i) in responseModes" :key="i" class="cx__model-row">
                <div class="cx__radio" :class="{ 'cx__radio--active': m.selected }"></div>
                <div class="cx__model-body">
                  <div class="cx__model-name">{{ m.name }}</div>
                  <div class="cx__model-desc">{{ m.desc }}</div>
                </div>
              </div>
            </div>

            <div class="cx__settings-label">Response style</div>
            <div class="cx__slider-track"><div class="cx__slider-fill"></div><div class="cx__slider-thumb"></div></div>
            <div class="cx__slider-labels"><span>Precise</span><span>Creative</span></div>

            <div class="cx__settings-label">Connected inbox</div>
            <div class="cx__key-field">support@yourcompany.com</div>
          </template>
        </main>
      </div>
    </AppFrame>
  </ProjectPageHero>
</template>

<style lang="scss" scoped>
.cx {
  min-height: 760px;
  display: flex;
  background: #0f1715;
  font-family: 'Inter', system-ui, sans-serif;
  overflow: hidden;
  color: #d6e0de;

  &__sidebar {
    width: 220px;
    flex-shrink: 0;
    background: #0b1211;
    border-right: 1px solid rgba(20, 184, 166, 0.15);
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
    border-bottom: 1px solid rgba(20, 184, 166, 0.15);
    margin-bottom: 16px;
  }

  &__brand-mark {
    width: 30px;
    height: 30px;
    border-radius: 8px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(20, 184, 166, 0.14);
    color: #5eead4;

    svg { width: 18px; height: 18px; }
  }

  &__brand-name {
    font-size: 15px;
    font-weight: 700;
    color: #f2fbfa;
  }

  &__new-chat {
    margin: 4px 4px 16px;
    padding: 9px 12px;
    border: 1px solid rgba(20, 184, 166, 0.35);
    border-radius: 8px;
    color: #5eead4;
    font-size: 13.5px;
    font-weight: 600;
    text-align: center;
    cursor: pointer;
  }

  &__nav {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  &__icon-bubble {
    width: 14px;
    height: 12px;
    border-radius: 4px 4px 4px 0;
    background: currentColor;
    opacity: 0.9;

    &--muted {
      color: #5eead4;
      flex-shrink: 0;
    }
  }

  &__icon-clock {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.6px solid currentColor;
    box-sizing: border-box;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 6px;
      width: 3px;
      height: 5px;
      border-right: 1.4px solid currentColor;
    }
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

  &__icon-circle {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1.6px solid currentColor;
    box-sizing: border-box;
  }

  &__usage {
    margin-top: auto;
    padding: 14px;
    background: rgba(20, 184, 166, 0.08);
    border: 1px solid rgba(20, 184, 166, 0.2);
    border-radius: 12px;
  }

  &__usage-label {
    font-size: 11.5px;
    color: #8fa8a4;
    margin-bottom: 8px;
  }

  &__usage-bar {
    height: 6px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.08);
    overflow: hidden;
    margin-bottom: 8px;
  }

  &__usage-fill {
    width: 64%;
    height: 100%;
    background: linear-gradient(90deg, #14b8a6, #5eead4);
  }

  &__usage-value {
    font-size: 11px;
    color: #8fa8a4;
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

  &__chat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__status-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    border-radius: 999px;
    background: rgba(52, 211, 153, 0.12);
    border: 1px solid rgba(52, 211, 153, 0.3);
    color: #34d399;
    font-size: 12.5px;
    font-weight: 600;
  }

  &__status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #34d399;
  }

  &__section-actions {
    display: flex;
    gap: 10px;
  }

  &__btn {
    padding: 8px 14px;
    border-radius: 8px;
    font-size: 13px;
    cursor: pointer;

    &--ghost {
      border: 1px solid rgba(20, 184, 166, 0.3);
      color: #d6e0de;
    }

    &--solid {
      background: #0d9488;
      color: #fff;
      font-weight: 600;
    }
  }

  &__thread {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 18px;
  }

  &__message {
    display: flex;
    gap: 10px;
    max-width: 78%;

    &--user {
      flex-direction: row-reverse;
      align-self: flex-end;
    }
  }

  &__avatar {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    flex-shrink: 0;

    &--ai { background: linear-gradient(135deg, #14b8a6, #5eead4); }
    &--user { background: #334; background: #2d3b3a; border: 1px solid rgba(20, 184, 166, 0.3); }
  }

  &__bubble {
    padding: 12px 14px;
    border-radius: 14px;
    font-size: 13.5px;
    line-height: 1.55;
    white-space: pre-line;

    &--ai {
      background: #16211f;
      border: 1px solid rgba(20, 184, 166, 0.15);
      border-top-left-radius: 4px;
      color: #dbe8e6;
    }

    &--user {
      background: #0d9488;
      color: #ffffff;
      border-top-right-radius: 4px;
    }
  }

  &__composer {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 6px 6px 16px;
    border: 1px solid rgba(20, 184, 166, 0.3);
    border-radius: 999px;
    background: #101a18;
  }

  &__composer-input {
    flex: 1;
    background: none;
    border: none;
    outline: none;
    color: #e7f3f1;
    font-size: 13.5px;
    font-family: inherit;

    &::placeholder { color: #6b8481; }
  }

  &__composer-send {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #0d9488;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    flex-shrink: 0;
  }

  &__section-title {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: #f2fbfa;

    &--block { margin: 0 0 18px; }
  }

  &__history-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__history-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 13px 10px;
    border-bottom: 1px solid rgba(20, 184, 166, 0.08);
  }

  &__history-body { flex: 1; min-width: 0; }

  &__history-title {
    font-size: 13.5px;
    font-weight: 600;
    color: #f2fbfa;
    margin-bottom: 2px;
  }

  &__history-snippet {
    font-size: 12px;
    color: #8fa8a4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__history-time {
    font-size: 11.5px;
    color: #6b8481;
    flex-shrink: 0;
  }

  &__prompt-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  &__prompt-card {
    background: #16211f;
    border: 1px solid rgba(20, 184, 166, 0.15);
    border-radius: 12px;
    padding: 14px 16px;
  }

  &__prompt-title {
    font-size: 13.5px;
    font-weight: 600;
    color: #f2fbfa;
    margin-bottom: 4px;
  }

  &__prompt-desc {
    font-size: 12px;
    color: #8fa8a4;
    line-height: 1.5;
  }

  &__settings-label {
    font-size: 11.5px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #6b8481;
    margin: 22px 0 10px;

    &:first-of-type { margin-top: 0; }
  }

  &__model-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__model-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px 14px;
    background: #16211f;
    border: 1px solid rgba(20, 184, 166, 0.12);
    border-radius: 10px;
  }

  &__radio {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1.6px solid #4c6663;
    margin-top: 2px;
    flex-shrink: 0;

    &--active {
      border-color: #14b8a6;
      background: radial-gradient(circle, #14b8a6 40%, transparent 44%);
    }
  }

  &__model-name {
    font-size: 13.5px;
    font-weight: 600;
    color: #f2fbfa;
  }

  &__model-desc {
    font-size: 12px;
    color: #8fa8a4;
    margin-top: 2px;
  }

  &__slider-track {
    position: relative;
    height: 6px;
    border-radius: 3px;
    background: rgba(255, 255, 255, 0.08);
    margin-bottom: 8px;
  }

  &__slider-fill {
    width: 40%;
    height: 100%;
    border-radius: 3px;
    background: linear-gradient(90deg, #14b8a6, #5eead4);
  }

  &__slider-thumb {
    position: absolute;
    top: 50%;
    left: 40%;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.3);
  }

  &__slider-labels {
    display: flex;
    justify-content: space-between;
    font-size: 11.5px;
    color: #6b8481;
    max-width: 300px;
  }

  &__key-field {
    padding: 10px 14px;
    background: #101a18;
    border: 1px solid rgba(20, 184, 166, 0.2);
    border-radius: 8px;
    font-size: 13px;
    color: #8fa8a4;
    max-width: 320px;
    font-family: monospace;
  }
}
</style>
