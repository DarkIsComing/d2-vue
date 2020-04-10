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
      { path: '/page1', title: '资源推荐' },
      { path: '/page2', title: '资源列表' }
    ]
  },
  {
    title: '订单管理',
    icon: 'folder-o',
    children: [
      { path: '/page2', title: '订单列表' }
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
      { path: '/page1', title: '客户聊天' },
      { path: '/page2', title: '活动群聊' }
    ]
  },
  {
    path: '/report',
    title: '举报管理',
    icon: 'folder-o'
  }
]
