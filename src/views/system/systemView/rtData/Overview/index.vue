<template>
  <div class="content_box">
    <div class="box_left">
      <div class="card1">
        <div class="energyFlow">
          <div class="head">
            {{ $t('system$systemView$rtData$Overview$index_vue.EnergyFlow') }}
          </div>
          <div class="body">
            <div class="flowCard" ref="flowCard">
              <img ref="middle" class="middle" src="@/assets/image/rtData/middle.png" />
              <img ref="top" class="top" src="@/assets/image/rtData/grid.png" />
              <img ref="bottom" class="bottom" src="@/assets/image/rtData/battery.png" />
              <img class="left" src="@/assets/image/rtData/energy.png" />
              <img class="right" src="@/assets/image/rtData/load.png" />

              <div class="lineRow leftLine">
                <!-- <div class="ball leftBall"></div> -->
              </div>
              <div class="lineRow rightLine">
                <!-- <div class="ball rightBall"></div> -->
              </div>
              <div class="lineCol topLine" :style="topLineStyleObj">
                <!-- <div class="ball topBall"></div> -->
              </div>
              <div class="lineCol bottomLine" :style="topLineStyleObj">
                <div class="ball"
                  :class="{ 'bottomBall_charge': en.activePower < 0, 'bottomBall_disCharge': en.activePower > 0 }"
                  v-if="en.activePower && en.activePower != 0"></div>
              </div>

              <table class="dataCard topCard">
                <tr class="dataItem">
                  <td class="name">P_in:</td>
                  <td calss="value">{{ grid.input }}</td>
                </tr>
                <tr class="dataItem">
                  <td class="name">P_out:</td>
                  <td calss="value">{{ grid.out }}</td>
                </tr>
                <tr class="dataItem">
                  <td class="name">P:</td>
                  <td calss="value">{{ grid.activePower }}</td>
                </tr>
                <tr class="dataItem">
                  <td class="name">COS:</td>
                  <td calss="value">{{ grid.powerFactor }}</td>
                </tr>
              </table>
              <table class="dataCard bottomCard">
                <tr class="dataItem">
                  <td class="name">P_in:</td>
                  <td calss="value">{{ en.input }}</td>
                </tr>
                <tr class="dataItem">
                  <td class="name">P_out:</td>
                  <td calss="value">{{ en.out }}</td>
                </tr>
                <tr class="dataItem">
                  <td class="name">P:</td>
                  <td calss="value">{{ en.activePower }}</td>
                </tr>
                <tr class="dataItem">
                  <td class="name">COS:</td>
                  <td calss="value">{{ en.powerFactor }}</td>
                </tr>
              </table>
              <table class="dataCard leftCard">
                <tr class="dataItem">
                  <td class="name">P_in:</td>
                  <td calss="value">{{ pv.input }}</td>
                </tr>
                <tr class="dataItem">
                  <td class="name">P_out:</td>
                  <td calss="value">{{ pv.out }}</td>
                </tr>
                <tr class="dataItem">
                  <td class="name">P:</td>
                  <td calss="value">{{ pv.activePower }}</td>
                </tr>
                <tr class="dataItem">
                  <td class="name">COS:</td>
                  <td calss="value">{{ pv.powerFactor }}</td>
                </tr>
              </table>
              <table class="dataCard rightCard">
                <tr class="dataItem">
                  <td class="name">P_in:</td>
                  <td calss="value">{{ load.input }}</td>
                </tr>
                <tr class="dataItem">
                  <td class="name">P_out:</td>
                  <td calss="value">{{ load.out }}</td>
                </tr>
                <tr class="dataItem">
                  <td class="name">P:</td>
                  <td calss="value">{{ load.activePower }}</td>
                </tr>
                <tr class="dataItem">
                  <td class="name">COS:</td>
                  <td calss="value">{{ load.powerFactor }}</td>
                </tr>
              </table>

            </div>
          </div>

        </div>
      </div>
      <div class="card2">
        <div class="tabCard">
          <div class="tab_menu">
            <div class="menu_item" :class="tab.id == item.id ? 'active' : ''" v-for="item in list">
              <a @click="changeTab(item)">{{ item.name }}</a>
            </div>
          </div>
          <div class="tabContent" v-if="tab.id == 0">
            <el-table :data="tableData" stripe style="width: 100%;" height="100%" row-key="id">
              <el-table-column prop="name" :label="$t('system$systemView$rtData$Overview$index_vue.name')"
                v-if="currentLang == 'en'">
              </el-table-column>
              <el-table-column prop="chinese" :label="$t('system$systemView$rtData$Overview$index_vue.name')"
                v-else="currentLang=='zh'">
              </el-table-column>
              <!-- <el-table-column prop="des" :label="$t('system$systemView$rtData$Overview$index_vue.des')" width="180">
              </el-table-column> -->
              <el-table-column prop="triggerTime" :label="$t('system$systemView$rtData$Overview$index_vue.triggertime')">
              </el-table-column>
            </el-table>
          </div>
          <div class="tabContent" v-else>
            <el-table :data="tableData" stripe style="width: 100%;" height="100%" row-key="id">
              <el-table-column prop="name" :label="$t('system$systemView$rtData$Overview$index_vue.name')"
                v-if="currentLang == 'en'">
              </el-table-column>
              <el-table-column prop="chinese" :label="$t('system$systemView$rtData$Overview$index_vue.name')"
                v-else="currentLang=='zh'">
              </el-table-column>
              <el-table-column prop="value" :label="$t('system$systemView$rtData$Overview$index_vue.value')"
                width="180">
              </el-table-column>
              <el-table-column prop="unit" :label="$t('system$systemView$rtData$Overview$index_vue.unit')">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div class="box_right">
      <div class="controlContainer">
        <el-collapse v-model="activeName" :accordion="false">
          <el-collapse-item title="System" name="1">
            <div class="emsContainer">
              <table class="commonTable">
                <tr>
                  <td class="label">{{
                    $t('system$systemView$rtData$Overview$index_vue.CurrentEMSallowscontrolofsources') }}</td>
                  <td class="value">{{ currentLang == 'en'?ems.allow_control_source.en_value:ems.allow_control_source.zh_value }}</td>
                  <td class="label">{{
                    $t('system$systemView$rtData$Overview$index_vue.EMSallowscontrolofsourcesettings') }}：</td>
                  <td class="selectWidth">
                    <el-select v-model="temp.allow_control_source">
                      <!-- <el-option label="Modbus" :value="1"></el-option>
                      <el-option label="IEC104" :value="2"></el-option>
                      <el-option label="BCP" :value="3"></el-option> -->
                      <el-option label="Ageera EMS" :value="4"></el-option>
                      <!-- <el-option label="HMI" :value="5"></el-option> -->
                      <el-option label="WEB" :value="6"></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-button type="primary" size="small"
                      :disabled="!temp.allow_control_source"
                      @click="confirmAllowControlSource">{{
                        $t('system$systemView$rtData$Overview$index_vue.confirm') }}</el-button>
                  </td>
                </tr>
                <tr v-if="ems.allow_control_source.en_value=='WEB111'">
                  <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.Startstopcontrol') }}：</td>
                  <td colspan="4">
                    <el-button type="primary" size="small" @click="commandSystem({ commandType:4,commandValue: true })">{{
                      $t('system$systemView$rtData$Overview$index_vue.start') }}</el-button>
                    <el-button type="primary" size="small" @click="commandSystem({ commandType:5,commandValue: true })">{{
                      $t('system$systemView$rtData$Overview$index_vue.stop') }}</el-button>
                    <el-button type="primary" size="small" @click="commandSystem({ commandType:6,commandValue: true })">{{
                      $t('system$systemView$rtData$Overview$index_vue.reset') }}</el-button>
                  </td>
                </tr>
                <tr v-if="ems.allow_control_source.en_value=='WEB111'">
                  <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.CurrentEMScontrolmode') }}：</td>
                  <td class="value">{{ currentLang == 'en'? ems.control_mode.en_value:ems.control_mode.zh_value  }}</td>
                  <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.EMScontrolmode') }}：</td>
                  <td>
                    <el-select v-model="temp.control_mode">
                      <el-option :label="$t('system$systemView$rtData$Overview$index_vue.Manualcontrol')" :value="false"></el-option>
                      <el-option :label="$t('system$systemView$rtData$Overview$index_vue.Automaticcontrol')" :value="true"></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-button type="primary" size="small" :disabled="(typeof(temp.control_mode))!=='boolean'"
                    @click="confirmControlMode">{{ $t('system$systemView$rtData$Overview$index_vue.confirm')
                      }}</el-button>
                  </td>
                </tr>
                <tr v-if="ems.allow_control_source.en_value=='WEB111'">
                  <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.CurrentEMSactivecontrolmode') }}：
                  </td>
                  <td class="value">{{ currentLang == 'en'? ems.active_control_mode.en_value: ems.active_control_mode.zh_value }}</td>
                  <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.EMSactivecontrolmode') }}：</td>
                  <td>
                    <el-select v-model="temp.active_control_mode">
                      <el-option :label="$t('system$systemView$rtData$Overview$index_vue.Manualactivepowerregulation')" :value="1"></el-option>
                      <el-option :label="$t('system$systemView$rtData$Overview$index_vue.PlanCurveAdjustment')" :value="2"></el-option>
                      <el-option :label="$t('system$systemView$rtData$Overview$index_vue.HybridAlgorithmAdjustment')" :value="3"></el-option>
                    </el-select>
                  </td>
                  <td>
                    <el-button type="primary" size="small" @click="confirmActiveControlMode"
                      :disabled="!temp.active_control_mode && temp.active_control_mode !== 0">{{
                        $t('system$systemView$rtData$Overview$index_vue.confirm') }}</el-button>
                  </td>
                </tr>
                <tr v-if="ems.allow_control_source.en_value=='WEB111'">
                  <td class="label">
                    {{ $t('system$systemView$rtData$Overview$index_vue.Referencepointminimumpowerlimitstate') }}：</td>
                  <td class="value" colspan="4">{{ currentLang == 'en'? ems.min_power_limit_state.en_value:ems.min_power_limit_state.zh_value }}</td>
                </tr>
                <tr v-if="ems.allow_control_source.en_value=='WEB111'">
                  <td class="label">
                    {{ $t('system$systemView$rtData$Overview$index_vue.Maximumpowerlimitstateofreferencepoint') }}：</td>
                  <td class="value" colspan="4">{{ currentLang == 'en'? ems.max_power_limit_state.en_value: ems.max_power_limit_state.zh_value }}</td>
                </tr>
                <tr v-if="ems.allow_control_source.en_value=='WEB111'">
                  <td class="label">
                    {{ $t('system$systemView$rtData$Overview$index_vue.Referencepointminimumpowerlimitactivecharginganddischargingstate') }}：
                  </td>
                  <td class="value" colspan="4">{{ currentLang == 'en'? ems.min_power_charge_state.en_value: ems.min_power_charge_state.zh_value }}</td>
                </tr>
                <tr v-if="ems.allow_control_source.en_value=='WEB111'">
                  <td class="label">
                    {{ $t('system$systemView$rtData$Overview$index_vue.Referencepointmaximumpowerlimitactivecharginganddischargingstate') }}：
                  </td>
                  <td class="value" colspan="4">{{ currentLang == 'en'? ems.max_power_charge_state.en_value:ems.max_power_charge_state.zh_value }}</td>
                </tr>
                <tr>
                  <td class="label">
                    {{ $t('system$systemView$rtData$Overview$index_vue.Currentmaximumfaultlevel') }}：
                  </td>
                  <td class="value" colspan="4">{{ ems.max_fault_level.value }}</td>
                </tr>
              </table>
            </div>
          </el-collapse-item>
          <el-collapse-item title="PCS" name="2">
            <div class="pcs_command_container">
              <div class="left">
                <table>
                  <tr>
                    <td class="pcsName">{{ $t('system$systemView$rtData$Overview$index_vue.Currentrunningstatus') }}:
                    </td>
                    <td class="pcsValue"><span>{{ pcs.pcs_current_status }}</span></td>
                  </tr>
                  <tr>
                    <td class="pcsName">{{
                      $t('system$systemView$rtData$Overview$index_vue.Currentactivepowercontrolmode')
                    }}:</td>
                    <td class="pcsValue"><span>{{ pcs.pcs_active_control }}</span></td>
                  </tr>
                  <tr>
                    <td class="pcsName">{{
                      $t('system$systemView$rtData$Overview$index_vue.Currentreactivepowercontrolmode') }}:</td>
                    <td class="pcsValue"><span>{{ pcs.pcs_reactive_control }}</span></td>
                  </tr>
                  <tr>
                    <td class="pcsName">{{ $t('system$systemView$rtData$Overview$index_vue.Currentactivepower') }}:</td>
                    <td class="pcsValue"><span>{{ handleValue(pcs.pcs_active_power) }}</span><span>kW</span></td>
                  </tr>
                  <tr>
                    <td class="pcsName">{{ $t('system$systemView$rtData$Overview$index_vue.Currentreactivepower') }}:
                    </td>
                    <td class="pcsValue"><span>{{ handleValue(pcs.pcs_reactive_power) }}</span><span>kVar</span></td>
                  </tr>
                  <tr>
                    <td class="pcsName">{{ $t('system$systemView$rtData$Overview$index_vue.cos') }}:</td>
                    <td class="pcsValue"><span>{{ handleValue(pcs.pcs_system_power) }}</span></td>
                  </tr>
                </table>
              </div>
              <div class="right">
                <table class="commonTable" style="max-width: 600px;margin: auto;">
                  <tr>
                    <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.Startstopcontrol') }}</td>
                    <td style="display: flex;">
                      <el-button type="primary" size="small"
                        @click="pcsCommandIssued({ deviceKey: 'pcs', pointKey: 'pcs_ctrl_sta', value: 10 })">{{
                          $t('system$systemView$rtData$Overview$index_vue.start') }}</el-button>
                      <el-button type="primary" size="small"
                        @click="pcsCommandIssued({ deviceKey: 'pcs', pointKey: 'pcs_ctrl_sta', value: 11 })">{{
                          $t('system$systemView$rtData$Overview$index_vue.stop') }}</el-button>
                      <el-button type="primary" size="small"
                        @click="pcsCommandIssued({ deviceKey: 'pcs', pointKey: 'pcs_ctrl_sta', value: 1 })">{{
                          $t('system$systemView$rtData$Overview$index_vue.reset') }}</el-button>
                    </td>
                  </tr>
                  <tr>
                    <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.Activepowercontrolmodeset') }}
                    </td>
                    <td>
                      <el-select v-model="PCSTemp.pcs_active_control">
                        <!-- <el-option :label="$t('system$systemView$rtData$Overview$index_vue.Zeroouterring')"
                          :value="1"></el-option>
                        <el-option :label="$t('system$systemView$rtData$Overview$index_vue.DCconstantcurrent')"
                          :value="2"></el-option> -->
                        <el-option :label="$t('system$systemView$rtData$Overview$index_vue.DCconstantvoltage')"
                          :value="3"></el-option>
                        <!-- <el-option :label="$t('system$systemView$rtData$Overview$index_vue.DCconstantpower')"
                          :value="4"></el-option> -->
                        <el-option :label="$t('system$systemView$rtData$Overview$index_vue.ACconstantpower')"
                          :value="5"></el-option>
                        <!-- <el-option :label="$t('system$systemView$rtData$Overview$index_vue.VSG')"
                          :value="6"></el-option>
                        <el-option :label="$t('system$systemView$rtData$Overview$index_vue.VF')" :value="7"></el-option>
                        <el-option :label="$t('system$systemView$rtData$Overview$index_vue.AUTO')"
                          :value="8"></el-option> -->
                      </el-select>
                    </td>
                    <td>
                      <el-button type="primary" size="small"
                        :disabled="!PCSTemp.pcs_active_control && PCSTemp.pcs_active_control !== 0"
                        @click="pcsCommandIssued({ deviceKey: 'pcs', pointKey: 'ap_ctrl_set', value: PCSTemp.pcs_active_control })">{{
                          $t('system$systemView$rtData$Overview$index_vue.confirm') }}</el-button>
                    </td>
                  </tr>
                  <tr>
                    <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.Reactivepowercontrolmodeset')
                      }}
                    </td>
                    <td>
                      <el-select v-model="PCSTemp.pcs_reactive_control">
                        <el-option :label="$t('system$systemView$rtData$Overview$index_vue.uncontrolled')"
                          :value="0"></el-option>
                        <el-option :label="$t('system$systemView$rtData$Overview$index_vue.Reactivepowerfactormethod')"
                          :value="1"></el-option>
                        <el-option :label="$t('system$systemView$rtData$Overview$index_vue.Reactivepowerratiomethod')"
                          :value="2"></el-option>
                        <el-option :label="$t('system$systemView$rtData$Overview$index_vue.Reactivepowercontrolmethod')"
                          :value="3"></el-option>
                      </el-select>
                    </td>
                    <td>
                      <el-button type="primary" size="small"
                        :disabled="!PCSTemp.pcs_reactive_control && PCSTemp.pcs_reactive_control !== 0"
                        @click="pcsCommandIssued({ deviceKey: 'pcs', pointKey: 'rp_ctrl_set', value: PCSTemp.pcs_reactive_control })">{{
                          $t('system$systemView$rtData$Overview$index_vue.confirm') }}</el-button>
                    </td>
                  </tr>

                  <!--DCV电压设定值-->
                  <tr v-if="pcs.pcs_active_control=='DC constant voltage'">
                    <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.DCVvoltagesettingvalue') }}</td>
                    <td>
                      <el-input v-model="PCSTemp.DCV_voltage_setting_value" type="number"></el-input>
                    </td>
                    <td rowspan="2">
                      <el-button type="primary" size="small"
                        :disabled="!PCSTemp.DCV_voltage_setting_value && PCSTemp.DCV_voltage_setting_value !== 0"
                        @click="commandPCSDCVIssued({dcvVValue:PCSTemp.DCV_voltage_setting_value*1,dcvIValue:PCSTemp.DCV_current_limit_value*1})">{{$t('system$systemView$rtData$Overview$index_vue.confirm') }}</el-button>
                    </td>
                  </tr>
                  <!--DCV电流限定值-->
                  <tr  v-if="pcs.pcs_active_control=='DC constant voltage'">
                    <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.DCVcurrentlimitvalue') }}</td>
                    <td>
                      <el-input v-model="PCSTemp.DCV_current_limit_value" type="number"></el-input>
                    </td>
                  </tr>
                  <!--ACP有功功率设定值-->
                  <tr v-if="pcs.pcs_active_control=='AC constant power'">
                    <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.ACPactivepowersettingvalue') }}</td>
                    <td>
                      <el-input v-model="PCSTemp.ACP_active_power_setting_value" type="number"></el-input>
                    </td>
                    <td>
                      <el-button type="primary" size="small"
                        :disabled="!PCSTemp.ACP_active_power_setting_value && PCSTemp.ACP_active_power_setting_value !== 0"
                        @click="pcsCommandIssued({ deviceKey: 'pcs', pointKey: 'ACP_ap_set', value: PCSTemp.ACP_active_power_setting_value * 1 })">{{
                          $t('system$systemView$rtData$Overview$index_vue.confirm') }}</el-button>
                    </td>
                  </tr>
                  <!--无功功率因数设定值-->
                  <tr v-if="pcs.pcs_reactive_control=='Reactive power factor'">
                    <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.Reactivepowerfactorsettingvalue') }}</td>
                    <td>
                      <el-input v-model="PCSTemp.Reactive_power_factor_setting_value" type="number"></el-input>
                    </td>
                    <td>
                      <el-button type="primary" size="small"
                        :disabled="!PCSTemp.Reactive_power_factor_setting_value && PCSTemp.Reactive_power_factor_setting_value !== 0"
                        @click="pcsCommandIssued({ deviceKey: 'pcs', pointKey: 'rp_power_factor_set', value: PCSTemp.Reactive_power_factor_setting_value * 1 })">{{
                          $t('system$systemView$rtData$Overview$index_vue.confirm') }}</el-button>
                    </td>
                  </tr>
                  <!--无功功率比例设定值-->
                  <tr v-if="pcs.pcs_reactive_control=='Reactive power ratio'">
                    <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.Reactivepowerratiosettingvalue') }}</td>
                    <td>
                      <el-input v-model="PCSTemp.Reactive_power_ratio_setting_value" type="number"></el-input>
                    </td>
                    <td>
                      <el-button type="primary" size="small"
                        :disabled="!PCSTemp.Reactive_power_ratio_setting_value && PCSTemp.Reactive_power_ratio_setting_value !== 0"
                        @click="pcsCommandIssued({ deviceKey: 'pcs', pointKey: 'rp_rate_set', value: PCSTemp.Reactive_power_ratio_setting_value * 1 })">{{
                          $t('system$systemView$rtData$Overview$index_vue.confirm') }}</el-button>
                    </td>
                  </tr>
                  <!--无功功率设定值-->
                  <tr v-if="pcs.pcs_reactive_control=='Reactive power'">
                    <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.Reactivepowersettingvalue') }}</td>
                    <td>
                      <el-input v-model="PCSTemp.Reactive_power_setting_value" type="number"></el-input>
                    </td>
                    <td>
                      <el-button type="primary" size="small"
                        :disabled="!PCSTemp.Reactive_power_setting_value && PCSTemp.Reactive_power_setting_value !== 0"
                        @click="pcsCommandIssued({ deviceKey: 'pcs', pointKey: 'rp_power_set', value: PCSTemp.Reactive_power_setting_value * 1 })">{{
                          $t('system$systemView$rtData$Overview$index_vue.confirm') }}</el-button>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="BMS" name="3">
            <table class="commonTable" style="max-width: 600px;margin: auto;">
              <tr>
                <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.bmspositivestatus') }}</td>
                <td style="color:#3a0be6;">
                  {{ BMSTemp.bms_positive_status }}
                </td>
              </tr>
              <tr>
                <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.bmsnegativestatus') }}</td>
                <td style="color:#3a0be6;">
                  {{ BMSTemp.bms_negative_status }}
                </td>
              </tr>
              <tr>
                <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.Maincircuitoperate') }}</td>
                <td>
                  <el-button type="primary" size="small"
                    @click="pcsCommandIssued({ deviceKey: 'bms', pointKey: 'switch_ctrl', value: '0x55AA' })">{{
                      $t('system$systemView$rtData$Overview$index_vue.connect') }}</el-button>
                  <el-button type="primary" size="small"
                    @click="pcsCommandIssued({ deviceKey: 'bms', pointKey: 'switch_ctrl', value: '0x0000' })">{{
                      $t('system$systemView$rtData$Overview$index_vue.disconnect') }}</el-button>
                </td>
              </tr>
              <tr>
                <td class="label">{{ $t('system$systemView$rtData$Overview$index_vue.Faultreset') }}</td>
                <td>
                  <el-button type="primary" size="small"
                    @click="pcsCommandIssued({ deviceKey: 'bms', pointKey: 'reset', value: '0x55AA' })">{{
                      $t('system$systemView$rtData$Overview$index_vue.reset') }}</el-button>
                </td>
              </tr>
            </table>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { listLiquidCoolData, listFireFightData, listGridMeterData, listBessMeterData, listDehumData, listControlData, listEnergyFlowData, commandIssued,
  getTriggerLccuAlarm, listSystemCtlData,commandSystem,commandPCSDCVIssued
} from '@/api/system/rtData'
import { toFixedNoRounding } from '@/utils/index.js'
import Cookies from 'js-cookie'
import {getCurrentTimefromOffset} from '@/utils'
export default {
  data() {
    return {
      timer: null,
      currentLang: Cookies.get('language'),
      topLineStyleObj: {},
      list: [
        {
          id: 0,
          name: this.$t('system$systemView$rtData$Overview$index_vue.lccualarm'),
          value: 'lccuAlarm'
        },
        {
          id: 1,
          name: this.$t('system$systemView$rtData$Overview$index_vue.cooling'),
          value: 'liquidCool'
        },
        {
          id: 2,
          name: this.$t('system$systemView$rtData$Overview$index_vue.fire'),
          value: 'fireFight'
        },
        {
          id: 3,
          name: this.$t('system$systemView$rtData$Overview$index_vue.metergrid'),
          value: 'gridMeter'
        },
        {
          id: 4,
          name: this.$t('system$systemView$rtData$Overview$index_vue.meterbess'),
          value: 'bessMeter'
        },
        {
          id: 5,
          name: this.$t('system$systemView$rtData$Overview$index_vue.dehumidifier'),
          value: 'dehumidifier'
        }
      ],
      tab: {
        id: 0,
        name: this.$t('system$systemView$rtData$Overview$index_vue.lccualarm'),
        value: 'lccuAlarm'
      },
      tableData: [],
      activeName: ['1', '2', '3'],
      ems:{
        allow_control_source:{en_value:null,zh_value:null},
        control_mode: {en_value:null,zh_value:null},
        active_control_mode:{en_value:null,zh_value:null},
        min_power_limit_state:{en_value:null,zh_value:null},
        max_power_limit_state:{en_value:null,zh_value:null},
        min_power_charge_state:{en_value:null,zh_value:null},
        max_power_charge_state:{en_value:null,zh_value:null},
        max_fault_level:{value:null},
      },
      emsValueChineseMap:{
        allow_control_source:"当前EMS允许控制来源",
        control_mode: "当前EMS控制模式",
        active_control_mode:"当前EMS有功控制模式",
        min_power_limit_state:"参考点最小功率限制状态",
        max_power_limit_state:"参考点最大功率限制状态",
        min_power_charge_state:"参考点最小功率限制主动充放电状态",
        max_power_charge_state:"参考点最大功率限制主动充放电状态",
        max_fault_level:"当前故障最大等级"
      },
      temp: {
        allow_control_source:null,
        control_mode: null,
        active_control_mode:null
      },

      LccuAlarmData: [],
      LiquidCoolData: [],
      FireFightData: [],
      GridMeterData: [],
      BessMeterData: [],
      DehumidifierData: [],

      grid: {},
      pv: {},
      en: {},
      load: {},

      start: {},
      stop: {},
      reset: {},
      spot: {},
      place: {},
      manual: {},
      plan: {},
      activePower: {},

      pcs: {
        pcs_current_status: '',
        pcs_active_control: '',
        pcs_reactive_control: '',
        pcs_active_power: '',
        pcs_reactive_power: '',
        pcs_system_power: ''
      },
      PCSTemp: {
        pcs_active_control: '',
        pcs_reactive_control: '',
        // pcs_active_power: '',
        // pcs_reactive_power: '',
        DCV_voltage_setting_value:'',
        DCV_current_limit_value:'',
        ACP_active_power_setting_value:'',
        Reactive_power_factor_setting_value:'',
        Reactive_power_ratio_setting_value:'',
        Reactive_power_setting_value:""
      },
      BMSTemp: {
        bms_positive_status: "",
        bms_negative_status: ""
      }
    }
  },
  methods: {
    formatValue(row, column, cellValue, index) {
      return this.handleValue(cellValue)
    },
    handleValue(value) {
      if (!isNaN(value * 1) && typeof (value * 1) == 'number') {
        return toFixedNoRounding(value * 1, 2)
      } else {
        return value
      }
    },
    changeTab(tab) {
      this.tab = tab
      if(this.tab.value == 'lccuAlarm'){
        this.tableData = this.LccuAlarmData
      } else if (this.tab.value == 'liquidCool') {
        this.tableData = this.LiquidCoolData
      } else if (this.tab.value == 'fireFight') {
        this.tableData = this.FireFightData
      } else if (this.tab.value == 'gridMeter') {
        this.tableData = this.GridMeterData
      } else if (this.tab.value == 'bessMeter') {
        this.tableData = this.BessMeterData
      } else if (this.tab.value == 'dehumidifier') {
        this.tableData = this.DehumidifierData
      } else {
        this.tableData = []
      }
    },
    async getTriggerLccuAlarm() {
      const {code,data:res} = await getTriggerLccuAlarm()
      if (code==1 && res) {
        this.LccuAlarmData = res.map(v => {
          return {
            ...v,
            triggerTime: getCurrentTimefromOffset(v.triggerTime*1000)

          }
        })
      } else {
        this.LccuAlarmData = []
      }
      if (this.tab.value == 'lccuAlarm') {
        this.tableData = this.LccuAlarmData
      }
    },
    async listLiquidCoolData() {
      const {code,data:res1} = await listLiquidCoolData()
      if (code==1 && res1) {
        this.LiquidCoolData = res1.map(v => {
          return {
            ...v,
            value: this.handleValue(v.value)
          }
        })
      } else {
        this.LiquidCoolData = []
      }
      if (this.tab.value == 'liquidCool') {
        this.tableData = this.LiquidCoolData
      }
    },
    async listFireFightData() {
      const {code,data:res2} = await listFireFightData()
      if (code==1 && res2) {
        this.FireFightData = res2.map(v => {
          return {
            ...v,
            value: this.handleValue(v.value)
          }
        })
      } else {
        this.FireFightData = []
      }
      if (this.tab.value == 'fireFight') {
        this.tableData = this.FireFightData
      }
    },
    async listGridMeterData() {
      const {code,data:res3} = await listGridMeterData()
      if (code==1 && res3) {
        this.GridMeterData = res3.map(v => {
          return {
            ...v,
            value: this.handleValue(v.value)
          }
        })
      } else {
        this.GridMeterData = []
      }
      if (this.tab.value == 'gridMeter') {
        this.tableData = this.GridMeterData
      }
    },
    async listBessMeterData() {
      const {code,data:res4} = await listBessMeterData()
      if (code==1 && res4) {
        this.BessMeterData = res4.map(v => {
          return {
            ...v,
            value: this.handleValue(v.value)
          }
        })
      } else {
        this.BessMeterData = []
      }
      if (this.tab.value == 'bessMeter') {
        this.tableData = this.BessMeterData
      }
    },
    async listDehumData() {
      const {code,data:res5} = await listDehumData()
      if (code==1 && res5) {
        this.DehumidifierData = res5.map(v => {
          return {
            ...v,
            value: this.handleValue(v.value)
          }
        })
      } else {
        this.DehumidifierData = []
      }
      if (this.tab.value == 'dehumidifier') {
        this.tableData = this.DehumidifierData
      }
    },
    async listSystemCtlData(){
      const {code,data:res} = await listSystemCtlData()
      if(code==1 && res&&res.length>0){
        Object.keys(this.emsValueChineseMap).forEach((key)=>{
          let chinese = this.emsValueChineseMap[key]
          this.ems[key] = res.find(item=>item.chinese == chinese)
        })
      }
    },
    async listControlData() {
      const {code,data:res} = await listControlData()
      if (res && res.length > 0) {
        res.forEach(item => {
          let index_pcs = ['pcs_current_status', 'pcs_active_control', 'pcs_reactive_control', 'pcs_active_power', 'pcs_reactive_power', 'pcs_system_power'].indexOf(item.key)
          let index_bms = ['bms_positive_status', 'bms_negative_status'].indexOf(item.key)
          if (index_pcs > -1) {
            this.pcs[item.key] = item.value
          }
          if (index_bms > -1) {
            this.BMSTemp[item.key] = item.value
          }
        })
      }
    },
    async listEnergyFlowData() {
      const { code,data:result } = await listEnergyFlowData()
      if (code==1 && result && result.length > 0) {
        result.forEach(item => {
          this[item.name] = item
          if (this[item.name].out) {
            this[item.name].out = toFixedNoRounding(this[item.name].out * 1, 2)
          }
          if (this[item.name].input) {
            this[item.name].input = toFixedNoRounding(this[item.name].input * 1, 2)
          }
          if (this[item.name].activePower) {
            this[item.name].activePower = toFixedNoRounding(this[item.name].activePower * 1, 2)
          }
          if (this[item.name].powerFactor) {
            this[item.name].powerFactor = toFixedNoRounding(this[item.name].powerFactor * 1, 3)
          }
        })
      }
    },
    confirmAllowControlSource(){
      this.commandSystem({commandType:1,commandValue:this.temp.allow_control_source})
    },
    confirmControlMode(){
      console.log(this.temp.control_mode)
      console.log(typeof this.temp.control_mode)
      this.commandSystem({commandType:2,commandValue:this.temp.control_mode})
    },
    confirmActiveControlMode(){
      this.commandSystem({commandType:3,commandValue:this.temp.active_control_mode})
    },
    // ems 相关方法
    async commandSystem(obj) {
      const res = await commandSystem(obj)
      if (res.code == 1) {
        this.$notify({
          title: "Success",
          message: res.data,
          type: "success",
          duration: 2000
        });
        this.listSystemCtlData()
      } else {
        this.$notify({
          title: "Failed",
          message: res.message,
          type: "error",
          duration: 2000
        });
      }
    },
    // PCS 相关方法
    async pcsCommandIssued(obj) {
      const res = await commandIssued(obj)
      if (res.code == 1) {
        this.$notify({
          title: "Success",
          message: res.data,
          type: "success",
          duration: 2000
        });
      } else {
        this.$notify({
          title: "Failed",
          message: res.message,
          type: "error",
          duration: 2000
        });
      }
    },
    // pcs 直流恒压参数下发
    async commandPCSDCVIssued(obj){
      const res = await commandPCSDCVIssued(obj)
      if (res.code == 1) {
        this.$notify({
          title: "Success",
          message: res.data,
          type: "success",
          duration: 2000
        });
      } else {
        this.$notify({
          title: "Failed",
          message: res.message,
          type: "error",
          duration: 2000
        });
      }
    },

    // BMS 相关方法
    connect() {

    },
    disconnect() {

    },
    faultReset() {

    },

    computeTopLineHeight() {
      if (!this.$refs.flowCard) {
        return;
      }
      let cardHeight = this.$refs.flowCard.offsetHeight
      let middlePicHeight = this.$refs.middle.height
      let topPicHeight = this.$refs.top.height
      let bottomPicHeight = this.$refs.bottom.height

      let height = cardHeight - middlePicHeight - topPicHeight - bottomPicHeight
      let halfHeight = height / 2
      this.topLineStyleObj = {
        height: halfHeight + 'px'
      }
      return halfHeight
    }
  },
  mounted() {
    this.$refs.middle.addEventListener('load', this.computeTopLineHeight)
    window.addEventListener('resize', this.computeTopLineHeight)
    this.getTriggerLccuAlarm()
    this.listLiquidCoolData()
    this.listFireFightData()
    this.listGridMeterData()
    this.listBessMeterData()
    this.listDehumData()
    this.listSystemCtlData()
    this.listControlData()
    this.listEnergyFlowData()
    this.timer = setInterval(() => {
      this.getTriggerLccuAlarm()
      this.listLiquidCoolData()
      this.listFireFightData()
      this.listGridMeterData()
      this.listBessMeterData()
      this.listDehumData()
      this.listSystemCtlData()
      this.listControlData()
      this.listEnergyFlowData()
    }, 2000);
    this.bus.$on('changeLanguage', (params) => {
      this.currentLang = Cookies.get('language')
      this.list = [
        {
          id: 0,
          name: this.$t('system$systemView$rtData$Overview$index_vue.lccualarm'),
          value: 'lccuAlarm'
        },
        {
          id: 1,
          name: this.$t('system$systemView$rtData$Overview$index_vue.cooling'),
          value: 'liquidCool'
        },
        {
          id: 2,
          name: this.$t('system$systemView$rtData$Overview$index_vue.fire'),
          value: 'fireFight'
        },
        {
          id: 3,
          name: this.$t('system$systemView$rtData$Overview$index_vue.metergrid'),
          value: 'gridMeter'
        },
        {
          id: 4,
          name: this.$t('system$systemView$rtData$Overview$index_vue.meterbess'),
          value: 'bessMeter'
        },
        {
          id: 5,
          name: this.$t('system$systemView$rtData$Overview$index_vue.dehumidifier'),
          value: 'bessMeter'
        }
      ]
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.computeTopLineHeight)
    console.log('销毁概览-beforeDestroy')
    clearInterval(this.timer)
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener('resize', this.computeTopLineHeight)
    console.log('销毁概览-beforeRouteLeave')
    clearInterval(this.timer)
    next()
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/layout_common.scss';
@import '@/styles/table_scrollbar.scss';


.content_box {
  width: 100%;
  height: 100%;
  display: flex;

  .box_left {
    flex: 2;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .card1 {
      flex: 1;
      overflow: hidden;
      padding: 0 10px 10px 0;

      .energyFlow {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border: 1px solid rgba(219, 218, 218, 0.5);
        box-shadow: 3px 3px 6px rgb(219, 218, 218);

        .head {
          height: 40px;
          line-height: 40px;
          text-indent: 10px;
          color: #607C2B;
          font-size: 20px;
          font-weight: 400;
          border-bottom: 2px solid rgb(219, 218, 218);
        }

        .body {
          height: calc(100% - 40px);
          padding: 0 20%;
        }

        .flowCard {
          width: 100%;
          height: 100%;
          position: relative;

          .middle {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 20%;
          }

          .top {
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            position: absolute;
            height: 25%;
          }

          .bottom {
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            position: absolute;
            height: 25%;
          }

          .left {
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            position: absolute;
            width: 20%;

          }

          .right {
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            position: absolute;
            width: 20%;
          }

          .lineRow {
            width: 20%;
            height: 5px;
            background-color: #149494;
            position: absolute;
            transform: translateY(-50%);
          }

          .lineCol {
            height: 24%;
            width: 5px;
            background-color: #149494;
            position: absolute;
            transform: translateX(-50%);
          }

          .leftLine {
            left: 20%;
            top: 50%;
          }

          .rightLine {
            right: 20%;
            top: 50%;
          }

          .topLine {
            top: 25%;
            left: 50%;
          }

          .bottomLine {
            bottom: 25%;
            left: 50%;
          }

          .dataCard {
            position: absolute;
            font-size: 14px;
            font-weight: 400;

            .dataItem {
              height: 20px;
            }

            .name {
              text-align: right;
            }
          }

          .topCard {
            right: 62%;
            top: 15%;
          }

          .bottomCard {
            left: 52%;
            bottom: 18%;
          }

          .leftCard {
            top: 52%;
            left: 15%;
          }

          .rightCard {
            bottom: 52%;
            right: 15%;
          }

          .ball {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #1ac0c0;
            position: absolute;
          }

          .leftBall {
            transform: translateY(-40%);
            left: 0;
            animation: moveLineRow 2s linear infinite;
          }

          .rightBall {
            right: 0;
            transform: translateY(-40%);
            animation: moveLineRow 2s linear infinite reverse;
          }

          .topBall {
            transform: translateX(-40%);
            animation: moveLineCol 2s linear infinite;
          }

          .bottomBall_disCharge {
            transform: translateX(-40%);
            animation: moveLineCol 2s linear infinite reverse;
          }

          .bottomBall_charge {
            transform: translateX(-40%);
            animation: moveLineCol 2s linear infinite;
          }

          @keyframes moveLineRow {
            from {
              left: 0;
            }

            to {
              left: 98%
            }
          }

          @keyframes moveLineCol {
            from {
              top: 0;
            }

            to {
              top: 98%
            }
          }
        }
      }
    }

    .card2 {
      flex: 1;
      overflow: hidden;
      padding: 0 10px 0 0;

      .tabCard {
        width: 100%;
        height: 100%;
        overflow: hidden;
        border: 1px solid rgba(219, 218, 218, 0.5);
        box-shadow: 3px 3px 6px rgb(219, 218, 218);
      }

      .tabContent {
        height: calc(100% - 30px);
        padding: 10px;

        .tableContainer {
          width: 100%;
          height: 100%;
        }
      }
    }


  }

  .box_right {
    flex: 3;
    overflow: hidden;

    .controlContainer {
      width: 100%;
      height: 100%;
      padding-left: 20px;
      overflow-y: scroll;

      .controlBtns {
        max-width: 600px;
        display: flex;
        //margin-bottom: 40px;
      }
    }
    .emsContainer{
      width: 100%;
      overflow: auto;
    }

    .pcs_command_container {
      display: flex;
      width: 100%;
      overflow: auto;

      .left {
        display: flex;


        table {
          tr {
            font-size: 14px;

            td {
              min-width: 20px;
              text-wrap: nowrap;
            }

            .pcsName {
              text-align: right;
              font-weight: 700;
              color: #606266;
            }

            .pcsValue>span:nth-of-type(1) {
              color: #3a0be6;
              margin-right: 10px;
            }

            .pcsValue>span:nth-of-type(2) {
              font-weight: 700;
              color: #606266;
              text-indent: 20px;
            }
          }
        }
      }

      .right {
        flex: 1
      }
    }
  }
}

.tab_menu {
  height: 30px;
  border-bottom: 1px solid rgba(219, 218, 218, 0.5);
  display: flex;

  .menu_item {
    min-width: 70px;
    padding: 0 10px;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    color: #929090;
  }

  .active {
    border-bottom: 2px solid #409EFF;

    a {
      color: #409EFF;
    }
  }

}

.commonTable {
  td {
    padding: 10px;
  }

  td.label {
    text-wrap: nowrap;
    text-align: right;
    font-weight: 700;
    color: #606266;
  }

  td.value {
    text-wrap: nowrap;
    color: #3a0be6;
  }

  td.selectWidth .el-select{
    width:196px
  }
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