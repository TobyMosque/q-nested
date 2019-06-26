<template>
  <q-splitter v-model="splitterModel" horizontal :limits.sync="limits" :details="details" class="full-width" >
    <template v-slot:before>
      <div class="q-pa-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">{{pageTitle}}</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="row q-col-gutter-y-md full-width">
            <q-input type="text" class="full-width" outlined v-model="title" label="Title" />
            <q-input type="textarea" class="full-width" outlined v-model="description" label="Description" />
          </q-card-section>
          <q-separator />
          <q-card-actions class="row q-col-gutter-xs full-width">
            <div class="col-12">
              <q-btn color="positive" class="full-width" label="Comments" :to="`/issues/${id}/comments`" />
            </div>
            <div class="col-6">
              <q-btn color="secondary" class="full-width" label="Return" :to="'/issues/'" />
            </div>
            <div class="col-6">
              <q-btn color="primary" class="full-width" :label="actionName" @click="__save" />
            </div>
          </q-card-actions>
        </q-card>
      </div>
    </template>
    <template v-slot:after>
      <router-view />
    </template>
  </q-splitter>
</template>

<style>
</style>

<script>
import Issue from '../models/issue'
import issueStore from '../store/issue'
import { mapModelToStates } from '../utils/mapper'
import { mapActions } from 'vuex'
const module = 'issue'

export default {
  name: 'PageIndex',
  preFetch ({ store, currentRoute }) {
    store.registerModule(module, issueStore)
    return store.dispatch(`${module}/initialize`, currentRoute.params.id)
  },
  data () {
    return {
      splitterModel: 60,
      limits: [10, 90]
    }
  },
  mounted () {
    this.$store.registerModule(module, issueStore, { preserveState: true })
  },
  destroyed () {
    this.$store.unregisterModule(module)
  },
  computed: {
    ...mapModelToStates(module, Issue),
    pageTitle () {
      return this.id === 'create' ? 'Create Issue' : 'Edit Issue'
    },
    actionName () {
      return this.id === 'create' ? 'Create' : 'Save'
    },
    details () {
      return !this.$route.path.endsWith(this.id + '/')
    }
  },
  methods: {
    ...mapActions(module, ['save']),
    async __save () {
      await this.save()
      this.$router.push('/issues/')
    }
  }
}
</script>
