//评价路由
var Evaluate = {
  template: '#dks_appraise'
}
//商家路由
var Seller = {
  template: '#dks_seller'
}


var routes = [
  {
    path: '/store/:storeName',
    component: NavHeader,
    children: [
      {
        path: 'product',
        component: Product,
        children: [
          {
            path: 'foods/:foodsId',
            component: Foods
          }
        ]
      },
      {
        path: 'evaluate',
        component: Evaluate
      },
      {
        path: 'seller',
        component: Seller
      }
    ]
  },
  {
   path: '*',
   redirect: '/store/dks/product/foods/01'
  }
]

var router = new VueRouter({
  routes: routes
})

new Vue({
  el: '.app',
  router: router,
  store: store
})