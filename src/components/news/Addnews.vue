<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加新闻</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card style='padding-bottom:50px'>
      <!-- 提示区 -->
      <el-alert title="添加新闻信息" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条区 -->
      <!-- <el-steps :space="200" :active="0" finish-status="success" align-center>
        <el-step title="添加标题"></el-step>
        <el-step title="添加日期"></el-step>
        <el-step title="添加图片"></el-step>
        <el-step title="添加内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>-->
      <!-- 新闻表单区 -->
      <el-form
        :model="addNewsForm"
        :rules="addNewsRules"
        ref="addNewsRef"
        label-width="100px"
        class="demo-ruleForm"
        label-position='top'
      >
        <el-form-item label="新闻标题" prop="title">
          <el-input v-model="addNewsForm.title"></el-input>
        </el-form-item>
        <el-form-item label="新闻日期" prop="date">
          <el-input v-model="addNewsForm.date"></el-input>
        </el-form-item>
        <el-form-item label="新闻图片">
          <el-upload
              :action="uploadURL"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers='headerObj'
              :on-success='handleSuccess'
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
        </el-form-item>
        <el-form-item class='addcontext' label="新闻内容">
            <!-- 富文本编辑器组件 -->
            <quill-editor v-model='addNewsForm.newsContext'></quill-editor>
            <!-- 添加商品按钮 -->
            <el-button type='primary' class='btnAdd' @click='addNews'>添加新闻</el-button>
        </el-form-item>
      </el-form>
    </el-card>
        <!-- 图片预览 -->
    <el-dialog
  title="图片预览"
  :visible.sync="previewVisible"
  width="40%">
  <img :src="previewPath" alt="" class='previewImg'>
  <!-- <span slot="footer" class="dialog-footer"> -->
  <!-- </span> -->
</el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      addNewsForm: {
        title: '',
        date: '',
        pics: [],
        newsContext: ''
      },
      addNewsRules: {
        title: [
          { required: true, message: '请输入新闻标题', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请输入新闻日期', trigger: 'blur' }
        ]
      },
       /* 上传图片的URL地址 */
      uploadURL: 'http://127.0.0.1:9001/file/upload',
      /* 图片上传的headers请求头对象 */
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      previewVisible: false,
      previewPath: ''
    }
  },
  methods: {
    handlePreview(file) {
      console.log(file)
      this.previewPath = file.response.data
      this.previewVisible = true
    },
    handleRemove(file) {
      console.log(file)
    },
    /* 点击上传成功后的钩子 */
    handleSuccess(res) {
      console.log(res)
      const picInfo = { pic: res.data }
      this.addNewsForm.pics.push(picInfo)
      console.log(this.addNewsForm)
    },
    addNews() {
      this.$refs.addNewsRef.validate(valid => {
        if (!valid) {
          return this.$message.error('请填写必要的表单项')
        }
        /* 执行添加的业务逻辑 */
      })
    }
  }
}
</script>
<style lang="less" scoped>
.btnAdd {
  margin:20px 0;
      position: absolute;
    left: 50%;
    transform: translateX(-50%);
}
.previewImg {
  width:100%;
}
</style>
