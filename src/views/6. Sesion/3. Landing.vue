<script setup>
import { useRouter } from "vue-router";
import Logo from "../../assets/logoQuiru.vue"

const {push} = useRouter()

let beneficios = [
    { beneficio: "Gestiona tus pacientes", descripcion: "Maneja la lista de tus pacientes de forma rápida y sencilla",    icono:"https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fgestion-pacientes.webp?alt=media&token=b7af13fd-834c-4945-9d53-c9e71bc59370"},
    { beneficio: "Maneja historias clínicas", descripcion: "Obtén los datos e información de tus pacientes",    icono:"https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fhistorias-clinicas.webp?alt=media&token=f4b99332-0b76-47d7-880a-a797871beff6"},
    { beneficio: "Asistente de voz", descripcion: "LLenar a mano está en el pasado, tu asistente de voz se encarga",    icono:"https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FAsistente-de-voz.webp?alt=media&token=e8ca81fb-bed4-489d-a115-34cc92090bfc"},
    { beneficio: "Llenado de odontogramas", descripcion: "Quiru se encarga de llenar de forma automática los odontogramas",    icono:"https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FOdontogramas-_1_.webp?alt=media&token=d0cac0ed-5a0b-46f1-9896-1b47507990b1"},
    { beneficio: "Evita perdidas de información", descripcion: "Con quiru no tendrás que manejar tanto papeleo, todo en un solo lugar",    icono:"https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fevitar-perdida-de-informacion.webp?alt=media&token=b3c6d1ca-7b90-4d94-9f9d-7f55d4125e6b"},

]
</script>
<template lang="pug">
nav.w-100
    .container.d-flex.w-100
        img(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/Group%2073%20(1).png?alt=media&token=13f628f8-46ea-41f4-a4f4-b4d2aa604323")
        .d-none.d-md-flex.align-items-center
            h4 Beneficios
            h4 Precio
            h4 Producto
            h4 Contacto
        buttom.ms-auto Probar
//-Primer segmento     
.container-fluid.primerSegmento
    .container
        .row
            .col-12.col-md-5.d-flex.flex-column.justify-content-center
                h1 Atiende a más pacientes y aumenta tus 
                    span ganancias
                span Olvídate de escribir notas o quitarte los guantes para hacer tus anotaciones y diagnósticos. Usa quiru tu nuevo asistente de voz y enfócate en brindar el mejor servicio a tus pacientes. 
                Input(type="text" placeholder="Ingresa tu correo electrónico").formulario
            .col-12.col-md-7.d-flex.align-items-end
                img(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FPortada-img.webp?alt=media&token=487cd780-bfe7-490f-a52a-7cb5033f673f")
//-Segundo segmento                       
.container-fluid.mb-5.mt-5
    .container
        .row
            .col-12.col-md-5.d-flex.flex-column.justify-content-start.beneficios
                h1 Beneficios por  
                    span usar Quiru
                span Tu nuevo asistente virtual reduce hasta un 75% en toma de datos en el registro de odontogramas, con ello te puedes enfocar en atender más pacientes    
        .row
            .col-12.col-md-6.h-100.d-flex.align-items-end.mt-5
                img(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FGroup-74-_2_.webp?alt=media&token=3e4e327a-4ab1-47ad-8ad5-0b6eda3c8825")
            .col-12.col-md-6.mt-5
                ul
                    li.beneficios-items.d-flex.align-items-center(v-for='i of beneficios')
                        img.icono(:src='i.icono')
                        .beneficio
                            h2 {{i.beneficio}}
                            span {{i.descripcion}}
//-Tercer segmento                   
.container-fluid.mb-5.mt-5
    .container
        .row
            .col-12.col-md-5.d-flex.flex-column.justify-content-center.align-items-start.beneficios
                ul.m-0.p-0
                    li.beneficios.d-flex.align-items-center.mb-4
                        h1 Tu nuevo asistente de 
                            span voz 
                        img.icono(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FAsistente-de-voz.webp?alt=media&token=e8ca81fb-bed4-489d-a115-34cc92090bfc")
                span Hola Quiru, será tu nueva forma de hacer tus anotaciones y diagnósticos. Desde registro de nuevos clientes hasta el llenado de tus odontogramas. Ádemas de manejar un historial clínico de tus pacientes.
                .cta.mt-5 Iniciar prueba
            .col-12.col-md-7.h-100.d-flex.align-items-end
                img(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FGroup-74-_3_.webp?alt=media&token=36a5ae62-c1d3-4989-8a0a-207cd288c06d")
//-Cuarto segmento                   
.container-fluid.mb-5.mt-5
    .container
        .row
            .col-12.col-md-7.h-100.d-flex.align-items-start
                img(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FAdmisi195179n_1_.webp?alt=media&token=f8d83ba7-db19-4b23-9388-8eda84873db7")
            .col-12.col-md-5.d-flex.flex-column.justify-content-center.align-items-start
                ul.m-0.p-0
                    li.beneficios.d-flex.align-items-center.mb-4
                        h1 Gestión de tus 
                            span pacientes 
                        img.icono(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fgestion-pacientes.webp?alt=media&token=b7af13fd-834c-4945-9d53-c9e71bc59370")
                span Ten el control total de tus citas y pacientes.  Te ayudamos a organizar su información en un solo panel, para que tu te puedas enfocar en brindar el mejor servicio e incrementes la cantidad de pacientes que puedes atender
                .cta.mt-5 Iniciar prueba
//-quinto segmento                   
.container-fluid.mb-5.mt-5
    .container
        .row
            .col-12.col-md-5.d-flex.flex-column.justify-content-center.align-items-start.beneficios
                ul.m-0.p-0
                    li.beneficios.d-flex.align-items-center.mb-4
                        h1 No pierdas  
                            span información 
                        img.icono(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fevitar-perdida-de-informacion.webp?alt=media&token=b3c6d1ca-7b90-4d94-9f9d-7f55d4125e6b")
                span Olvídate del papeleo y accede a la información que necesitas de tu paciente en un solo lugar. Quiru es ideal para odontólogos independientes que buscan atender a más pacientes y reducir su tiempo por atención.
                .cta.mt-5 Iniciar prueba
            .col-12.col-md-7.h-100.d-flex.align-items-end
                img(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FAPP-2.webp?alt=media&token=1ecd739b-f318-4765-8837-52365fb33d8e")                                              
//-Sexto segmento                   
.container-fluid.mb-5.mt-5
    .container
        .row
            .col-12.col-md-6.d-flex.flex-column.justify-content-start
                h1 Forma parte de los primeros usuarios y obtén
                    span ¡Beneficios!
            .col-12.col-md-6.d-flex.flex-column.justify-content-center.align-items-start
                span Tenemos descuentos para los que se hayan inscrito hasta del 30% en los primeros meses de usar Quiru. Válido hasta 00/00/00. Déjanos tus datos para darte el acceso y puedas probar esta nueva forma de atender a tus pacientes
                .cta.mt-5 Iniciar prueba
        .row.d-flex.justify-content-center.align-items-center
            .col-12.col-md-6.align-items-center.mt-5
                img.imgDescuentos(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fdescuentos.webp?alt=media&token=681a5c26-f1d3-4c94-a99e-09452c2dddd5 ")
//-septimo segmento                   
.container-fluid.mt-5.primerSegmento
    .container.mb-5
        .row
            .col-12.col-md-8.d-flex.flex-column.justify-content-center.align-items-start.beneficios
                ul.m-0.p-0
                    li.beneficios.d-flex.align-items-center.mb-4
                        h1 Te gustaria usar quiru, pero aun tienes   
                            span dudas 
                        img.icono(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2Fevitar-perdida-de-informacion.webp?alt=media&token=b3c6d1ca-7b90-4d94-9f9d-7f55d4125e6b")
                span Agenda una breve reunión con nosotros para resolver todas tus dudas,  con confianza. Atendemos todas las consultas que tengas.
                .cta.mt-5 conversemos
            .col-12.col-md-4.h-100.d-flex.align-items-end
                .row.justify-content-center.align-items-center
                    .col-6
                        img(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/quiru%2FComponent_2_1_.webp?alt=media&token=8740ea24-eef3-468f-969b-50cc4a6ff35c")                                            
//-footer
.container-fluid.mt-2.mb-2
    .container.d-flex.w-100
        .row 
            .col-12.col-md-5.d-flex.flex-column.justify-content-center.align-items-center
                img(src="https://firebasestorage.googleapis.com/v0/b/app-keepers.appspot.com/o/Group%2073%20(1).png?alt=media&token=13f628f8-46ea-41f4-a4f4-b4d2aa604323")
                small 2022 Quiru | Trujillo - Perú
            
</template>

<style scoped lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap')
*
    font-family: 'Poppins', sans-serif
.container-fluid
    overflow-x: hidden

.imgDescuentos
    width: 500px
    height: auto
    object-fit: cover
.cta
    width: 180px
    height: 40px
    border-radius: 50px
    background-color: #37DFBB
    border: 0px
    display: flex
    align-items: center
    text-align: center
    justify-content: center
    color: #ffffff
    font-size: 14px
    font-weight: 600
    cursor: pointer
nav
    position: fixed
    top: 0
    left: 0
    background-color: #ffffff
    height: 100px
    display: flex
    align-items: center
    img
        width: 120px!important
        height: auto
    h4
        cursor: pointer
        color: #37DFBB
        margin: 0 2rem
        font-weight: 400
        &:hover
            font-weight: 800
    buttom
        width: 180px
        height: 40px
        border-radius: 50px
        background-color: #37DFBB
        border: 0px
        display: flex
        align-items: center
        text-align: center
        justify-content: center
        color: #ffffff
        font-size: 14px
        font-weight: 600
.primerSegmento
    width: 100%
    padding-top: 5rem
    background: linear-gradient(to bottom, rgba(255,255,255,1) 39%, rgba(190,245,234,1) 87%)
.container    
    h1
        color: var(--color-primary)
        font-size: 3em
        font-weight: 700
        line-height: 65px
        margin-bottom: 25px
        > span
            color: var(--color-dark)
    p
        color: var(--color-dark)
        font-size: 14px
        font-weight: 400
    input
        max-width: 420px
        width: calc(100% - 2rem)
        height: 50px
        border-radius: 50px
        border: 1px solid var(--color-primary)
        margin-top: 30px
        margin-bottom:  25px 
        &:active 
            background-color: blue
            transition: background-color 1s
    img
        width: 100%
.beneficios
    >h1
        font-size: 31px
        line-height: 35px
        color: var(--color-primary)
        font-weight: 700
        >span
            color: var(--color-dark)
            font-weight: 700
    .icono
        margin-left: 25px
        margin-right: 5px
        width: 60px
        height: auto
.beneficios-items
    display: flex
    flex-direction: row
    margin-bottom: 30px 
    .icono
        margin-right: 15px
        width: 50px
        height: auto
    .beneficio
        display: flex
        flex-direction: column
        align-items: start
        justify-content: start
        >h2 
            margin:  0px !important
            color: var(--color-primary)
</style>
