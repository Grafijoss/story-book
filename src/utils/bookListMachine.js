// import { Machine, interpret } from "xstate";
const { Machine, interpret } = require("xstate");

const bookListMachine = Machine(
  {
    id: "booklist",
    initial: "loading",
    // el contexto nes un estado que puede mantener nuestra maquina de estado
    context: {
      books: [],
    },
    states: {
      loading: {
        // vamos a definir una transicion con on
        // puede tener mas de una transicion
        on: {
          // definimos una llave o nombre que representa esa transicion
          // en un string definimos el nombre del estado al cual nos va a llevar
          FETCH_SUCCED: "displayList",
          FETCH_FAILED: "error",
        },
      },
      error: {
        on: {
          FETCH_RETRY: "loading",
        },
      },
      displayList: {
        // GUARDS o condicionales para pasar a otro estado o permanecemos en el mimo estado
        // definimos una transicion con on
        on: {
          // label para el nombre
          // pasamos array de objetos
          // se deja vacio para no visualizar el label en el flowchar
          // target va a ser el estado al que se esta apuntando
          // cond va a ser el nombre de la GUARD o funcion escudo que evita que alguien llega sin cumplir la condicion
          // si inNotEmpty se cumple vamos a list
          checkingBooks: [
            {
              target: "list",
              cond: "isNotEmpty",
            },
            {
              target: "emptyList",
              cond: "isEmpty",
            },
          ],
        },
      },
      list: {},
      emptyList: {},
    },
  },
  {
    // pasamos un segundo objeto a la funcion Machi donde podemos definir nuestras funciones GUARDS
    guards: {
      // las guards son funciones que reciben un contexto
      // dentro de las funciones podemos tener acceso al context de la machine
      // las guards deben retornar un boolean

      isEmpty: function (context) {
        return context.books.length === 0;
      },
      isNotEmpty: function (context) {
        return context.books.length !== 0;
      },
    },
  }
)
  // con withContext podemos definir un state inicial
  .withContext({ book: [] });

/* Convenciones */

// todos los nombres de los estados van en camelcase
// las transiciones son allcaps (capitales)
// debemos evitar colisiones

// interpret recibe una Machine como parametro para interpretarla
// node bookListMachine.js
// podemos poner un listen a nuestro interpret para ver las transiciones (para ver si en algun momento un estado pasa de uno a otro)
const bookList = interpret(bookListMachine)
  // el metodo onTRansition recibe una funcion que pasa como argumento el estado
  .onTransition((state) => {
    // el state es un objeto
    // nos interesa el valor dentro del estado
    console.log(state.value);
  })
  .start();

/* SIN STATE */

// podemos hacer un trigger de las transiciones manualmente
// como al iniciar estamos en estado loading podemos llamar a la transicion FETCH_FAILED con send
// bookList.send("FETCH_FAILED");

// ****no podemos pasar de un estado a otro si no existe una transicion****
// bookList.send("FETCH_SUCCED");
// bookList.send("unknown");

/* SET STATE withContext */

bookList.send("FETCH_SUCCED");
