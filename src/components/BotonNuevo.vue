<script setup>
import {ref, watchEffect} from 'vue'
const props = defineProps(['onSuccess'])

</script>
<template lang='pug'>

button(onclick="document.getElementById('id01').style.display='block'")
    i.fa-solid.fa-trash
#id01.modal
  span.close(onclick="document.getElementById('id01').style.display='none'" title='Close Modal') &times;
  .modal-content.modal-sm
    .container
      h1 Eliminar Paciente
      p ¿Está seguro que desea eliminar?
      .clearfix
        button.cancelbtn(type='button' onclick="document.getElementById('id01').style.display='none'") Cancelar
        button.deletebtn(type='button' onclick="document.getElementById('id01').style.display='none'") Eliminar

</template>
<style scoped>

body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box;}

#id01 {
  background-color: rgba(0,0,0,0.6);
}
  
button {
  margin-top: 6px;
  border: none;
  opacity: 0.85;
  background: none;
}

.cancelbtn, .deletebtn {
  float: left;
  width: 50%;
}
.cancelbtn {
  background-color: rgb(189, 189, 189);
  color: black;
}

.deletebtn {
  background-color: #f44336;
}

.container {
  padding: 16px;
  text-align: center;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  opacity: 1;
  padding-top: 50px;
  
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; 
  border: 1px solid #888;
  width: 80%; 
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}
 
.close {
  position: absolute;
  right: 35px;
  top: 15px;
  font-size: 40px;
  font-weight: bold;
  color: #f1f1f1;
}

.close:hover,
.close:focus {
  color: #f44336;
  cursor: pointer;
}

.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

@media screen and (max-width: 300px) {
  .cancelbtn, .deletebtn {
     width: 100%;
  }
}
</style>