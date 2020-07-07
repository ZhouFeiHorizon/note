/**
 * mixins
 * table表格、翻页 mixins
 * @author zhoufei
 * @date 2020/5/18
 * 翻页、删除提示等
 * 获取列表方法名需要统一为 getList()
 *
 * 使用
 * 在表格页面请求列表定义统一的方法 getList()
 * 在方法getList里面用 getListRequest 去请求数据
 */

//  翻页翻页HTML
/*

<el-pagination
     @size-change="handleSizeChange"
     @current-change="handleCurrentChange"
     :current-page="page.current"
     :page-sizes="pageSzies"
     :page-size="page.size"
     layout="total, sizes, prev, pager, next, jumper"
     :total="page.total"
     background
   >
   </el-pagination>

*/

import request from '@/utils/request'
export default {
  data() {
    return {
      // searchQuery: {},
      pageSzies: [10, 20, 30, 40, 50],
      /** table 列表数据 */
      list: [],
      /* 加载中 */
      loading: false,
      page: {
        size: 10, // 页大小
        current: 1, // 当前页
        total: 0 // 总页数
      }
    }
  },
  methods: {
    /*

    // getList 方法列子
    // @example
    // 请求表格列表数据
    getList() {
      const dataForm = { keyword: '', type: 1 };
      this.getListRequest('/api/system/list', dataForm);
    },

    */
    handleSizeChange(val) {
      this.page.current = 1
      this.page.size = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.page.current = val
      this.getList()
    },

    handleSearch() {
      this.page.current = 1
      this.getList()
    },

    /**
     * 请求表格数据及处理
     * @param {String} url 请求url
     * @param {object} params 参数
     * @param {Boolean} isManualHandler 是否手动处理
     */
    getListRequest(url, params, isManualHandler) {
      return new Promise((resolve, reject) => {
        this.loading = true
        /*   request.get({
          url,
          // methods: "GET",
          params: {
            pageNum: this.page.size,
            pageSize: this.page.current,
            // _t: new Date().getTime(),
            ...params
          }
        }) */
        request
          .get(url, {
            pageSize: this.page.size,
            pageNum: this.page.current,
            // _t: new Date().getTime(),
            ...params
          })
          .then(
            (resW) => {
              const res = resW.data
              const { data } = res
              this.loading = false
              if (!isManualHandler) {
                this.list = data.list
                this.page.total = +data.total
              }
              resolve(res)
            },
            err => {
              this.list = []
              this.page.total = 0
              this.loading = false
              reject(err)
            }
          )
      })
    },

    // // 计算table高度
    // bindTableHeight(height = 0) {
    //   this.tableHeight = document.documentElement.clientHeight - 160 - height
    //   window.addEventListener('resize', () => {
    //     this.tableHeight = document.documentElement.clientHeight - 160 - height
    //   })
    // },
    /**
     * 通用弹出确认操作 删除 下架等
     * @param {*} text 提示
     * @param {*} data 回调函数的data
     * @param {*} cb 回调
     */
    handleRow(text, data, cb) {
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          cb(data)
        })
        .catch(() => {})
    }
  },
  mounted() {}
}
