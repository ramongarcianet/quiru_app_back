<script setup>
import { useRouter } from "vue-router";
import {ref} from 'vue'
import { item, resetContraseña } from "../../store/sesion";
const { push } = useRouter();
const mensaje = ref('')
</script>

<template lang="pug">
.derecha
    .centrar
        h2.text-center.mt-4 QUIRU Dent AI
        h1.text-center.light-text Recupera tu contraseña
        Form( :onPromise='()=>resetContraseña(item)' :onSuccess='()=>mensaje = "Correo enviado"' :onCatch='()=>mensaje = "Este correo no tiene una cuenta asociada a QUIRU Dent AI"')
            label.form-label Correo electrónico
            input.form-control.mb-2(placeholder="Ejemplo@gmail.com" v-model='item.email' type='email' required)
            .row
                button.btn.btn-primary.my-2(type='submit') Enviar
                button.btn.btn-outline-primary.mb-2(type='button' @click='push({ name: "iniciar-sesion" })') Volver al inicio
                p.alert.alert-danger.alert-dismissible(v-if='mensaje') {{mensaje}}

</template>

<style lang="sass" scoped>
.derecha
    padding:5px 25px
    background: white
    border: 1px solid var(--color-border)
    border-radius: var(--radius-card)
    box-shadow: var(--shadow-card)
    display: flex
    flex-direction: column
    width: 100%

@media (min-width: 575px)
    .derecha
        padding:0px 25px
        border-radius: var(--radius-card)
        width: 100%
        height: auto
    .centrar
        padding: 22% 10%
        form
            padding: 0px 60px
            .row
                padding: 0px 80px

</style>
