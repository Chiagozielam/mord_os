import { useMemoryContext } from './memory/memory.context'
import { useAuthContext } from './auth/auth.context'
import { useAccountContext } from './account/acount.context'

export const useGeneralContext = () => {
  const memoryContext = useMemoryContext()
  const authContext = useAuthContext()
  const accountContext = useAccountContext()

  return {
    ...memoryContext,
    ...authContext,
    ...accountContext
  }
}
