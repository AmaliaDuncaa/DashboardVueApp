import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddProduct from '@/components/AddProduct'
import EditProduct from '@/components/EditProduct'
import Chat from '@/components/Chat'
import ChatWelcome from '@/components/ChatWelcome'

import GMap from '@/components/GMap'
import Signup from '@/components/auth/Signup'
import UserInfo from '@/components/UserInfo'
import Login from '@/components/auth/Login'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/add-product',
      name: 'AddProduct',
      component: AddProduct,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-product/:product_slug',
      name: 'EditProduct',
      component: EditProduct,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/map',
      name: 'GMap',
      component: GMap,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/chat',
      name: 'ChatWelcome',
      component: ChatWelcome,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/privatechat/:id',
      name: 'Chat',
      component: Chat,
      meta: {
        requiresAuth: true
      }
    }, ,
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/profile/:id',
      name: 'UserInfo',
      component: UserInfo,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }

  ]
})

// router guards
router.beforeEach((to, from, next) => {
  // check to see if route has auth guard
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    // check auth state of user
    let user = firebase.auth().currentUser
    if (user) {
      // User is signed in. Proceed to route
      next()
    } else {
      // No user is signed in. Redirect to login
      next({
        name: 'Login'
      })
    }
  } else {
    // if route is not guarded by auth, proceed
    next()
  }
})

export default router
