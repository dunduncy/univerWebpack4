<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <div>
      <!-- <svg-icon class-name="international-icon" icon-class="language"/> -->
      <img  style="width: 25px;height: 25px;" src="@/assets/image/lang.png"/>
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language===item.name" :command="item.name" :key="item.name" v-for="item in langList">
        {{item.value}}
      </el-dropdown-item>
      <!-- <el-dropdown-item :disabled="language==='zh'" command="zh">
        中文
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">
        English
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='es'" command="es">
        Español
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='ja'" command="ja">
        日本語
      </el-dropdown-item> -->
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import {getLanguageList} from '@/api/system/lang.js'
export default {
  data(){
    return{
      langList:[]
    }
  },
  computed: {
    language() {
      return this.$store.getters.language
    },
  },
  mounted(){
    this.getLanguageList()
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.bus.$emit('changeLanguage')
      this.$message({
        message: 'Switch Language Success',
        type: 'success'
      })
    },
    getLanguageList(){
      getLanguageList().then(res=>{
        if(res.data){
          this.langList = res.data.map(value=>{
            return {
              name:Object.keys(value)[0],
              value:Object.values(value)[0]
            }
          })
        }
      })
    }
  }
}
</script>
