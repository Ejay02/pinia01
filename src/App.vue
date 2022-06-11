<script setup>
import { ref } from "@vue/reactivity";
import { useUserStore } from "./stores/users";

const user_store = useUserStore();
const user_input = ref({
  name: "",
  email: "",
  // password: "",
  // confirm_password: "",
});

const sort = ref("false");
const createUser = () => {
  if (!user_input.value.name || !user_input.value.email) {
    return alert("Please fill all fields");
  }
  user_store.create(user_input.value);

  user_input.value = {
    name: "",
    email: "",
    // password: "",
    // confirm_password: "",
  };
};
const deleteUser = (id) => {
  user_store.delete(id);
  alert("User with id: " + id + " deleted");
};
</script>

<template>
  <main class="main">
    <h1>Team Manager</h1>
    <form @submit.prevent="createUser" class="input-group">
      <input type="text" placeholder="Name" v-model="user_input.name" autofocus />
      <input class="input-label" type="email" placeholder="Email" v-model="user_input.email" />
      <input class="btn" type="submit" value="Create user" />
    </form>

    <label>
      <span class="sort">Sort</span>
      <input type="checkbox" v-model="sort" />
    </label>

    <div class="users" v-if="!sort">
      <div v-for="user in user_store.users" :key="user" class="user">
        <div>ID: {{ user.id }}</div>
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <button class="btn" @click="deleteUser(user.id)">Delete</button>
      </div>
    </div>

    <div class="users" v-else>
      <div v-for="user in user_store.userByName" :key="user" class="user">
        <div>ID: {{ user.id }}</div>
        <h3>{{ user.name }}</h3>
        <p>{{ user.email }}</p>
        <button class="btn" @click="deleteUser(user.id)">Delete</button>
      </div>
    </div>
  </main>
</template>

<style>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: darkslategrey;
}

.users {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
}

.btn {
  background-color: slateblue;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  margin: 5px;
}

.sort {
  margin: 5px;
  align-items: center;
}

input{
  margin: 5px;
  /* border:none; */
}
</style>
