<template>
    <div class="sideListContainer">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            >
            <el-sub-menu index="1">
                <template #title>
                    <span>能耗監測</span>
                </template>
                <el-menu-item index="1-1" @click="goto('consumption')">能耗分析</el-menu-item>
                <el-menu-item index="1-2" >峰平谷分析</el-menu-item>
                <el-menu-item index="1-3" >需量分析</el-menu-item>
                <el-menu-item index="1-3" >分類概況</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
                <template #title>
                    <span>能效分析</span>
                </template>
                <el-menu-item index="2-1" @click="goto('ranking')">能耗排名</el-menu-item>
                <el-menu-item index="2-2" @click="goto('MultiTarget')">多對像對比</el-menu-item>
                <el-menu-item index="2-3">多時間對比</el-menu-item>
                <el-menu-item index="2-4">能流分析</el-menu-item>
            </el-sub-menu>
            
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'SideList',
    components: {

    },
    props: {

    },
    methods: {
        goto(v){
            this.$router.push(`/${v}`)
        },
    }
}
</script>

<style lang="scss" scoped>
.sideListContainer {
    display: flex;
    width: 100%;
    height: 100%;
    .el-menu-vertical-demo {
        width: 100%;
    }
}

</style>