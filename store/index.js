export const state = () => ({
  activeNavItem     : '',
  activeTeamTab     : 'leadership',
  activeFootprintTab: ''
})

export const mutations = {
  updateNavItem: (state, payload) => {
    state.activeNavItem = payload
  },

  updateTeamTab: (state, payload) => {
    state.activeTeamTab = payload
  },

  updateFootprintTab: (state, payload) => {
    state.activeFootprintTab = payload
  },
}
