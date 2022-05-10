const unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
const decenaTo19 = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis','diecisiete','dieciocho','diecinueve'];
const decenas = ['veinte','treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];


export function convertToText(number) {
    return getName(number);
}
function getName(number) {
    if (number.length === 1) {
        return getUnits(number);
    }
    if (number.length === 2) {
        return getTens(number);
    }
    return 'numero';
}

function getUnits(number) {
    let numberInt = parseInt(number);
    return unidades[numberInt];
}

function getTens(number) {
    let unidades = number.charAt(1);
    if (Number(number) < 20) {
        return decenaTo19[number - 10];
    }
    if (Number(number) < 30) {
        return 'veinti' + getUnits(unidades);
    }
    let name = decenas[number.charAt(0)-2];
    if (unidades > 0) {
        name += ' y ' + getUnits(unidades);
    }
    return name;
}