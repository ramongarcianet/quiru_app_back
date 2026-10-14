<script setup>
import { alertMensaje } from "../store/helper";
import { ref, watch } from "vue";
import Nav from "../components/Nav.vue";
import Avatar from "../components/Avatar.vue";
import logo from "../assets/logo.png";

const verDialog = ref(false);

watch(
  () => alertMensaje.value,
  () => {
    verDialog.value = true;
  }
);
</script>

<template lang="pug">
Dialog(v-model='verDialog')
  template(#title) Quiru
  template(#body) {{ alertMensaje }}
  template(#footer)
    button.btn.btn-primary(type='button' data-bs-dismiss='modal') Aceptar

.dashboard-page
  .dashboard-glow.dashboard-glow-a
  .dashboard-glow.dashboard-glow-b
  .container.py-3.py-md-4
    .dashboard-shell
      .dashboard-hero
        .brand-block
          img.brand-logo(:src='logo' alt='Quiru')
          .hero-copy
            h1 QUIRU
        .hero-side
          .hero-badge.glass-panel
          Avatar
      #body
        .content-card
          router-view
  Nav
</template>

<style lang="sass" scoped>
.dashboard-page
  min-height: 100vh
  position: relative
  isolation: isolate
  padding-bottom: 6.5rem
  overflow: hidden

.dashboard-glow
  position: fixed
  z-index: 0
  border-radius: 50%
  filter: blur(24px)
  pointer-events: none
  opacity: 0.55
  &.dashboard-glow-a
    width: 18rem
    height: 18rem
    top: -5rem
    left: -4rem
    background: rgba(var(--color-primary-rgb), 0.20)
  &.dashboard-glow-b
    width: 16rem
    height: 16rem
    top: 10rem
    right: -4rem
    background: rgba(var(--color-secondary-rgb), 0.18)

.dashboard-shell
  position: relative
  z-index: 1

.dashboard-hero
  display: flex
  justify-content: space-between
  gap: 1.5rem
  margin-bottom: 1.5rem
  padding: 1.4rem 1.4rem 1rem
  border-radius: 30px
  background: linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(244,255,251,0.96) 100%)
  border: 1px solid rgba(18, 60, 58, 0.06)
  box-shadow: var(--shadow-soft)

.brand-block
  display: flex
  flex-direction: column
  gap: 1rem
  max-width: 42rem

.brand-logo
  width: 9rem
  height: auto

.hero-copy
  h1
    margin: 0
    font-size: clamp(1.8rem, 3vw, 2.6rem)
    font-weight: 800
    line-height: 1.05
    color: var(--color-dark)
  p
    margin: 0.75rem 0 0
    max-width: 36rem
    font-size: 1rem

.hero-side
  display: flex
  flex-direction: column
  align-items: flex-end
  gap: 1rem

.hero-badge
  display: inline-flex
  align-items: center
  gap: 0.65rem
  padding: 0.85rem 1rem
  border-radius: 18px
  font-weight: 700
  color: var(--color-dark)

.dot
  width: 0.7rem
  height: 0.7rem
  border-radius: 999px
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)
  box-shadow: 0 0 0 0.35rem rgba(var(--color-primary-rgb), 0.12)

#body
  min-height: calc(100vh - 14rem)
  width: 100%
  overflow-y: auto

.content-card
  min-height: 100%
  padding: 1.25rem
  background: rgba(255,255,255,0.96)
  border: 1px solid rgba(18, 60, 58, 0.06)
  border-radius: 30px
  box-shadow: var(--shadow-card)

@media (max-width: 767px)
  .dashboard-page
    padding-bottom: 7.2rem
  .dashboard-hero
    flex-direction: column
    padding: 1.1rem
  .hero-side
    align-items: stretch
  .brand-logo
    width: 7.2rem
  .content-card
    padding: 1rem
</style>
