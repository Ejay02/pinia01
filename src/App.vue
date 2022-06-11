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
      <input 
        type="text "
        class="input-label"
        placeholder="Name"
        v-model="user_input.name"
        autofocus
      />
      <input
        class="input-label"
        type="email"
        placeholder="Email"
        v-model="user_input.email"
      />
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
  text-transform: capitalize
}
.user {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
  text-transform: capitalize
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

input {
  margin: 5px;
  /* border:none; */
}

.input-group {
  padding: 10px;
  border: none;
  border-radius: 4px;
  font: inherit;
  color: #fff;
  background-color: transparent;
  outline: 2px solid #fff;
}

/* .input-label {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(10px, 10px);
  transition: transform .25s;
}

.input:focus+.input-label,
.input:valid+.input-label {
  transform: translate(10px, -14px) scale(.8);
  color: #d1e5fe;
  padding-inline: 5px;
  background-color: #242329;
} */
</style>
