import  axios from "axios"
const URL="http://localhost:8080/api/Group";
export const save= async (groupAccount,idStudent,accountStudent)=>{
    try{
        await axios.post(URL+"/createGroup?studentId="+idStudent+"&accountId="+accountStudent,groupAccount)
    }catch (e){
        console.log(e)
    }
}