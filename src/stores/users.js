import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

export const useUserStore = defineStore("users", {
  state: () => {
    return {
      users: [],
    };
  },
  actions: {
    create(user) {
      this.users.push({
        id: uuid(),
        ...user,
        createdAt: new Date(),
      });
    },
    delete(id) {
      this.users = this.users.filter((user) => user.id !== id);
    },
  },
  getters: {
    userByName(state) {
      const sortable = [...state.users];
      return sortable.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    },
  },
});
