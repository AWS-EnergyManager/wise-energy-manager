<template>
    <div class="header">
        <div class="header-title">
            <div class="logo">
                <el-image
                    style="width: 70px; height: 50px"
                    src="https://www.idtech.com.tw/storage/product19/product/communication/ADVANTECH.png"
                    :fit="'scale-down'">
                </el-image>
            </div>
            <div class="name">
                能耗管理系統
            </div>
        </div>
        <div class="header-setting">
            <el-tooltip
                class="box-item"
                effect="dark"
                content="設定"
            >
                <el-button type="primary" circle><el-icon><Setting /></el-icon></el-button>
            </el-tooltip>
            <el-dropdown>
                <div class="el-dropdown-link user-active">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                    <div class="userName">林阿緹</div>
                </div>
                <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>個人資料</el-dropdown-item>
                    <el-dropdown-item disabled>登入</el-dropdown-item>
                    <el-dropdown-item divided>登出</el-dropdown-item>
                </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HeaderComponent',
        props: {
        },
    }
</script>

<style lang="scss" scoped>
.header{
    display: flex;
    align-items: center;
    justify-content: space-around;
    .header-title {
        display: flex;
        align-items: center;
        padding: 10px;
    }
    .logo {
        margin-right: 20px;
    }
    .name {
        font-size: 20px;
    }
    .header-setting {
        display: flex;
        align-items: center;
        padding: 10px;
        .user-active {
            display: flex;
            align-items: center;
            cursor: pointer;
            outline: none;
            .userName {
                margin-left: 10px;
            }
            .el-avatar {
                margin-left: 20px;
            }
        }
        
    }
}
</style>