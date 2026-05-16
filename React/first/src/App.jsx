
import './App.css'

import Counter from './component/Counter.jsx';
import Props from './component/Props.jsx';
import EffectDemo from './component/EffectDemo.jsx';
import {themeContext, ThemeProvider} from './component/Context.jsx';


function navBar() {
  const [theme, setTheme] = useContext(themeContext);

  console.log("theme is ", theme);
}


function App() {



  return (



    <>
      <ThemeProvider>


        <h1>React App</h1>
        
        <Counter />

        <Props />

        <EffectDemo />


        {navBar}
      </ThemeProvider>
    </>
  )
}

export default App
