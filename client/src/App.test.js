import { render } from '@testing-library/react';
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import About from "./components/About/About";
import Help from "./components/Help/Help";

describe('Base Pages/Component Testing', () => {
    test('renders Header', () => {
        render(<Header/>)
    })
    test('renders Home', () => {
        render(<Home/>)
    })
    test('renders Footer', () => {
        render(<Footer/>)
    })
    test('renders About', () => {
        render(<About/>)
    })
    test('renders About', () => {
        render(<Help/>)
    })
})