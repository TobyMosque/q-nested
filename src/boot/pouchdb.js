// import something here
import PouchDB from 'pouchdb'

const db = new PouchDB('issues')

// "async" is optional
export default async ({ Vue }) => {
  Vue.prototype.$db = db
}

export { db }
