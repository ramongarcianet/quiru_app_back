<script setup>

import {
  diagnostico,
  tratamiento,
  procesar,
  limpiar,
  agregarLista,
  isSpeech,
  terminar,
} from "../../store/odontograma";
import {ChangeHallazgo,VerDemo,clearcanvas} from '../../store/OdontoJS'
import {obtenerTodos, registro,  eliminar,  guardar, obtenerTodoDiccionario, obtenerTodoPieza,obtenerTodoHallazgo,obtenerTodoCaries} from '../../store/odonto'
/*
const listaDiccionario = obtenerTodoDiccionario()
const listaPieza = obtenerTodoPieza()
const listaHallazgo= obtenerTodoHallazgo()
const listaCaries = obtenerTodoCaries()
*/
const listaDiccionario = obtenerTodoDiccionario();
const listaPieza = obtenerTodoPieza();
const listaHallazgo = obtenerTodoHallazgo();
const listaCaries = obtenerTodoCaries();
</script>
<template>
<h1>Demo</h1>
<div class="container">
    <input id="tipoReg" type="hidden" value="0"/>
  <Row>
    <Col>
        <div class="col-sm-12 col-md-12 col-lg-12" style="text-align:center;">

             <button v-if='!isSpeech' type="submit" class="NotpulsingButton" style="visibility:visible;" id="btnActivar" @click="procesar()" >
                <i class="fa fa-microphone" ></i>
            </button>
            <button v-if='isSpeech' type="submit" class="pulsingButton" style="visibility:visible;" id="btnEscuchando" @click="procesar()">
                <div class="pulse-ring">
                    <svg width="60" height="60" viewBox="40 0 150 300">
                        <polyline stroke-linejoin="round" points="50,150 125,50 200,150" stroke="white" stroke-width="25" fill="none"></polyline>
                        <polyline stroke-linejoin="bevel" points="50,250 125,150 200,250" stroke="white" stroke-width="25" fill="none"></polyline>
                    </svg>
                </div>
                <i class="fa fa-microphone" ></i>
            </button>
        </div>
    </Col>

</Row>
<Row>
  <Col>
  <h4>Hallazgo:</h4>
  <select class="form-select" id="comboHallazgo" >
    <option selected>:::Seleccione:::</option>
    <option value="caries">Caries</option>
    <option value="extraccion">Extracción</option>
    <option value="ausente">Ausente</option>
    <option value="fractura">Fractura</option>
    <option value="restauracion">Restauración</option>
  </select>
  </Col>
   <Col>
  <h4>Tipo Caries:</h4>
  <select class="form-select" id="comboHallazgoTipo">
    <option selected>:::Seleccione:::</option>
    <option value="vestibular">Vestibular</option>
    <option value="distal">Distal</option>
    <option value="oclusal">Oclusal</option>
    <option value="mesial">Mesial</option>
    <option value="palatino">Palatino</option>
  </select>
  </Col>
  <Col>
  <h4>Pieza:</h4>
  <select class="form-select" id="comboPieza" @change="VerDemo($event)">
  <option selected>:::Seleccione:::</option>
  <option value="11">11</option>
  <option value="12">12</option>
  <option value="13">13</option>
  <option value="14">14</option>
  <option value="15">15</option>
  <option value="16">16</option>
  <option value="17">17</option>
  <option value="18">18</option>
  <option value="21">21</option>
  <option value="22">22</option>
  <option value="23">23</option>
  <option value="24">24</option>
  <option value="25">25</option>
  <option value="26">26</option>
  <option value="27">27</option>
  <option value="28">28</option>
  <option value="31">31</option>
  <option value="32">32</option>
  <option value="33">33</option>
  <option value="34">34</option>
  <option value="35">35</option>
  <option value="36">36</option>
  <option value="37">37</option>
  <option value="38">38</option>
  <option value="41">41</option>
  <option value="42">42</option>
  <option value="43">43</option>
  <option value="44">44</option>
  <option value="45">45</option>
  <option value="46">46</option>
  <option value="47">47</option>
  <option value="48">48</option>
  <option value="51">51</option>
  <option value="52">52</option>
  <option value="53">53</option>
  <option value="54">54</option>
  <option value="55">55</option>
  <option value="61">61</option>
  <option value="62">62</option>
  <option value="63">63</option>
  <option value="64">64</option>
  <option value="65">65</option>
  <option value="71">71</option>
  <option value="72">72</option>
  <option value="73">73</option>
  <option value="74">74</option>
  <option value="75">75</option>
  <option value="81">81</option>
  <option value="82">82</option>
  <option value="83">83</option>
  <option value="84">84</option>
  <option value="85">85</option>
  </select>
  </Col>
  <Col><h4><br></h4><Button @click="clearcanvas('cvDemo')"> Limpiar </Button></Col>
