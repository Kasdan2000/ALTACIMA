
/* const crearSelectdeClima = () => { PRIMER INTENTO DE CREAR SELECT DINÁMICO
    var clima;

    clima = document.querySelector("#selectClima")[document.querySelector("#selectClima").selectedIndex].value;
    if(clima!= "-"){
        let mis_opciones = eval("op_" + clima);
        let nro_opciones = mis_opciones.length;

        document.querySelector("#selectDestino1").length = nro_opciones;
        for(i=0;i<nro_opciones;i++){
            document.querySelector("#selectClima").querySelector("#selectDestino1").options[i].value=mis_opciones[i];
            document.querySelector("#selectClima").querySelector("#selectDestino1").options[i].text=mis_opciones[i];
        }
        
    }
    else{
        document.querySelector("#selectDestino1").length = 1;
        document.querySelector("#selectDestino1").options[0].value="-";
        document.querySelector("#selectDestino1").options[0].text="";
    }
    document.querySelector("#selectDestino1").options[0].selected = true;

}
document.querySelector("#selectClima").addEventListener("click", crearSelectdeClima); */

let sClima = document.querySelector("#clima");
let destino1 = document.querySelector("#destino1");
let destino2 = document.querySelector("#destino2");
let fondoClima = document.querySelector("#imgClima");

const mostrarOpciones = (array, opcion) => {
    let elementos = '<option selected disables></option>'

    for (let i = 0; i<array.length; i++){
        elementos += '<option value="' + array[i] +'">'+
        array[i]+'</option>';
    }
    opcion.innerHTML = elementos;
}
mostrarOpciones(clima, sClima);

sClima.addEventListener('change', () => {
    let valor = sClima.value;

    switch(valor){
        case 'Cálido':
/*             let dividir = calido.slice(0, 4) DIVIDIA EL ARRAY DE DESTINOS EVITANDO EQUIVOCASIONES PARA EL USARIO PERO DABA MENOS OPCIONES DE COMPARATIVA
        mostrarOpciones(dividir, destino1);
            let dividir2 = calido.slice(4, 8)
        mostrarOpciones(dividir2, destino2); */
        mostrarOpciones(calido, destino1);
        mostrarOpciones(calido, destino2);
        imgClima.src = "img/calidoDia.jpg";
        /* document.querySelector("header + div").style.backgroundImage="url(img/calidoDia.jpg)"; */
        break
        case 'Frio':
/*             let dividir3 = frio.slice(0, 5)
        mostrarOpciones(dividir3, destino1);
            let dividir4 = frio.slice(5, 10)
        mostrarOpciones(dividir4, destino2); */
        mostrarOpciones(frio, destino1);
        mostrarOpciones(frio, destino2);
        imgClima.src = "img/nieveDia.jpg";
        break
        case 'Templado':
/*         let dividir5 = templado.slice(0, 4)
        mostrarOpciones(dividir5, destino1);
        let dividir6 = templado.slice(4, 8)
        mostrarOpciones(dividir6, destino2); */
        mostrarOpciones(templado, destino1);
        mostrarOpciones(templado, destino2);
        imgClima.src = "img/templadoDia.jpg";
        break
        case'':
        mostrarOpciones("",destino1);
        mostrarOpciones("",destino2);
        imgClima.src = "-";
    }
});

const mostrarResultados = () => {
    document.querySelector("#main").style.display = "none";
    document.querySelector("#resultado").style.display = "block";

    datosDestino1 = [];
    datosDestino2 = [];
}
/* document.querySelector("#ingresarDatos").addEventListener('click', mostrarResultados); */

const volverInicio = () => {
    document.querySelector("#main").style.display = "block";
    document.querySelector("#resultado").style.display = "none"
}
document.querySelector("#volver").addEventListener('click', volverInicio);

console.log(datosDestino1);
console.log(datosDestino2);

const definirDestino = () => {
    if(datosDestino1[6] < datosDestino2[6] ){
        pronosticoAhora(datosDestino1);
    }
    else{
        pronosticoAhora(datosDestino2);
    }
}
const infoDestinos = () => {
    let valor1 = document.querySelector("#destino1").value;
    let valor2 = document.querySelector("#destino2").value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${valor1}&appid=9a02f2aafa34a94e9cfa3796dfb77579&lang=es&units=metric`)
    .then(r => r.json())
    .then(infoClima => {
        console.log(infoClima);
        datosDestino1.push(infoClima.name);
        datosDestino1.push(Math.round(infoClima.main.temp));
        datosDestino1.push(Math.round(infoClima.main.temp_max));
        datosDestino1.push(Math.round(infoClima.main.temp_min));
        datosDestino1.push(infoClima.weather[0].main);
        datosDestino1.push(infoClima.weather[0].description);
        datosDestino1.push(Math.round(infoClima.wind.speed * 3.6));
        datosDestino1.push(Math.round(infoClima.main.feels_like));
        definirDestino();
    })
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${valor2}&appid=9a02f2aafa34a94e9cfa3796dfb77579&lang=es&units=metric`)
    .then(r => r.json())
    .then(infoClima => {
        console.log(infoClima);
        datosDestino2.push(infoClima.name);
        datosDestino2.push(Math.round(infoClima.main.temp));
        datosDestino2.push(Math.round(infoClima.main.temp_max));
        datosDestino2.push(Math.round(infoClima.main.temp_min));
        datosDestino2.push(infoClima.weather[0].main);
        datosDestino2.push(infoClima.weather[0].description);
        datosDestino2.push(Math.round(infoClima.wind.speed * 3.6));
        datosDestino2.push(Math.round(infoClima.main.feels_like));
        console.log(infoClima);
        definirDestino();
    })

}


const pronosticoAhora = (d) => {
    document.querySelector("#nombreCiudad").innerHTML = `${d[0]}`;
    document.querySelector("#temperatura").innerHTML = `${d[1]}°`;
    document.querySelector("#temperaturaMax").innerHTML = `max:${d[2]}°`;
    document.querySelector("#temperaturaMin").innerHTML = `min:${d[3]}°`;
    document.querySelector("#imagenEstado").src = `img/${d[4]}.png`;
    document.querySelector("#infoEstado").innerHTML = `${d[5]}`;
    document.querySelector("#velocidadViento").innerHTML = `${d[6]}km/h`;
    document.querySelector("#sensacionTermica").innerHTML = `${d[7]}°`;
}

const resultadoFinal = () => {
    infoDestinos();
    mostrarResultados();
}

document.querySelector("#ingresarDatos").addEventListener('click', resultadoFinal);