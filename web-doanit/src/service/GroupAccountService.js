import  axios from "axios"
const URL="http://localhost:8080/api/Group";
export const save= async (groupAccount)=>{
    try{
        await axios.post(URL+"/createGroup",groupAccount)
    }catch (e){
        console.log(e)
    }
}