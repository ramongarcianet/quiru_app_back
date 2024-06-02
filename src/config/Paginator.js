
import { ref } from 'vue';
const pageSize = 50;
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
export function searchPrecio(registro) {
    var input, searchValue;
    input = document.getElementById("SearchInput");
    searchValue = input.value.toUpperCase();
    let tempRecipes = registro;
    let completo = "";
    if (tempRecipes != undefined) {
        tempRecipes = tempRecipes.filter((item) => {
            completo = item.tipo + ' ' + item.precio;
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
export function setList(registro,page) {
    curPage=page;
    if (registro != undefined) {
        registro_.value = registro.filter((row, index) => {
            row['fila']=index+1
            let start = (curPage - 1) * pageSize;
            let end = curPage * pageSize;
            if (index >= start && index < end) return true;
        });
    }
    else {
        registro_.value = [];
    }
}
export function setListDelete(registro) {
    let paginas = Math.trunc(registro.length / pageSize);
    let resto = ((registro.length % pageSize) > 0) ? 1 : 0;
    paginas = paginas + resto;
    if (curPage > paginas) {
        curPage = curPage - 1;
    }
    if (registro != undefined) {
        registro_.value = registro.filter((row, index) => {
            row['fila']=index+1
            let start = (curPage - 1) * pageSize;
            let end = curPage * pageSize;
            if (index >= start && index < end) return true;
        });
    }
    else {
        registro_.value = [];
    }
}
export function previousPage(registro) {
    if (registro != undefined) {
        //if (curPage > 1) curPage--;
        curPage = 1;
        setList(registro,curPage);
    }
}

export function nextPage(registro) {
    if (registro != undefined) {
        //if ((curPage * pageSize) < registro.length) curPage++;
        let paginas = Math.trunc(registro.length / pageSize);
        let resto = ((registro.length % pageSize) > 0) ? 1 : 0;
        curPage = paginas + resto;
        setList(registro,curPage);
    }
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
export function SetPage(registro,page) {
    if (registro != undefined) {
        curPage=page;
        setList(registro,curPage);
    }
}