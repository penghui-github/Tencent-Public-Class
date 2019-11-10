import Mock from 'mockjs'
import {getQueryParameters} from "../util/util"

//对外输出对应的数据接口
export  default ()=>{

    Mock.mock(/\/student\/studentPagedList/,'get',(params)=>{
        const paramObj=getQueryParameters(params)

        const classList=['计算机一班','软件工程','网络工程']

        const studentList=[]

        const totalCount=500

        const pageIndex=parseInt(paramObj.pageIndex)
        const pageSize=parseInt(paramObj.pageSize)
        const totalPage=Math.ceil(totalCount/pageSize)//向上取整

        const startNo=(pageIndex-1)*pageSize+1//计算开始Id
        const endNo=pageIndex<totalPage?pageIndex*pageSize:totalCount

        for(let i=startNo;i<=endNo;i++){
            studentList.push(Mock.mock({
                studentId:i,
                studentName:Mock.mock('@cname'),
                studentNo:Mock.mock('@natural(17434010103,17434010300)'),
                gender:Mock.mock('@natural(1,2)'),
                age:Mock.mock('@natural(18,22)'),
                registerTime:Mock.Random.date('yyyy-MM-dd'),
                address:Mock.Random.city(true),
                className:Mock.Random.pick(classList)
            }))
        }

        return {
            total:totalCount,
            data:studentList
        }

    })
}
