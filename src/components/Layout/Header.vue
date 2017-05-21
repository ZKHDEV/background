<template>
    <header>
        <el-button class="menu-btn" type="primary" @click="toggleMenu">
            <i class="fa fa-navicon"></i>
        </el-button>
        <span class="header-title">{{title}}</span>
        <ul class="header-operation">
            <li>
                <el-dropdown trigger="click">
                    <el-button type="primary" class="menu-btn">
                        <i class="fa fa-user"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <router-link to="/setting">我的账号</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <router-link to="/setting">未读消息</router-link>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <router-link to="/setting">系统设置</router-link>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li>
                <el-button type="primary" class="menu-btn" @click="logout">
                    <i class="fa fa-sign-out"></i>
                </el-button>
            </li>
        </ul>
    </header>
</template>

<script>
import types from '../../store/mutation-types'
export default {
    computed: {
        title() {
            return this.$store.state.title;
        }
    },
    methods: {
        toggleMenu() {
            this.$emit('toggleMenu');
        },
        logout() {
            this.$store.commit(types.LOGOUT);
            this.$router.push({
                name: 'login'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
$headerHeight: 50px;
$themeColor: #20A0FF;
$boxShadow: 0 0 10px 1px rgba(#000000, 0.3);
header {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: $headerHeight;
    background-color: $themeColor;
    box-shadow: $boxShadow;
    vertical-align: center;
    overflow: hidden;
}

.menu-btn {
    height: $headerHeight;
    width: $headerHeight;
    border: none;
    border-radius: 0;
    font-size: 21px;
}

.header-title{
    color: #FFFFFF;
    font-size: 18px;
}

.header-operation {
    float: right;
    margin: 0;
    padding: 0;
}

.header-operation li {
    display: inline-block;
}

a {
    &:link,
    &:visited,
    &:hover,
    &:active {
        color: inherit;
        text-decoration: none;
    }
}
</style>
