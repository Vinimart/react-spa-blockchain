import { Main } from 'components/layout'
import { AddCitizen, Home } from 'pages'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="add-citizen" element={<AddCitizen />} />
        </Routes>
      </Main>
    </Router>
  )
}
