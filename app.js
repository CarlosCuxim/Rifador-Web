function str_to_list(string) {
    let list = string.split(',')
    list = list.map(i => i.trim())
    return list
}

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

