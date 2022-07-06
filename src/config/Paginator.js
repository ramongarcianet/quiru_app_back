
import { ref } from 'vue';
const pageSize = 6;
let curPage = 1;
export let registro_ = ref([])
export function search(registro) {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("SearchInput");
    filter = input.value.toUpperCase();
    /**/
    table = document.getElementById("ListData");
    tr = table.getElementsByTagName("tr");
    for (i = 2; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0].textContent || tr[i].getElementsByTagName("td")[0].innerText;
        td = td + tr[i].getElementsByTagName("td")[1].textContent || tr[i].getElementsByTagName("td")[1].innerText;
        td = td + tr[i].getElementsByTagName("td")[2].textContent || tr[i].getElementsByTagName("td")[2].innerText;

        if (td) {
            txtValue = td;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
    
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