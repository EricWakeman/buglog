<template>
  <div class="col-lg-3 m-3">
    <div class="card hoverable shadow" @click="loadBug" :title="bug.title">
      <div class="card-header">
        <div class="row">
          <div class="col-8">
            <p class="bug-title">
              {{ bug.title }}
            </p>
            <p>
              Last Updated: {{ bugTime[0] }}
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
    const bugTime = props.bug.updatedAt.split('T')
    return {
      bugTime,
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
.bug-title{
  font-size: 30px;
}

</style>
