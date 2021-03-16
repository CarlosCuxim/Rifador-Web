// Convierte una string separada por comas a una lista
function str_to_list(string) {
    let list = string.split(',')
    list = list.map(i => i.trim())
    list = list.filter(i => i!=="")
    return list
}

function range(a,b) {
    if(!b) {
        b = a; a = 0;
    }
    n = b-a
    return [...Array(n).keys()].map(i=>i+a)
}

// Convierte un string con la notación de puntos suspensivos a una lista
function str_dots_to_list(string) {
    list = str_to_list(string)
    new_list = []
    while(list.includes("...")){
        idx = list.findIndex(i=>i==="...")
        a = Number(list[idx-1])
        b = Number(list[idx+1])
        list.splice(idx-1, 3)
        new_list = [...new_list, ...range(a,b),b]
    }
    return new_list
}


function user_entry_to_list(string) {
    if(string.includes("...")){
        return str_dots_to_list(string)
    } else {
        return str_to_list
    }
}


// Convierte una lista a string separada por comas
function list_to_str(list) {
    let string = ""
    for(let i = 0; i<list.length; i++) {
        if(i===0){
            string = string + String(list[i])
        } else {
            string = string + ', ' + String(list[i])
        }
    }
    return string
}

// Arroja un entero aleatorio del intervalo [a,b), o de [0,a), si b no es especificado.
function random_int(a, b){
    if(!b) {
        b = a; a = 0;
    }
    let n = b-a
        return a + Math.floor(Math.random()*n)
}

// Remueve un elemento aleatorio de una lista, y lo retorna
function remove_random_element(list){
    let idx = random_int(list.length)
    let element = list[idx]
    list.splice(idx, 1)
    return element
}

// Reordena una lista
function reorder_list(list){
    let new_list = []
    let aux_list = [...list]
    let n = list.length
    while (new_list.length<n){
        new_list.push(remove_random_element(aux_list))
    }
    return new_list
}

// Divide los elementos de una lista en n grupos de manera aleatoria
function divide_in_random_groups(list, n=1){
    let new_list = [...Array(n)].map(i=>[])
    let aux_list = [...list]
    let idx = 0
    while (aux_list.length!==0){
        new_list[idx].push(remove_random_element(aux_list))
        idx = (idx + 1)%n
    }
    new_list = reorder_list(new_list)
    return new_list
}

const integrantes_input = document.getElementById("input-integrantes")
const ejercicios_input = document.getElementById("input-ejercicios")
const ejercicios_output = document.getElementById("output-ejercicios")

function rifar_button_event(){
    const integrantes_list = user_entry_to_list(integrantes_input.value)
    const ejercicios_list = user_entry_to_list(ejercicios_input.value)
    
    n = integrantes_list.length
    const sorted_exercises = divide_in_random_groups(ejercicios_list, n)

    const fragment = document.createDocumentFragment()
    for(let i=0; i<n; i++){
        let integrante_label = document.createElement('P')
        let integrante_name = integrantes_list[i]
        let integrante_exercise = list_to_str(sorted_exercises[i])

        integrante_label.innerHTML = `<b>${integrante_name}:</b> ${integrante_exercise}`
        fragment.appendChild(integrante_label)
    }
    
    ejercicios_output.innerHTML = ""
    ejercicios_output.appendChild(fragment)
}

