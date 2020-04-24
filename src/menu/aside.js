// 菜单 侧边栏
export default [
  { path: '/index', title: '首页', icon: 'home' },
  {
    path: '/user',
    title: '用户管理',
    icon: 'user'
  },
  {
    title: '资源管理',
    icon: 'shopping-bag',
    children: [
      { path: '/company', icon: 'reorder', title: '注册公司' },
      { path: '/finance', icon: 'reorder', title: '财政纳税' },
      { path: '/law', icon: 'reorder', title: '法律咨询' },
      { path: '/career', icon: 'reorder', title: '职业规划' },
      { path: '/talent', icon: 'reorder', title: '人才服务' },
      { path: '/policy', icon: 'reorder', title: '政策解读' },
      { path: '/partTime', icon: 'reorder', title: '兼职零工' },
      { path: '/share', icon: 'reorder', title: '共享资源' },
      { path: '/resourceRecommend', icon: 'share', title: '资源推荐' }
    ]
  },
  {
    title: '订单管理',
    icon: 'shopping-cart',
    children: [
      { path: '/orders', icon: 'shopping-cart', title: '订单管理' },
      { path: '/order', icon: 'shopping-cart', title: '订单列表' }
    ]
  },
  {
    path: '/advert',
    title: '广告管理',
    icon: 'television'
  },
  {
    path: '/cash',
    title: '提现管理',
    icon: 'rmb'
  },
  {
    path: '/transmit',
    title: '转发有奖',
    icon: 'trophy'
  },
  {
    path: '/invite',
    title: '邀请记录',
    icon: 'phone'
  },
  {
    title: '聊天管理',
    icon: 'commenting-o',
    children: [
      { path: '/chat', icon: 'comment-o', title: '客户聊天' },
      { path: '/group', icon: 'comments-o', title: '活动群聊' }
    ]
  },
  {
    path: '/report',
    title: '举报管理',
    icon: 'circle'
  },
  {
    path: '/sign',
    title: '签到管理',
    icon: 'archive'
  },
  {
    path: '/car',
    title: '拼车管理',
    icon: 'taxi'
  },
  {
    path: '/help',
    title: '企业助手',
    icon: 'support'
  },
  {
    path: '/keyword',
    title: '关键词管理',
    icon: 'asterisk'
  },
  {
    title: '平台管理',
    icon: 'map',
    children: [
      { path: '/platform', icon: 'map', title: '平台管理' },
      { path: '/manager', icon: 'user-circle-o', title: '管理员列表' },
      { path: '/message', icon: 'comment-o', title: '消息管理' },
      { path: '/name', icon: 'vcard-o', title: '实名认证' }
    ]
  },
  {
    path: '/settings',
    title: '平台设置',
    icon: 'cog'
  },
  {
    path: '/agreement',
    title: '协议管理',
    icon: 'cog'
  }
]
