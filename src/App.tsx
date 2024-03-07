import { Main } from 'components/layout'
import { baseName } from 'config/router'
import { AddCitizen, Home } from 'pages'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Main>
        <Routes>
          <Route path={`${baseName}/`} element={<Home />} />
          <Route path={`${baseName}/add-citizen`} element={<AddCitizen />} />
        </Routes>
      </Main>
    </Router>
  )
}