</Row>
<Row>
    <Col></Col>
    <Col>
      <canvas id="cvDemo" width="500" height="400" style="border: 0; left:0px; top:0px;"></canvas>
      <table border="0" style="display: none;">
                <tr>
                <td colspan="6" style="border: 0px; width: 240px;">
                  <canvas id="cvhallazgo" width="150" height="200" style="">Su navegador no soporta canvas :( </canvas>
                <input id="piezatopcar" type="hidden" value="0"/>
                <button class="btn btn-primary start" ID="btntopcar" value="0" Style="width: 100%; height: 60px; border-radius: 90% 90% 0% 0%; "
                @click="DienteCaries('btntopcar')">
                Vestibular
                </button>
                </td>
                </tr>
                <tr>
                <td colspan="2" style="border: 0px; width: 80px;">
                <input id="piezaleftCar" type="hidden" value="0"/>
                <button class="btn btn-primary start" ID="btnleftCar" value="0" Style="width: 100%; height:60px;" @click="DienteCaries('btnleftCar')">Distal</button>
                </td>
                <td colspan="2" style="border: 0px; width: 80px;">
                <input id="piezacenterCar" type="hidden" value="0"/>
                <button class="btn btn-primary start" ID="btncenterCar" value="0" Style="width: 100%; height:60px;" @click="DienteCaries('btncenterCar')">Oclusal</button>
                </td>
                <td colspan="2" style="border: 0px; width: 80px;">
                <input id="piezarigthCar" type="hidden" value="0"/>
                <button class="btn btn-primary start" ID="btnrigthCar" value="0" Style="width: 100%; height:60px;" @click="DienteCaries('btnrigthCar')">Mesial</button>
                </td>
                </tr>
                <tr>
                <td colspan="6" style="border: 0px; width: 240px;">
                <input id="piezabotCar" type="hidden" value="0"/>
                <button class="btn btn-primary start" ID="btnbotCar" value="0" Style="width: 100%; height: 60px; border-radius: 0% 0% 90% 90%;" @click="DienteCaries('btnbotCar')">Palatino</button>
                </td>
                </tr>
                </table>
    </Col>
    <Col></Col>
</Row>

</div>
</template>

<style>
    .botonMicrofono {
        border: none;
        background: transparent
    }

    .imagenMicrofonoActivar {
        height: 37px;
        width: 16px;
    }

    .imagenMicrofonoEscuchar {
        height: 37px;
        width: 31px;
        margin: auto
    }

    .dataTables_wrapper .dataTables_filter {
        float: right;
        text-align: right;
        visibility: hidden;
    }


.NotpulsingButton {
    border: none;
    padding: 0;
    border-radius: 100%;
    width: 70px;
    height: 70px;
    font-size: 3em;
    color: #fff;
    padding: 0;
    margin: 0;
    background: rgb(139, 199, 252);
    position: relative;
    z-index: 999;
    display: inline-block;
    line-height: 100px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
}
.pulsingButton {
    border: none;
    padding: 0;
    border-radius: 100%;
    width: 70px;
    height: 70px;
    font-size: 3em;
    color: #fff;
    padding: 0;
    margin: 0;
    background: red;
    position: relative;
    z-index: 999;
    display: inline-block;
    line-height: 100px;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
}

.pulse-ring {
    content: '';
    width: 70px;
    height: 70px;
    background: #189BFF;
    border: 5px solid #189BFF;
    border-radius: 50%;
    position: absolute;
    top: 0px;
    left: 0px;
    animation: pulsate infinite 1.5s;
}

@-webkit-keyframes pulsate {
    0% {
        -webkit-transform: scale(1, 1);
        opacity: 1;
    }

    100% {
        -webkit-transform: scale(1.3, 1.3);
        opacity: 0;
    }
}

.modal-header {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: start;
  align-items: flex-start;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
}

.modal-header .close {
  padding: 1rem 1rem;
  margin: -1rem -1rem -1rem auto;
}

.modal-title {
  margin-bottom: 0;
  line-height: 1.5;
}

.modal-body {
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1rem;
}

.modal-footer {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 1rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: 0.3rem;
  border-bottom-left-radius: 0.3rem;
}
      #myCanvas {
        border: 1px solid #9C9898;
      }
      #myCanvas2 {
        border: 1px solid #9C9898;
      }
      #myCanvas3 {
        border: 1px solid #9C9898;
      }
      #myCanvas4 {
        border: 1px solid #9C9898;
      }
</style>