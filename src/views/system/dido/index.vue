<template>
  <div class="container">
    <div class="container_add">
      <div class="content_outer bg_white">
        <!-- <TableTitle title="输入输出">
          </TableTitle> -->
        <div style="margin-bottom: 20px;">
          <el-switch v-model="enable" :active-text="$t('system$dido$index_vue.enable')" :inactive-text="$t('system$dido$index_vue.disable')" @change="updateDIOEnable">
          </el-switch>
        </div>
        <div class="hello">
          <table class="table">
            <thead>
              <tr>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
                <th>5</th>
                <th>6</th>
                <th>7</th>
                <th>8</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="(item, index) in data1" :key="('k' + index)">
                  <div class="dot greenDot" v-if="item.value"></div>
                  <div class="dot greyDot" v-else></div>
                </td>
              </tr>
            </tbody>
          </table>


          <table class="table" style="margin-top:20px" v-if="enable">
            <thead>
              <tr>
                <th>1</th>
                <th>2</th>
                <th>3</th>
                <th>4</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="padding:10px;">
                  <div> <el-radio v-model="f1" :label="true">high</el-radio></div>
                  <div> <el-radio v-model="f1" :label="false">low</el-radio></div>
                  <button @click="setDOByID(1)" style="margin-top:10px;">confirm</button>
                </td>
                <td style="padding:10px;">
                  <div> <el-radio v-model="f2" :label="true">high</el-radio></div>
                  <div> <el-radio v-model="f2" :label="false">low</el-radio></div>
                  <button @click="setDOByID(2)" style="margin-top:10px;">confirm</button>
                </td>
                <td style="padding:10px;">
                  <div> <el-radio v-model="f3" :label="true">high</el-radio></div>
                  <div> <el-radio v-model="f3" :label="false">low</el-radio></div>
                  <button @click="setDOByID(3)" style="margin-top:10px;">confirm</button>
                </td>
                <td style="padding:10px;">
                  <div> <el-radio v-model="f4" :label="true">high</el-radio></div>
                  <div> <el-radio v-model="f4" :label="false">low</el-radio></div>
                  <button @click="setDOByID(4)" style="margin-top:10px;">confirm</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div style="width:600px;margin-top:20px;"  v-if="enable">
            <button style="float:right" @click="setDOAll(true)">All set high</button>
            <button style="float:right;margin-right:20px;" @click="setDOAll(false)">All set low</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { listDI, updateDO,getDIOEnable,updateDIOEnable } from '@/api/system/dido.js'
export default {
  data() {
    return {
      enable:false,
      data1: [
        {
          "value": false,
          "key": 1
        },
        {
          "value": false,
          "key": 2
        },
        {
          "value": false,
          "key": 3
        },
        {
          "value": false,
          "key": 4
        },
        {
          "value": false,
          "key": 5
        },
        {
          "value": false,
          "key": 6
        },
        {
          "value": false,
          "key": 7
        },
        {
          "value": false,
          "key": 8
        }
      ],

      f1: null,
      f2: null,
      f3: null,
      f4: null,
      host: '',
      timer: null
    }

  },
  methods: {
    getDIAll() {
      listDI().then((response) => {
        this.data1 = response.data
      }).catch(function (error) {
        console.log(error);
      })
    },
    setDOByID(num) {
      let data = {
        indexList: [num],
        status: this['f' + num]
      }
      updateDO(data).then((res) => {
        if (res.code==1) {
          this.$message({
            type: "success",
            message: 'set successfully'
          })
          this.getDIAll()
        } else {
          this.$message({
            type: "warning",
            message: res.message
          })
        }
      }).catch((error) => {
        this.$message({
          type: "warning",
          message: 'set failed'
        })
      });
    },
    setDOAll(flag) {
      let data = {
        indexList: [1, 2, 3, 4],
        status: flag
      }
      updateDO(data).then((res) => {
        if (res.code==1) {
          this.$message({
            type: "success",
            message: 'set successfully'
          })
          this.getDIAll()
        } else {
          this.$message({
            type: "warning",
            message: 'set failed'
          })
        }
      }).catch((error) => {
        this.$message({
          type: "warning",
          message: 'set failed'
        })
      });
    },
    async getDIOEnable(){
      const res = await getDIOEnable()
      this.enable = res.data
    },
    async updateDIOEnable(){
      const res = await updateDIOEnable({enable:this.enable})
      if(res.code==1){
        this.$message({
          type: "success",
          message:res.data
        })
      }else{
        this.$message({
          type: "error",
          message:res.message
        })
        this.getDIOEnable()
      }
    },
  },
  mounted() {
    this.getDIAll()
    this.getDIOEnable()
    // this.timer = setInterval(() => {
    //   this.getDIAll()
    // }, 2000)
  },
  beforeDestory() {
    clearInterval(this.timer)
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.timer)
    next()
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '@/styles/layout_common.scss';
@import '@/styles/table_scrollbar.scss';

.table {
  width: 600px;
  height: 100px;
  border-collapse: collapse;
  text-align: center;

  th,
  td {
    height: 50px;
    border: 1px solid #ccc;
  }
}

.dot {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin: 0 auto;
}

.greenDot {
  background: green;
}

.greyDot {
  background: grey;
}
</style>
