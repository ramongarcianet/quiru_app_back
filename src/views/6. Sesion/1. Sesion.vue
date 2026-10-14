<script setup>
import logo from "../../assets/logo.png"
</script>

<template lang="pug">
.session-layout
    .session-glow.session-glow-a
    .session-glow.session-glow-b
    .container.py-4.py-md-5.h-100
        .row.g-4.h-100.align-items-stretch
            .col-12.col-lg-6
                .session-brand-panel
                    span.eyebrow Plataforma clínica
                    h1 Quiru te acompaña en cada momento de la atención
                    p.text-muted-ui Desde la primera cita hasta el seguimiento del tratamiento, todo vive en una experiencia más clara, más confiable y más agradable para tu equipo.
                    .brand-preview
                        img.preview-logo(:src='logo' alt='Quiru')
                    .brand-metrics
                        .metric-card
                            strong Agenda
                            span Control diario con foco clínico
                        .metric-card
                            strong Pacientes
                            span Información siempre disponible
                        .metric-card
                            strong Tratamientos
                            span Operación mejor conectada
            .col-12.col-lg-6.d-flex
                .session-form-shell
                    router-view
</template>
<style lang="sass" scoped>
.session-layout
    min-height: 100vh
    position: relative
    overflow: hidden

.session-glow
    position: absolute
    border-radius: 50%
    filter: blur(24px)
    opacity: 0.6
    pointer-events: none
    &.session-glow-a
        width: 20rem
        height: 20rem
        top: -4rem
        left: -3rem
        background: rgba(var(--color-primary-rgb), 0.24)
    &.session-glow-b
        width: 18rem
        height: 18rem
        bottom: -6rem
        right: -2rem
        background: rgba(var(--color-secondary-rgb), 0.18)

.container
    position: relative
    z-index: 1

.session-brand-panel
    height: 100%
    display: flex
    flex-direction: column
    justify-content: center
    gap: 1.2rem
    padding: 2rem
    background: linear-gradient(145deg, #103e3c 0%, #1d6c66 100%)
    color: white
    border-radius: 34px
    box-shadow: 0 28px 60px rgba(16, 62, 60, 0.28)
    h1
        margin: 0
        font-size: clamp(2rem, 3.8vw, 3.5rem)
        line-height: 1.02
        font-weight: 800
        font-family: var(--font-family-heading)
    p
        margin: 0
        max-width: 34rem
        color: rgba(255,255,255,0.78)
        font-size: 1rem
    .eyebrow
        align-self: flex-start
        background: rgba(255,255,255,0.12)
        color: #d8fffb

.brand-preview
    padding: 1.25rem
    border-radius: 28px
    background: rgba(255,255,255,0.08)
    border: 1px solid rgba(255,255,255,0.12)
    display: flex
    align-items: center
    justify-content: center

.preview-logo
    width: min(100%, 22rem)
    height: auto
    object-fit: contain

.brand-metrics
    display: grid
    grid-template-columns: repeat(3, minmax(0, 1fr))
    gap: 1rem

.metric-card
    padding: 1rem
    border-radius: 22px
    background: rgba(255,255,255,0.10)
    border: 1px solid rgba(255,255,255,0.10)
    strong
        display: block
        margin-bottom: 0.35rem
        font-size: 1rem
    span
        color: rgba(255,255,255,0.72)
        font-size: 0.9rem

.session-form-shell
    width: 100%
    min-height: 100%
    display: flex
    align-items: center
    justify-content: center
    padding: 1rem 0

@media (max-width: 991px)
    .session-brand-panel
        padding: 1.5rem
    .brand-metrics
        grid-template-columns: 1fr
    .session-form-shell
        padding-top: 0
</style>
