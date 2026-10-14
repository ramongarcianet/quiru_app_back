<script setup>
import LogoMark from '../assets/logoQuiru.vue'

defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
  inverse: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="brand-lockup" :class="{ compact, inverse }" aria-label="QUIRU Dent AI, by QUIRU Labs">
    <span class="brand-mark" aria-hidden="true">
      <LogoMark />
    </span>
    <span class="brand-copy">
      <span class="brand-name"><strong>QUIRU</strong> Dent <em>AI</em></span>
      <span class="brand-company">by QUIRU Labs</span>
    </span>
  </div>
</template>

<style lang="sass" scoped>
.brand-lockup
  display: inline-flex
  align-items: center
  gap: 0.75rem
  color: var(--brand-navy)
  line-height: 1

.brand-mark
  display: grid
  place-items: center
  flex: 0 0 auto
  width: 2.75rem
  height: 2.75rem
  padding: 0.58rem
  border-radius: 0.9rem
  color: white
  background: var(--gradient-brand)
  box-shadow: 0 8px 22px rgba(var(--brand-blue-rgb), 0.22)
  :deep(svg)
    width: 100%
    height: 100%

.brand-copy
  display: flex
  flex-direction: column
  gap: 0.3rem

.brand-name
  white-space: nowrap
  font-size: 1.12rem
  font-weight: 600
  letter-spacing: -0.025em
  em
    color: var(--ai-purple)
    font-style: normal
    font-weight: 800

.brand-company
  color: var(--text-secondary)
  font-size: 0.68rem
  font-weight: 700
  letter-spacing: 0.08em
  text-transform: uppercase

.compact
  gap: 0.6rem
  .brand-mark
    width: 2.4rem
    height: 2.4rem
    border-radius: 0.75rem
  .brand-name
    font-size: 1rem

.inverse
  color: white
  .brand-mark
    background: rgba(255, 255, 255, 0.12)
    border: 1px solid rgba(255, 255, 255, 0.18)
  .brand-company
    color: rgba(255, 255, 255, 0.7)
</style>
