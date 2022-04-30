<script setup>

import Formulario from './Formulario.vue'
import Registro from './Registro.vue'
//import {dialog} from '../../store/admision'
import {ChangeHallazgo,VerDemo} from '../../store/OdontoJS'
</script>
<template>
<h1>Demo</h1>
<div class="container">
    <input id="tipoReg" type="hidden" value="0"/>
<Row>
  <Col>
  <h4>Hallazgo:</h4>
  <select class="form-control" id="comboHallazgo" >
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
  <select class="form-control" id="comboHallazgoTipo">
    <option selected>:::Seleccione:::</option>
    <option value="Vestibular">Vestibular</option>
    <option value="Distal">Distal</option>
    <option value="Oclusal">Oclusal</option>
    <option value="Mesial">Mesial</option>
    <option value="Palatino">Palatino</option>
  </select>
  </Col>
  <Col>
  <h4>Pieza:</h4>
  <select class="form-control" id="comboPieza" @change="VerDemo($event)">
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
</Row>
<Row>
    <Col></Col>
    <Col>
      <canvas id="myCanvas" width="500" height="400" style="border: 0; left:0px; top:0px;"></canvas>    
    </Col>
      <Col></Col>
</Row>
 <!-- <Button @click="dialog=true"> Nuevo </Button>
  <Formulario :open='dialog' />
  <Registro />
  -->
</div>
</template>