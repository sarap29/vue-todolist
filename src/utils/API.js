'use strict';

import { request } from './HttpRequests';

const Todo = {
    getTodos: (limit) => request.get(`todos?_limit=${limit}`),
    addTodo: (data) => request.post(`todos`, data),
    deleteTodo: (id) => request.delete(`todos/${id}`),
    completeTodo: (id) => request.put(`todos/${id}`, { completed: true })
}

const User = {
    getUser: (userId) => request.get(`users/${userId}`)
};
export { Todo, User };
