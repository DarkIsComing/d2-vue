import layoutHeaderAside from "@/layout/header-aside";

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require("@/libs/util.import." + process.env.NODE_ENV);

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: "/",
    redirect: { name: "index" },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: "index",
        name: "index",
        meta: {
          auth: true
        },
        component: _import("system/index")
      },
      // 系统 前端日志
      {
        path: "log",
        name: "log",
        meta: {
          title: "前端日志",
          auth: true
        },
        component: _import("system/log")
      },
      // 刷新页面 必须保留
      {
        path: "refresh",
        name: "refresh",
        hidden: true,
        component: _import("system/function/refresh")
      },
      // 页面重定向 必须保留
      {
        path: "redirect/:route*",
        name: "redirect",
        hidden: true,
        component: _import("system/function/redirect")
      },
      {
        path: "/user",
        name: "user",
        component: _import("pages/user"),
        meta: {
          auth: true,
          title: "用户管理"
        }
      },
      {
        path: "resourceList",
        name: "resourceList",
        component: _import("pages/resource/list"),
        meta: {
          auth: true,
          title: "资源列表"
        }
      },
      {
        path: "resourceRecommend",
        name: "resourceRecommend",
        component: _import("pages/resource/recommend"),
        meta: {
          auth: true,
          title: "资源推荐"
        }
      },
      {
        path: "order",
        name: "order",
        component: _import("pages/order"),
        meta: {
          auth: true,
          title: "订单管理"
        }
      },
      {
        path: "/advert",
        name: "advert",
        component: _import("pages/advert"),
        meta: {
          auth: true,
          title: "广告管理"
        }
      },
      {
        path: "cash",
        name: "cash",
        component: _import("pages/cash"),
        meta: {
          auth: true,
          title: "提现管理"
        }
      },
      {
        path: "transmit",
        name: "transmit",
        component: _import("pages/transmit"),
        meta: {
          auth: true,
          title: "转发有奖"
        }
      },
      {
        path: "invite",
        name: "invite",
        component: _import("pages/invite"),
        meta: {
          auth: true,
          title: "邀请记录"
        }
      },
      {
        path: "chat",
        name: "chat",
        component: _import("pages/chat/customer"),
        meta: {
          auth: true,
          title: "客户聊天"
        }
      },
      {
        path: "group",
        name: "group",
        component: _import("pages/chat/group"),
        meta: {
          auth: true,
          title: "活动群聊"
        }
      },
      {
        path: "report",
        name: "report",
        component: _import("pages/report"),
        meta: {
          auth: true,
          title: "举报管理"
        }
      },
      {
        path: "sign",
        name: "sign",
        component: _import("pages/sign"),
        meta: {
          auth: true,
          title: "签到管理"
        }
      },
      {
        path: "car",
        name: "car",
        component: _import("pages/car"),
        meta: {
          auth: true,
          title: "拼车管理"
        }
      },
      {
        path: "help",
        name: "help",
        component: _import("pages/help"),
        meta: {
          auth: true,
          title: "企业助手"
        }
      },
      {
        path: "keyword",
        name: "keyword",
        component: _import("pages/keyword"),
        meta: {
          auth: true,
          title: "关键字管理"
        }
      },
      {
        path: "platform",
        name: "Pplatform",
        component: _import("pages/platform/platform"),
        meta: {
          auth: true,
          title: "平台管理"
        }
      },
      {
        path: "manager",
        name: "Pmanager",
        component: _import("pages/platform/manager"),
        meta: {
          auth: true,
          title: "管理员列表"
        }
      },
      {
        path: "message",
        name: "Pmessage",
        component: _import("pages/platform/message"),
        meta: {
          auth: true,
          title: "消息管理"
        }
      },
      {
        path: "name",
        name: "Pname",
        component: _import("pages/platform/name"),
        meta: {
          auth: true,
          title: "实名认证"
        }
      },
      {
        path: "settings",
        name: "settings",
        component: _import("pages/settings"),
        meta: {
          auth: true,
          title: "平台设置"
        }
      },
      {
        path: "/detail",
        name: "detail",
        component: _import("pages/platform/name/detail")
      },
      {
        path: "/orders",
        name: "orders",
        component: _import("pages/order/order")
      }
    ]
  }
];

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: "/login",
    name: "login",
    component: _import("system/login")
  }
];

/**
 * 错误页面
 */
const errorPage = [
  {
    path: "*",
    name: "404",
    component: _import("system/error/404")
  }
];

// 导出需要显示菜单的
export const frameInRoutes = frameIn;

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage];
