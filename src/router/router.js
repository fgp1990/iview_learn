import Home from '../views/Home.vue'

export default [
  {
    // 这里面path和component必须要有
    path: '/',
    // 见下面
    name: 'home',
    // 这里alias必须要有斜线。这个并不是完全一样，第一行的样式没有继承下来
    alias: '/home_page',
    component: Home
  },
  {
    path: '/about',
    // 设置name属性，在App.vue里面用到。绑定时用来标记的
    name: 'about',
    alias: '/about_page',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // 这个表示只有当页面被访问时，他才会被加载
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    // 动态路由匹配
    // 冒号后面是个变量
    path: '/argu/:name',
    name: 'argu',
    component: () => import('@/views/argu.vue')
  },
  {
    // 这是路由套嵌
    path: '/parent',
    name: 'parent',
    component: () => import('@/views/parent.vue'),
    children: [
      {
        // 子目录的path不需要在前面加'/'
        path: 'child',
        component: () => import('@/views/child.vue')
      }
    ]
  },
  {
    path: '/named_view',
    components: {
      default: () => import('@/views/child.vue'),
      email: () => import('@/views/email.vue'),
      tel: () => import('@/views/tel.vue')
    }
  },
  {
    path: '/main',
    // 以下三种写法都可以，但不完全等价。
    // 第一个是跟路径，第二个是home页，第三个是about页
    // redirect: '/'

    // redirect: {
    //   name: 'home'
    // }

    // return如果非对象，可以化简
    // redirect: to => {
    //   // 这两种方法等价
    //   // return {
    //   //   name: 'about'
    //   // }
    //   return '/about'
    // }
    //  redirect的另一种写法。这里about是路径，要有斜线
    redirect: to => '/about'
  }
]
