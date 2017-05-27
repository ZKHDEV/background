<template>
  <div class="table-container" v-title="'用户管理'">
    <div class="card">
      <div class="table-operation">
        <div class="table-btn-group">
          <el-button type="success" @click="handleAdd" icon="plus">添加</el-button>
          <el-button type="primary" :disabled="datas.length<=0" @click="handleExport">导出</el-button>          
          <el-button type="danger" :disabled="disDelete" @click="handleDeleteSelection">批量删除</el-button>
          <el-button type="text" :disabled="disDelete" @click="handleReverseSelection">反选</el-button>
        </div>
        <el-form :inline="true" :model="search">
          <el-form-item label="地点">
            <el-input v-model="search.address" placeholder="地点"></el-input>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker v-model="search.daterange" type="daterange" placeholder="选择日期范围">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="card table-card">
      <el-table ref="dataTable" :data="datas" border stripe v-loading="loading" @sort-change="sortChange" @selection-change="handleSelectionChange" :default-sort="{prop: 'name', order: 'ascending'}">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="150" sortable="custom">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120" sortable="custom">
        </el-table-column>
        <el-table-column prop="address" label="省份" show-overflow-tooltip sortable="custom">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="140">
          <template scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" size="small">编辑</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="table-pagination">
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next, jumper" :total="1000">
        </el-pagination>
      </div>
    </div>
  
    <v-add ref="add" @submitForm="afterAdd"></v-add>
    <v-edit ref="edit" @submitForm="afterEdit"></v-edit>
  
  </div>
</template>

<script>
import {toDateString,exportCsv} from '../../static/js/utils.js'
export default {
  data() {
    return {
      search: {
        daterange: null,
        address: ''
      },
      filter: null,
      datas: [],
      order: {
        prop: 'name',
        order: 'ascending'
      },
      multipleSelection: [],
      currentPage: 1,
      disDelete: true,
      loading: false
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
    handleSelectionChange(val) {
      this.disDelete = val.length == 0;
      this.multipleSelection = val;
    },
    // 反选
    handleReverseSelection() {
      this.datas.forEach(row => this.$refs.dataTable.toggleRowSelection(row));
    },
    // 批量删除
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
      this.getData();
    },
    handleSearch() {
      this.currentPage = 1;
      this.order = {
        prop: 'name',
        order: 'ascending'
      }
      if (!(this.search.address || this.search.daterange)) {
        this.filter = null;
      } else {
        this.filter = {
          address: this.search.address,
          start: this.search.daterange ? toDateString(this.search.daterange[0]) : '',
          end: this.search.daterange ? toDateString(this.search.daterange[1]) : ''
        }
      }
      this.getData();
    },
    sortChange({ prop, order }) {
      this.order = {
        prop: prop,
        order: order
      }
      this.currentPage = 1;
      this.getData();
    },
    getData() {
      const condition = {
        page: this.currentPage,
        order: this.order,
        filter: this.filter
      }
      this.loading = true;
      // this.$http.get('/api/user', condition).then((response) => {
      //   this.datas = response.data.datas;
      // });
      // 测试
      this.$http.get('/api/user').then((response) => {
        setTimeout(() => {
          this.loading = false;
          //测试
          this.datas = response.data.datas;
          // if (response.data.success) {
          //   this.datas = response.data.datas;
          // }
        }, 1000);
      }).catch((err) => {
        this.loading = false;
        this.datas = [];
      });
    },
    handleExport() {
      exportCsv({
        name: '导出数据',
        title: ['日期', '姓名', '地址'],
        columns: ['date', 'name', 'address'],
        data: this.datas
      })
    }
  },

  created() {
    // this.$http.get('/api/user').then((response) => {
    //   this.datas = response.data.datas;
    // });
  },

  components: {
    'v-add': resolve => require(['./Add.vue'], resolve),
    'v-edit': resolve => require(['./Edit.vue'], resolve)
  }
}
</script>

<style lang="scss" scoped>
.table-operation {
  padding: 0 12px;
}

.table-btn-group {
  float: right;
}

.table-card{
  padding: 0;
}

.table-pagination {
  border: 0;
  padding: 10px;
  text-align: right;
}

.el-form-item {
  margin-bottom: 0;
}
</style>
