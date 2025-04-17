<template>
     <!--菜单栏-->
     <div class="tab_menu">
                <div class="menu_item" :class="tab == item.name ? 'active' : ''" v-for="item in list">
                    <a @click="changeTab(item)">{{ item.name }}</a>
                </div>
            </div>
</template>

<script>
    export default {
        props:{
            menuList:{
                type:Array,
                default(){
                    return []
                }
            },
            currentTab:{
                type:String,
                default:""
            }
        },
        data(){
            return{
                list:[],
                tab:'',
            }
        },
        methods:{
            changeTab(tab){
                this.tab = tab.name
                this.$router.push(tab.path)
            }
        },
        mounted(){
            this.tab = this.currentTab
            this.list = this.menuList
        }
    }
</script>

<style lang="scss" scoped>
.tab_menu{
    height: 30px;
    border-bottom:1px solid #BBBBBB;
    display:flex;
    .menu_item{
      min-width:106px;
      padding:0 10px;
      font-size:14px;
      line-height: 30px;
      text-align:center;
      color:#BBBBBB;
    }
    .active{
      border-bottom:4px solid #409EFF;
      a{
        color:#409EFF;
      }
    }
    
  }
</style>