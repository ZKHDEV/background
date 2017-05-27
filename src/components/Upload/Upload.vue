<template>
    <div class="upload-container" v-title="'上传'">
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="card upload-card">
                    <el-upload action="http://up-z2.qiniu.com/" :data="form" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-success="handleSuccess">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="card upload-card">
                    <div id="videoContainer">
                        <el-button id="selectVideo" type="primary">选择视频
                        </el-button>
                        <el-button type="primary" @click="startUpload">上传
                            <i class="el-icon-upload el-icon--right"></i>
                        </el-button>
                        <el-button type="primary" @click="cancelUpload">取消
                        </el-button>
                    </div>
                    <!--<div id="upload-container">-->
                    <!--<input type="file" id="pickfiles">-->
                    <!--<el-button type="primary" id="pickfiles">上传
                                                        <i class="el-icon-upload el-icon--right"></i>
                                                    </el-button>-->
                    <!--</div>-->
                </div>
            </el-col>
            <!--<el-col :span="12">
                                                                    <div class="card upload-card">
                                                                        <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
                                                                            <i class="el-icon-upload"></i>
                                                                            <div class="el-upload__text">将文件拖到此处，或
                                                                                <em>点击上传</em>
                                                                            </div>
                                                                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                                                                        </el-upload>
                                                                    </div>
                                                                </el-col>-->
        </el-row>
        <el-row :gutter="10">
            <el-col :span="12">
                <div class="card upload-card">
                    <v-batch></v-batch>
                </div>
            </el-col>
            <!--<el-col :span="12">
                <div class="card upload-card">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
            </el-col>-->
        </el-row>
    </div>
</template>

