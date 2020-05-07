const axios = require('axios')
axios.get('http://192.168.1.143:8000/admin/login/').then(resp => {
  console.log(resp.data)
})
