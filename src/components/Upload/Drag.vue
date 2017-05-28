<template>
    <div class="drap-container">
        <el-upload drag action="http://up-z2.qiniu.com/" multiple :accept="accept" :data="form" :on-error="handleError">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png/gif文件，且不超过1MB</div>
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
        handleError(err,file) {
            console.log(err);
            this.$message.error('上传失败，请重试');
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
