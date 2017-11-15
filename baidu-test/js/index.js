//商店信息
var NavHeader = {
  template: '#bai_shop',
  data () {
    return {
      headerMsg: [],
      checked: 0
    }
  },
  mounted () {
    this.$nextTick(function(){
      this.getHeaderMsg()
    })
  },
  methods: {
    getHeaderMsg () {
      //在es5中注意this的指向
      var _this = this
      axios.get('data/shop.json').then(function(response){
        var res = response.data
        if(res.errno == '0'){
          _this.headerMsg = res.data
        }
      })
    }
  }
}
//商品分类
var Product = {
  template: '#bai_product',
  data () {
    return {
      productMsg: [],
      checked: 0
    }
  },
  mounted () {
    this.$nextTick(function(){
      this.getProductMsg()
    })
  },
  methods: {
    getProductMsg () {
      var _this = this
      var storeName = this.$route.params.storeName
      axios.get('data/menu.json',{params:{'storeName':storeName}}).then(function (response) {
        var res = response.data
        if(res.errno == 0) {
          _this.productMsg = res.data
        }
      })
    }
  }
}

//食物路由
var Foods = {
  template: '#bai_foods',
  data () {
    return {
      foodsList: [],
      all: []
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.getFoodsList()
    })
  },
  watch: {
    $route: function () {
      var id = this.$route.params.foodsId || '01'
      if(this.all[id]){
        this.foodsList = this.all[id]
      }else{
        this.getFoodsList()
      }
    }
  },
  methods: {
    getFoodsList () {
      var _this = this
      var id = this.$route.params.foodsId || '01'
      axios.get('data/' + id + '.json').then(function(response) {
        var res = response.data
        if(res.errno == 0) {
          _this.foodsList = res.data
          //all[id]是数组通过index添加元素方法
          //若没id一开始保存的数据会被替换掉
          _this.all[id] = res.data
        }else{
          console.log('获取失败')
        }
      })
    },
    changfoodNum (item, i) {
      if(i>0){
        item.num++
        // store.commit('add',item.price)
      }else{
        item.num--
        // store.commit('reduce',item.price)
      }
    }
  }
}

//Vuex的使用
var store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add (state, n) {
      state.count += +n
    },
    reduce (state, n) {
      state.count -= n
    }
  },
  actions: {

  },
  modules: {

  },
  getters: {

  }
})