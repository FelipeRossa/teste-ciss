import { Route, Routes } from 'react-router-dom';
import './App.css'
import Funcionario from './pages/funcionarios/Funcionario';
import Home from './pages/home/Home';
import PageNotFound from './components/PageNotFound';

 const App: React.FC = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/funcionario/lista' element={<Funcionario />}></Route>
        <Route path='*' element={<PageNotFound />}></Route>
      </Routes>
    </>
  )
}

export default App;