export function isNumber($event){
    let charCode = ($event.keyCode ? $event.keyCode : $event.which);
     // Only Numbers 0-9
     if ((charCode < 48 || charCode > 57)) {
       $event.preventDefault();
     }
 }
 export function isLetter($event){
   let char = String.fromCharCode($event.keyCode);
   // Only Numbers a-z or A-Z
   let reg =/^[a-záéíóú ,.'-]+$/i;
   if ((reg.test(char))) {
       return true;
   } else {
     $event.preventDefault();
   }

 }