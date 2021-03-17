# Rifador-Web

Esta aplicación fue diseñana para dividir un conjunto de ejercicios
aleatoriamente entre un grupo de personas.

Para ingresar los datos basta con que estén separados por comas, los
espacios no importan. Por ejemplo:
* Alicia, Bob, Carlos, David.
* 1, 2, 3, 4, 5, 6, 7, 8, 9, 10.
* 3.1, 3.2, 4.1, 4.5, 5.6, 5.10.

### Notación con puntos suspensivos

Dado que es común que se quiera repartir un rango de números, existe
una forma más compacta de escribirlo. Para ello basta escribir:

    ⟨a⟩;,[⟨opc.⟩;,] ..., ⟨a⟩;

Esto hará que automáticamente se escriban los números de
⟨a⟩; hasta ⟨b⟩;, si el número ⟨opc.⟩; es
dado, los pasos serán de ⟨a⟩; - ⟨opc.⟩;. Por
ejemplo:
* 1, ..., 5 se evaluará como 1, 2, 3, 4, 5.
* 1, 3, ..., 10 se evaluará como 1, 3, 5, 7, 9, 10.
* 1,1.25,...,2,4,...,7 se evaluará como 1, 1.25, 1.5, 1.75, 2, 4, 5, 6, 7.

Por cuestiones de redondeo, cuando los pasos no son enteros, es
posible que la expresión decimal no sea correcta.

#### Notación foreach<

En el caso que se requiera expresiones un poco más complejas, es
posible sustituir una variable en una expresión y que sea evaluada
en un conjunto de puntos. Para esto basta escribir:

    ⟨expresión⟩; foreach ⟨comando⟩; in {⟨lista⟩;}

Aquí ⟨expresión⟩; puede ser cualquier expresión que
contenga a ⟨comando⟩; (y que, obviamente, no contenga la
palabra “foreach”), como curiosidad, también es posible
usar etiquetas HTML básicas.


Así, ⟨comando⟩; será sustituido
por cada valor que aparezca en ⟨lista⟩;, se recomienda que
⟨comando⟩; contenga un carácter especial para evitar
sustituciones no deseadas.


Para ⟨lista⟩;, los elementos
deben estar separados por comas, también es posible usar la notación
con puntos suspensivos. Por ejemplo:
* 3.\x foreach \x in {a,b,c} se evaluará como 3.a, 3.b, 3.c.
* A#1#1 foreach #1 in {1,...,5}  se evaluará como A11, A22, A33, A44, A55.
* &lt;i&gt;1.n&lt;/i&gt; foreach n in {1,2,3} se evaluará como <i>1.1</i>, <i>1.2</i>, <i>1.3</i>.


### Comandos JavaScript

En un caso extremo donde no sea posible usar el foreach, o se
requieran funciones aun más exóticas, existe la posibilidad de usar
las funciones JavaScript para crear una lista. Para ello basta con
escribir:

    >>⟨Comandos JavaScript⟩;

Hay que recalcar que ⟨Comandos JavaScript⟩; deben crear un
Array, en caso contrario no se podrá ejecutar.


Es posible usar la función range(), cuyo funcionamiento es el mismo
que en Python. Por ejemplo:
* >>range(5) se evaluará como 0, 1, 2, 3, 4.
* >>range(1,3,0.5) se evaluará como 1, 1.5, 2, 2.5.
* >>range(5).map(i=>i**2) se evaluará como 0, 1, 4, 9, 16.
