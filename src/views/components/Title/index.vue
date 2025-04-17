<template>
    <div class="titleBox">
        <div class="titleContainer">
            <img src="@/assets/image/menuIcon/titleIcon.png" alt="">
            <span>{{ title }}</span>
        </div>
        <div class="btnsContainer">
            <slot></slot>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },

    }
}
</script>

<style lang="scss" scoped>
.titleBox {
    display: flex;
    height:60px;
    align-items: center;
    justify-content: space-between;
    color: rgb(108, 107, 111);
    font-size: 16px;
    .titleContainer {
        display: flex;
        align-items: center;
        span{
            margin-left: 10px;
        }
    }
}
</style>