// Convierte una string separada por comas a una lista
function str_to_list(string, separator=',') {
    let list = string.split(separator)
    list = list.map(i => i.trim())
    list = list.filter(i => i!=="")
    return list
}

// Función rango de python
function range(a,b, step=1) {
    if(!b) {
        b = a; a = 0;
    }
    if (step===1) {    
        return [...Array(Math.abs(b-a)).keys()].map(i=>i+a)
    } else {
        list = []
        for(let i = a; i<=b; i+=step){
            list.push(i)
        }
        return list
    }
}

// Convierte un string con la notación de puntos suspensivos a una lista
function str_dots_to_list(string) {
    let list = str_to_list(string)
    let new_list = []
    while(list.includes("...")){
        let idx = list.findIndex(i=>i==="...")
        let a = Number(list[idx-2])
        let b = Number(list[idx-1])
        let c = Number(list[idx+1])
        if (!a) {
            list.splice(idx-1, 3)
            if (b<c) {
                new_list = [...new_list, ...range(b,c),c]
            } else {
                new_list = [...new_list, ...range(c,b),c]
            }
            
        } else {
            list.splice(idx-2, 3)
            if (a<c) {
                new_list = [...new_list, ...range(a,c,b-a),c]
            } else {
                new_list = [...new_list, ...range(c,a,a-b),c]
            }   
        }   
    }
    return new_list
}



// Convierte un string con la notación foreach a una lista
function str_foreach_to_list(string) {
    let format = str_to_list(string, "foreach")[0]
    let variable = str_to_list(str_to_list(string, "foreach")[1], "in")[0]
    let list = str_to_list(str_to_list(string, "foreach")[1], "in")[1]

    list = evaluate_dots_notation(list.substring(1,list.length-1))
    let new_list = list.map(i=>format.replace(variable, i))

    return new_list
}



function evaluate_dots_notation(string){
    if(string.includes("...")){
        return str_dots_to_list(string)
    } else {
        return str_to_list(string)
    }
}



function evaluate_user_entry(string) {
    if (string.substring(0,2) === ">>") {
        return eval(string.substring(2,string.length))
    } else if(string.includes("foreach")){
        return str_foreach_to_list(string)
    } else {
        return evaluate_dots_notation(string)
    }
}

function user_entry_to_list(string) {
    let list = str_to_list(string, ";").map(i=>evaluate_user_entry(i))
    let new_list = []
    for(i of list) {
        new_list = [...new_list, ...i]
    }
    return new_list
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

