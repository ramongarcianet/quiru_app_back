<script setup>
import { useRouter } from "vue-router";
import { item, iniciarSesion, logGoogle } from "../../store/sesion";
import { ref } from "vue";

const { push } = useRouter();
const mensaje = ref("");
const iniciarConGoogle = async () => {
    mensaje.value = "";
    try {
        await logGoogle();
    } catch (error) {
        mensaje.value = error;
    }
};
</script>

<template lang="pug">
.auth-card.section-card
    .auth-header
        span.eyebrow Acceso seguro
        h1 Bienvenido a Quiru
        p.text-muted-ui Ingresa a tu espacio de trabajo clínico para continuar con pacientes, agenda y seguimiento.
    Form(:onPromise='()=>iniciarSesion(item)' :onCatch='error => mensaje = error')
        .form-grid
            .field
                label.form-label Correo electrónico
                input.form-control.mb-2(placeholder="tu@clinica.com" v-model='item.email' type='email' required)
            .field
                .field-head
                    label.form-label Contraseña
                    button.link-button(type='button' @click='push({name: "reset-contrasena"})') Olvidé mi contraseña
                input.form-control.mb-1(placeholder="********" v-model='item.password' type='password' required)
        p.alert.alert-danger.alert-dismissible.mt-3(v-if='mensaje') {{mensaje}}
        .auth-actions
            button.btn.btn-primary.w-100(type='submit') Iniciar sesión
            button.btn.btn-outline-primary.w-100(type='button' @click='push({name: "registro"})') Crear cuenta
            button.link-button.mx-auto(type='button' @click='push({name: "politica-privacidad"})') Política de privacidad
    .divider
        span o continúa con
    .loginRedes
        button.google-button(type='button' @click='iniciarConGoogle()')
            i.bi.bi-google
            span Iniciar con Google
</template>

<style lang="sass" scoped>
.auth-card
    width: 100%
    max-width: 36rem
    padding: 2rem
    margin: auto

.auth-header
    margin-bottom: 1.5rem
    h1
        margin: 0.8rem 0 0.5rem
        font-size: clamp(2rem, 4vw, 2.7rem)
        font-weight: 800
        color: var(--color-dark)
    p
        margin: 0
        line-height: 1.6

.form-grid
    display: flex
    flex-direction: column
    gap: 0.75rem

.field
    display: flex
    flex-direction: column

.field-head
    display: flex
    align-items: center
    justify-content: space-between
    gap: 1rem

.auth-actions
    display: flex
    flex-direction: column
    gap: 0.9rem
    margin-top: 1.25rem

.link-button
    padding: 0
    border: none
    background: transparent
    color: var(--color-primary-tint)
    font-weight: 700

.divider
    display: flex
    align-items: center
    gap: 0.85rem
    margin: 1.35rem 0 1rem
    color: var(--color-dark-soft)
    font-size: 0.92rem
    &::before, &::after
        content: ''
        height: 1px
        flex: 1
        background: var(--color-border)

.loginRedes
    display: flex
    justify-content: center

.google-button
    width: 100%
    display: inline-flex
    justify-content: center
    align-items: center
    gap: 0.75rem
    padding: 0.95rem 1rem
    color: white
    border: none
    border-radius: 18px
    background: linear-gradient(135deg, #df6a4f 0%, #b84a32 100%)
    box-shadow: 0 16px 30px rgba(184, 74, 50, 0.24)

@media (max-width: 575px)
    .auth-card
        padding: 1.25rem
    .field-head
        align-items: flex-start
        flex-direction: column
</style>
