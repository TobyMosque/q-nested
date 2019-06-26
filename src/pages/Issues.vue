<template>
  <q-page class="flex">
    <q-splitter v-model="splitterModel" :limits.sync="limits" :details="details" class="full-width" >
      <template v-slot:before>
        <div class="q-pa-md">
          <q-btn color="positive" class="full-width" label="Create Issue" :to="'/issues/create/'" />
        </div>
      </template>
      <template v-slot:after>
        <router-view />
      </template>
    </q-splitter>
  </q-page>
</template>

<style>
</style>

<script>
import Issues from '../models/issues'
import issuesStore from '../store/issues'
import { mapModelToStates } from '../utils/mapper'
const module = 'issues'

export default {
  name: 'PageIndex',
  preFetch ({ store }) {
    store.registerModule(module, issuesStore)
    return store.dispatch(`${module}/initialize`)
  },
  data () {
    return {
      splitterModel: 30,
      limits: [10, 90]
    }
  },
  mounted () {
    this.$store.registerModule(module, issuesStore, { preserveState: true })
  },
  destroyed () {
    this.$store.unregisterModule(module)
  },
  computed: {
    ...mapModelToStates(module, Issues),
    details () {
      return !!this.$route.params.id
    }
  }
}
</script>
