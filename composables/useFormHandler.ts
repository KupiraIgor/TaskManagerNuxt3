import { ref, onMounted, onBeforeUnmount } from 'vue'

export const useFormHandler = (callback: () => void) => {
  const inputEl = ref<HTMLInputElement | null>(null)
  const wrapEl = ref<HTMLDivElement | null>(null)
  const isShowForm = ref(false)
  const inputData = ref('')

  const onShowForm = () => {
    isShowForm.value = !isShowForm.value

    setTimeout(() => {
      if (isShowForm.value) {
        inputEl.value?.focus()
      }
    }, 0)
  }

  const submitOnEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      callback()
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    if (e && wrapEl.value && !wrapEl.value.contains(e.target as Node)) {
      isShowForm.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClickOutside)
  })

  return {
    inputEl,
    wrapEl,
    isShowForm,
    inputData,
    onShowForm,
    submitOnEnter,
  }
}
