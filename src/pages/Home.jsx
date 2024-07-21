import { useState, useEffect } from 'react'
import styled from 'styled-components'

//components
import CardContainer from '../components/CardContainer'
import BannerSlider from '../components/BannerSlider'
import Loader from '../components/Loader'

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #1c1e22;
  gap: 20px;

  @media screen and (max-width: 479px) {
    
  }

`


function Home() {
  const [home, setHome] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://luffy-server-production.up.railway.app/home")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setHome(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <Container>
      <BannerSlider />
      {loading ? (
        <Loader height="50vh" width="100vw" type={"mutatingDots"} bgcolor={"#1C1E22"}/>
      ) : error ? (
        <h1>Error: {error}</h1>
      ) : (
        <>
          <CardContainer data={home.trendingMovies}  title = "Trending Movies" comingSoon={false} home={true}/>
          <CardContainer data={home.trendingSeries}  title = "Trending Shows" comingSoon={false} home={true}/>
          <CardContainer data={home.latestMovies}  title = "Latest Movies" comingSoon={false} home={true}/>
          <CardContainer data={home.latestSeries}  title = "Latest Series" comingSoon={false} home={true}/>
        </>
      )}
    </Container>
  )
}

export default Home
