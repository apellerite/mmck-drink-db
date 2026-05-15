import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/utils/supabase'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(null)

  async function getCurrentUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    currentUser.value = user
  }

  async function loginUser(credentials) {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (error) {
      console.log('Error retrieving user:', error)
    } else {
      currentUser.value = user
    }
  }

  async function logoutUser() {
    await supabase.auth.signOut()
    currentUser.value = null
  }

  return {
    currentUser,
    getCurrentUser,
    loginUser,
    logoutUser,
  }
})
