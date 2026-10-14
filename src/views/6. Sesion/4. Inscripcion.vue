<script setup>
import {ref, onMounted} from 'vue'
import marketing from "../../store/marketing";
import { useRouter, useRoute } from 'vue-router';
import BrandLogo from '../../components/BrandLogo.vue'

const { item, agregar } = marketing;
const mensajeDeRegistro = ref(false)
const {push} = useRouter()
const route = useRoute()

const registroExitoso = ()=> {
    mensajeDeRegistro.value = true
}

onMounted(()=>{
    item.value.codigo = route.params.codigo
})
</script>

<template lang="pug">
.lead-page
    .container.py-4.py-md-5
        .row.g-4.align-items-stretch
            .col-12.col-lg-6.d-flex
                .lead-card.section-card
                    BrandLogo(@click='push({ name: "landingConCodigo", params: {codigo: route.params.codigo} })')
                    span.eyebrow Acceso anticipado
                    h1 Hola, Doc.
                    p.text-muted-ui La versión completa saldrá muy pronto. Déjanos tu correo para enviarte el acceso y sumarte antes que nadie.
                    Form.d-flex.flex-column.w-100.mt-2(:onPromise='()=> agregar(item)' :onSuccess='()=>registroExitoso()')
                        .input-stack
                            input.form-control(type='email' required placeholder='Ingresa tu correo profesional' v-model='item.email')
                            button.btn.btn-primary(type='submit')
                                i.bi.bi-arrow-right.me-2
                                | Quiero mi acceso
                        p.coupon(v-if='item.codigo') Tu cupón activo:
                            strong  {{item.codigo}}
                        p.success(v-if='mensajeDeRegistro') Gracias, {{item.email}}. Te escribiremos para el lanzamiento de
                            strong  QUIRU Dent AI
            .col-12.col-lg-6
                .preview-card
                    .preview-visual
                        BrandLogo(inverse)
                    .preview-copy.glass-panel
                        strong Clínicas más organizadas
                        span Una experiencia visual más humana y una operación diaria más clara.
</template>

<style lang="sass" scoped>
.lead-page
    min-height: 100vh
    display: flex
    align-items: center

.lead-card
    width: 100%
    padding: 2rem
    display: flex
    flex-direction: column
    justify-content: center
    gap: 1rem
    h1
        margin: 0
        font-size: clamp(2.3rem, 4.6vw, 3.6rem)
        font-weight: 800
        color: var(--color-dark)
    p
        margin: 0
        line-height: 1.65

.input-stack
    display: flex
    flex-direction: column
    gap: 0.9rem
    margin-top: 0.5rem

.coupon
    margin-top: 1rem
    color: var(--color-primary-tint)
    font-weight: 700

.success
    margin-top: 1rem
    color: var(--color-dark)
    strong
        color: var(--color-primary-tint)

.preview-card
    position: relative
    height: 100%
    min-height: 28rem
    border-radius: 32px
    overflow: hidden
    box-shadow: var(--shadow-card)
    background: linear-gradient(145deg, #071b40 0%, #38208f 100%)

.preview-visual
    height: 100%
    min-height: 28rem
    display: flex
    align-items: center
    justify-content: center
    padding: 2rem

.preview-logo
    width: min(100%, 24rem)
    height: auto
    object-fit: contain

.preview-copy
    position: absolute
    left: 1.2rem
    right: 1.2rem
    bottom: 1.2rem
    padding: 1rem 1.1rem
    border-radius: 22px
    display: flex
    flex-direction: column
    gap: 0.35rem
    strong
        color: var(--color-dark)
    span
        color: var(--color-dark-soft)

.logo
    height: 3rem
    width: fit-content
    cursor: pointer

@media (max-width: 575px)
    .lead-card
        padding: 1.35rem
</style>
