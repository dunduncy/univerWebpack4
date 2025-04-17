<template>
  <div class="tableTitle"
    :style="{
        'background-color': bkgColor
    }">
    <span>{{title}}</span><span>{{subTitle}}</span>
    <div class="defineSelf">
        <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
           tableTitle:'' 
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        subTitle:{
            type: String,
            default: ''
        },
        bkgColor: {
            type: String,
            default: 'white'
        }
    },
    mounted(){
        this.tableTitle = this.title;
    }
}
</script>

<style scoped lang="scss">
.tableTitle{
    display:flex;
    align-items:center;
    margin-bottom: 20px;
}
.tableTitle::before{
    content: '';
    display: inline-block;
    width: 6px;
    height: 26px;
    margin-right:10px;
    background-color: #409EFF;
}
.tableTitle{
    span{
        color: rgba(16, 16, 16, 1);
        font-size: 18px;
        text-align: left;
    }
}
.defineSelf{
    margin-left:auto;
    display: flex;
}
</style>