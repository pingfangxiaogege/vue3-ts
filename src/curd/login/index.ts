export const formList = [
  {
    prop: 'username', 
    label: '', 
    tagType: 'el-input', 
    config: {
      placeholder: '账号'
    },
    rules: [
      {required: true, message: '请输入账号', trigger: 'blur'}
    ]
  },
  {
    prop: 'password', 
    label: '', 
    tagType: 'el-input', 
    config: {
      placeholder: '密码',
      'show-password': true
    },
    rules: [
      {required: true, message: '请输入密码', trigger: 'blur'}
    ]
  }
]