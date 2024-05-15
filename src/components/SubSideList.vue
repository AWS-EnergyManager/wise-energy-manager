<template>
        <el-col :span="4">
            <el-menu
                class="el-menu-popper-demo"
                mode="horizontal" 
                :popper-offset="16"  
                style="max-width: 600px"
            >
                <el-sub-menu index="3-4" :popper-offset="20">
                    <template #title>能耗分析</template>
                    <el-menu-item index="3-4-1">item one</el-menu-item>
                    <el-menu-item index="3-4-2">item two</el-menu-item>
                    <el-menu-item index="3-4-3">item three</el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-col>
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