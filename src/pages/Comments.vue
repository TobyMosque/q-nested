<template>
  <div class="q-pa-md">
    <q-btn color="positive" class="full-width" label="Close" :to="`/issues/${issueId}/`" />
  </div>
</template>

<style>
</style>

<script>
import Comments from '../models/comments'
import commentsStore from '../store/comments'
import { mapModelToStates } from '../utils/mapper'
const module = 'comments'

export default {
  name: 'PageIndex',
  preFetch ({ store, currentRoute }) {
    store.registerModule(module, commentsStore)
    console.log(currentRoute.params.id)
    return store.dispatch(`${module}/initialize`, currentRoute.params.id)
  },
  mounted () {
    this.$store.registerModule(module, commentsStore, { preserveState: true })
  },
  destroyed () {
    this.$store.unregisterModule(module)
  },
  computed: {
    ...mapModelToStates(module, Comments)
  }
}
</script>
