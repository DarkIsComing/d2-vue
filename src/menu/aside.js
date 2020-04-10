// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    path: '/user',
    title: '用户管理',
    icon: 'folder-o'

  },
  {
    title: '资源管理',
    icon: 'folder-o',
    children: [
      { path: '/resourceRecommend', title: '资源推荐' },
      { path: '/resourceList', title: '资源列表' }
    ]
  },
  {
    title: '订单管理',
    icon: 'folder-o',
    children: [
      { path: '/order', title: '订单列表' }
    ]
  },
  {
    path: '/advert',
    title: '广告管理',
    icon: 'folder-o'
  },
  {
    path: '/cash',
    title: '提现管理',
    icon: 'folder-o'
  },
  {
    path: '/transmit',
    title: '转发有奖',
    icon: 'folder-o'
  },
  {
    path: '/invite',
    title: '邀请记录',
    icon: 'folder-o'
  },
  {
    title: '聊天管理',
    icon: 'folder-o',
    children: [
      { path: '/chat', title: '客户聊天' },
      { path: '/group', title: '活动群聊' }
    ]
  },
  {
    path: '/report',
    title: '举报管理',
    icon: 'folder-o'
  },
  {
    path: '/sign',
    title: '签到管理',
    icon: 'folder-o'
  },
  {
    path: '/car',
    title: '拼车管理',
    icon: 'folder-o'
  },
  {
    path: '/help',
    title: '企业助手',
    icon: 'folder-o'
  },
  {
    path: '/keyword',
    title: '关键词管理',
    icon: 'folder-o'
  },
  {
    title: '平台管理',
    icon: 'folder-o',
    children: [
      { path: '/manager', title: '管理员列表' },
      { path: '/message', title: '消息管理' },
      { path: '/name', title: '实名认证' },
    ]
  },
  {
    path: '/settings',
    title: '平台设置',
    icon: 'folder-o'
  }
]
