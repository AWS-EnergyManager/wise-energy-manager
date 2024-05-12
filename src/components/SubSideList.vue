<template>
    <!-- <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
    > -->
    <el-sub-menu index="1">
    <el-menu-item-group title="Group One">
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
    </el-menu-item-group>
    </el-sub-menu>
    <!-- </el-menu> -->
</template>

<script>
    export default {
        name: 'SubSideList',
        data() {
            return {
                subSideActive: true,
            }
        },
        computed: {
            // subSideActive(){
            //     return this.$store.state.subSideActive
            // }
        },
        methods: {

        },
        
    }
</script>

<style lang="scss" scoped>

</style>