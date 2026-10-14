<template lang="pug">
button.voice-button(type='button' v-bind='$attrs' aria-label='Asistente de voz')
    i.bi.bi-mic-fill(aria-hidden='true')
    span.voice-wave.voice-wave-one(aria-hidden='true')
    span.voice-wave.voice-wave-two(aria-hidden='true')
    span.visually-hidden Asistente de voz
</template>
<style lang="sass" scoped>
button
    --voice-size: var(--size, 4rem)
    position: relative
    display: grid
    place-items: center
    width: var(--voice-size)
    height: var(--voice-size)
    padding: 0
    border: 0
    border-radius: 50%
    color: white
    background: var(--gradient-brand)
    box-shadow: 0 10px 26px rgba(100, 59, 255, 0.3)
    i
        position: relative
        z-index: 2
        font-size: calc(var(--voice-size) * 0.38)
    .voice-wave
        position: absolute
        inset: -0.3rem
        border: 2px solid rgba(0, 212, 255, 0.42)
        border-radius: 50%
        opacity: 0
        pointer-events: none
    &.active
        background: var(--gradient-voice)
        box-shadow: 0 10px 28px rgba(0, 212, 255, 0.34)
        .voice-wave
            animation: voice-pulse 1.5s ease-out infinite
        .voice-wave-two
            animation-delay: 0.55s

@keyframes voice-pulse
    0%
        transform: scale(0.86)
        opacity: 0.75
    100%
        transform: scale(1.45)
        opacity: 0
</style>
