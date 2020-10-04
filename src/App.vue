<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <router-link :to="{name:'CGU'}"> Conditions générales d'utilisations </router-link>
    </footer>
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
  height: 20%;
  width: 20%;
}
.name_appli
{
  margin-left: 20%;
}
footer
{
  position:fixed;
  bottom:0;
}
</style>
