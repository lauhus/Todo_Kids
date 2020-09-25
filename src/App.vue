<template>
  <div id="app">
    <header>
      <img src="./assets/logo_ToDo.png" alt="Logo To Do , Kids">
      <h1 class="name_appli"> To Do , Kids </h1>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body 
{
font-family:trebuchet, helvetica, sans-serif;
}
header
{
display: flex;
align-items: flex-start;
}
img
{
  height: 5%;
  width: 5%;
}
.name_appli
{
  margin-left: 40%;
}
</style>
