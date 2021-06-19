<template>
  <div class="col-md-3 m-3">
    <div class="card hoverable" @click="loadBug" :title="bug.title">
      <div class="card-header">
        <div class="row">
          <div class="col-8">
            <p>
              {{ bug.title }}
            </p>
          </div>
          <div class="col-4">
            <p>
              Status:
              <span v-if="bug.closed" class="text-success">Closed</span>
              <span v-else class="text-danger">Open</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { router } from '../router'

export default {
  props: { bug: { type: Object, required: true } },
  setup(props) {
    return {
      loadBug() {
        router.push({ path: `/bugs/${props.bug.id}` })
      }
    }
  }
}
</script>

<style>
.hoverable {
  cursor: pointer;
}

</style>
