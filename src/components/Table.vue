<template>
  <div class="table-container" v-title="'用户管理'">
    <div class="table-operation">      
      <el-button type="primary" @click="handleAdd">添加</el-button>
      <el-button type="danger" :disabled="disDelete" @click="handleDeleteSelection">删除所选</el-button>
      <router-link :to="{name:'user'}"><el-button type="text">跳转</el-button></router-link>
    </div>
    <el-table ref="multipleTable" :data="datas" border tooltip-effect="dark" v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="日期" width="120">
        <template scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="table-pagination">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="1000">
      </el-pagination>
    </div>
  
    <v-add ref="add" @submitForm="afterAdd"></v-add>
    <v-edit ref="edit" @submitForm="afterEdit"></v-edit>

  </div>
</template>

<script>
export default {
  data() {
    return {
      datas: [],
      multipleSelection: [],
      currentPage: 1,
      disDelete: true,
      loading: false,
      form: {
        title: '',
        visible: false,
        action: '',
        data: {
          date: new Date(),
          name: '',
          address: ''
        }
      }
    }
  },

  methods: {
    // 提示信息
    showNotify(msg) {
      this.$notify({
        title: '提示',
        message: msg,
        duration: 6000
      });
    },
    // 批量删除
    handleSelectionChange(val) {
      this.disDelete = val.length == 0;
      this.multipleSelection = val;
    },
    handleDeleteSelection() {
      for (let item in this.multipleSelection) {
        //TODO: 服务端删除各项内容
      }
    },
    // 添加处理
    handleAdd() {
      this.$refs.add.visible = true;
    },
    afterAdd(data) {
      this.loading = true;
      // this.datas.pop();
      // this.datas = [data.data].concat(this.datas);
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    },
    // 修改处理
    handleEdit(index, row) {
      const data = {
        date: new Date(row.date),
        name: row.name,
        address: row.address
      }
      this.$refs.edit.user = data;
      this.$refs.edit.visible = true;
    },
    afterEdit(data) {
      this.$refs.edit.visible = false;
      //TODO:删除数组对象
    },
    // 删除处理
    handleDelete(index, row) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message.success('删除成功');
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    handleCurrentChange() {
      this.$http.get('/api/user').then((response) => {
        this.datas = response.data.datas;
      });
    }
  },

  created() {
    this.$http.get('/api/user').then((response) => {
      this.datas = response.data.datas;
    });
  },

  components: {
    'v-add': resolve => require(['./Add.vue'], resolve),
    'v-edit': resolve => require(['./Edit.vue'], resolve)
  }
}
</script>

<style lang="scss" scoped>
.table-operation{
  padding: 10px;
}
.table-pagination{
  padding: 10px;
  text-align: center;
}
</style>
