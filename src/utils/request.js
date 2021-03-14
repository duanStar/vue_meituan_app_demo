import axios from 'axios'
axios.defaults.baseURL = 'http://admin.gxxmglzx.com/tender/test/'

export default async function ({ url, data = {} }) {
  const { data: res } = await axios.get(url, {
    params: data
  })
  if (res.errcode === 200) {
    return res
  } else {
    console.log(res.errmsg)
  }
}
