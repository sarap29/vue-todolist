<template>
  <div class="todo-item">
    <p :class="{ 'completed': isCompleted }">
      {{ todo.title | capitalize | readMore(50, '...') }}
      <button @click="$emit('delete-todo', todo.id)" class="del">x</button>
      <button @click="completeTodo" class="complete">Completar</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isCompleted: false
    };
  },
  methods: {
    completeTodo() {
      console.log("Se hizo clic en completar para la tarea:", this.todo.id);
      this.$emit('complete-todo', this.todo.id);
      this.isCompleted = true; // Establecer la tarea como completada visualmente
    }
  }
};
</script>

<style scoped>
.todo-item {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}
.del {
  background: #ff0000;
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 50%;
  cursor: pointer;
  float: right;
  margin-right: 5px;
}
.complete {
  background: #00ff00;
  color: #fff;
  border: none;
  padding: 5px 9px;
  border-radius: 5px;
  cursor: pointer;
  float: right;
}
.completed {
  text-decoration: line-through; /* Aplicar tachado al texto */
}
</style>
