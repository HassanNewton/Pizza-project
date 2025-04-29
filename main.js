const { createApp } = Vue;

createApp({
  data() {
    return {
      pizzas: [],
      newPizza: {
        name: "",
        description: "",
        price: null,
      },
    };
  },
  mounted() {
    this.fetchPizzas();
  },
  methods: {
    fetchPizzas() {
      fetch("http://localhost:3000/pizzas")
        .then((response) => response.json())
        .then((data) => {
          this.pizzas = data;
        })
        .catch((err) => console.error("Kunde inte hämta pizzor:", err));
    },
    addPizza() {
      fetch("http://localhost:3000/pizzas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.newPizza),
      })
        .then((response) => response.json())
        .then((addedPizza) => {
          this.pizzas.push(addedPizza);
          this.newPizza = { name: "", description: "", price: null };
        })
        .catch((err) => console.error("Kunde inte lägga till pizza:", err));
    },
    removePizza(id) {
      fetch(`http://localhost:3000/pizzas/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          this.fetchPizzas(); // Nu fungerar det eftersom metoden finns
        })
        .catch((err) => console.error("Kunde inte ta bort pizza:", err));
    },
  },
}).mount("#app");
