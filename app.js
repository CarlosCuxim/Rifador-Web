/*
================================================================================
FUNCIONES MISCELÁNEAS
================================================================================
*/

// Convierte un string separada por comas a una lista.
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
    // Se asegura que el valor de paso sea positivo
    if(step<=0) {
        step = 1
    }
    let list = []
    for(let i = a; i<b; i+=step) {
        list.push(i)
    }

    return list
}

// Función que redondea los números dentro de una función
function fix_number_list(list, round=4) {
    return list.map(i => Math.round(i*10**round)/10**round)
}

// Compara dos funciones dado su orden dentro de una lista
function compare_by_list(a, b, list) {
    let idx_a = list.indexOf(a)
    let idx_b = list.indexOf(b)

    if(idx_a === -1) {
        return idx_b-idx_a
    } else {
        if(idx_b === -1) {
            return idx_b
        } else
        return idx_a-idx_b
    }
}

// Ordena una lista dada una lista maestra. La función modifica la lista
function sort_by_list(list, master) {
    const list_map = (a,b) => compare_by_list(a, b, master)
    list.sort(list_map)

    return list
}


/*
================================================================================
FUNCIONES SORTEO
================================================================================
*/

// Convierte un string con la notación de puntos suspensivos a una lista
function str_dots_to_list(string) {
    let list = str_to_list(string)
    let new_list = []

    while(list.includes("...")) {
        let idx = list.indexOf("...")
        let a = Number(list[idx-2])
        let b = Number(list[idx-1])
        let c = Number(list[idx+1])

        if (!a) {
            list.splice(idx-1, 3)
            if (b<c) {
                let fixed_range = fix_number_list(range(b,c))
                new_list = [...new_list, ...fixed_range, c]
            } else {
                let fixed_range = fix_number_list(range(c,b))
                new_list = [...new_list, ...fixed_range, c]
            }
            
        } else {
            list.splice(idx-2, 3)
            if (a<c) {
                let fixed_range = fix_number_list(range(a,c,b-a))
                new_list = [...new_list, ...fixed_range, c]
            } else {
                let fixed_range = fix_number_list(range(c,a,a-b))
                new_list = [...new_list, ...fixed_range, c]
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
    let new_list = list.map(i=>format.replaceAll(variable, i))

    return new_list
}


// Evalúa un string con la notación de puntos suspensivos
function evaluate_dots_notation(string) {
    let list = str_to_list(string)

    if(list.indexOf("...") === -1) {
        return list
    } else {
        return str_dots_to_list(string)
    }
}



function evaluate_user_entry(string) {
    if (string.substring(0,2) === ">>") {
        return eval(string.substring(2,string.length))
    } else if(string.includes("foreach")) {
        return str_foreach_to_list(string)
    } else {
        return evaluate_dots_notation(string)
    }
}

function user_entry_to_list(string) {
    let list = str_to_list(string, ";").map(evaluate_user_entry)
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
        if(i===0) {
            string = string + String(list[i])
        } else {
            string = string + ', ' + String(list[i])
        }
    }
    return string
}

// Arroja un entero aleatorio del intervalo [a,b), o de [0,a), si b no es especificado.
function random_int(a, b) {
    if(!b) {
        b = a; a = 0;
    }
    let n = b-a
        return a + Math.floor(Math.random()*n)
}

// Remueve un elemento aleatorio de una lista, y lo retorna
function remove_random_element(list) {
    let idx = random_int(list.length)
    let element = list[idx]
    list.splice(idx, 1)
    return element
}

// Reordena una lista
function reorder_list(list) {
    let new_list = []
    let aux_list = [...list]
    let n = list.length
    while (new_list.length<n) {
        new_list.push(remove_random_element(aux_list))
    }
    return new_list
}

// Divide los elementos de una lista en n grupos de manera aleatoria
function divide_in_random_groups(list, n=1) {
    let new_list = [...Array(n)].map(i=>[])
    let aux_list = [...list]
    let idx = 0
    while (aux_list.length!==0) {
        new_list[idx].push(remove_random_element(aux_list))
        idx = (idx + 1)%n
    }
    new_list = reorder_list(new_list).map(i => sort_by_list(i, list))

    return new_list
}


/*
================================================================================
    FUNCIONAMIENTO DEL HTML
================================================================================
*/

const integrantes_input = document.getElementById("input-integrantes")
const ejercicios_input = document.getElementById("input-ejercicios")
const ejercicios_output = document.getElementById("output-ejercicios")
const ayuda_button = document.getElementById("ayuda-button")

mensaje_ayuda = `<h3>Instrucciones </h3>
<p>
    Esta aplicación fue diseñana para dividir un conjunto de ejercicios
    aleatoriamente entre un grupo de personas.
</p>
<p>
    Para ingresar los datos basta con que estén separados por comas, los
    espacios no importan. Por ejemplo:
</p>
<ul>
    <li>Alicia, Bob, Carlos, David.</li>
    <li>1, 2, 3, 4, 5, 6, 7, 8, 9, 10.</li>
    <li>3.1, 3.2, 4.1, 4.5, 5.6, 5.10.</li>
</ul>
<h4>Notación con puntos suspensivos</h4>
<p>
    Dado que es común que se quiera repartir un rango de números, existe
    una forma más compacta de escribirlo. Para ello basta escribir:
</p>
<center>
    &lang;a&rang;,[&lang;opc.&rang;,] ..., &lang;a&rang;
</center>
<p>
    Esto hará que automáticamente se escriban los números de
    &lang;a&rang; hasta &lang;b&rang;, si el número &lang;opc.&rang; es
    dado, los pasos serán de &lang;a&rang; - &lang;opc.&rang;. Por
    ejemplo:
</p>
<ul>
    <li>1, ..., 5 se evaluará como 1, 2, 3, 4, 5.</li>
    <li>1, 3, ..., 10 se evaluará como 1, 3, 5, 7, 9, 10.</li>
    <li>1,1.25,...,2,4,...,7 se evaluará como 1, 1.25, 1.5, 1.75, 2, 4, 5, 6, 7.</li>
</ul>
<p>
    Por cuestiones de redondeo, cuando los pasos no son enteros, es
    posible que la expresión decimal no sea correcta.
</p>
<h4>Notación foreach</h4>
<p>
    En el caso que se requiera expresiones un poco más complejas, es
    posible sustituir una variable en una expresión y que sea evaluada
    en un conjunto de puntos. Para esto basta escribir:
</p>
<center>
    &lang;expresión&rang; foreach &lang;comando&rang; in {&lang;lista&rang;}
</center>
<p>
    Aquí &lang;expresión&rang; puede ser cualquier expresión que
    contenga a &lang;comando&rang; (y que, obviamente, no contenga la
    palabra &ldquo;foreach&rdquo;), como curiosidad, también es posible
    usar etiquetas HTML básicas.
</p>
<p>
    Así, &lang;comando&rang; será sustituido
    por cada valor que aparezca en &lang;lista&rang;, se recomienda que
    &lang;comando&rang; contenga un carácter especial para evitar
    sustituciones no deseadas.
</p>
<p>
    Para &lang;lista&rang;, los elementos
    deben estar separados por comas, también es posible usar la notación
    con puntos suspensivos. Por ejemplo:
</p>
<ul>
    <li>3.\\x foreach \\x in {a,b,c} se evaluará como 3.a, 3.b, 3.c.</li>
    <li>A#1#1 foreach #1 in {1,...,5}  se evaluará como A11, A22, A33, A44, A55.</li>
    <li>&lt;i&gt;1.n&lt;/i&gt; foreach n in {1,2,3} se evaluará como <i>1.1</i>, <i>1.2</i>, <i>1.3</i>.</li>
</ul>
<h4>Comandos JavaScript</h4>
<p>
    En un caso extremo donde no sea posible usar el foreach, o se
    requieran funciones aun más exóticas, existe la posibilidad de usar
    las funciones JavaScript para crear una lista. Para ello basta con
    escribir:
</p>
<center>
    &gt;&gt;&lang;Comandos JavaScript&rang;
</center>
<p>
    Hay que recalcar que &lang;Comandos JavaScript&rang; deben crear un
    Array, en caso contrario no se podrá ejecutar.
</p>
<p>
    Es posible usar la función range(), cuyo funcionamiento es el mismo
    que en Python. Por ejemplo:
</p>
<ul>
    <li>&gt;&gt;range(5) se evaluará como 0, 1, 2, 3, 4.</li>
    <li>&gt;&gt;range(1,3,0.5) se evaluará como 1, 1.5, 2, 2.5.</li>
    <li>&gt;&gt;range(5).map(i=&gt;i**2) se evaluará como 0, 1, 4, 9, 16.</li>
</ul>
<h4>Concatenación de listas</h4>
<p>
    Por ultimo, en el caso que se quiera una lista compuesta de varios conjuntos
    de listas, es posible crearlo simplemente separando cada lista con un punto
    y coma:
</p>
<center>
    &lang;Lista 1&rang; ; &lang;Lista 2&rang; ; &lang;Lista 3&rang; ; ...
</center>
<p>
    Todas las notaciones mencionadas anteriormente funcionan, por lo que se
    puede mezclar varios tipos de notaciones.
</p>`

let ayuda_activate = false

function rifar_button_event() {
    const integrantes_list = user_entry_to_list(integrantes_input.value)
    const ejercicios_list = user_entry_to_list(ejercicios_input.value)

    let n = integrantes_list.length

    if(n===0) {
        console.log("Entrada inválida")
    } else{
        const sorted_exercises = divide_in_random_groups(ejercicios_list, n)

        const fragment = document.createDocumentFragment()
        for(let i=0; i<n; i++) {
            let integrante_label = document.createElement('P')
            let integrante_name = integrantes_list[i]
            let integrante_exercise = list_to_str(sorted_exercises[i])

            integrante_label.innerHTML = `<b>${integrante_name}:</b> ${integrante_exercise}`
            fragment.appendChild(integrante_label)
        }
        
        ejercicios_output.classList.remove("output-ayuda")
        ejercicios_output.classList.add("output")
        ejercicios_output.innerHTML = ""

        ejercicios_output.appendChild(fragment)

        ayuda_button.value = "¿Cómo funciona?"
        ayuda_activate = false
    }
}

function ayuda_button_event() {
    if(ayuda_activate) {
        ejercicios_output.classList.remove("output-ayuda")
        ejercicios_output.classList.remove("output")
        ejercicios_output.innerHTML = ""

        ayuda_button.value = "¿Cómo funciona?"

        ayuda_activate = false
    } else {
        ejercicios_output.classList.add("output")
        ejercicios_output.classList.add("output-ayuda")
        ejercicios_output.innerHTML = mensaje_ayuda

        ayuda_button.value = "Ocultar"

        ayuda_activate = true
    }   
}