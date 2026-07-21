import { createContext, useContext, useReducer } from 'react'

const AppContext = createContext(null)

const initialState = {
  user: null,
  repositories: [],
  jobs: [],
  currentJob: null,
  isLoading: false,
  error: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'SET_REPOSITORIES':
      return { ...state, repositories: action.payload }
    case 'SET_JOBS':
      return { ...state, jobs: action.payload }
    case 'SET_CURRENT_JOB':
      return { ...state, currentJob: action.payload }
    case 'UPDATE_JOB':
      return {
        ...state,
        jobs: state.jobs.map(j => j.id === action.payload.id ? { ...j, ...action.payload } : j),
        currentJob: state.currentJob?.id === action.payload.id ? { ...state.currentJob, ...action.payload } : state.currentJob,
      }
    case 'ADD_JOB':
      return { ...state, jobs: [action.payload, ...state.jobs] }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error('useApp must be used within AppProvider')
  return context
}
