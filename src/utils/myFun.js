export function renderHeader(h, { column, $index }) {
    let realWidth = 0;
    let span = document.createElement('span');
    
    span.innerText = column.label;
    document.body.appendChild(span);

    realWidth = span.getBoundingClientRect().width;
    // if(column.label==this.$t('system$reportSearch$index_vue.time')){
    //   column.width = 200;
    //   column.fixed = 'left'
    // }else{
    //   column.minWidth = realWidth; // 可能还有边距/边框等值，需要根据实际情况加上
    //   column.fixed = false
    // }
    column.minWidth = realWidth + 20; // 可能还有边距/边框等值，需要根据实际情况加上
    column.resizable = false
    console.log(column)

    document.body.removeChild(span);
    return h('span', column.label);
  }