<script>
import Batch from './Batch.vue'
import moxie from 'plupload/js/moxie.min.js'
import plupload from 'plupload/js/plupload.full.min.js'
import 'qiniu-js/dist/qiniu.min.js'
export default {
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            form: {
                token: 'pjT84UdnPNrg5oQ-tAU9fn2DdOr434zKjevPyZxV:WBmqSzOAQmmRC5iDsD6qfh_Av1g=:eyJzY29wZSI6InpvbmUiLCJkZWFkbGluZSI6MTQ5NTgwMzUwNn0='
            },
            uploader: null
        };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleSuccess(response, file, fileList) {
            console.log(file.response);
        },
        startUpload() {
            this.uploader.start();
        },
        cancelUpload() {
            this.uploader.stop();
        }
    },
    mounted() {
        // this.$http.get('/api/getUpToken');

        global.plupload = plupload;
        if (!global.mOxie) {
            global.mOxie = {
                Env: moxie.core.utils.Env,
                XMLHttpRequest: moxie.xhr.XMLHttpRequest
            };
        };

        this.uploader = Qiniu.uploader({
            runtimes: 'html5,flash,html4',      // 上传模式,依次退化
            browse_button: 'selectVideo',         // 上传选择的点选按钮，**必需**
            // 在初始化时，uptoken, uptoken_url, uptoken_func 三个参数中必须有一个被设置
            // 切如果提供了多个，其优先级为 uptoken > uptoken_url > uptoken_func
            // 其中 uptoken 是直接提供上传凭证，uptoken_url 是提供了获取上传凭证的地址，如果需要定制获取 uptoken 的过程则可以设置 uptoken_func
            uptoken: 'pjT84UdnPNrg5oQ-tAU9fn2DdOr434zKjevPyZxV:3DSk0FX2pwt5QXVRcsq6qhUnLwQ=:eyJzY29wZSI6InpvbmUiLCJkZWFkbGluZSI6MTQ5NTg4NDc4NX0=', // uptoken 是上传凭证，由其他程序生成
            // uptoken_url: '/uptoken',         // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
            // uptoken_func: function(file){    // 在需要获取 uptoken 时，该方法会被调用
            //    // do something
            //    return uptoken;
            // },
            get_new_uptoken: false,             // 设置上传文件的时候是否每次都重新获取新的 uptoken
            // downtoken_url: '/downtoken',
            // Ajax请求downToken的Url，私有空间时使用,JS-SDK 将向该地址POST文件的key和domain,服务端返回的JSON必须包含`url`字段，`url`值为该文件的下载地址
            // unique_names: true,              // 默认 false，key 为文件名。若开启该选项，JS-SDK 会为每个文件自动生成key（文件名）
            // save_key: true,                  // 默认 false。若在服务端生成 uptoken 的上传策略中指定了 `save_key`，则开启，SDK在前端将不对key进行任何处理
            domain: 'ontbqvqde.bkt.clouddn.com',     // bucket 域名，下载资源时用到，如：'http://xxx.bkt.clouddn.com/' **必需**
            container: 'videoContainer',             // 上传区域 DOM ID，默认是 browser_button 的父元素，
            max_file_size: '100mb',             // 最大文件体积限制
            // flash_swf_url: '../static/Moxie.swf',  //引入 flash,相对路径
            max_retries: 3,                     // 上传失败最大重试次数
            dragdrop: true,                     // 开启可拖曳上传
            drop_element: 'videoContainer',          // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
            chunk_size: '4mb',                  // 分块上传时，每块的体积
            auto_start: false,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
            multi_selection: false,             // 设置一次只能选择一个文件
            //x_vars : {
            //    自定义变量，参考http://developer.qiniu.com/docs/v6/api/overview/up/response/vars.html
            //    'time' : function(up,file) {
            //        var time = (new Date()).getTime();
            // do something with 'time'
            //        return time;
            //    },
            //    'size' : function(up,file) {
            //        var size = file.size;
            // do something with 'size'
            //        return size;
            //    }
            //},
            filters: {
                max_file_size: '100mb',
                prevent_duplicates: true,
                // Specify what files to browse for
                mime_types: [
                    { title: "flv files", extensions: "flv" }, // 限定flv后缀上传格式上传
                    { title: "Video files", extensions: "flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4" }, // 限定flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4后缀格式上传
                    { title: "Image files", extensions: "jpg,gif,png" }, // 限定jpg,gif,png后缀上传
                    { title: "Zip files", extensions: "zip" } // 限定zip后缀上传
                ]
            },
            init: {
                'FilesAdded': function (up, files) {
                    // plupload.each(files, function(file) {
                    //     // 文件添加进队列后,处理相关的事情
                    // });
                },
                'BeforeUpload': function (up, file) {
                    // 每个文件上传前,处理相关的事情
                },
                'UploadProgress': function (up, file) {
                    // 每个文件上传时,处理相关的事情
                    // console.log(file.percent+'%');
                },
                'FileUploaded': function (up, file, info) {
                    // 每个文件上传成功后,处理相关的事情
                    // 其中 info 是文件上传成功后，服务端返回的json，形式如
                    // {
                    //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                    //    "key": "gogopher.jpg"
                    //  }
                    // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html

                    // var domain = up.getOption('domain');
                    var res = JSON.parse(info);
                    // var sourceLink = domain + res.key; 获取上传成功后的文件的Url

                    var imgLink = Qiniu.watermark({
                        mode: 1,  // 图片水印
                        image: 'http://77flds.com2.z0.glb.qiniucdn.com/images/logo-2.png', // 图片水印的Url，mode = 1时，必需
                        dissolve: 50,          // 透明度，取值范围1-100，非必需，下同
                        gravity: 'SouthWest',  // 水印位置，为以下参数[NorthWest、North、NorthEast、West、Center、East、SouthWest、South、SouthEast]之一
                        dx: 100,  // 横轴边距，单位：像素(px)
                        dy: 100   // 纵轴边距，单位：像素(px)
                    }, res.key);      // key为非必需参数，下同
                    console.log(imgLink);
                },
                'Error': function (up, err, errTip) {
                    //上传出错时,处理相关的事情
                },
                'UploadComplete': function () {
                    //队列文件处理完毕后,处理相关的事情
                },
                'Key': function (up, file) {
                    // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                    // 该配置必须要在 unique_names: false , save_key: false 时才生效

                    // var key = "";
                    // do something with key here
                    // return key
                }
            }
        });

        // console.log(uploader);
    },
    components: {
        'v-batch': Batch
    }
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>