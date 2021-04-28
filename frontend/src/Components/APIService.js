import axios from 'axios'

  class APIService  {

    static RegisterUser(body) {
      return axios({
        method:'post',
        url:'http://127.0.0.1:8000/tenent/tuser/',
        data:body,
        headers:{
          'Content-Type':'application/json',
            'Authorization': 'Token acc3cf25da9ca03a6b9f40b63ad5165952083167'
        }
      }).then(resp =>{return resp.json()})
        // return axios.post('http://127.0.0.1:8001/tenent/tuser/', {
        //     data:JSON.stringify(body)
  
        // },{
        //   headers: {
        //     'Content-Type':'application/json',
        //     'Authorization': 'Token acc3cf25da9ca03a6b9f40b63ad5165952083167'
        //   }
        // }).then(resp =>{return resp.json()})
        .catch(({response}) =>{
            return response
        })
      }
}
export default APIService
