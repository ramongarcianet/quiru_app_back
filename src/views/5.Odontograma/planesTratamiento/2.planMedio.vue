<script setup>
import { onUnmounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { guardar, actualizar, leerEnRegistro, obtenerTodos, registro }  from '../../../store/planTratamiento.js'
import { leerOdonto, registroodonto } from "../../../store/formodontograma.js";

const route = useRoute()
const { back } = useRouter()
const idPaciente = route.params.idPaciente
const idOdontograma = route.params.idOdontograma
const tipoOdontograma = route.params.tipoOdonto
/*var idSolucionDiag = ''
var idSolucionTrat = ''
if(tipoOdontograma === 'Diagnóstico') {
  idSolucionDiag = idOdontograma
  }else{
    idSolucionTrat = idOdontograma
  }*/
const item = ref({
    descripDiagnostico: '',
    descripPlan: '',
    idPac: idPaciente,
    detallePlan: [],
    id: '',
})
console.log(item)
//leerOdonto(idOdontograma)
//console.log(registroodonto.value)

const limpiar = () => {
    item.value = {
      descripDiagnostico: '',
      descripPlan: '',
      idPac: idPaciente,
      detallePlan: [],
      id: '',
    }
}
const agregarAlPlan = (item) => {
  return guardar(item)
};
obtenerTodos()
</script>
