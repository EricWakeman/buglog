<template>
  <div class="col-12">
    <button class="btn btn-warning m-2" @click="showBugForm = !showBugForm" title="Show Bug Report Form" v-if="user.isAuthenticated">
      Report Bug
    </button>
    <div class="card w-100">
      <form @submit.prevent="createBug" v-if="showBugForm">
        <div class="card-header">
          <input type="text"
                 placeholder="Title the bug"
                 v-model="newBug.title"
                 required
                 minlength="4"
                 class="form-control"
          >
        </div>
        <div class="card-body">
          <textarea name="Bug Description"
                    id="bug-description"
                    cols="30"
                    rows="10"
                    placeholder="Describe the bug in detail.."
                    v-model="newBug.description"
                    required
                    minlength="4"
                    class="form-control"
          ></textarea>
        </div>
        <button class="btn btn-sm btn-primary m-1" type="submit" title="Submit Report">
          Submit Report
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import Notification from '../utils/Notification'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
export default {
  setup() {
    const showBugForm = ref(false)
    const newBug = ref({})
    return {
      newBug,
      showBugForm,
      user: computed(() => AppState.user),
      async createBug() {
        try {
          await bugsService.createBug(newBug.value)
          newBug.value = {}
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style>

</style>
