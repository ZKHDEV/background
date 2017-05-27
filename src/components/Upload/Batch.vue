<template>
    <div class="batch-container">
        <el-upload ref="upload" action="http://up-z2.qiniu.com/" :accept="accept" :multiple="true" :data="form" :on-preview="handlePreview" :file-list="fileList" :auto-upload="false" :on-error="handleError" :on-success="handleSuccess">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button :loading="isUploading" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/gif文件，且不超过1MB</div>
        </el-upload>
        <el-dialog :title="previewTitle" :visible.sync="showPreview">
            <a :href="previewUrl" target="_blank"><img :src="previewUrl" style="max-width: 100%"></a>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isUploading: false,
            form: {
                token: ''
            },
            fileList: [],
            accept: 'image/jpeg,image/png,image/gif',
            showPreview: false,
            previewTitle: '',
            previewUrl: ''
        };
    },
    methods: {
        submitUpload() {
            // 文件校验由后台返回的Token实现
            this.isUploading = true;
            this.$refs.upload.submit();
        },
        handlePreview(file) {
            if (file.response) {
                this.previewTitle = file.name;
                this.previewUrl = 'http://ontbqvqde.bkt.clouddn.com/' + file.response.key;
                this.showPreview = true;
            }
        },
        handleError(err,file) {
            console.log(err);
            this.isUploading = false;
            this.$message.error('上传失败，请重试');
        },
        handleSuccess() {
            this.isUploading = false;
        }
    },
    mounted() {
        this.$http.get('/api/getUploadToken').then(response => {
            this.form.token = response.data.token;
        });
    }
}
</script>

<style lang="scss" coped>

</style>
