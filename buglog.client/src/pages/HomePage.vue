<template>
  <div class="container-fluid  align-items-start dynamic-flex">
    <div class="row">
      <CreateBug />
      <div class="col-12 mt-5">
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
          >
            Sort Bugs
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item hoverable" @click="sortMostRecent" title="sort Open First">Most Recent</a>
            <a class="dropdown-item hoverable" @click="sortOpenFirst" title="sort Open First">Open First</a>
            <a class="dropdown-item hoverable" @click="sortClosedFirst" title="sort Closed First">Closed First</a>
            <a class="dropdown-item hoverable" @click="filterOpenOnly" title="filter Open Only">Only Open</a>
            <a class="dropdown-item hoverable" @click="filterClosedOnly" title="filter Closed Only">Only Closed</a>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <Bug v-for="bug in bugs" :key="bug.id" :bug="bug" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import Notification from '../utils/Notification'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
      } catch (error) {
        Notification.toast(error.message, 'error')
      }
    })
    return {
      bugs: computed(() => AppState.sortedBugs),
      sortMostRecent() {
        bugsService.sortMostRecent()
      },
      sortOpenFirst() {
        bugsService.sortOpenFirst()
      },
      sortClosedFirst() {
        bugsService.sortClosedFirst()
      },
      filterOpenOnly() {
        bugsService.filterOpenOnly()
      },
      filterClosedOnly() {
        bugsService.filterClosedOnly()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
.hoverable{
  cursor: pointer;
}
.dynamic-flex{
  @media screen and (min-width: 1236px) {
    display: flex;
  }
}
</style>
