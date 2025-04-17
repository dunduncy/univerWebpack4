<template>
  <div class="recordsContainer">
    <div class="tableBtns">
      <el-button type="primary" size="small" @click="handleCreate">{{
        $t("commonNotify.Add")
      }}</el-button>
    </div>
    <div class="recordsTable">
      <el-table
        :data="list"
        stripe
        style="width: 100%"
        height="100%"
        row-key="id"
      >
        <el-table-column prop="ip" :label="$t('timeZone.ipaddress')">
        </el-table-column>
        <el-table-column prop="subnetMask" :label="$t('timeZone.mask')">
        </el-table-column>
        <el-table-column
          :label="$t('commonNotify.Operation')"
          align="center"
          width="200"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="{ row, $index }">
            <el-button class="" @click="handleUpdate(row)" type="primary" size="mini" icon="el-icon-edit">
              {{ $t("commonNotify.Edit") }}
            </el-button>
            <el-button class="" @click="handleDelete(row, $index)" type="danger" size="mini"  icon="el-icon-delete">
              {{ $t("commonNotify.Delete") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="pageContainer">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :pager-count="5"
        :page-sizes="[50, 100, 150, 200]"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="currentPageChange"
      >
      </el-pagination>
    </div> -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      width="40%"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="auto"
        class="selfDefineCenterForm"
      >
        <el-form-item :label="$t('timeZone.ipaddress')" prop="ip">
          <el-input v-model="temp.ip" />
        </el-form-item>
        <el-form-item :label="$t('timeZone.mask')" prop="mask">
          <el-input v-model="temp.mask" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="CUData">
          {{ $t("commonNotify.Confirm") }}
        </el-button>
        <el-button @click="dialogFormVisible = false">
          {{ $t("commonNotify.Cancel") }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  addLanInfo,
  updateLanInfo,
  deleteLanInfo,
  listLanInfo,
} from "@/api/system/login.js";
export default {
  props: {
    lan: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      list: [],
      temp: {
        ip: null,
        mask: null,
      },
      rules: {
        ip: [
          {
            required: true,
            message: this.$t("timeZone.IPaddresscannotbeempty"),
            trigger: "blur",
          },
        ],
        mask: [
          {
            required: true,
            message: this.$t("timeZone.Maskcannotbeempty"),
            trigger: "blur",
          },
        ],
      },
      //   控制弹出框的隐藏出现
      dialogFormVisible: false,
      //   用来判断是新增 还是编辑
      dialogStatus: "",
      //   用来存储两种状态
      textMap: {
        update: this.$t("commonNotify.Edit"),
        create: this.$t("commonNotify.Add"),
        detail: this.$t("commonNotify.Detail"),
      },
    };
  },
  methods: {
    getList() {
      listLanInfo().then((res) => {
        if (res.code == 1 && res.data && res.data.length > 0) {
          this.list = res.data.filter((element) => {
            return element.fileKey == "file" + this.lan;
          });
        } else {
          this.list = [];
        }
      });
    },
    // 重置表单
    resetTemp() {
      this.temp = {
        fileKey: "file" + this.lan,
        ip: null,
        mask: null,
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleUpdate(row) {
      this.temp = {
        fileKey: row.fileKey,
        ip: row.ip,
        mask: row.subnetMask,
        oldAddress: row.oldAddress,
      };
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    handleDelete(row, index) {
      this.$confirm(
        this.$t("commonNotify.DeleteInfoMessage"),
        this.$t("commonNotify.Prompt"),
        {
          confirmButtonText: this.$t("commonNotify.Confirm"),
          cancelButtonText: this.$t("commonNotify.Cancel"),
          type: "warning",
        }
      )
        .then(async () => {
          try {
            const res = await deleteLanInfo({
              fileKey: row.fileKey,
              ip: row.ip,
              mask: row.subnetMask,
            });
            if (res.code == 1) {
              this.$notify({
                title: this.$t("commonNotify.Success"),
                message: this.$t("commonNotify.SuccessfullyDeleted"),
                type: "success",
                duration: 2000,
              });
              this.getList();
            } else {
              this.$message({
                message:
                  this.$t("commonNotify.DeleteFailed") +
                  (res.msg
                    ? `,${this.$t("commonNotify.Reason")}:` + res.msg
                    : ""),
                type: "error",
                duration: 5 * 1000,
              });
            }
          } catch (error) {
            this.$message({
              message: error,
              type: "error",
              duration: 3 * 1000,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("commonNotify.CancelledDeletion"),
          });
        });
    },
    CUData() {
      this.$refs["dataForm"].validate(
        (valid) => {
          if (valid) {
            //  深度复制表单的值 并且赋值给tempData
            const fun =
              this.dialogStatus == "create" ? addLanInfo : updateLanInfo;
            fun(this.temp)
              .then((res) => {
                if (res.code == 1) {
                  this.dialogFormVisible = false;
                  this.$notify({
                    title: this.$t("commonNotify.Success"),
                    message:
                      this.dialogStatus == "create"
                        ? this.$t("commonNotify.CreatedSuccessfully")
                        : this.$t("commonNotify.UpdatedSuccessfully"),
                    type: "success",
                    duration: 2000,
                  });
                  this.getList();
                } else {
                  this.$message({
                    message:
                      this.$t("commonNotify.UpdateFailed") +
                      (res.message
                        ? `,${this.$t("commonNotify.Reason")}:` + res.message
                        : ""),
                    type: "error",
                    duration: 5 * 1000,
                  });
                }
                
              })
              .catch((error) => {
                this.$message({
                  message: error,
                  type: "error",
                  duration: 3 * 1000,
                });
              });
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style scoped lang="scss">
@import "~@/styles/variables.scss";
@import "@/styles/layout_common.scss";
@import "@/styles/table_scrollbar.scss";
.recordsContainer {
  width: 100%;
  height: 100%;
  padding-left: 20px;
  padding-top: 20px;

  .recordsTable {
    height: calc(100% - 60px);
  }

  .tableBtns {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
}
</style>