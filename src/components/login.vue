<template>
  <div></div>
</template>

<script>
  import { mapActions } from 'vuex'
  import {loadData, defaultPreHandler} from '../common/utils'
  import _ from 'lodash'
  import api from '../api/index2'

  export default {
    name: 'login',
    async created () {
      let personId = this.$store.state.person.personId
      if (personId) {
        let dimension2 = window.localStorage.getItem('dimension2')
        let dimension1 = window.localStorage.getItem('dimension1')
        if (!dimension2 || !dimension1) {
          await loadData(() => { return this.loadProject(personId) })
          this.setGaDimension()
        }
        this.$ga.set('userId', personId)
        this.$router.push({
          path: '/home'
        })
      }
    },
    methods: {
      ...mapActions(['getOrganizationInfo']),
      async loadProject (personId) {
        try {
          await this.getOrganizationInfo(personId)
          let organization = this.$store.state.person.orgInfo[0]
          if (organization) {
            let find = _.find(this.$store.state.project, {organizationId: organization.organizationId})
            if (!find) {
              await loadData(() => {
                return api.getProjects(organization.organizationId)
              }, response => {
                let param = {
                  partnerId: organization.partnerId,
                  organizationId: organization.organizationId,
                  response,
                  organizationNamePath: organization.organizationNamePath,
                  positionType: organization.positionType,
                  organizationName: organization.organizationName
                }
                this.$store.commit('setProject', param)
              }, defaultPreHandler, true)
            }
          }
        } catch (error) {
          console.error(error)
        }
      },
      setGaDimension () {
        try {
          let organization = this.$store.state.person.orgInfo[0]
          if (organization.organizationNamePath) {
            let namePath
            let index = organization.organizationNamePath.indexOf('/')
            if (index !== -1) {
              namePath = organization.organizationNamePath.slice(0, index)
            } else {
              namePath = organization.organizationName
            }
            this.$ga.set('dimension2', namePath)
            localStorage.setItem('dimension2', namePath)
          }
          let project = _.find(this.$store.state.project, { organizationId: organization.organizationId })
          if (project) {
            if (project.projectList.length > 0) {
              this.$ga.set('dimension1', project.projectList[0].projectName)
              localStorage.setItem('dimension1', project.projectList[0].projectName)
            }
          }
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
</script>
