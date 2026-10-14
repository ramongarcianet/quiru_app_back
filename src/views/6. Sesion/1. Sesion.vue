<script setup>
import BrandLogo from '../../components/BrandLogo.vue'
</script>

<template lang="pug">
.session-layout
    .session-glow.session-glow-a
    .session-glow.session-glow-b
    .container.py-4.py-md-5.h-100
        .row.g-4.h-100.align-items-stretch
            .col-12.col-lg-6
                .session-brand-panel
                    BrandLogo(inverse)
                    span.eyebrow HEALTHTECH · VOICE AI · DENTAL TECHNOLOGY
                    h1 Tu práctica odontológica, impulsada por Inteligencia Artificial.
                    p QUIRU Dent AI combina tecnología odontológica, Inteligencia Artificial y reconocimiento de voz para ofrecer una experiencia digital más natural e intuitiva.
                    .voice-visual(aria-hidden='true')
                        i.bi.bi-mic-fill
                        span.wave.wave-one
                        span.wave.wave-two
                        span.wave.wave-three
                    .brand-metrics
                        .metric-card
                            strong Voz
                            span Interacción natural durante la atención
                        .metric-card
                            strong Inteligencia Artificial
                            span Asistencia integrada al flujo clínico
                        .metric-card
                            strong Odontología
                            span Herramientas claras para tu práctica
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
        background: rgba(var(--color-primary-rgb), 0.2)
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
    background: linear-gradient(145deg, #071b40 0%, #092d66 52%, #38208f 100%)
    color: white
    border-radius: 34px
    box-shadow: 0 28px 60px rgba(7, 27, 64, 0.26)
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
        color: #ccefff

.voice-visual
    position: relative
    display: grid
    place-items: center
    width: 6rem
    height: 6rem
    margin: 0.5rem auto
    border-radius: 50%
    color: white
    background: var(--gradient-voice)
    box-shadow: 0 0 0 0.75rem rgba(0, 212, 255, 0.08), 0 18px 40px rgba(0, 140, 255, 0.3)
    i
        position: relative
        z-index: 2
        font-size: 2rem
    .wave
        position: absolute
        inset: -0.65rem
        border: 1px solid rgba(0, 212, 255, 0.36)
        border-radius: 50%
    .wave-two
        inset: -1.25rem
        opacity: 0.64
    .wave-three
        inset: -1.85rem
        opacity: 0.34

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
    .voice-visual
        width: 5rem
        height: 5rem
</style>
