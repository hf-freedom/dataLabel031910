import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface TagView {
  name: string
  title: string
  path: string
}

export const useTagsViewStore = defineStore('tagsView', () => {
  const visitedViews = ref<TagView[]>([])
  const cachedViews = ref<string[]>([])

  const addView = (view: TagView) => {
    if (visitedViews.value.some(v => v.path === view.path)) return
    visitedViews.value.push(view)
  }

  const delView = (view: TagView) => {
    const index = visitedViews.value.findIndex(v => v.path === view.path)
    if (index > -1) {
      visitedViews.value.splice(index, 1)
    }
  }

  const delOthersViews = (view: TagView) => {
    visitedViews.value = visitedViews.value.filter(v => v.path === view.path)
  }

  const delAllViews = () => {
    visitedViews.value = []
    cachedViews.value = []
  }

  const addCachedView = (name: string) => {
    if (cachedViews.value.includes(name)) return
    cachedViews.value.push(name)
  }

  const delCachedView = (name: string) => {
    const index = cachedViews.value.indexOf(name)
    if (index > -1) {
      cachedViews.value.splice(index, 1)
    }
  }

  return {
    visitedViews,
    cachedViews,
    addView,
    delView,
    delOthersViews,
    delAllViews,
    addCachedView,
    delCachedView
  }
})
