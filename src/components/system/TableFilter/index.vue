<template>
    <div class="tableFilter">
        <div class="FilterName">{{TableFilterTitle}}</div>
        <div class="tablefilterContainer">
            <slot></slot>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                TableFilterTitle: ''
            }
        },
        props:{
            title:{
                type:String,
                default:''
            }
        },
        mounted(){
            if(this.title==''){
                this.TableFilterTitle = this.$t('commonNotify.screeningconditions')
            }else{
                this.TableFilterTitle = this.title
            }
            
        }
    }
</script>

<style lang="scss" scoped>
    .tableFilter{
        width: 100%;
        padding:20px;
        margin-bottom:20px;
        background-color:#ffffff;
    }
    .FilterName{
        display:inline-block;
        display:flex;
        align-items: center;
        font-size: 18px;
        padding-bottom: 20px;
        border-bottom: 1px solid #E9E9E9;
    }
    .FilterName::before{
        content:"";
        display:inline-block;
        width:6px;
        height:26px;
        margin-right:10px;
        background-color:#409EFF;
    }
    .tablefilterContainer{
        display:flex;
        flex-wrap: wrap;
        .common_con_div{
            display:flex;
            align-items:center;
            color: rgba(108, 107, 111, 1);
            font-size: 14px;
            margin-right:10px;
            margin-top:20px;
            .conditionName{
                white-space: nowrap;
            }
        }
    }
</style>