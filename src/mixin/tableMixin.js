export const tableMixin = {
     data(){
        return{
            commonMixinTableData:[],
        }
     },
     methods: {
       /**
       * 遍历列的所有内容，获取最宽一列的宽度
       * @param arr
       */
       getMaxLength (arr) {
          return arr.reduce((acc, item) => {
          if (item) {
            const calcLen = this.getTextWidth(item)
            if (acc < calcLen) {
              acc = calcLen
            }
          }
            return acc
          }, 0)
        },
      /**
       * 使用span标签包裹内容，然后计算span的宽度 width： px
       * @param valArr
       */
      getTextWidth (str) {
        let width = 0
        const html = document.createElement('span')
        html.innerText = str
        html.className = 'getTextWidth'
        document.querySelector('body').appendChild(html)
        width = document.querySelector('.getTextWidth').offsetWidth
        document.querySelector('.getTextWidth').remove()
        return width
      },
      /**
       * el-table-column 自适应列宽
       * @param prop_label: 表名
       * @param table_data: 表格数据
       */
      flexColumnWidth (label, prop) {
        // 1.获取该列的所有数据
        const arr = this.commonMixinTableData.map(x => x[prop]?x[prop]:'123')
        arr.push(label) // 把每列的表头也加进去算
        // console.log(arr)
        // 2.计算每列内容最大的宽度 + 表格的内间距（依据实际情况而定）
        return this.getMaxLength(arr) + 25
      },
      renderHeader(h, { column, $index }) {
        column.minWidth = this.flexColumnWidth(column.label,column.property)
        return h('span', column.label);
      }
   }
}