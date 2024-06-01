module.exports = {
    bono: function(categoria) {
        if(categoria=="A")       return 3000;
        else if(categoria=="B")  return 2500;  
        else if(categoria=="C")  return 2000;    
    },
    sueldoBruto: function(horas, pagoHora) {
        return horas * pagoHora;
    },
    sueldoNeto: function(sueldoBruto, bono) {
        return sueldoBruto + bono;
    },
    sueldoNetoImpuestos: function(sueldoNeto) {
        return sueldoNeto - (sueldoNeto*0.10);
    }
}