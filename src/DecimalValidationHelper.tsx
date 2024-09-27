function NumberCheck(evt: any) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    var text = evt.currentTarget.value.toString();

    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57)
        && charCode != 190
        && charCode != 110
        && (charCode > 105 || charCode < 96)) {

        evt.preventDefault();
        return false;
    }
    else if (charCode == 190 && !CanAddDecimal(text)) {
        
        evt.preventDefault();
        return false;
    }
    return true;
}

function CanAddDecimal(value: any) {
    if (value.toString().includes(".") || value.toString() == "") return false;
    return true;
}

export default NumberCheck;