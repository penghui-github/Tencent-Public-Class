import request from 'axios'

//获取学生分页列表数据
export const getStudentPagedList=(pageIndex,pageSize,params)=>request({
    url:'/student/studentPagedList',
    method: 'get',
    params:{
        ...params,
        pageIndex,
        pageSize
    }
})