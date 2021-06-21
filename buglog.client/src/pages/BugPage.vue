<template>
  <div class="container-fluid">
    <div class="row" v-if="activeBug">
      <div class="col-12">
        <div class="card m-2 shadow">
          <div class="card-header">
            <div class="row">
              <div class="col-8">
                <h1>
                  {{ activeBug.title }}
                </h1>
                <h3>
                  {{ activeBug.creator.name }}
                </h3>
                <h5>
                  Bug status:
                  <span v-if="!activeBug.closed" class="text-danger">
                    Open
                  </span>
                  <span v-else class="text-success">
                    Closed
                  </span>
                </h5>
              </div>
              <div class="col-4 align-items-center d-flex">
                <button class="btn btn-lg btn-warning" v-if="activeBug.creatorId === account.id && !activeBug.closed" @click="closeBug">
                  Close Bug
                </button>
              </div>
            </div>
          </div>
          <div class="card-body">
            {{ activeBug.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-if="activeBug">
      <div class="col-12" v-if="user.isAuthenticated && !activeBug.closed">
        <form @submit.prevent="createNote" class="card m-2">
          <div class="card-header">
            <img :src="user.picture" :alt="user.picture" class="user-image">
            <p>
              {{ user.name }}
            </p>
          </div>
          <div class="card-body align-items-center d-flex">
            <textarea name="Note"
                      id="note-title"
                      cols="50"
                      rows="3"
                      placeholder="Add your thoughts..."
                      v-model="state.newNote.body"
                      class="form-control"
            ></textarea>
            <button class="btn btn-primary mx-2" type="submint" title="submit note">
              Submit Note
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="row" v-if="notes.length > 0">
      <div class="col-12">
        <Note v-for="note in notes" :key="note.id" :note="note" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import Notification from '../utils/Notification'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'

export default {
  setup() {
    const route = useRoute()
    const state = reactive({
      newNote: { }
    })
    onMounted(async() => {
      try {
        await bugsService.getBugAndNotes(route.params.id)
      } catch (error) {
        Notification.toast(error, 'error')
      }
    })
    return {
      state,
      activeBug: computed(() => AppState.activeBug),
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      notes: computed(() => AppState.notes),
      async createNote() {
        state.newNote.bug = AppState.activeBug.id
        try {
          await notesService.createNote(state.newNote)
          state.newNote.body = ''
        } catch (error) {
          Notification.toast(error, 'error')
        }
      },
      async closeBug() {
        try {
          if (await Notification.confirmAction()) {
            await bugsService.closeBug(AppState.activeBug.id)
          }
        } catch (error) {
          Notification.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style>
.user-image{
  height: 50px;
}
</style>
