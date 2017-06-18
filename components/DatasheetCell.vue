<template>
  <div @click="showComponent"
    ref="cell"
    class="datasheet-cell" tabindex="1">

    <a href="#" @focus="showComponent" class="mock-focusable"
        @click.prevent="1 == 0"
        :tabindex="isEditing ? -1 : 0">
      <slot>
        {{ value }}
      </slot>
    </a>

    <template v-if="isEditing">
      <slot name="editor">
        <AutogrowTextarea
          :value="value"
          @input="$emit('input', $event)"
          class="the-editor"
          />
          <!-- @blur.native="commit(edit)" -->
      </slot>
    </template>
  </div>
</template>
<style lang="scss">
.mock-focusable {
  text-decoration: none;
  color: #000;
}
.datasheet-cell {
  position: relative;
}
.the-editor {
  position: absolute;
  top: 0;
  min-height: 100%;
  left: 0;
  width: 100%;
}
</style>
<script>
import _ from 'lodash'

export default {
  props: {
    value: {},
    component: {
      type: String,
      default: 'AutogrowTextarea'
    }
  },
  data () {
    return {
      edit: false,
      isEditing: false,
      editorStyle: null
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (v) {
        this.edit = v
      }
    }
  },
  components: {
    AutogrowTextarea: require('~/components/AutogrowTextarea.vue')
  },
  methods: {
    showComponent (field, value) {
      this.isEditing = true
      this.$nextTick(() => {
        const child = _.get(this.$children, '0.$el')

        child.focus()
        child.select()
        child.addEventListener('blur', () => {
          this.commit()
        })
      })
    },
    commit (v) {
      this.isEditing = false
    }
  }
}
</script>
