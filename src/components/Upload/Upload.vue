<template>
    <div class="upload-container" v-title="'上传'">
        <el-row>
            <el-col :span="24">
                <div class="card warning-card">
                    上传功能使用七牛云提供服务，使用时请先从后台获取上传Token！
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="card upload-card">
                    <v-qiniusdk></v-qiniusdk>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="card upload-card">
                    <v-batch></v-batch>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="card upload-card">
                    <v-drag></v-drag>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="card upload-card">
                    <v-avatar></v-avatar>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="card upload-card">
                    <v-crop></v-crop>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Batch from './Batch.vue'
import Drag from './Drag.vue'
import QiniuSdk from './QiniuSdk.vue'
import Avatar from './Avatar.vue'
import Crop from './Crop.vue'
export default {
    components: {
        'v-batch': Batch,
        'v-drag': Drag,
        'v-qiniusdk': QiniuSdk,
        'v-avatar': Avatar,
        'v-crop': Crop
    }
}
</script>

<style lang="scss" scoped>
.warning-card{
    color: red;
    padding-left: 20px;
}
</style>