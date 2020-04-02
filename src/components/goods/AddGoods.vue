<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 提示区 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条区 -->
      <el-steps :space="200" :active="activeIndex-0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab栏区 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          :tab-position="'left'"
          v-model="activeIndex"
          :before-leave="beforeTabLeave"
          @tab-click="tabClick"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goodsName">
              <el-input v-model="addForm.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goodsPrice">
              <el-input v-model="addForm.goodsPrice" type="number" min="0"></el-input>
            </el-form-item>
            <el-form-item label="商品库存" prop="goodsStock">
              <el-input v-model="addForm.goodsStock" type="number" min="0"></el-input>
            </el-form-item>
            <el-form-item label="商品类型" prop="goodsType">
              <el-cascader
                v-model="addForm.goodsType"
                expand-trigger="hover"
                :options="cateList"
                :props="cateProps"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染表单的item项 -->
            <el-form-item :label="item.name" v-for="item in manyTabData" :key="item.id">
              <!-- 复选框组 -->
              <el-checkbox-group v-model="item.values">
                <el-checkbox
                  border
                  v-for="(item1, index) in item.values"
                  :key="index"
                  :label="item1"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.name" v-for="item in onlyTabData" :key="item.id">
              <el-input v-model="item.values"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- action 表示图片要上传到的后台API地址 -->
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
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器组件 -->
            <quill-editor v-model='addForm.goodsContext'></quill-editor>
            <!-- 添加商品按钮 -->
            <el-button type='primary' class='btnAdd' @click='add'>添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <!-- 图片预览 -->
    <el-dialog
  title="图片预览"
  :visible.sync="previewVisible"
  width="50%">
  <img :src="previewPath" alt="" class='previewImg'>
  <span slot="footer" class="dialog-footer">
  </span>
