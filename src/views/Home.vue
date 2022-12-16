<template>
  <div>
    <h1>Home</h1>
    <hello-vue message="hehe"></hello-vue>
    <el-button type="primary" @click="getAll">获取所有用户</el-button>
    <el-button type="warning" @click="getData">获取用户1</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="item in columns"
        :key="item['prop']"
        :prop="item['prop']"
        :label="item['label']"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="editUser(scope.row)"
            >编辑</el-button
          >
          <el-button @click="delete scope.row" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="showEditDialog" title="编辑">
      <el-form :model="userForm">
        <el-form-item label="Name" prop="name">
          <el-input v-model="userForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="userForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="submitEdit">确定</el-button>
        <el-button @click="showEditDialog = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import HelloVue from '@/components/Hello.vue';
import { defineComponent } from 'vue';
import { getUser, getAllUser, delUser, updateUser } from '@/apis/user';
import { State, User, Column } from '@/types/home';
const columns: Column[] = [
  {
    prop: 'id',
    label: 'ID',
  },
  {
    prop: 'name',
    label: 'Name',
  },
  {
    prop: 'password',
    label: 'Password',
  },
];
export default defineComponent({
  components: { HelloVue },
  data(): State {
    return {
      tableData: [],
      columns: [],
      userForm: {
        id: 0,
        name: '',
        password: '',
      },
      showEditDialog: false,
    };
  },
  created() {
    this.columns = columns;
  },
  methods: {
    async getData() {
      const { data } = await getUser({ id: 1 });
      this.tableData = [data.user];
    },
    async getAll() {
      const { data } = await getAllUser();
      console.log(data);
      this.tableData = data;
    },
    editUser(row: User) {
      this.showEditDialog = true;
      this.userForm = row;
    },
    async delete(row: User) {
      await this.$confirm('此操作将删除该用户，是否继续？', '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '确定',
      });
      let res: any = await delUser({ id: row.id });
      this.$message({
        type: 'success',
        message: res?.data?.msg,
      });
    },
    async submitEdit() {
      let res: any = await updateUser(this.userForm);
      this.showEditDialog = false;
      this.$message({ type: 'success', message: res?.data?.msg });
    },
  },
});
</script>

<style scoped></style>
