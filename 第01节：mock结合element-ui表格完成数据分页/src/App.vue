<template>
  <div id="app">

    <!--整体采用Element卡片作为根容器-->
    <el-card header="学员管理">
      <el-row>

        <!--搜索表单栏-->
        <el-col :span="24">
          <el-form :inline="true" :model="query" size="small">
            <el-form-item label="姓名">
              <el-input v-model="query.studentName" placeholder="请输入..."></el-input>
            </el-form-item>
            <el-form-item label="班级">
              <el-select v-model="query.classId" placeholder="请选择">
                <el-option label="计算机一班" value="1"></el-option>
                <el-option label="软件工程" value="2"></el-option>
                <el-option label="通信工程" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" icon="el-icon-search" @click="handldQuery">查询</el-button>
              <el-button size="small" icon="el-icon-refresh" @click="resetQuery">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <!--添加及批量删除按钮栏-->
        <el-col :span="24">
          <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="handleAdd">新增</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" @click="handleBatchDelete">批量删除</el-button>
        </el-col>

        <!--表格数据展示栏-->
        <el-col :span="24">
          <el-table :data="studentList" stripe @selection-change="handleSelectionChange">
            <el-table-column  type="selection" width="55"/>
            <el-table-column prop="studentId" label="学生Id" width="80"/>
            <el-table-column prop="studentName" label="学生姓名" width="120"/>
            <el-table-column prop="studentNo" label="学号" width="150"/>
            <el-table-column prop="gender" label="性别" width="80">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.gender===1" size="small">男</el-tag>
                <el-tag v-else size="small" type="success">女</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" width="80"/>
            <el-table-column prop="className" label="班级" width="120"/>
            <el-table-column prop="registerTime" label="注册时间"  width="150"/>
            <el-table-column prop="address" label="地址"/>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button size="small" type="text" icon="el-icon-view" @click="handleView(scope)">查看</el-button>
                <el-button size="small" type="text" icon="el-icon-edit" @click="handleEidt(scope)">编辑</el-button>
                <el-button size="small" type="text" icon="el-icon-delete" @click="handleDelete(scope)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>

        <!--分页栏-->
        <el-col :span="24">
          <el-pagination
                  background
                  :page-sizes="page.pageSizes"
                  :page-size="page.pageSize"
                  layout="total,sizes,prev,pager,next,jumper"
                  @size-change="sizeChange"
                  @current-change="currentChange"
                  :total="page.total"
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {getStudentPagedList} from "./api/student"

export default {
  name: 'app',
  created(){
    this.loadData()
  },
  data(){
    return{
      //列表搜索数据
      query:{
        studentName:'',
        classId:null
      },
      //学生数据源
      studentList:[],
      //选中的数据
      selectedStudentList:[],
      //分页数据
      page:{
        pageSize:5,
        currentPage:1,
        pageSizes:[5,10,20,30,50],
        total:0
      }
    }
  },
  methods:{

    //执行查询事件
    handldQuery(){
      this.$message({
        message:`查询姓名为${this.query.studentName}、
                 班级Id为${this.query.classId}的学员数据`,
        type:'success'
      })
    },

    //重置查询条件
    resetQuery(){
      this.query.studentName=''
      this.query.classId=null
    },

    //选中状态改变事件
    handleSelectionChange(selectedList){
      this.selectedStudentList=selectedList
    },

    //每页数据条数改变事件
    sizeChange(pageSize){
      this.page.pageSize=pageSize
      this.loadData()
    },

    //当前页数据改变事件
    currentChange(currentPage){
      this.page.currentPage = currentPage
      this.loadData()
    },

    //数据加载事件
    loadData(){
      getStudentPagedList(this.page.currentPage,this.page.pageSize).then(res=>{
        this.studentList=res.data.data
        this.page.total=res.data.total
      })
    },

    //新增按钮点击事件
    handleAdd(){
      this.$message({
        message:'添加新学员',
        type:'success'
      })
    },

    //批量删除
    handleBatchDelete(){
      this.$message.error("批量删除数据")
    },

    //查看
    handleView(scope){
      this.$message({
        type:'success',
        message:`查看姓名为${scope.studentName}的学生信息`
      })
    },

    //编辑
    handleEdit(scope){
      this.$message({
        type:'success',
        message:`编辑姓名为${scope.studentName}的学生信息`
      })
    },

    //删除
    handleView(scope){
      this.$message({
        type:'success',
        message:`删除姓名为${scope.studentName}的学生信息`
      })
    }
  }
}
</script>

<style>
html,body{
  background: #f4f4f4;
}
</style>
