import Api from '../source/Api'

export default {
  // 获取一级分类列表
  getParentGoodTypeList: new Api({
    url: '/goods/getParentGoodTypeList',
    method: 'get',
    public: true
  }),

  // 获取二级分类列表
  getGoodTypeListByParentId: new Api({
    url: '/goods/getGoodTypeListByParentId',
    method: 'get',
    public: true
  }),

  // 根据商品分类获取商品列表
  getGoodsList: new Api({
    url: '/goods/getGoodsList',
    method: 'post',
    public: true
  }),

  // 根据名称获取商品列表（首页搜索接口）
  getGoodsListByName: new Api({
    url: '/goods/getGoodsListByName',
    method: 'post',
    public: true
  }),

  // 获取热词列表
  hotWordsList: new Api({
    url: '/goods/hotWordsList',
    method: 'get',
    public: true
  }),

  // 获取推荐商品列表
  getRecommendGoodsList: new Api({
    url: '/goods/getRecommendGoodsList',
    method: 'get',
    public: true
  }),

  // 获取商品详情
  getGoodsInfo: new Api({
    url: '/goods/getGoodsInfo',
    method: 'get',
    public: true
  }),

  // 获取购物车列表
  getUserShopCarList: new Api({
    url: '/shopCar/getUserShopCarList',
    method: 'post',
    public: true
  }),

  // 保存购物车
  saveShopCar: new Api({
    url: '/shopCar/saveShopCar',
    method: 'post',
    public: true
  }),

  // 修改购物车
  updateShopCar: new Api({
    url: '/shopCar/updateShopCar',
    method: 'post',
    public: true
  }),

  // 删除购物车
  deleteUserShopCar: new Api({
    url: '/shopCar/deleteUserShopCar',
    method: 'post',
    public: true
  }),

  // 清空购物车
  emptyUserShopCar: new Api({
    url: '/shopCar/emptyUserShopCar',
    method: 'get',
    public: true
  })
}