</el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: '0',
      /* 添加商品的表单对象数据 */
      addForm: {
        goodsName: '',
        goodsPrice: 0,
        goodsStock: 0,
        /* 商品所属的分类数组 */
        goodsType: [],
        /* 图片数组 */
        pics: [],
        /* 商品详情描述 */
        goodsContext: ''
      },
      addFormRules: {
        goodsName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goodsPrice: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goodsStock: [
          { required: true, message: '请输入商品库存', trigger: 'blur' }
        ],
        goodsType: [
          { required: true, message: '请选择商品类型', trigger: 'blur' }
        ]
      },
      /* 商品分类列表 */
      cateList: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                },
                {
                  value: 'fankui',
                  label: '反馈'
                },
                {
                  value: 'xiaolv',
                  label: '效率'
                },
                {
                  value: 'kekong',
                  label: '可控'
                }
              ]
            },
            {
              value: 'daohang',
              label: '导航',
              children: [
                {
                  value: 'cexiangdaohang',
                  label: '侧向导航'
                },
                {
                  value: 'dingbudaohang',
                  label: '顶部导航'
                }
              ]
            }
          ]
        },
        {
          value: 'zujian',
          label: '组件',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout 布局'
                },
                {
                  value: 'color',
                  label: 'Color 色彩'
                },
                {
                  value: 'typography',
                  label: 'Typography 字体'
                },
                {
                  value: 'icon',
                  label: 'Icon 图标'
                },
                {
                  value: 'button',
                  label: 'Button 按钮'
                }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio 单选框'
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox 多选框'
                },
                {
                  value: 'input',
                  label: 'Input 输入框'
                },
                {
                  value: 'input-number',
                  label: 'InputNumber 计数器'
                },
                {
                  value: 'select',
                  label: 'Select 选择器'
                },
                {
                  value: 'cascader',
                  label: 'Cascader 级联选择器'
                },
                {
                  value: 'switch',
                  label: 'Switch 开关'
                },
                {
                  value: 'slider',
                  label: 'Slider 滑块'
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker 时间选择器'
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker 日期选择器'
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker 日期时间选择器'
                },
                {
                  value: 'upload',
                  label: 'Upload 上传'
                },
                {
                  value: 'rate',
                  label: 'Rate 评分'
                },
                {
                  value: 'form',
                  label: 'Form 表单'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table 表格'
                },
                {
                  value: 'tag',
                  label: 'Tag 标签'
                },
                {
                  value: 'progress',
                  label: 'Progress 进度条'
                },
                {
                  value: 'tree',
                  label: 'Tree 树形控件'
                },
                {
                  value: 'pagination',
                  label: 'Pagination 分页'
                },
                {
                  value: 'badge',
                  label: 'Badge 标记'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert 警告'
                },
                {
                  value: 'loading',
                  label: 'Loading 加载'
                },
                {
                  value: 'message',
                  label: 'Message 消息提示'
                },
                {
                  value: 'message-box',
                  label: 'MessageBox 弹框'
                },
                {
                  value: 'notification',
                  label: 'Notification 通知'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'NavMenu 导航菜单'
                },
                {
                  value: 'tabs',
                  label: 'Tabs 标签页'
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb 面包屑'
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown 下拉菜单'
                },
                {
                  value: 'steps',
                  label: 'Steps 步骤条'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog 对话框'
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip 文字提示'
                },
                {
                  value: 'popover',
                  label: 'Popover 弹出框'
                },
                {
                  value: 'card',
                  label: 'Card 卡片'
                },
                {
                  value: 'carousel',
                  label: 'Carousel 走马灯'
                },
                {
                  value: 'collapse',
                  label: 'Collapse 折叠面板'
                }
              ]
            }
          ]
        },
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      cateProps: {
        label: 'label',
        value: 'value',
        children: 'children'
      },
      /* 动态参数列表数据 */
      manyTabData: [],
      /* 商品属性列表 */
      onlyTabData: [
        { id: 'aa1', name: '商品名称', values: 'aaa' },
        { id: 'aa2', name: '功效', values: 'bbb' },
        { id: 'aa3', name: '特点', values: 'ccc' }
      ],
      /* 上传图片的URL地址 */
      uploadURL: 'http://127.0.0.1:9001/file/upload',
      /* 图片上传的headers请求头对象 */
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      previewPath: '',
      previewVisible: false
    }
  },
  methods: {
    /* 级联选择器，选中项变化触发的函数 */
    handleChange() {
      console.log(this.addForm.goodsType)
      if (this.addForm.goodsType.length !== 3) {
        this.addForm.goodsType = []
      }
    },
    beforeTabLeave(activeName, oldActiveName) {
      // console.log('即将离开的标签名' + oldActiveName)
      // console.log('即将到达的标签名' + activeName)
      if (oldActiveName === '0' && this.addForm.goodsType.length !== 3) {
        this.$message.error('请选择商品类型')
        return false
      }
    },
    tabClick() {
      console.log(this.activeIndex)
      /* 证明访问的是动态参数面板 */
      if (this.activeIndex === '1') {
        this.manyTabData = [
          { id: 'a1', name: '功效', values: ['清热解毒', '凉血利咽'] },
          { id: 'a2', name: '特点', values: ['红色', '颗粒'] }
        ]
      }
    },
    /* 处理图片预览效果 */
    handlePreview(file) {
      console.log(file)
      this.previewPath = file.response.data
      this.previewVisible = true
    },
    /* 处理移除图片的操作 */
    handleRemove(file) {
      console.log(file)
      const filePath = file.response.data
      const i = this.addForm.pics.findIndex(x =>
        x.pic === filePath
      )
      this.addForm.pics.splice(i, 1)
      console.log(this.addForm.pics)
    },
    /* 监听图片上传成功的时间 */
    handleSuccess(response) {
      console.log(response)
      const picInfo = { pic: response.data }
      this.addForm.pics.push(picInfo)
      console.log(this.addForm.pics)
    },
    /* 添加商品 */
    add() {
      console.log(this.addForm)
      this.$refs.addFormRef.validate(valid => {
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
.previewImg {
  width:100%;
}
.btnAdd{
  margin-top:15px;
}
</style>
