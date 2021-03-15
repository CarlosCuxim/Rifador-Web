// Convierte una string separada por comas a una lista
function str_to_list(string) {
    let list = string.split(',')
    list = list.map(i => i.trim())
    return list
}

// Convierte una lista a string separada por comas
function list_to_str(list) {
    let string = ""
    for(let i = 0; i<list.length; i++) {
        if(i===0){
            string = string + String(i)
        } else {
            string = string + ', ' + String(i)
        }
    }
    return string
}

// Arroja un entero aleatorio del intervalo [a,b), o de [0,a), si b no es especificado.
function random_int(a, b=null){
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
