<template>
    <div>
        <div class="left" :class="{ collapse: isCollapse }">
            <v-sidebar></v-sidebar>
        </div>
        <div class="right" :class="{ collapse: isCollapse }">
            <v-header :title="title" @toggleMenu="toggleMenu"></v-header>
            <div class="container">
                <div class="card">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '主页',
            isCollapse: true
        }
    },
    methods: {
        toggleMenu() {
            this.isCollapse = !this.isCollapse;
        }
    },
    components: {
        'v-sidebar': resolve => require(['./Sidebar.vue'], resolve),
        'v-header': resolve => require(['./Header.vue'], resolve)
    }
}
</script>

<style lang="scss" scoped>
$leftWidth: 260px;
$headerHeight: 50px;
$boxShadow: 0 0 10px 1px rgba(#000000, 0.1);
.left {
  z-index: 1000;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: $leftWidth;
  overflow-y: auto;
  transition: all 0.2s ease 0s;
  box-shadow: $boxShadow;
  &.collapse {
    box-shadow: none;
    left: -$leftWidth;
  }
}

.right {
  position: absolute;
  top: 0;
  bottom: 0;
  left: $leftWidth;
  right: 0;
  transition: all 0.2s ease 0s;
  &.collapse {
    left: 0;
  }
}

.container {
  position: absolute;
  top: $headerHeight;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #E7EBEE;
  .el-breadcrumb{
    padding: 20px 0 10px 20px;
  }
}

.card {
  margin: 10px;
  box-shadow: $boxShadow;
  background-color: #FFFFFF;
}
</style>
