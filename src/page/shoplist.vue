<template>
  <div class="admin-list">
    <el-table
      v-loading='load'
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%">
      <el-table-column
        type="selection">
      </el-table-column>

      <el-table-column
        prop="name"
        label="商品名">
      </el-table-column>

      <el-table-column
        width="160"
        label="添加日期">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="价格">
        <template scope="scope">
          {{ scope.row.price }}元
        </template>
      </el-table-column>


      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="editGoods(scope.row)">修改商品
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)">删除商品
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="btns">
      <el-button type="success">批量上架</el-button>
      <el-button type="danger" @click="deleteMulti">批量删除</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'shoplist',
    data() {
      return {
        tableData: [],
        multipleSelection: [],
        load: false, // loading
      }
    },
    methods: {
      // 删除
      handleDelete(row) {
        this.func.ajaxPost(this.api.goodsDelete, {id: row.id}, res => {
          if (res.data.code === 200) {
            let index = this.tableData.indexOf(row);
            this.tableData.splice(index, 1);
            this.$message.success('删除成功');
          }
        });
      },
      // 修改
      editGoods (row) {
        this.$router.push({path: '/admin/goods-form', query: {id: row.id}});
      },
      deleteMulti () {
        let multi = this.multipleSelection
        let id = multi.map(el => {
          return el.id;
        });
        this.func.ajaxPost(this.api.deleteMulti, {id}, res => {
          if (res.data.code === 200) {
            this.$message.success('删除成功');
            multi.forEach(el => {
              let i = this.tableData.indexOf(el);
              this.tableData.splice(i, 1);
            });
          }
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    created () {
      this.load = true;
      this.func.ajaxGet(this.api.goodsList, res => {
        this.tableData = res.data.goods;
        this.load = false;
      });
    },
  }
</script>
