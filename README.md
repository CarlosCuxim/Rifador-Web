# Rifador-Web

Esta aplicación fue diseñana para dividir un conjunto de ejercicios
aleatoriamente entre un grupo de personas.

Para ingresar los datos basta con que estén separados por comas, los
espacios no importan. Por ejemplo:

<ul>
    <li>Alicia, Bob, Carlos, David.</li>
    <li>1, 2, 3, 4, 5, 6, 7, 8, 9, 10.</li>
    <li>3.1, 3.2, 4.1, 4.5, 5.6, 5.10.</li>
</ul>

<h4>Notación con puntos suspensivos</h4>

Dado que es común que se quiera repartir un rango de números, existe
una forma más compacta de escribirlo. Para ello basta escribir:

<center>
    &lang;a&rang;,[&lang;opc.&rang;,] ..., &lang;a&rang;
</center>

Esto hará que automáticamente se escriban los números de
&lang;a&rang; hasta &lang;b&rang;, si el número &lang;opc.&rang; es
dado, los pasos serán de &lang;a&rang; - &lang;opc.&rang;. Por
ejemplo:

<ul>
    <li>1, ..., 5 se evaluará como 1, 2, 3, 4, 5.</li>
    <li>1, 3, ..., 10 se evaluará como 1, 3, 5, 7, 9, 10.</li>
    <li>1,1.25,...,2,4,...,7 se evaluará como 1, 1.25, 1.5, 1.75, 2, 4, 5, 6, 7.</li>
</ul>

Por cuestiones de redondeo, cuando los pasos no son enteros, es
posible que la expresión decimal no sea correcta.

<h4>Notación foreach</h4>

    En el caso que se requiera expresiones un poco más complejas, es
    posible sustituir una variable en una expresión y que sea evaluada
    en un conjunto de puntos. Para esto basta escribir:

<center>
    &lang;expresión&rang; foreach &lang;comando&rang; in {&lang;lista&rang;}
</center>

Aquí &lang;expresión&rang; puede ser cualquier expresión que
contenga a &lang;comando&rang; (y que, obviamente, no contenga la
palabra &ldquo;foreach&rdquo;), como curiosidad, también es posible
usar etiquetas HTML básicas.


Así, &lang;comando&rang; será sustituido
por cada valor que aparezca en &lang;lista&rang;, se recomienda que
&lang;comando&rang; contenga un carácter especial para evitar
sustituciones no deseadas.


Para &lang;lista&rang;, los elementos
deben estar separados por comas, también es posible usar la notación
con puntos suspensivos. Por ejemplo:

<ul>
    <li>3.\\x foreach \\x in {a,b,c} se evaluará como 3.a, 3.b, 3.c.</li>
    <li>A#1#1 foreach #1 in {1,...,5}  se evaluará como A11, A22, A33, A44, A55.</li>
    <li>&lt;i&gt;1.n&lt;/i&gt; foreach n in {1,2,3} se evaluará como <i>1.1</i>, <i>1.2</i>, <i>1.3</i>.</li>
</ul>
<h4>Comandos JavaScript</h4>

En un caso extremo donde no sea posible usar el foreach, o se
requieran funciones aun más exóticas, existe la posibilidad de usar
las funciones JavaScript para crear una lista. Para ello basta con
escribir:

<center>
    &gt;&gt;&lang;Comandos JavaScript&rang;
</center>

Hay que recalcar que &lang;Comandos JavaScript&rang; deben crear un
Array, en caso contrario no se podrá ejecutar.


Es posible usar la función range(), cuyo funcionamiento es el mismo
que en Python. Por ejemplo:

<ul>
    <li>&gt;&gt;range(5) se evaluará como 0, 1, 2, 3, 4.</li>
    <li>&gt;&gt;range(1,3,0.5) se evaluará como 1, 1.5, 2, 2.5.</li>
    <li>&gt;&gt;range(5).map(i=&gt;i**2) se evaluará como 0, 1, 4, 9, 16.</li>
</ul>
