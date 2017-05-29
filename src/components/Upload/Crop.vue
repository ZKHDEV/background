<template>
    <div id="sdk-upload-container1">
        <el-button id="upload-btn1" type="primary" :loading="isLoading">选择头像
            <i class="el-icon-upload el-icon--right"></i>
        </el-button>
        <el-button type="danger" :disabled="isLoading === false" @click="cancelUpload">取消</el-button>
        <el-tooltip effect="dark" :content="fileName" placement="bottom">
            <span class="file-span">
                <nobr>{{fileName}}</nobr>
            </span>
        </el-tooltip>
        <el-progress v-show="percentage < 100 && isLoading === true" :percentage="percentage"></el-progress>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png/gif文件，且不超过1MB</div>
    
        <keep-alive>
            <el-dialog :visible.sync="cropVisible" :close-on-click-modal="false">
                <div class="cropContainer">
                    <img ref="cropStudio" id="cropStudio" src="">
                </div>
                <div class="preview-container">
                    <div class="preview-field">
                        <div ref="preview" id="preview"></div>
                    </div>
                    <span>头像预览</span>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="cropVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleSaveCrop">保 存</el-button>
                </span>
            </el-dialog>
        </keep-alive>
    </div>
</template>

<script>
import moxie from 'plupload/js/moxie.min.js'
import plupload from 'plupload/js/plupload.full.min.js'
import 'qiniu-js/dist/qiniu.min.js'
import 'cropperjs/dist/cropper.min.css'
import Cropper from 'cropperjs'
export default {
    data() {
        return {
            isLoading: false,
            percentage: 100,
            fileName: '',
            uploader: null,
            cropVisible: false,
            imgKey: {},
            srcImg: {},
            crop: null,
            cropper: null
        }
    },
    methods: {
        cancelUpload() {
            this.isLoading = false;
            this.percentage = 100;
            this.fileName = '';
            this.uploader.stop();
        },
        handleSaveCrop() {
            this.cropVisible = false;
            let imgLink = '';

            if (this.crop) {
                imgLink = Qiniu.imageMogr2({
                    crop: '!' + this.crop.width + 'x' + this.crop.height + 'a' + this.crop.x + 'a' + this.crop.y
                }, this.imgKey[this.fileName]);
                // 清空裁剪参数，避免影响后续裁剪
                this.crop = null;
            } else {
                imgLink = this.srcImg[this.fileName];
            }

            console.log(imgLink);
            // 将裁剪后URL提交到后台
            // this.$http.post('/api/saveCropImg', { url: imgLink });
        },
        handleCrop() {
            this.cropVisible = true;
            if (this.cropper) {
                this.cropper.replace(this.srcImg[this.fileName]);
            } else {
                this.$nextTick(() => {
                    const cropContainer = document.getElementById('cropStudio'),
                        preview = document.getElementById('preview');
                    this.cropper = new Cropper(cropContainer, {
                        aspectRatio: 1 / 1,
                        preview: preview,
                        crop: (e) => {
                            this.crop = {
                                x: e.detail.x,
                                y: e.detail.y,
                                height: e.detail.height,
                                width: e.detail.width
                            }
                        }
                    });
                    this.cropper.replace(this.srcImg[this.fileName]);
                })
            }
        }
    },
    mounted() {
        global.plupload = plupload;
        if (!global.mOxie) {
            global.mOxie = {
                Env: moxie.core.utils.Env,
                XMLHttpRequest: moxie.xhr.XMLHttpRequest
            };
        };

        this.uploader = Qiniu.uploader({
            runtimes: 'html5,flash,html4',      // 上传模式,依次退化
            browse_button: 'upload-btn1',         // 上传选择的点选按钮，**必需**
            // 在初始化时，uptoken, uptoken_url, uptoken_func 三个参数中必须有一个被设置
            // 切如果提供了多个，其优先级为 uptoken > uptoken_url > uptoken_func
            // 其中 uptoken 是直接提供上传凭证，uptoken_url 是提供了获取上传凭证的地址，如果需要定制获取 uptoken 的过程则可以设置 uptoken_func
            // uptoken: '', // uptoken 是上传凭证，由其他程序生成
            uptoken_url: '/api/uptoken',         // Ajax 请求 uptoken 的 Url，**强烈建议设置**（服务端提供）
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
            container: 'sdk-upload-container1',             // 上传区域 DOM ID，默认是 browser_button 的父元素，
            max_file_size: '5mb',             // 最大文件体积限制
            // flash_swf_url: '../static/Moxie.swf',  //引入 flash,相对路径
            max_retries: 3,                     // 上传失败最大重试次数
            // dragdrop: true,                     // 开启可拖曳上传
            // drop_element: 'sdk-upload-container1',          // 拖曳上传区域元素的 ID，拖曳文件或文件夹后可触发上传
            chunk_size: '4mb',                  // 分块上传时，每块的体积
            auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传,
            multi_selection: true,             // 设置一次只能选择一个文件
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
                max_file_size: '1mb',
                prevent_duplicates: true,
                // Specify what files to browse for
                mime_types: [
                    // { title: "flv files", extensions: "flv" }, // 限定flv后缀上传格式上传
                    // { title: "Video files", extensions: "flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4" }, // 限定flv,mpg,mpeg,avi,wmv,mov,asf,rm,rmvb,mkv,m4v,mp4后缀格式上传
                    { title: "Image files", extensions: "jpg,gif,png" }, // 限定jpg,gif,png后缀上传
                    // { title: "Zip files", extensions: "zip" } // 限定zip后缀上传
                ]
            },
            init: {
                'FilesAdded': (up, files) => {
                    this.isLoading = true;
                    plupload.each(files, (file) => {
                        // 文件添加进队列后,处理相关的事情
                        this.fileName = file.name;
                    });
                },
                'BeforeUpload': (up, file) => {
                    // 每个文件上传前,处理相关的事情
                },
                'UploadProgress': (up, file) => {
                    // 每个文件上传时,处理相关的事情
                    this.percentage = file.percent;
                    // console.log(file.percent+'%');
                },
                'FileUploaded': (up, file, info) => {
                    // 每个文件上传成功后,处理相关的事情
                    // 其中 info 是文件上传成功后，服务端返回的json，形式如
                    // {
                    //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
                    //    "key": "gogopher.jpg"
                    //  }
                    // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
                    this.isLoading = false;
                    const domain = up.getOption('domain'),
                        res = JSON.parse(info),
                        sourceLink = '//' + domain + '/' + res.key; //获取上传成功后的文件的Url

                    this.fileName = file.name;
                    this.$set(this.imgKey,file.name,res.key);
                    this.$set(this.srcImg,file.name,sourceLink);
                    // 裁剪处理
                    this.handleCrop();
                },
                'Error': (up, err, errTip) => {
                    //上传出错时,处理相关的事情
                    let msg = '';
                    switch (err.code) {
                        case -600: {
                            msg = '上传文件大小不能超过1MB';
                            break;
                        }
                        case -601: {
                            msg = '只能上传jpg/png/gif文件';
                            break;
                        }
                        case -602: {
                            // 重复上传，直接操作缓存
                            this.fileName = err.file.name;
                            this.handleCrop();
                            return;
                        }
                        default: {
                            msg = '上传失败，请重试';
                        }
                    }
                    this.isLoading = false;
                    this.fileName = '';
                    this.$message.error(msg);
                },
                'UploadComplete': () => {
                    //队列文件处理完毕后,处理相关的事情
                },
                'Key': (up, file) => {
                    // 若想在前端对每个文件的key进行个性化处理，可以配置该函数
                    // 该配置必须要在 unique_names: false , save_key: false 时才生效

                    // var key = 
                    //do something with key here
                    // return key;
                }
            }
        });
    }
}
</script>

<style lang="scss" coped>
.file-span {
    display: inline-block;
    max-width: calc(100% - 210px);
    margin: 0 0 -5px 10px;
    overflow: hidden;
    color: #AAAAAA;
    text-overflow: ellipsis;
}

.el-dialog {
    width: 680px;
}

.cropContainer {
    display: inline-block;
    width: 400px;
    height: 300px;
}

.preview-container {
    display: inline-block;
    position: relative;
    top: -120px;
    left: 50px;
    span {
        display: block;
        position: relative;
        top: 12px;
        color: #AAAAAA;
        text-align: center;
    }
}

.preview-field {
    padding: 3px;
    border: solid 1px #EDEDED;
}

#preview {
    height: 120px;
    width: 120px;
    overflow: hidden;
}
</style>
