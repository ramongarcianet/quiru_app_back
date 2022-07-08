
import { ref } from 'vue';
const pageSize = 10;
let curPage = 1;
export let registro_ = ref([])
export function search(registro) {
    var input, searchValue;
    input = document.getElementById("SearchInput");
    searchValue = input.value.toUpperCase();
    let tempRecipes = registro;
    let completo = "";
    if (tempRecipes != undefined) {
        tempRecipes = tempRecipes.filter((item) => {
            completo = item.tipoDocumento + ' ' + item.numeroDocumento + ' ' + item.nombre + ' ' + item.apellidoPaterno + ' ' + item.apellidoMaterno;
            return completo
                .toUpperCase()
                .includes(searchValue.toUpperCase())
        });
    }
    registro_.value = tempRecipes.filter((row, index) => {
        let start = (curPage - 1) * pageSize;
        let end = curPage * pageSize;
        if (index >= start && index < end) return true;
    });
}

export function setList(registro) {
    let result = '';
    registro_.value = registro.filter((row, index) => {
        let start = (curPage - 1) * pageSize;
        let end = curPage * pageSize;
        if (index >= start && index < end) return true;
    });
}
export function previousPage(registro) {
    if (curPage > 1) curPage--;
    setList(registro);
}

export function nextPage(registro) {
    if ((curPage * pageSize) < registro.length) curPage++;
    setList(registro);
}
export function searchDiccionario(registro) {
    var input, searchValue;
    input = document.getElementById("SearchInput");
    searchValue = input.value.toUpperCase();
    let tempRecipes = registro;
    let completo = "";
    if (tempRecipes != undefined) {
        tempRecipes = tempRecipes.filter((item) => {
            completo = item.codigo + ' ' + item.descripcion;
            return completo
                .toUpperCase()
                .includes(searchValue.toUpperCase())
        });
    }
    registro_.value = tempRecipes.filter((row, index) => {
        let start = (curPage - 1) * pageSize;
        let end = curPage * pageSize;
        if (index >= start && index < end) return true;
    });
}