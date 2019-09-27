<template>
    <div>
        <el-button type="primary" icon="el-icon-edit-outline" @click="addCategory">添加目录</el-button>
        <el-table
                :data="list"
                style="width: 100%">
            <el-table-column
                    prop="name"
                    label="名字"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="180">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="editCategory(scope.$index)"
                            type="text"
                            size="small">
                        修改
                    </el-button>
                    <el-button
                            @click.native.prevent="deleteCategory(scope.$index)"
                            type="text"
                            size="small">
                        移除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>

    import api from '../utils/api';

    export default {
        name: "AdminCategory",

        data: () => {

          return {
              list: [],
          }

        },

        created() {
            this.loadData();
        },

        methods: {

            loadData() {
                let that = this;
                api.cateList().then(function (res) {

                    if (res.status === 200) {
                        if (res.data.code !== 0) {
                            that.$alert(res.data.message, '标题', {
                                confirmButtonText: '确定',
                            });
                        } else {
                            that.list = [];
                            that.list = res.data.data;
                        }
                    }
                })
            },

            addCategory() {

                let that = this;
                this.$prompt('请输入名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {

                    api.addCate(value).then(function (res) {
                        if (res.status === 200) {
                            if (res.data.code !== 0) {

                                that.$alert(res.data.message, '标题', {
                                    confirmButtonText: '确定',
                                });
                            } else {
                                that.list.push({
                                    'id': res.data.data.id,
                                    'name': res.data.data.name,
                                })
                            }
                        }
                    })



                }).catch(() => {

                });
            },

            editCategory(index) {

                let item = this.list[index];

                this.$prompt('请输入名称', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    message: item.name,
                }).then(({ value }) => {

                    let that = this;

                    api.editCate(item.id, value).then(function (res) {
                        if (res.status === 200) {
                            if (res.data.code !== 0) {

                                that.$alert(res.data.message, '标题', {
                                    confirmButtonText: '确定',
                                });
                            } else {

                                that.list[index].name = value;
                            }
                        }


                    })


                })


            },

            deleteCategory(index) {


                this.$confirm('删除该目录，也会删除该目录下的所有文章，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    let item = this.list[index];
                    let that = this;

                    api.deleteCate(item.id).then(function (res) {

                        if (res.status === 200) {
                            if (res.data.code !== 0) {

                                that.$alert(res.data.message, '标题', {
                                    confirmButtonText: '确定',
                                });
                            } else {

                                that.list.splice(index, 1);
                            }
                        }


                    })





                })

            },



        },
    }
</script>

<style scoped>

</style>