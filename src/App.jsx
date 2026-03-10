import CoffeeForm from './components/CoffeeForm'
import Layout from './components/Layout'
import Stats from './components/Stats'
import History from './components/History'
import Hero from './components/Hero'
import { useAuth } from './context/AuthContext'

function App() {
  const { globalUser, isLoading, globalData } = useAuth()
  const isAuthenticated = globalUser
  const isData = globalData && !!Object.keys(globalData || {}).length
  const authenticatedContent = (
    <>
      <Stats />
      <History />
    </>
  )

  return (
    <Layout>
      <Hero />
      <CoffeeForm isAuthenticated={isAuthenticated} />
      {(isAuthenticated && isLoading) && (
        <p className="text-center">Loading...</p>
      )}
      {(isAuthenticated && isData) && authenticatedContent}
    </Layout>
  )
}

export default App
