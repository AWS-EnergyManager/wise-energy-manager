<template>
    <div class="sideListContainer">
        <el-col :span="4">
                <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
            >   
                    <el-sub-menu index="1">
                    <template #title>
                        <el-icon><House /></el-icon>
                        <span>能耗監控</span>
                    </template>
                        <el-menu-item index="1-1">能耗分析</el-menu-item>
                        <!-- <SubSideList /> -->
                        <el-menu-item index="1-2">峰平谷分析</el-menu-item>
                        <el-menu-item index="1-3">需量分析</el-menu-item>
                        <el-menu-item index="1-3">分類概況</el-menu-item>
                    </el-sub-menu>
                <el-menu-item index="4">
                <el-icon><setting /></el-icon>
                <span>Navigator Four</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
// import SubSideList from './SubSideList.vue'

export default {
    name: 'SideList',
    components: {
        // SubSideList
    },
    props: {

    },
    methods: {
        // subSideActive(value) {
        //     this.$store.('setSubSideActive', value)
        // }
    }
    // computed: {
    //     subSideActive: {
    //         get() {
    //             return this.$store.state.subSideActive
    //         },
    //         set(value) {
    //             this.$store.commit('setSubSideActive', value)
    //         }
    //     }
    // },
}
</script>

<style lang="scss" scoped>
.sideListContainer {
    display: flex;
    
}

</style>