var numeroTeste = 997;
var resultado = [];

for(i=1; i<=numeroTeste; i++){
    if(numeroTeste%i == 0){
        resultado.push(i);
    }
}


console.log(resultado);

if(resultado.length > 2 || numeroTeste == 1) {
    console.log(numeroTeste + " não é um número primo");
} else {
    console.log(numeroTeste + " é um número primo");
}
