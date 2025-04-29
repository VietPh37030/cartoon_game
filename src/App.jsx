import React, {useState} from 'react'
import Hero from "./component/Hero.jsx";
import About from "./component/About.jsx";
import Navbar from "./component/Navbar.jsx";
import Features from "./component/Features.jsx";
import Story from "./component/Story.jsx";
import Contact from "./component/Contact.jsx";
import Footer from "./component/Footer.jsx";
import Market from "./component/Market.jsx";

const App = () => {
    const [walletInfo, setWalletInfo] = useState({ provider: null, signer: null, address: null });
    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden bg-zinc-50">
            <Navbar setWalletInfo={setWalletInfo} />
            <Hero/>
            <About/>
            <Features/>
            {/*<Market/>*/}
            <Story/>
            <Contact/>
            <Footer/>
        </main>
    )
}
export default App
