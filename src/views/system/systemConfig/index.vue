<template>
  <div class="container">
    <div class="content">
      <div class="pannel">
        <div class="header">
          <img src="@/assets/image/pannel/set.png" alt="">
          <span>{{ $t('timeZone.set') }}</span>
        </div>
        <div class="body">
          <div class="menu">
            <div class="menuItem" :class="{ 'active': activeMenu == 1 }" @click="changeMenu(1)">{{
              $t('timeZone.dateandtime')
            }}</div>
            <div class="menuItem" :class="{ 'active': activeMenu == 2 }" @click="changeMenu(2)">{{
              $t('timeZone.netWork') }}</div>
            <div class="menuItem" :class="{ 'active': activeMenu == 3 }" @click="changeMenu(3)">{{
              $t('timeZone.softwareupdate') }}</div>
            <div class="menuItem" :class="{ 'active': activeMenu == 4 }" @click="changeMenu(4)">{{
              $t('timeZone.systemstatus') }}</div>
            <!-- <div class="menuItem" :class="{ 'active': activeMenu == 5 }" @click="changeMenu(5)">{{
              $t('timeZone.operationrecords') }}</div>
            <div class="menuItem" :class="{ 'active': activeMenu == 6 }" @click="changeMenu(6)"
              v-if="getHighPermission()">{{ $t('timeZone.meterconfiguration') }}</div>
            <div class="menuItem" :class="{ 'active': activeMenu == 7 }" @click="changeMenu(7)">{{ 
              $t('timeZone.Serialnumberconfiguration') }}</div> -->
              <div class="menuItem" :class="{ 'active': activeMenu == 8 }" @click="changeMenu(8)">{{ 
              $t('timeZone.Portforwarding') }}</div>
              <div class="menuItem" :class="{ 'active': activeMenu == 9 }" @click="changeMenu(9)">{{ 
              $t('timeZone.pingtest') }}</div>
            <!-- <div class="menuItem" :class="{ 'active': activeMenu == 7 }" @click="changeMenu(7)">{{
              $t('timeZone.Updateconfigurationpackage') }}</div> -->
          </div>
          <div class="view" v-if="activeMenu == 1">
            <div class="dateContainer">
              <el-row :gutter="20" type="flex" align="middle" class="rowContainer">
                <el-col :span="8" style="text-align:right">{{ $t('timeZone.setdateandtime') }}</el-col>
                <el-col :span="16">
                  <div class="inputContainer" style="position: relative;">
                    <span v-if="timeAndTimeZone.state_time == 'save'">{{ timeAndTimeZone.time_show }}</span>
                    <el-date-picker v-else v-model="timeAndTimeZone.time" type="datetime"
                      value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                    <div v-if="timeAndTimeZone.state_time == 'edit'"
                      style="color: red;font-size: 12px;position: absolute;top: 40px;">*{{
                        $t('timeZone.Ifthemodification') }}.</div>

                    <i v-if="timeAndTimeZone.state_time == 'save'" class="el-icon-edit" @click="editTime"></i>
                    <template v-else>
                      <i class="el-icon-check" @click="saveTime" style="margin-right: 10px;"></i>
                      <i class="el-icon-close" @click="cancelEditTime"></i>
                    </template>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" type="flex" align="middle" class="rowContainer">
                <el-col :span="8" style="text-align:right">{{ $t('timeZone.timezone') }}</el-col>
                <el-col :span="16">
                  <div class="inputContainer">
                    <span v-if="timeAndTimeZone.state_timeZone == 'save'">{{ timeAndTimeZone.timeZone_show }}</span>
                    <el-select v-else v-model="timeAndTimeZone.timeZone" filterable style="width:220px">
                      <el-option v-for="item in options" :key="item" :label="item" :value="item">
                      </el-option>
                    </el-select>
                    <i v-if="timeAndTimeZone.state_timeZone == 'save'" class="el-icon-edit" @click="editTimeZone"></i>
                    <template v-else>
                      <i class="el-icon-check" @click="saveTimeZone" style="margin-right: 10px;"></i>
                      <i class="el-icon-close" @click="cancelEditTimeZone"></i>
                    </template>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" type="flex" align="middle" class="rowContainer">
                <el-col :span="8" style="text-align:right">{{ $t('timeZone.NTPstate') }}</el-col>
                <el-col :span="16">
                  <div class="inputContainer">
                    <el-switch v-model="NTP.state" @change="changeNTPState">
                    </el-switch>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" type="flex" align="middle" class="rowContainer">
                <el-col :span="8" style="text-align:right">{{ $t('timeZone.NTPserver') }}</el-col>
                <el-col :span="16">
                  <div class="serverListContainer">
                    <div class="serverItem">
                      <el-form :rules="rules" :model="NTP" ref="addServerForm" class="NTPserverForm">
                        <el-form-item prop="server">
                          <el-input size="small" v-model="NTP.server" @keyup.enter.native="addNTPSever"
                            style="width:200px;margin-right: 10px;">
                            <el-button type="text" icon="el-icon-circle-close" slot="suffix" style="color:#cfcbcb"
                              @click="clearAddServerInput">
                            </el-button>
                          </el-input>
                          <el-button type="text" icon="el-icon-plus" @click="addNTPSever"></el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                    <div class="serverListBox">
                      <div class="serverItem" :key="'a' + index" v-for="(item, index) in serverList">
                        <template v-if="item.state == 'save'">
                          <div class="serverShow" v-if="item.state == 'save'">{{ item.server_show }}</div>
                          <el-button type="text" icon="el-icon-edit" @click="editNTPServer(item)"></el-button>
                          <el-button type="text" style="color:red" icon="el-icon-delete"
                            @click="deleteNTPSever(item)"></el-button>
                          <el-button type="text" icon="el-icon-arrow-up" @click="upNTPSever(item, index)"
                            :disabled="index == 0"></el-button>
                          <el-button type="text" icon="el-icon-arrow-down" @click="downNTPSever(item, index)"
                            :disabled="index == serverList.length - 1"></el-button>
                        </template>
                        <template v-else>
                          <el-form class="NTPserverForm" :model="item" :ref="'editServerForm' + index">
                            <el-form-item prop="server" :rules="[{ validator: validatServer1, trigger: 'blur' }]">
                              <el-input v-model="item.server" style="width:200px;margin-right: 10px;"
                                size="small"></el-input>
                              <el-button type="text" icon="el-icon-check"
                                @click="saveNTPServer(item, index)"></el-button>
                              <el-button type="text" icon="el-icon-close"
                                @click="cancelEditNTPServer(item)"></el-button>
                            </el-form-item>
                          </el-form>
                        </template>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="view" v-else-if="activeMenu == 2">
            <el-tabs type="card" v-model="activeName" @tab-click="handleTabClick">
              <el-tab-pane label="LAN1" name="LAN1">
                <!-- <el-row :gutter="20" type="flex" align="middle" class="rowContainer">
                  <el-col :span="6" style="text-align:right">{{ $t('timeZone.ipaddress') }}</el-col>
                  <el-col :span="18">
                    <div class="inputContainer">
                      <span v-if="file1.state_ip == 'save'">{{ file1.ip_show }}</span>
                      <el-input v-else v-model="file1.ip"></el-input>
                      <i v-if="file1.state_ip == 'save'" class="el-icon-edit" @click="editIp(1)"></i>
                      <template v-else>
                        <i class="el-icon-check" @click="saveIp(1)" style="margin-right: 10px;"></i>
                        <i class="el-icon-close" @click="cancelEditIp(1)"></i>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" align="middle" class="rowContainer">
                  <el-col :span="6" style="text-align:right">{{ $t('timeZone.mask') }}</el-col>
                  <el-col :span="18">
                    <div class="inputContainer">
                      <span v-if="file1.state_mask == 'save'">{{ file1.mask_show }}</span>
                      <el-input v-else v-model="file1.mask"></el-input>
                      <i v-if="file1.state_mask == 'save'" class="el-icon-edit" @click="editMask(1)"></i>
                      <template v-else>
                        <i class="el-icon-check" @click="saveMask(1)" style="margin-right: 10px;"></i>
                        <i class="el-icon-close" @click="cancelEditMask(1)"></i>
                      </template>

                    </div>
                  </el-col>
                </el-row> -->
                <lan-table :lan="1" v-if="activeName=='LAN1'" :tableData="[]"/>
              </el-tab-pane>
              <el-tab-pane label="LAN2" name="LAN2">
                <!-- <el-row :gutter="20" type="flex" align="middle" class="rowContainer">
                  <el-col :span="6" style="text-align:right">{{ $t('timeZone.ipaddress') }}</el-col>
                  <el-col :span="18">
                    <div class="inputContainer">
                      <span v-if="file2.state_ip == 'save'">{{ file2.ip_show }}</span>
                      <el-input v-else v-model="file2.ip"></el-input>
                      <i v-if="file2.state_ip == 'save'" class="el-icon-edit" @click="editIp(2)"></i>
                      <template v-else>
                        <i class="el-icon-check" @click="saveIp(2)" style="margin-right: 10px;"></i>
                        <i class="el-icon-close" @click="cancelEditIp(2)"></i>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" align="middle" class="rowContainer">
                  <el-col :span="6" style="text-align:right">{{ $t('timeZone.mask') }}</el-col>
                  <el-col :span="18">
                    <div class="inputContainer">
                      <span v-if="file2.state_mask == 'save'">{{ file2.mask_show }}</span>
                      <el-input v-else v-model="file2.mask"></el-input>
                      <i v-if="file2.state_mask == 'save'" class="el-icon-edit" @click="editMask(2)"></i>
                      <template v-else>
                        <i class="el-icon-check" @click="saveMask(2)" style="margin-right: 10px;"></i>
                        <i class="el-icon-close" @click="cancelEditMask(2)"></i>
                      </template>
                    </div>
                  </el-col>
                </el-row> -->
                <lan-table :lan="2" v-if="activeName=='LAN2'"/>
              </el-tab-pane>
              <el-tab-pane label="LAN3" name="LAN3">
                <!-- <el-row :gutter="20" type="flex" align="middle" class="rowContainer">
                  <el-col :span="6" style="text-align:right">{{ $t('timeZone.ipaddress') }}</el-col>
                  <el-col :span="18">
                    <div class="inputContainer">
                      <span v-if="file3.state_ip == 'save'">{{ file3.ip_show }}</span>
                      <el-input v-else v-model="file3.ip"></el-input>
                      <i v-if="file3.state_ip == 'save'" class="el-icon-edit" @click="editIp(3)"></i>
                      <template v-else>
                        <i class="el-icon-check" @click="saveIp(3)" style="margin-right: 10px;"></i>
                        <i class="el-icon-close" @click="cancelEditIp(3)"></i>
                      </template>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20" type="flex" align="middle" class="rowContainer">
                  <el-col :span="6" style="text-align:right">{{ $t('timeZone.mask') }}</el-col>
                  <el-col :span="18">
                    <div class="inputContainer">
                      <span v-if="file3.state_mask == 'save'">{{ file3.mask_show }}</span>
                      <el-input v-else v-model="file3.mask"></el-input>
                      <i v-if="file3.state_mask == 'save'" class="el-icon-edit" @click="editMask(3)"></i>
                      <template v-else>
                        <i class="el-icon-check" @click="saveMask(3)" style="margin-right: 10px;"></i>
                        <i class="el-icon-close" @click="cancelEditMask(3)"></i>
                      </template>
                    </div>
                  </el-col>
                </el-row> -->
                <lan-table :lan="3" v-if="activeName=='LAN3'"/>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="view" v-else-if="activeMenu == 3">
            <el-tabs v-model="activeUpdateSoftWareName">
              <el-tab-pane :label="$t('timeZone.ConfigurationUpdateandExport')" name="first">
                <div class="softwareContainer">
                  <div class="softwareBtnBox">
                    <el-button icon="el-icon-files" type="primary" size="mini" plain @click="packConfig">{{
                      $t('timeZone.Configurepackaging')
                    }}</el-button>
                  </div>
                  <div class="softwareBtnBox">
                    <el-button icon="el-icon-download" type="primary" size="mini" plain @click="exportConfig">{{
                      $t('timeZone.DownloadConfiguration')
                    }}</el-button>
                  </div>
                  <div class="softwareBtnBox">
                    <el-button icon="el-icon-upload2" type="primary" size="mini" plain @click="handleUploadConfigPackage">{{
                      $t('timeZone.UpdateConfiguration')
                    }}</el-button>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('timeZone.Frontendinterfaceupdate')" name="second">
                <div class="softwareContainer">
                  <div class="softwareBtnBox">
                  <div style="margin-top: 5px">{{ $t('timeZone.version') }}：{{ webVersion }}</div>
                </div>
                  <div class="softwareBtnBox">
                    <el-button icon="el-icon-upload2" type="primary" size="mini" plain @click="uploadWebFormOpen">{{
                      $t('timeZone.Updateinterfacepackage')
                    }}</el-button>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('timeZone.LCCUruntimeupdatesandexports')" name="third">
                <div class="softwareContainer">
                <div class="softwareBtnBox">
                  <div style="margin-top: 5px">{{ $t('timeZone.version') }}：{{ software.version }}</div>
                </div>
                <div class="softwareBtnBox">
                    <el-button icon="el-icon-files" type="primary" size="mini" plain @click="packLccu">{{
                      $t('timeZone.PackagingandRunningEnvironment')
                    }}</el-button>
                  </div>
                  <div class="softwareBtnBox">
                    <el-button icon="el-icon-download" type="primary" size="mini" plain @click="exportFile">{{
                      $t('timeZone.DownloadandRunEnvironment')
                    }}</el-button>
                  </div>
                  <div class="softwareBtnBox">
                    <el-button icon="el-icon-upload2" type="primary" size="mini" plain @click="uploadFormOpen">{{
                      $t('timeZone.Updatetheoperatingenvironment')
                    }}</el-button>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane :label="$t('timeZone.SystemRecovery')" name="fourth">
                <div class="softwareContainer">
                  <div class="softwareBtnBox">
                    <el-button icon="el-icon-upload2" type="primary" size="mini" plain @click="uploadSystemFormOpen">{{
                      $t('timeZone.Installandrestorethesystem')
                    }}</el-button>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
            <div class="softwareContainer">
              <el-row :gutter="20" type="flex" align="middle" class="rowContainer">
                <el-col :span="12" style="text-align:right">{{ $t('timeZone.version') }}</el-col>
                <el-col :span="12">
                  <span class="value">{{ software.version }}</span>
                </el-col>
              </el-row>
              <el-row :gutter="20" type="flex" align="middle" class="rowContainer">
                <el-col :span="12" style="text-align:right">{{ $t('timeZone.updatelccupackage') }}</el-col>
                <el-col :span="3">
                  <i class="el-icon-upload" @click="uploadFormOpen"></i>
                </el-col>
                <el-col :span="9">
                  <i class="el-icon-download" @click="exportFile"></i>
                </el-col>
              </el-row>
              <el-row :gutter="20" type="flex" align="middle" class="rowContainer">
                <el-col :span="12" style="text-align:right">{{ $t('timeZone.updatewebpackage') }}</el-col>
                <el-col :span="3">
                  <i class="el-icon-upload" @click="uploadWebFormOpen"></i>
                </el-col>
              </el-row>

              <el-row :gutter="20" type="flex" align="middle" class="rowContainer">
                <el-col :span="12" style="text-align:right">{{ $t('timeZone.updatesystempackage') }}</el-col>
                <el-col :span="3">
                  <i class="el-icon-upload" @click="uploadSystemFormOpen"></i>
                </el-col>
                <el-col :span="9">
                  <a @click="installSystemPack">
                    <img src="@/assets/image/install.png" :title="$t('timeZone.install')" alt="">
                    <!-- {{ $t('timeZone.install') }} -->
                  </a>
                </el-col>
              </el-row>

              <el-row :gutter="20" type="flex" align="middle" class="rowContainer">
                <el-col :span="12" style="text-align:right"></el-col>
                <el-col :span="5">
                  <el-button type="primary" size="small" plain @click="packLccu">{{ $t('timeZone.pack') }}</el-button>
                </el-col>
                <el-col :span="7">
                  <el-button type="primary" size="small" plain @click="restartLccu">{{ $t('timeZone.installandrestart')
                    }}</el-button>
                </el-col>
              </el-row>

            </div>
          </div>
          <div class="view" v-else-if="activeMenu == 4">
            <div class="systemStatusContainer">
              <div class="status">
                <div class="statusItem statusBorder">
                  <div class="statusValue">{{ systemStatus.cpuUsage }}</div>
                  <div class="statusName">{{ $t('timeZone.CPUUsage') }}</div>
                </div>
                <div class="statusItem statusBorder">
                  <div class="statusValue">{{ systemStatus.memoryUsage }}</div>
                  <div class="statusName">{{ $t('timeZone.MemoryUsage') }}</div>
                </div>
                <div class="statusItem">
                  <div class="statusValue">{{ systemStatus.hardDiskUsage }}</div>
                  <div class="statusName">{{ $t('timeZone.HardDiskUsage') }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="view" v-else-if="activeMenu == 5">
            <div class="recordsContainer">
              <div class="recordsTable">
                <el-table :data="tableData" stripe style="width: 100%;" height="100%" row-key="id">
                  <el-table-column prop="time" :label="$t('timeZone.time')" width="180" align="center"
                    :formatter="formatTime">
                  </el-table-column>
                  <el-table-column prop="user" :label="$t('timeZone.user')">
                  </el-table-column>
                  <el-table-column prop="device" :label="$t('timeZone.device')">
                  </el-table-column>
                  <el-table-column prop="attribute" :label="$t('timeZone.attribute')">
                  </el-table-column>
                  <el-table-column prop="value" :label="$t('timeZone.value')">
                  </el-table-column>
                </el-table>
              </div>
              <div class="pageContainer">
                <el-pagination background layout="total, sizes, prev, pager, next, jumper" :pager-count="5"
                  :page-sizes="[50, 100, 150, 200]" :current-page="currentPage" :page-size="pageSize" :total="total"
                  @size-change="handleSizeChange" @current-change="currentPageChange">
                </el-pagination>
              </div>
            </div>
          </div>
          <div class="view" v-else-if="activeMenu == 6">
            <div class="dateContainer">
              <table>
                <tr>
                  <td style="text-align: right;padding-right: 10px;">
                    {{ $t('timeZone.gridmeter') }}:
                  </td>
                  <td>
                    <el-select v-model="meter.electric_grid_meter">
                      <el-option :label="$t('timeZone.CHINT')" :value="1"></el-option>
                      <el-option :label="$t('timeZone.EASTRON')" :value="2"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: right;padding-right: 10px;">
                    {{ $t('timeZone.selfconsumingelectricitymeter') }}:
                  </td>
                  <td>
                    <el-select v-model="meter.self_consuming_electricity_meter">
                      <el-option :label="$t('timeZone.CHINT')" :value="1"></el-option>
                      <el-option :label="$t('timeZone.EASTRON')" :value="2"></el-option>
                    </el-select>
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td style="height: 50px">
                    <el-button type="primary" size="small" @click="confirmSelectMeter">{{
                      $t('timeZone.confirm') }}</el-button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="view" v-else-if="activeMenu == 7">
            <div class="recordsContainer">
              <div class="recordsTable">
                <el-table :data="deviceTypeList" stripe style="width: 100%;" height="100%" row-key="id">
                  <el-table-column prop="deviceType" :label="$t('timeZone.device')">
                  </el-table-column>
                  <el-table-column prop="num" :label="$t('timeZone.Serialnumber')">
                  </el-table-column>
                  <el-table-column :label="$t('commonNotify.Operation')">
                    <template slot-scope="{ row, $index }">
                      <a @click="handleUpdate(row)" class="el-icon-edit operateA">
                        {{ $t('commonNotify.Edit') }}
                      </a>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="view" v-else-if="activeMenu == 8">
            <div class="recordsContainer">
              <div class="tableBtns">
                <el-button type="primary" size="small" @click="handlePortForwardAdd">{{ $t('commonNotify.Add') }}</el-button>
              </div>
              <div class="recordsTable">
                <el-table :data="portForwardList" stripe style="width: 100%;" height="100%" row-key="id">
                  <el-table-column prop="forward_name" :label="$t('timeZone.Forwardname')">
                  </el-table-column>
                  <el-table-column prop="local_port" :label="$t('timeZone.Localport')">
                  </el-table-column>
                  <el-table-column prop="remote_host" :label="$t('timeZone.RemoteIP')">
                  </el-table-column>
                  <el-table-column prop="remote_port" :label="$t('timeZone.RemotePort')">
                  </el-table-column>
                  <el-table-column prop="enableFlag" :label="$t('timeZone.state')" :formatter="formatEnableFlag">
                  </el-table-column>
                  <el-table-column :label="$t('commonNotify.Operation')" width="300" align="center">
                    <template slot-scope="{ row, $index }">
                      <el-button @click="handlePortForwardUpdate(row)" type="primary" class="el-icon-edit" size="mini">
                        {{ $t('commonNotify.Edit') }}
                      </el-button>
                      <el-button @click="handlePortForwardDelete(row)" type="danger" class="el-icon-delete"  size="mini">
                        {{ $t('commonNotify.Delete') }}
                      </el-button>
                      <el-button @click="handlePortForwardStart(row)" type="primary" v-if="row.enableFlag!=1"  size="mini">
                        {{ $t('timeZone.start') }}
                      </el-button>
                      <el-button @click="handlePortForwardStop(row)" type="primary" v-else  size="mini">
                        {{ $t('timeZone.stop') }}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="view" v-else-if="activeMenu == 9">
            <pingTest/>
          </div>
          <div class="view" v-else>
            <div class="configPackageContainer">
              <div class="packageContainer">
                <div>{{ $t('timeZone.Updateconfigurationpackage') }}</div>
                <div>
                  <el-button icon="el-icon-files" type="primary" size="mini" plain @click="packConfig">{{
                    $t('timeZone.Packaging')
                  }}</el-button>
                </div>
                <div>
                  <el-button icon="el-icon-download" type="primary" size="mini" plain @click="exportConfig">{{
                    $t('timeZone.Download') }}</el-button>
                </div>
                <div>
                  <el-button icon="el-icon-upload2" type="primary" size="mini" plain
                    @click="handleUploadConfigPackage">{{
                      $t('timeZone.Upload') }}</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--上传lccu包-->
    <el-dialog :visible.sync="dialogVisible" width="40%" :close-on-click-modal="false">
      <div style="display:flex;justify-content:center;">
        <el-upload class="upload-demo" drag :auto-upload="false" action="111" :http-request="selfDefineUploadFile"
          :limit="1" ref="uploadRef" :file-list="fileList" :on-change="changeFile" :on-remove="removeFile"
          :show-file-list="true">
          <i class="el-icon-upload"></i>

          <div class="el-upload__text">
            <div style="font-size:16px;font-weight:700">
              {{ $t('timeZone.placethefilehere') }}
            </div>
            <div>
              {{ $t('timeZone.Pleasedonot') }}
            </div>
          </div>
          <div class="el-upload__tip" slot="tip">
          </div>
        </el-upload>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('timeZone.cancel') }}</el-button>
        <!-- <el-button @click="uploadFile">upload file</el-button></el-button> -->
        <el-button type="primary" @click="confirmUpload">{{ $t('timeZone.confirmupdate') }}</el-button>
      </span>
    </el-dialog>

    <!--上传web包-->

    <el-dialog :visible.sync="dialogWebVisible" width="40%" :close-on-click-modal="false">
      <div style="display:flex;justify-content:center;">
        <el-upload class="upload-demo" drag :auto-upload="false" action="111" :http-request="selfDefineUploadFile"
          :limit="1" ref="uploadWebRef" :file-list="fileWebList" :on-change="changeWebFile" :on-remove="removeWebFile"
          :show-file-list="true">
          <i class="el-icon-upload"></i>

          <div class="el-upload__text">
            <div style="font-size:16px;font-weight:700">
              {{ $t('timeZone.placethefilehere') }}
            </div>
            <div>
              {{ $t('timeZone.Pleasedonot') }}
            </div>
          </div>
          <div class="el-upload__tip" slot="tip">
          </div>
        </el-upload>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogWebVisible = false">{{ $t('timeZone.cancel') }}</el-button>
        <!-- <el-button @click="uploadFile">upload file</el-button></el-button> -->
        <el-button type="primary" @click="uploadFrontend">{{ $t('timeZone.confirmupdate') }}</el-button>
      </span>
    </el-dialog>

    <!--系统包上传弹窗-->
    <el-dialog :visible.sync="dialogSystemVisible" width="40%" :close-on-click-modal="false">
      <div style="display:flex;justify-content:center;">
        <el-upload class="upload-demo" drag :auto-upload="false" action="111" :http-request="selfDefineUploadFile"
          :limit="1" ref="uploadSystemRef" :file-list="fileSystemList" :on-change="changeSystemFile"
          :on-remove="removeSystemFile" :show-file-list="true">
          <i class="el-icon-upload"></i>

          <div class="el-upload__text">
            <div style="font-size:16px;font-weight:700">
              {{ $t('timeZone.placethefilehere') }}
            </div>
            <div>
              {{ $t('timeZone.Pleasedonot') }}
            </div>
          </div>
          <div class="el-upload__tip" slot="tip">
          </div>
        </el-upload>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogSystemVisible = false">{{ $t('timeZone.cancel') }}</el-button>
        <!-- <el-button @click="uploadFile">upload file</el-button></el-button> -->
        <el-button type="primary" @click="uploadSystemPackage">{{ $t('timeZone.confirmupdate') }}</el-button>
      </span>
    </el-dialog>

    <!--配置包上传弹窗-->
    <el-dialog :visible.sync="dialogConfigVisible" width="40%" :close-on-click-modal="false">
      <div style="display:flex;justify-content:center;">
        <el-upload class="upload-demo" drag :auto-upload="false" action="111" :http-request="selfDefineUploadFile"
          :limit="1" ref="uploadConfigRef" :file-list="fileConfigList" :on-change="changeConfigFile"
          :on-remove="removeConfigFile" :show-file-list="true">
          <i class="el-icon-upload"></i>

          <div class="el-upload__text">
            <div style="font-size:16px;font-weight:700">
              {{ $t('timeZone.placethefilehere') }}
            </div>
            <div style="width: 100%;">
              <!-- {{ $t('timeZone.Pleasedonot') }} -->
            </div>
          </div>
          <div class="el-upload__tip" slot="tip">
          </div>
        </el-upload>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfigVisible = false">{{ $t('timeZone.cancel') }}</el-button>
        <!-- <el-button @click="uploadFile">upload file</el-button></el-button> -->
        <el-button type="primary" @click="uploadConfigPackage">{{ $t('timeZone.confirmupdate') }}</el-button>
      </span>
    </el-dialog>
    <!--编辑设备序列号-->
    <el-dialog :title="$t('commonNotify.Edit')" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="40%">
      <el-form ref="dataForm" :rules="deviceRules" :model="temp" label-position="left" label-width="auto"
        class="selfDefineCenterForm">
        <el-form-item :label="$t('timeZone.Devicetype')" prop="deviceType">
          <el-input v-model="temp.deviceType" disabled />
        </el-form-item>
        <el-form-item :label="$t('timeZone.Serialnumber')" prop="num">
          <el-input v-model="temp.num" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="CUData">
          {{ $t('commonNotify.Confirm') }}
        </el-button>
        <el-button @click="dialogFormVisible = false">
          {{ $t('commonNotify.Cancel') }}
        </el-button>
      </div>
    </el-dialog>
    <!--新增/编辑端口转发-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogPortForwardFormVisible" :close-on-click-modal="false" width="40%">
      <el-form ref="dataPortForwardForm" :rules="portForwardRules" :model="portForwardTemp" label-position="left" label-width="auto"
        class="selfDefineCenterForm">
        <el-form-item :label="$t('timeZone.Forwardname')" prop="forward_name">
          <el-input v-model="portForwardTemp.forward_name" :disabled="dialogStatus=='update'"/>
        </el-form-item>
        <el-form-item :label="$t('timeZone.Localport')" prop="local_port">
          <el-input v-model="portForwardTemp.local_port"/>
        </el-form-item>
        <el-form-item :label="$t('timeZone.RemoteIP')" prop="remote_host">
          <el-input v-model="portForwardTemp.remote_host"/>
        </el-form-item>
        <el-form-item :label="$t('timeZone.RemotePort')" prop="remote_port">
          <el-input v-model="portForwardTemp.remote_port"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="CUPortForwardData">
          {{ $t('commonNotify.Confirm') }}
        </el-button>
        <el-button @click="dialogPortForwardFormVisible = false">
          {{ $t('commonNotify.Cancel') }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Loading } from 'element-ui';
