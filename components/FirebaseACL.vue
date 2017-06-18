<template>
<div>
  <h3>This calendar is shared with:</h3>
  <div v-for="email in emails">
    {{email.email}}
    <span v-if="iHaveAdmin">{{email.permissions}}</span>
    <a href="#" @click.prevented="remove(email)" v-if="iHaveAdmin">Remove</a>
  </div>
  <div v-if="iHaveAdmin">
    <hr/>
    Add another user:
    <input type="email" v-model="email" placeholder="john@example.com"/>
    <input type="email" v-model="permissions" placeholder="read,write,admin"/>
    <a href="#" @click.prevented="add(email)">Add</a>
  </div>
</div>
</template>

<script>
import * as firebase from 'firebase'
import _ from 'lodash'

export default {
  props: ['store'],
  data () {
    return {
      email: '',
      permissions: '',
      emails: [],
    }
  },
  computed: {
    fbResource () {
      if (!process.BROWSER_BUILD) return null

      return firebase.database().ref(this.store)
    },
    iHaveAdmin () {
      return this.emails.length === 0 ||
        this.emails.find(e => e.email === firebase.auth().currentUser.email &&
          e.permissions.indexOf('admin') !== -1)
    }
  },
  watch: {
    fbResource: {
      immediate: true,
      handler (res, oldRes) {
        if (oldRes) oldRes.off()

        if (!res) return

        res.on('value', (r) => {
          const acls = r.val()

          this.emails = _(acls)
            .toPairs()
            .map(([encEmail, v]) => ({
              email: decodeURIComponent(encEmail),
              permissions: v
            }))
            .value()
        })
      }
    }
  },
  destroyed () {
    if (this.fbResource) this.fbResource.off()
  },
  methods: {
    remove (em) {
      this.fbResource.child(em.replace(/\./g, '%2E')).remove()
    },
    add (em) {
      this.fbResource.update({
        [em.replace(/\./g, '%2E')]: this.permissions
      })
      .then(() => {
        this.email = ''
        this.permissions = ''
      })
    },
  }
}
</script>
