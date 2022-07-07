
import { ref } from 'vue';
export let msgemail="";
export function validateEmail() {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)) {
        msgemail= 'Please enter a valid email address';
    } else {
        msgemail = '';
    }
}