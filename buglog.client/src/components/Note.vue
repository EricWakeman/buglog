<template>
  <div class="row">
    <div class="col-12">
      <div class="card m-2 shadow">
        <div class="card-header justify-content-between d-flex">
          <img :src="note.creator.picture" :alt="note.creator.name" class="user-image">
          <p>{{ note.creator.name }}</p>
          <i class="mdi mdi-trash-can-outline hoverable cancan" title="delete note" @click="deleteNote" v-if="account.id == note.creatorId" height="50"></i>
        </div>
        <div class="card-body">
          <p>{{ note.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import Notification from '../utils/Notification'
export default {
  props: { note: { type: Object, required: true } },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deleteNote() {
        try {
          if (await Notification.confirmAction()) {
            await notesService.deleteNote(props.note.id)
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
.hoverable{
  cursor: pointer;
}
.cancan{
  font-size: 45px;

}

</style>
