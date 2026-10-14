<script setup>
import { useRouter } from "vue-router";
import { item, crearCuenta } from "../../store/sesion";
import {ref} from 'vue'
const { push } = useRouter();
const verificacion = (item) => {
    if(item.password == item.contrasena){
        return crearCuenta(item)
    }else{
        var malaContrasena = document.getElementById('malaContraseña');
        malaContrasena.style.display = 'block';
        return new Promise(resolve => resolve())
    }
}
const mensaje = ref('')
</script>

<template lang="pug">
.derecha
    .centrar
        span.eyebrow Crea tu cuenta
        h2.text-center.mt-4 QUIRU Dent AI
        p.text-center.text-muted-ui Registro de nuevo usuario
        Form( :onPromise='()=>verificacion(item)' :onCatch='(e)=>mensaje = e') 
            label.form-label Nombre*
            input.form-control(placeholder="Nombre(s)" v-model.trim='item.nombre' maxlength="40" required)
            label.form-label Apellidos*
            .input-group
                input.form-control(placeholder="Paterno" v-model.trim='item.apellidoPaterno' maxlength="20" required)
                input.form-control(placeholder="Materno" v-model.trim='item.apellidoMaterno' maxlength="20" required)
            label.form-label Correo electrónico*
            input.form-control(placeholder="Ejemplo@gmail.com" v-model='item.email' type='email' required)
            label.form-label Contraseña*
            h6.mt-0 Ingrese min. 8 caracteres en combinación de números, minúsculas y mayúsculas
            input.form-control(pattern="(?=.*)(?=.*[a-z])(?=.*[A-Z]).{8,}" title='Ingrese min. 8 caracteres en combinación de números, minúsculas y mayúsculas' v-model='item.password' type='password' placeholder="********")
            label.form-label Vuelve a escribir tu contraseña*
            input.form-control(pattern="(?=.*)(?=.*[a-z])(?=.*[A-Z]).{8,}" title='Ingrese min. 8 caracteres en combinación de números, minúsculas y mayúsculas' v-model='item.contrasena' type='password' placeholder="********")
            label.ms-3(id="malaContraseña" style="display: none") La contraseña no coincide 
            button.btn.btn-primary.m-1(type='submit') Registrarme
            button.btn.btn-outline-primary.m-2(type='button' @click='push({name: "iniciar-sesion"})') Iniciar sesión
            p.alert.alert-danger.alert-dismissible(v-if='mensaje') {{mensaje}}

</template>
<style lang="sass" scoped>

.derecha
        padding: 1.5rem
        background: white
        border: 1px solid var(--color-border)
        border-radius: var(--radius-card)
        box-shadow: var(--shadow-card)
form
    padding:5px 25px
    display: flex
    flex-direction: column
    background: white

@media (min-width: 575px)
    .derecha
        background: white
        border-radius: var(--radius-card)
        height: auto
        width: 100%
    .centrar
        padding: 5% 10%
        form
            padding: 0px 60px
            .row
                padding: 0px 40px
</style>
