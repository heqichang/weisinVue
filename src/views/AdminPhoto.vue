<template>
   <div class="wrap">
       <el-image :src="src" class="img"></el-image>
       <el-image :src="src" class="img"></el-image>
       <el-image :src="src" class="img"></el-image>
       <el-image :src="src" class="img"></el-image>
       <el-image :src="src" class="img"></el-image>
       <el-image :src="src" class="img"></el-image>
       <el-image :src="src" class="img"></el-image>
       <el-image :src="src" class="img"></el-image>
       <el-image :src="src" class="img"></el-image>
   </div>
</template>

<script>
    export default {
        name: "AdminPhoto",

        data() {
            return {
                src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
            }
        }
    }
</script>

<style scoped>

    .wrap {
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
    }

    .img{
        margin: 3px;
        padding: 5px;
        height: 200px;
        width: 200px;
        background: #ccc;
        flex-grow: 1;
        object-fit: cover;
        transition: .3s;
    }

    .wrap:after{
        display: block;
        content: '';
        flex-grow: 9999;
    }
    .wrap .img:hover{
        transform: scale(1.1);
        box-shadow: 0 0 10px #fff;
        z-index: 9999;
    }


</style>