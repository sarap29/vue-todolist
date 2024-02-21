<template>
  <div class="home">
    <AddTodo v-on:add-todo="addTodo" ref="form"/>
    <Todos v-bind:todos="todos" v-on:delete-todo="deleteTodo" v-on:complete-todo="completeTodo"/>
    <FullPageLoader v-bind:isShow="isLoading"/>
  </div>
</template>


<script>
import Todos from "@/components/Todos/Todos.vue";
import AddTodo from "@/components/Todos/AddTodo.vue";
import FullPageLoader from "@/components/FullPageLoader/FullPageLoader.vue";
import { Todo } from "@/utils/API";

export default {
  name: "home",
  components: {
    AddTodo,
    Todos,
    FullPageLoader
  },

  data() {
    return {
      todos: [],
      isLoading: false
    };
  },

  methods: {
    addTodo(newTodo) {
      this.isLoading = true;
      Todo.addTodo(newTodo)
        .then(res => {
          this.todos = [...this.todos, res];
          this.isLoading = false;
          this.$refs.form.resetForm();
        })
        .catch(() => (this.isLoading = false));
    },

    deleteTodo(id) {
      this.isLoading = true;
      Todo.deleteTodo(id)
        .then(() => {
          this.todos = this.todos.filter(todo => todo.id !== id);
          this.isLoading = false;
        })
        .catch(() => (this.isLoading = false));
    },
    
    completeTodo(id) {
      this.isLoading = true;
      Todo.completeTodo(id)
        .then(() => {
          this.todos = this.todos.map(todo => {
            if (todo.id === id) {
              todo.completed = true;
            }
            return todo;
          });
          this.isLoading = false;
        })
        .catch(() => (this.isLoading = false));
    }
  },

  mounted() {
    this.isLoading = true;
    Todo.getTodos(5)
      .then(res => {
        this.todos = res ? res : [];
        this.isLoading = false;
      })
      .catch(() => (this.isLoading = false));
  }
};
</script>
