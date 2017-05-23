<template>
    <el-dialog title="修改用户" :visible.sync="visible">
        <el-form :model="user" ref="form" :rules="rules" label-width="60px">
            <el-form-item label="日期" prop="date">
                <el-date-picker type="date" placeholder="选择日期" v-model="user.date"></el-date-picker>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
                <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="地址" prop="address">
                <el-input v-model="user.address"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="visible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm" :loading="isSubmitting">{{submitText}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {toDateString} from '../../static/js/utils.js'
export default {
    data() {
        return {
            user: {
                date: new Date(),
                name: '',
                address: ''
            },
            visible: false,
            isSubmitting: false,
            submitText: '提 交',
            rules: {
                date: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                address: [
                    { required: true, message: '请输入地址', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        submitForm() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // 格式化日期
                    const srcDate = new Date(this.user.date),
                        data = {
                            date: toDateString(srcDate),
                            name: this.user.name,
                            address: this.user.address
                        };

                    this.submitText = '提交中';
                    this.isSubmitting = true;
                    this.$http.post('/api/edituser', data).then((response) => {
                        this.submitText = '提 交';
                        this.isSubmitting = false;

                        if (response.data.success) {
                            this.visible = false;
                            this.$refs.form.resetFields();
                            this.$message.success('操作成功');
                            this.$emit('submitForm', response.data.data);
                        } else {
                            this.$message.error('操作失败，请重试');
                        }
                    }).catch((err) => {
                        this.$message.error('操作失败，请重试');
                        this.submitText = '提 交';
                        this.isSubmitting = false;
                    });
                } else {
                    return false;
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
</style>