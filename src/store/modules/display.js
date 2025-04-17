const state = {
  displayTitle:'',
  displayPlace:'',
  displayType:'',
  orgId:'',
  projectId:'',
  addDisplayLCCUDTOList:[],
  expressionValueList:[],
};

const mutations = {
  setDisplayData: (state, data) => {
    state.displayTitle = data.displayTitle
    state.displayPlace = data.displayPlace
    state.displayType = data.displayType
    state.orgId = data.orgId
    state.projectId = data.projectId
    state.addDisplayLCCUDTOList = data.addDisplayLCCUDTOList
    state.expressionValueList = data.expressionValueList
  }
};

const actions = {
  receiveDisplayData({ commit }, data) {
    return new Promise((resolve,reject)=>{
      commit("setDisplayData", data);
      resolve()
    })
   
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};