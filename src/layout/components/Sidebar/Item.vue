<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      }else if (icon.includes('img')) {
        const arr = icon.split('-')
        let img = null
        try{
          img = require(`@/assets/image/menuIcon/${arr[1]}`)
          vnodes.push(<img src={img} style="width:15px;height:15px;margin-right:10px;" class="icon-img"/>)
        }catch(e){
          img = require(`@/assets/image/menuIcon/state.png`)
          vnodes.push(<img src={img} style="width:15px;height:15px;margin-right:10px;" class="icon-img"/>)
        }
      } else {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
