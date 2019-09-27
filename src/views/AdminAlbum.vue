<template>
   <div>
      <el-button type="primary" icon="el-icon-edit-outline" @click="addCategory">添加相册</el-button>
      <el-table
              :data="list"
              style="width: 100%">
         <el-table-column
                 label="名字"
                 width="180">
            <template>
               <router-link>名字</router-link>
            </template>
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
    export default {
        name: "AdminAlbum",

       data() {
           return {
              src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
           }
       }
    }
</script>

<style scoped>



</style>