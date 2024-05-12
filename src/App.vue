<template>
  <HeaderComponent/>
  <SideList/>
  <router-view/>
</template>

<script>
import HeaderComponent from './components/Header.vue'
import SideList from './components/SideList.vue'
export default {
  components: {
    HeaderComponent,
    SideList
  }
}
</script>

<style>

</style>