import {
  getCurrDate_ysl, getATimeZone, setCurrDate_ysl, listTimezone, listLanInfo, updateLanInfo,
  getCpuUsage, getMemoryUsage, getDiskUsage,
  listVersion, uploadFile, exportFile,
  packLccu, restartLccu, uploadFrontend,
  listOperateLog,
  listNTPInfo, updateNTPInfo, getNTPStatus, updateNTPStatus,
  uploadSystemPackage, installSystemPack,
  getMeterConfig, updateMeterConfig,
  packConfig, exportConfig, uploadConfigPackage, justRestartLccuCedar,updateConfigPackage,
  listSerialNumber,updateSerialNumber,
  listPortForward,addPortForward,updatePortForward,deletePortForward,closePortForward,openPortForward,
} from '@/api/system/login.js'
import moment from 'moment-timezone';
import {
  getToken,
  setToken,
  removeToken
} from "@/utils/auth";
import { getCurrentTimefromOffset } from '@/utils'
import Cookies from 'js-cookie';
import lanTable from './components/lanTable.vue';
import pingTest from './components/pingTest.vue';

export default {
  components: { lanTable,pingTest },
  data() {
    let that = this
    var validatServer = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(that.$t('timeZone.pleaseentertheserver')));
      } else {
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        //const urlRegx = /^(?:[^:\/?#]+:)?(?:\/\/[\w-]+(\.[\w-]+)+([:\d+]*)?)?([^?#:]+)?(\?[^#]*)?(#.*)?$/;
        const urlRegx = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/
        let flag1 = ipRegex.test(value);
        let flag2 = urlRegx.test(value);
        if (flag1 || flag2) {
          callback()
        } else {
          callback(new Error(that.$t('timeZone.formaterror')));
        }
      }
    };
    return {
      time: null,
      timezone: null,
      options: [],
      activeMenu: 1,

      timeAndTimeZone: {
        time_show: null,
        time: null,
        timeZone_show: null,
        timeZone: null,
        state_time: 'save',
        state_timeZone: 'save',
      },

      NTP: {
        state: false,
        server: '',
        server_show: '',
        state_server: 'save'
      },
      oldNTPList: [],
      serverList: [
        // {
        //   index: 1,
        //   state: 'save',
        //   server_show: '192.168.1.123',
        //   server: '192.168.1.123',
        // },
        // {
        //   index: 2,
        //   state: 'save',
        //   server_show: '10.0.0.127',
        //   server: '10.0.0.127',
        // }
      ],
      rules: {
        server: [
          { validator: validatServer, trigger: 'blur' }
        ]
      },
      deviceRules: {
        num: [
          { required:true,message:this.$t('timeZone.Serialnumbercannotbeempty'),trigger: 'blur'}
        ]
      },

      activeName: 'LAN1',
      file1: {
        ip_show: '',
        ip: '',
        mask_show: '',
        mask: '',
        state_ip: 'save', // edit
        state_mask: 'save', // edit
        oldAddress: ''
      },
      file2: {
        ip_show: '',
        ip: '',
        mask_show: '',
        mask: '',
        state_ip: 'save', // edit
        state_mask: 'save', // edit
        oldAddress: ''
      },
      file3: {
        ip_show: '',
        ip: '',
        mask_show: '',
        mask: '',
        state_ip: 'save', // edit
        state_mask: 'save', // edit
        oldAddress: ''
      },

      activeUpdateSoftWareName:'first',
      software: {
        version: '',
        update: ''
      },
      dialogVisible: false,
      fileList: [],

      webSoftware: {
        update: ''
      },
      systemSoftware: {
        update: ''
      },
      configPackge: {
        update: ''
      },

      dialogWebVisible: false,
      webVersion:'0.1.5-release',
      fileWebList: [],

      dialogSystemVisible: false,
      fileSystemList: [],

      dialogConfigVisible: false,
      fileConfigList: [],

      systemStatus: {
        cpuUsage: '',
        memoryUsage: '',
        hardDiskUsage: ''
      },

      currentPage: 1,
      pageSize: 50,
      total: 0,
      tableData: [],

      meter: {
        electric_grid_meter: null,
        self_consuming_electricity_meter: null,
      },

      dialogFormVisible: false,
      deviceTypeList:[],
      temp: {
        deviceType: null,
        num: null,
      },

      dialogStatus:'',
      portForwardList: [],
      dialogPortForwardFormVisible: false,
      portForwardTemp: {
        forward_name:null,
        local_port: null,
        remote_host: null,
        remote_port:null,
      },
      portForwardRules: {
        forward_name: [
          { required:true,message:this.$t('timeZone.Pleaseentertheforwardname'),trigger: 'blur' }
        ],
        local_port: [
          { required:true,message:this.$t('timeZone.Pleaseenterthelocalport'),trigger: 'blur' }
        ],
        remote_host: [
          { required:true,message:this.$t('timeZone.Pleaseentertheremoteip'),trigger: 'blur' }
        ],
        remote_port: [
          { required:true,message:this.$t('timeZone.Pleaseentertheremoteport'),trigger: 'blur' }
        ],
      },
      textMap: {
        update: this.$t('commonNotify.Edit'),
        create: this.$t('commonNotify.Add'),
        detail: this.$t('commonNotify.Detail'),
      },
    }
  },
  watch: {
    activeMenu: {
      handler(newVal, oldVal) {
        if (newVal == 1) {
          this.timeAndTimeZone = {
            ...this.timeAndTimeZone,
            time: this.timeAndTimeZone.time_show,
            timeZone: this.timeAndTimeZone.timeZone_show,
            state_time: 'save',
            state_timeZone: 'save'
          }
        } else if (newVal == 2) {
          let str = 'file' + this.activeName.substring(3)
          this[str] = {
            ...this[str],
            ip: this[str].ip_show,
            mask: this[str].mask_show,
            state_ip: 'save',
            state_mask: 'save',
          }
        }
      }
    }
  },
  methods: {
    getHighPermission() {
      return Cookies.get('highPermission') == 1
    },
    validatServer1(rule, value, callback) {
      let that = this
      if (value === '') {
        callback(new Error(that.$t('timeZone.pleaseentertheserver')));
      } else {
        const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        //const urlRegx = /^(?:[^:\/?#]+:)?(?:\/\/[\w-]+(\.[\w-]+)+([:\d+]*)?)?([^?#:]+)?(\?[^#]*)?(#.*)?$/;
        const urlRegx = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/
        let flag1 = ipRegex.test(value);
        let flag2 = urlRegx.test(value);
        if (flag1 || flag2) {
          callback()
        } else {
          callback(new Error(that.$t('timeZone.formaterror')));
        }
      }
    },
    formatEnableFlag(row, column, cellValue, index) {
      if(cellValue==1){
        return this.$t('timeZone.start')
      }else{
        return this.$t('timeZone.stop')
      }
    },
    formatTime(row, column, cellValue, index) {
      return getCurrentTimefromOffset(cellValue * 1000)
    },
    currentPageChange(val) {
      this.currentPage = val;
      this.getList()
    },
    handleSizeChange(val) {
      this.currentPage = 1
      this.pageSize = val
      this.getList();
    },
    async getList() {
      let data = {
        pageNum: this.currentPage,
        pageSize: this.pageSize
      }
      const { data: data1 } = await listOperateLog(data)
      let { records, total } = data1
      this.tableData = records
      this.total = total
    },
    handleTabClick(tab, event) {
      let index = tab.index * 1 + 1
      this.currentNetTab = index
      let str = 'file' + index
      this[str] = {
        ...this[str],
        ip: this[str].ip_show,
        mask: this[str].mask_show,
        state_ip: 'save',
        state_mask: 'save',
      }
    },
    async packLccu() {
      const res = await packLccu()
      if (res.code == 1) {
        this.$message({
          message: res.data,
          type: 'success'
        })
      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    },
    async restartLccu() {
      const res = await restartLccu()
      if (res.code == 1) {
        let loadingInstance1 = Loading.service({ fullscreen: true });
        this.$message({
          message: res.data,
          type: 'success'
        })
        setTimeout(async () => {
          loadingInstance1.close()
          await this.$store.dispatch("user/logout");
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        }, 5000);
      } else {
        this.$message({
          message: res.message,
          type: 'warning'
        })
      }
    },
    async getCurrDate_ysl() {
      const { data: res } = await getCurrDate_ysl()
      this.timeAndTimeZone = {
        ...this.timeAndTimeZone,
        time_show: res.time,
        time: res.time,
      }
    },
    async getATimeZone() {
      const { data } = await getATimeZone()
      let { bTimeZone, utcHour } = data
      this.timeAndTimeZone = {
        ...this.timeAndTimeZone,
        timeZone_show: bTimeZone,
        timeZone: bTimeZone,
      }
    },
    async listTimezone() {
      const { data: res } = await listTimezone()
      this.options = res
    },
    async listLanInfo() {
      const { code, data: res } = await listLanInfo()
      if (code == 0 || !res) {
        return;
      }
      res.forEach(element => {
        if (element.fileKey == 'file1' || element.fileKey == 'file2' || element.fileKey == 'file3') {
          this[element.fileKey] = {
            ip_show: element.ip,
            ip: element.ip,
            mask_show: element.subnetMask,
            mask: element.subnetMask,
            state_ip: 'save', // edit
            state_mask: 'save', // edit
            oldAddress: element.oldAddress
          }
        }
      });
    },
    async getCpuUsage() {
      const { data } = await getCpuUsage()
      this.systemStatus = {
        ...this.systemStatus,
        cpuUsage: data.toFixed(2) + '%'
      }
    },
    async getMemoryUsage() {
      const { data } = await getMemoryUsage()
      this.systemStatus = {
        ...this.systemStatus,
        memoryUsage: data.toFixed(2) + '%'
      }
    },
    async getDiskUsage() {
      const { data } = await getDiskUsage()
      this.systemStatus = {
        ...this.systemStatus,
        hardDiskUsage: data
      }
    },
    async updateLanInfo(data) {
      const res = await updateLanInfo(data)
    },
    editTime() {
      this.timeAndTimeZone.state_time = 'edit'
    },
    cancelEditTime() {
      this.timeAndTimeZone.state_time = 'save'
      this.timeAndTimeZone.time = this.timeAndTimeZone.time_show
    },
    saveTime() {
      this.$confirm(this.$t('timeZone.Areyousuretosave'), this.$t('timeZone.prompt'), {
        confirmButtonText: this.$t('timeZone.confirm'),
        cancelButtonText: this.$t('timeZone.cancel'),
        type: 'warning'
      }).then(async () => {
        let data = {
          time: this.timeAndTimeZone.time,
          timezone: this.timeAndTimeZone.timeZone_show,
        }
        let res = await setCurrDate_ysl(data)
        if (res.code == 1) {
          this.$message({
            type: 'success',
            message: this.$t('timeZone.savesuccessfully')
          });
        } else {
          this.$message({
            type: 'error',
            message: res.message
          });
        }
        await this.getCurrDate_ysl()
        this.timeAndTimeZone.state_time = 'save'
        this.bus.$emit('updateTime')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('timeZone.cancelled')
        });
        this.timeAndTimeZone.state_time = 'save'
      });
    },
    editTimeZone() {
      this.timeAndTimeZone.state_timeZone = 'edit'
    },
    cancelEditTimeZone() {
      this.timeAndTimeZone.state_timeZone = 'save'
      this.timeAndTimeZone.timeZone = this.timeAndTimeZone.timeZone_show
    },
    saveTimeZone() {
      this.$confirm(this.$t('timeZone.Areyousuretosave'), this.$t('timeZone.prompt'), {
        confirmButtonText: this.$t('timeZone.confirm'),
        cancelButtonText: this.$t('timeZone.cancel'),
        type: 'warning'
      }).then(async () => {
        let data = {
          time: this.timeAndTimeZone.time_show,
          timezone: this.timeAndTimeZone.timeZone,
        }
        let res = await setCurrDate_ysl(data)
        if (res.code == 1) {
          await this.getATimeZone()
          await this.getCurrDate_ysl()
          this.bus.$emit('updateTime')
          this.$message({
            type: 'success',
            message: this.$t('timeZone.savesuccessfully')
          });
          this.timeAndTimeZone.state_timeZone = 'save'
        } else {
          await this.getATimeZone()
          await this.getCurrDate_ysl()
          this.$message({
            type: 'error',
            message: res.message
          });
          this.timeAndTimeZone.state_timeZone = 'save'
        }

      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('timeZone.cancelled')
        });
        this.timeAndTimeZone.state_timeZone = 'save'
      });
    },
    async confirm() {
      let data = {
        time: this.time,
        timezone: this.timezone
      }
      let res = await setCurrDate_ysl(data)
      if (res.code == 1) {
        this.$notify({
          title: "Success",
          message: this.$t('commonNotify.UpdatedSuccessfully'),
          type: "success",
          duration: 2000
        });
      } else {
        this.$notify({
          title: "Error",
          message: res.message,
          type: "error",
          duration: 2000
        })
      }
    },
    changeMenu(num) {
      this.activeMenu = num
      if(num==1){
        this.getCurrDate_ysl()
        this.getATimeZone()
        //this.listTimezone()
        this.getNTPStatus()
        this.listNTPInfo()
      }else if(num==2){
        //this.listLanInfo()
      }else if(num==3){

      }else if(num==4){
        this.getCpuUsage()
      this.getMemoryUsage()
      this.getDiskUsage()
      }else if(num==5){
        this.getList()
      }else if(num==6){
        this.getMeterConfig()
      }else if(num==7){
        this.listSerialNumber()
      }else if(num==8){
        this.listPortForward()
      }
    },

    editIp(num) {
      this['file' + num].state_ip = 'edit'
    },
    cancelEditIp(num) {
      this['file' + num].state_ip = 'save'
      this['file' + num].ip = this['file' + num].ip_show
    },
    saveIp(num) {
      this.$confirm(this.$t('timeZone.Areyousuretosave'), this.$t('timeZone.prompt'), {
        confirmButtonText: this.$t('timeZone.confirm'),
        cancelButtonText: this.$t('timeZone.cancel'),
        type: 'warning'
      }).then(async () => {
        let fileKey = "file" + num
        let data = {
          fileKey,
          ip: this[fileKey].ip,
          mask: this[fileKey].mask,
          oldAddress: this[fileKey].oldAddress
        }
        const res = await updateLanInfo(data)
        if (res.code == 1) {
          this.$message({
            type: 'success',
            message: this.$t('timeZone.savesuccessfully')
          });
        } else {
          this.$message({
            type: 'error',
            message: res.message
          });
        }
        await this.listLanInfo()
        this['file' + num].state_ip = 'save'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('timeZone.cancelled')
        });
        this['file' + num].state_ip = 'save'
      });
    },
    editMask(num) {
      this['file' + num].state_mask = 'edit'
    },
    cancelEditMask(num) {
      this['file' + num].state_mask = 'save'
      this['file' + num].mask = this['file' + num].mask_show
    },
    saveMask(num) {
      this.$confirm(this.$t('timeZone.Areyousuretosave'), this.$t('timeZone.prompt'), {
        confirmButtonText: this.$t('timeZone.confirm'),
        cancelButtonText: this.$t('timeZone.cancel'),
        type: 'warning'
      }).then(async () => {
        let fileKey = "file" + num
        let data = {
          fileKey,
          ip: this[fileKey].ip,
          mask: this[fileKey].mask,
          oldAddress: this[fileKey].oldAddress
        }
        const res = await updateLanInfo(data)
        if (res.code == 1) {
          this.$message({
            type: 'success',
            message: this.$t('timeZone.savesuccessfully')
          });
        } else {
          this.$message({
            type: 'error',
            message: res.message
          });
        }
        this['file' + num].state_mask = 'save'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('timeZone.cancelled')
        });
        this['file' + num].state_mask = 'save'
      });

    },
    uploadFormOpen() {
      this.fileList = []
      this.dialogVisible = true
      this.$nextTick(() => {
        if (this.$refs.uploadRef) {
          this.$refs.uploadRef.clearFiles()
        }
      })
    },
    uploadWebFormOpen() {
      this.fileWebList = []
      this.dialogWebVisible = true
      this.$nextTick(() => {
        if (this.$refs.uploadWebRef) {
          this.$refs.uploadWebRef.clearFiles()
        }
      })
    },
    uploadSystemFormOpen() {
      this.fileSystemList = []
      this.dialogSystemVisible = true
      this.$nextTick(() => {
        if (this.$refs.uploadSystemRef) {
          this.$refs.uploadSystemRef.clearFiles()
        }
      })
    },
    async listVersion() {
      const { data: res } = await listVersion()
      if (res.web) {
        this.software.version = res.web
      }
    },
    uploadFile() {
      //this.$refs.uploadRef.submit()
    },
    async exportFile() {
      const res = await exportFile()
      console.log(res);
      const blob = new Blob([res])
      const fileName = 'lccu-package-download.app'
      if ('download' in document.createElement('a')) { // 非IE下载
        const elink = document.createElement('a')//创建一个a标签通过a标签的点击事件区下载文件
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)//使用blob创建一个指向类型数组的URL
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
      } else { // IE10+下载
        navigator.msSaveBlob(blob, fileName)
      }
    },
    changeFile(file, fileList) {
      this.software.update = file.raw
    },
    removeFile(file, fileList) {
      this.software.update = ''
    },
    changeWebFile(file, fileList) {
      this.webSoftware.update = file.raw
    },
    removeWebFile(file, fileList) {
      this.webSoftware.update = ''
    },
    changeSystemFile(file, fileList) {
      this.systemSoftware.update = file.raw
    },
    removeSystemFile(file, fileList) {
      this.systemSoftware.update = ''
    },
    changeConfigFile(file, fileList) {
      this.configPackge.update = file.raw
    },
    removeConfigFile(file, fileList) {
      this.configPackge.update = ''
    },
    async confirmUpload() {
      const res = await uploadFile(this.software.update)
      if (res.code == 1) {
        this.dialogVisible = false
        this.$confirm(this.$t('timeZone.Thisupdaterequiresasystemrestart'), this.$t('timeZone.prompt'), {
          confirmButtonText:this.$t('timeZone.installandrestart'),
          type: 'warning',
          showCancelButton:false
        }).then(async () => {
          this.restartLccu()
        }).catch(() => {

        });
      } else {
        this.$message({
          type: 'warning',
          message: res.message
        })
      }
    },
    selfDefineUploadFile() {

    },
    async uploadFrontend() {
      const res = await uploadFrontend(this.webSoftware.update)
      if (res.code == 1) {
        this.$message({
          type: 'success',
          message: res.data
        })
        this.dialogWebVisible = false
      } else {
        this.$message({
          type: 'error',
          message: res.message
        })
      }
    },
    async uploadSystemPackage() {
      const res = await uploadSystemPackage(this.systemSoftware.update)
      if (res.code == 1) {
        this.$message({
          type: 'success',
          message: res.data
        })
        this.dialogSystemVisible = false
        this.$confirm(this.$t('timeZone.Thisupdaterequiresasystemrestart'), this.$t('timeZone.prompt'), {
          confirmButtonText:this.$t('timeZone.installandrestart'),
          type: 'warning',
          showCancelButton:false,
          showClose:false,
          closeOnClickModal:false,
          closeOnPressEscape:false,
        }).then(async () => {
          this.installSystemPack()
        }).catch(() => {

        });
      } else {
        this.$message({
          type: 'error',
          message: res.message
        })
      }
    },
    async installSystemPack() {
      const res = await installSystemPack()
      if (res.code == 1) {
        this.$message({
          type: 'success',
          message: res.data
        })
      } else {
        this.$message({
          type: 'error',
          message: res.message
        })
      }
    },
    async getNTPStatus() {
      const { code, data } = await getNTPStatus()
      if (code == 1) {
        if (data == 'yes') {
          this.NTP.state = true
        } else {
          this.NTP.state = false
        }
      }
    },
    async changeNTPState(value) {
      let data = value ? 'true' : 'false'
      const res = await updateNTPStatus(data)
      if (res.code == 1) {
        this.$message({
          type: "success",
          message: res.data
        })
      } else {
        this.$message({
          type: "error",
          message: res.message
        })
      }
    },
    async listNTPInfo() {
      const { code, data: res } = await listNTPInfo()
      if (code == 1 && res && res.length > 0) {
        this.oldNTPList = res
        this.serverList = res.map((item, index) => {
          return {
            index: index + 1,
            state: 'save',
            server_show: item,
            server: item,
          }
        })
      } else {
        this.oldNTPList = []
        this.serverList = []
      }
    },
    clearAddServerInput() {
      this.$refs.addServerForm.clearValidate()
      this.NTP = {
        state: this.NTP.state,
        server: '',
        server_show: '',
        state_server: 'save'
      }
    },
    addNTPSever() {
      this.$refs.addServerForm.validate(async valid => {
        if (valid) {
          let list = [
            ...this.serverList,
            {
              index: this.serverList.length,
              server: this.NTP.server,
              server_show: this.NTP.server,
              state: 'save'
            }
          ]
          let data = {
            newAddress: list.map(item => item.server).join(' '),
            oldAddress: this.oldNTPList.join(' ')
          }
          const res = await updateNTPInfo(data)
          if (res.code == 1) {
            this.$message({
              type: "success",
              message: res.data
            })
            this.listNTPInfo()
          } else {
            this.$message({
              type: "error",
              message: res.messgae
            })
          }
          this.NTP.server = ''
        }
      }, error => { })

    },
    editNTPServer(item) {
      item.state = 'edit'
    },
    cancelEditNTPServer(item) {
      item.state = 'save'
      item.server = item.server_show
    },
    saveNTPServer(item, index) {
      this.$refs['editServerForm' + index][0].validate(async valid => {
        if (valid) {
          let data = {
            newAddress: this.serverList.map(v => {
              if (v == item) {
                return v.server
              } else {
                return v.server_show
              }
            }).join(' '),
            oldAddress: this.oldNTPList.join(' ')
          }
          const res = await updateNTPInfo(data)
          if (res.code == 1) {
            this.$message({
              type: "success",
              message: res.data
            })
            this.listNTPInfo()
          } else {
            this.$message({
              type: "error",
              message: res.message
            })
          }
        }
      }, error => {
        console.log(error)
      })
    },
    deleteNTPSever(item) {
      this.$confirm(this.$t('commonNotify.DeleteInfoMessage'), this.$t('commonNotify.Prompt'), {
        confirmButtonText: this.$t('commonNotify.Confirm'),
        cancelButtonText: this.$t('commonNotify.Cancel'),
        type: 'warning'
      })
        .then(async () => {
          try {
            let list = this.serverList.filter(v => v != item)
            let data = {
              newAddress: list.map(item => item.server).join(' '),
              oldAddress: this.oldNTPList.join(' ')
            }
            const res = await updateNTPInfo(data)
            if (res.code == 1) {
              this.$message({
                message: this.$t('commonNotify.SuccessfullyDeleted'),
                type: 'success',
                duration: 2000
              })
              this.listNTPInfo()
            } else {
              this.$message({
                message: this.$t('commonNotify.DeleteFailed'),
                type: 'error',
                duration: 5 * 1000
              })
            }
          } catch (error) {
            this.$message({
              message: error,
              type: 'error',
              duration: 3 * 1000
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('commonNotify.CancelledDeletion')
          })
        })
    },
    async upNTPSever(item, index) {
      let list = [...this.serverList]
      let content = list.splice(index, 1)[0];
      list.splice(index - 1, 0, content);
      let data = {
        newAddress: list.map(item => item.server).join(' '),
        oldAddress: this.oldNTPList.join(' ')
      }
      const res = await updateNTPInfo(data)
      if (res.code == 1) {
        this.$message({
          message: res.data,
          type: 'success',
        })
        this.listNTPInfo()
      } else {
        this.$message({
          message: res.message,
          type: 'error',
        })
      }
    },
    async downNTPSever(item, index) {
      let list = [...this.serverList]
      let content = list.splice(index, 1)[0];
      list.splice(index + 1, 0, content);
      let data = {
        newAddress: list.map(item => item.server).join(' '),
        oldAddress: this.oldNTPList.join(' ')
      }
      const res = await updateNTPInfo(data)
      if (res.code == 1) {
        this.$message({
          message: res.data,
          type: 'success',
        })
        this.listNTPInfo()
      } else {
        this.$message({
          message: res.message,
          type: 'error',
        })
      }
    },
    async getMeterConfig() {
      const { data } = await getMeterConfig()
      if (data) {
        this.meter.electric_grid_meter = data.meter_grid
        this.meter.self_consuming_electricity_meter = data.meter_bess
      }
    },
    async confirmSelectMeter() {
      let data = {
        meter_grid: this.meter.electric_grid_meter,
        meter_bess: this.meter.self_consuming_electricity_meter,
      }
      const res = await updateMeterConfig(data)
      if (res.code == 1) {
        await this.$message({
          message: res.data,
          type: 'success',
        })
        await this.$message({
          message: this.$t('timeZone.Thecurrentmodificationrequiresarestarttotakeeffect'),
          type: 'success',
        })
        this.getMeterConfig()
      } else {
        this.$message({
          message: res.message,
          type: 'error',
        })
      }
    },
    async packConfig() {
      const res = await packConfig()
      if (res.code == 1) {
        let loadingInstance1 = Loading.service({ fullscreen: true });
        setTimeout(async () => {
          this.$message({
            message: res.data,
            type: 'success'
          })
          loadingInstance1.close()
        }, 2000);

      } else {
        this.$message({
          message: res.message,
          type: 'error'
        })
      }
    },
    async exportConfig() {
      const res = await exportConfig()
      const blob = new Blob([res])
      const fileName = 'config.tar.gz'
      if ('download' in document.createElement('a')) { // 非IE下载
        const elink = document.createElement('a')//创建一个a标签通过a标签的点击事件区下载文件
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)//使用blob创建一个指向类型数组的URL
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
      } else { // IE10+下载
        navigator.msSaveBlob(blob, fileName)
      }
    },
    handleUploadConfigPackage() {
      this.fileConfigList = []
      this.dialogConfigVisible = true
      this.$nextTick(() => {
        if (this.$refs.uploadConfigRef) {
          this.$refs.uploadConfigRef.clearFiles()
        }
      })
    },
    async uploadConfigPackage() {
      const res = await uploadConfigPackage(this.configPackge.update)
      if (res.code == 1) {
        this.dialogConfigVisible = false
        this.$confirm(this.$t('timeZone.Thisupdaterequiresasystemrestart'), this.$t('timeZone.prompt'), {
          confirmButtonText:this.$t('timeZone.Restartimmediately'),
          cancelButtonText: this.$t('timeZone.Manuallyrestartlater'),
          type: 'warning'
        }).then(async () => {
          await updateConfigPackage()
          this.logout()
        }).catch(() => {
          
        });
      } else {
        this.$message({
          type: 'error',
          message: res.message
        })
      }
    },
    async listSerialNumber(){
      const { code,data } = await listSerialNumber()
      let keys = Object.keys(data)
      this.deviceTypeList = keys.map(key=>{
        return {
          deviceType:key,
          num:data[key]
        }
      })
    },
    handleUpdate(row){
      this.temp = {
        deviceType:row.deviceType,
        num:row.num
      }
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate()
      })
      this.dialogFormVisible = true
    },
    CUData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          //  深度复制表单的值 并且赋值给tempData
          const fun = updateSerialNumber
          fun(this.temp)
            .then(res => {
              if (res.code==1) {
                this.dialogFormVisible = false
                this.$notify({
                  title: 'success',
                  message: this.$t('commonNotify.UpdatedSuccessfully'),
                  type: 'success',
                  duration: 2000
                })
              } else {
                this.$message({
                  message: this.$t('commonNotify.UpdateFailed'),
                  type: 'error',
                  duration: 5 * 1000
                })
              }
              this.listSerialNumber()
            })
            .catch(error => {
              this.$message({
                message: this.$t('commonNotify.UpdateFailed'),
                type: 'error',
                duration: 3 * 1000
              })
            })
        }
      }, error => {
        console.log(error)
      })
    },
    async listPortForward(){
      const { data } = await listPortForward()
      this.portForwardList = data
    },
    handlePortForwardAdd(){
      this.portForwardTemp = {
        forward_name:null,
        local_port: null,
        remote_host: null,
        remote_port:null,
      }
      this.dialogStatus = 'create'
      this.dialogPortForwardFormVisible = true
      this.$nextTick(() => {
          this.$refs['dataPortForwardForm'].clearValidate()
      })
    },
    handlePortForwardUpdate(row){
      this.portForwardTemp = {
        forward_name:row.forward_name,
        local_port: row.local_port,
        remote_host: row.remote_host,
        remote_port:row.remote_port,
      }
      this.dialogStatus = 'update'
      this.dialogPortForwardFormVisible = true
      this.$nextTick(() => {
          this.$refs['dataPortForwardForm'].clearValidate()
      })
    },
    handlePortForwardDelete(row){
      this.$confirm(this.$t('commonNotify.DeleteInfoMessage'), this.$t('commonNotify.Prompt'), {
        confirmButtonText: this.$t('commonNotify.Confirm'),
        cancelButtonText: this.$t('commonNotify.Cancel'),
        type: 'warning'
      }).then(async () => {
        try {
            const res = await deletePortForward({ local_port: row.local_port })
            if (res.code == 1) {
                this.$notify({
                    title: this.$t('commonNotify.Success'),
                    message: this.$t('commonNotify.SuccessfullyDeleted'),
                    type: 'success',
                    duration: 2000
                })
                this.listPortForward()
            } else {
                this.$message({
                    message: this.$t('commonNotify.DeleteFailed') + (res.msg ? (`,${this.$t('commonNotify.Reason')}:` + res.msg) : ''),
                    type: 'error',
                    duration: 5 * 1000
                })
            }
          } catch (error) {
              this.$message({
                  message: error,
                  type: 'error',
                  duration: 3 * 1000
              })
          }
      })
      .catch(() => {
          this.$message({
              type: 'info',
              message: this.$t('commonNotify.CancelledDeletion')
          })
      })
    },
    async handlePortForwardStart(row){
      let resData = {
        local_port: row.local_port,
        remote_host: row.remote_host,
        remote_port:row.remote_port,
      }
      let res = await openPortForward(resData)
      if(res.code==1){
        this.$message({
          message: res.data,
          type:'success',
          duration: 2000
        })
        this.listPortForward()
      }else{
        this.$message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    },
    async handlePortForwardStop(row){
      let resData = {
        local_port: row.local_port,
      }
      let res = await closePortForward(resData)
      if(res.code==1){
        this.$message({
          message: res.data,
          type:'success',
          duration: 2000
        })
        this.listPortForward()
      }else{
        this.$message({
          message: res.message,
          type: 'error',
          duration: 5 * 1000
        })
      }
    },
    CUPortForwardData(row){
      this.$refs['dataPortForwardForm'].validate(valid => {
                if (valid) {
                    //  深度复制表单的值 并且赋值给tempData
                    const fun = (this.dialogStatus == 'create' ? addPortForward : updatePortForward)
                    fun(this.portForwardTemp)
                        .then(res => {
                            if (res.code == 1) {
                                this.dialogPortForwardFormVisible = false
                                this.$notify({
                                    title: this.$t('commonNotify.Success'),
                                    message: (this.dialogStatus == 'create' ? this.$t('commonNotify.CreatedSuccessfully') : this.$t('commonNotify.UpdatedSuccessfully')),
                                    type: 'success',
                                    duration: 2000
                                })
                                this.listPortForward()
                            } else {
                                this.$message({
                                    message: this.$t('commonNotify.UpdateFailed') + (res.message ? (`,${this.$t('commonNotify.Reason')}:` + res.message) : ''),
                                    type: 'error',
                                    duration: 5 * 1000
                                })
                            }
                        })
                        .catch(error => {
                            this.$message({
                                message: error,
                                type: 'error',
                                duration: 3 * 1000
                            })
                        })
                }
            }, error => {
                console.log(error)
            })
    },

    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
  mounted() {
    //this.options = moment.tz.names().map(v => { return { value: v, label: v } })
    this.changeMenu(1)
    this.listTimezone()
    this.listVersion()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
@import '@/styles/layout_common.scss';
@import '@/styles/table_scrollbar.scss';

.container {
  width: 100%;
  height: 100%;

  .content {
    width: 100%;
    //height:calc(100% - #{$navBarHeight});
    height: 100%;
    overflow: hidden;
    position: relative;
    padding:0 200px;
    .pannel {
      // width: 1176px;
      // height: 651px;
      width: 100%;
      height: 100%;
      // position: absolute;
      // left: 50%;
      // top: 50%;
      // transform: translate(-50%, -50%);

      .header {
        width: 100%;
        height: 59px;
        line-height: 59px;
        color: rgba(100, 115, 140, 1);
        font-size: 28px;

        img {
          vertical-align: sub;
          margin-right: 20px;
        }

      }

      .body {
        width: 100%;
        height: calc(100% - 59px);
        border-top: 1px solid rgba(187, 187, 187, 1);
        display: flex;

        .menu {
          width: 260px;
          background-color: rgba(177, 196, 228, 0.13);
          color: rgba(16, 16, 16, 1);
          font-size: 16px;

          .menuItem {
            height: 50px;
            line-height: 50px;
            background-color: #ffffff;
            text-align: center;
            margin-top: 10px;
            cursor: pointer;
          }

          .menuItem.active {
            color: #4d85ec;
            background-color: #bfc6ca
          }
        }

        .view {
          flex: 1;
          overflow: hidden;

          .rowContainer {
            width: 50%;
            // height:100%;
            margin-bottom: 20px;
          }

          .inputContainer {
            display: flex;
            text-wrap: nowrap;
            align-items: center;

            span {
              color: #477ee4
            }

            i {
              margin: 0 10px
            }
          }

          .dateContainer {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .serverListContainer {
            min-width: 300px;

            .serverItem {
              min-width: 250px;
              display: flex;

              .serverShow {
                width: 200px;
                margin-right: 10px;
                height: 40px;
                line-height: 40px;
              }
            }

            .serverListBox {
              max-height: 340px;
              overflow: auto;
            }
          }

          .softwareContainer {
            width: 100%;
            height: 100%;
            padding-top: 100px;
            padding-left: 100px;
            display: flex;

            //flex-direction: column;
            //justify-content: center;
            //align-items: center;
            .softwareBtnBox {
              margin-right: 40px;
            }

            span {
              color: #477ee4
            }

            i {
              cursor: pointer;
            }
          }

          .systemStatusContainer {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .status {
              display: flex;
              width: 50%;
              border: 1px solid rgba(219, 218, 218, 0.5);
              box-shadow: 3px 3px 6px rgb(219, 218, 218);

              .statusItem {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                min-width: 100px;
                min-height: 100px;
                font-size: 16px;
                font-weight: 700;

                .statusValue {
                  color: #493deb;
                  margin-bottom: 10px;
                }

                .statusName {}
              }

              .statusBorder {
                border-right: 1px solid #beb6b6;
              }
            }
          }

          .recordsContainer {
            width: 100%;
            height: 100%;
            padding-left: 20px;
            padding-top: 20px;

            .recordsTable {
              height: calc(100% - 60px);
            }
            
            .tableBtns{
              display: flex;
              justify-content: flex-end;
              margin-bottom: 10px;
            }
          }

          .configPackageContainer {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .packageContainer {
              display: flex;
              justify-content: center;
              align-items: center;

              div {
                margin-right: 20px;
              }
            }
          }
        }
      }
    }
  }
}

::v-deep.el-tabs {
  height: 100%;
}

::v-deep.el-tabs .el-tabs__header {
  margin-bottom: 0;
}

::v-deep.el-tabs .el-tabs__content {
  height: calc(100% - 42px)
}

::v-deep.el-tabs .el-tab-pane {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

::v-deep.el-row {
  margin-left: 0 !important;
  margin-right: 0 !important;
}

::v-deep.upload-demo .el-upload {
  height: 100%;
}

::v-deep.upload-demo .el-upload .el-upload-dragger {
  width: 100%;
  height: 100%;
  padding: 20px;
}

.NTPserverForm {
  .el-form-item {
    margin-bottom: 10px;
  }
}

::v-deep .el-form-item__content .el-form-item__error {
  padding-top: 0 !important;
}

::v-deep .upload-demo .el-upload {
  width: 100%
}

/* 整个滚动条 */
::-webkit-scrollbar {
  /* 对应纵向滚动条的宽度 */
  width: 5px;
  /* 对应横向滚动条的宽度 */
  height: 5px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
  background-color: #dbdbdb;
  // border-radius: 32px;
}
</style>