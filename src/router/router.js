import Home from '../views/Home.vue'

export default [
  {
    // 这里面path和component必须要有
    path: '/',
    // 见下面
    name: 'home',
    // 这里alias必须要有斜线。这个并不是完全一样，第一行的样式没有继承下来
    alias: '/home_page',
    component: Home,
    // 这种是返回一个对象
    props: route => ({
      // 这里的后面foods决定了你url？后面的参数名，必须要和这个一致。
      // 前面的food要和入参的名字相同。在这里就是要和home.vue里面接收入参的参数名相同。
      food: route.query.foods,
      drink: route.query.drinks
    }),
    // 和上面返回一个对象的写法等效。用括号更简洁一些
    // props: route  => {
    //   return {

    //   }
    // }
    beforeEnter: (to, from, next) => {
      // if (from.name === 'about') alert('这是从about页来的')
      // else alert('这不是从about页来的')
      // 如果使用了beforeEnter，必须要有next()函数，不然就卡在这里了。
      next()
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue')
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
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    props: {
      // 这个值可以不传，不传就显示默认值。这个特性对于套模板很好，所以个人觉得默认值一定要设置好
      food: 'banana'
    },
    meta: {
      title: '关于'
    }
  },
  {
    // 动态路由匹配
    // 冒号后面是个变量
    // 这个地方虽然用了变量，但是不一定能传进去。这取决于argu.vue里面有没有写接收入参的逻辑
    path: '/argu/:name',
    name: 'argu',
    // 这个是用来做多组件引用的
    // components: {
    //   default: () => import('@/views/argu.vue')
    //   // email: () => import('@/views/parent.vue'),
    //   // tel: () => import('@/views/child.vue')
    // },
    // 这个component里面的变量名，要和上面path里面的变量名一致，不然不认
    component: () => import('@/views/argu.vue'),
    // 这个参数是用来表示使用props作为组件的属性，这里就是把name那个参数传进去。
    // 这种情况，component必须是单一import，不能是对象。像是上面那种，就不好用。
    props: true
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
  },
  {
    path: '/store',
    component: () => import('@/views/store.vue')
  },
  {
    // 万能匹配，这是按顺序匹配的，纯粹按顺序。
    path: '*',
    component: () => import('@/views/error_404.vue')
  }
]
