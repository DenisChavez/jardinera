import { Footer } from "./layouts/Footer"
import { Header } from "./layouts/Header"
import { Contact } from "./sections/Contact"
import { Eslogan } from "./sections/Eslogan"
import { Hero } from "./sections/Hero"
import { Products } from "./sections/Products"

function App() {
  return (
    <>
      <Header />
      <Hero />
      <Eslogan />
      <Products />
      <Contact />
      <Footer />
    </>
  )
}

export default App
