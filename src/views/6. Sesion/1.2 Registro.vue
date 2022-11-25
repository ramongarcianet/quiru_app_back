<script setup>
import { useRouter } from "vue-router";
import { item, crearCuenta } from "../../store/sesion";
import {ref} from 'vue'
const { push } = useRouter();
const verificacion = (item) => {
    if(item.password == item.contrasena){
        crearCuenta(item)
        var malaContrasena = document.getElementById('malaContraseña');
        malaContrasena.style.display = 'none';
    }else{
        var malaContrasena = document.getElementById('malaContraseña');
        malaContrasena.style.display = 'block';
    }
}
const mensaje = ref('')

</script>

<template lang="pug">
.derecha
    .centrar
        h2.text-center.mt-4(style="color:#395D56") Bienvenido
        h2.text-center.light-text Registro de nuevo usuario
        Form( :onPromise='()=>verificacion(item)' :onCatch='()=>mensaje = "Mal"') 
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
            button.btn.btn-outline-light.m-1( type='submit') Registrarme
            button.btn.btn-outline-light.m-2( type='button' @click='push({name: "iniciar-sesion"})' style="border: 0!important;") Iniciar sesión
            p.alert.alert-danger.alert-dismissible(v-if='mensaje') {{mensaje}}

</template>
<style lang="sass" scoped>

.derecha
        background: #37DFBB
        border-top-left-radius: 42px
        border-top-right-radius: 42px
form
    padding:5px 25px
    display: flex
    flex-direction: column
    background: #37DFBB

@media (min-width: 575px)
    .derecha
        background: #37DFBB
        border-top-left-radius: 35px
        border-bottom-left-radius: 35px
        border-top-right-radius: 0
        height: 100vh
        width: 100%
    .centrar
        padding: 5% 10%
        form
            padding: 0px 60px
            .row
                padding: 0px 40px
</style>
