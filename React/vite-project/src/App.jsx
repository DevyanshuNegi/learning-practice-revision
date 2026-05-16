import { useState, useContext } from 'react';
import StateBatching from './learn/01-StateBatching.jsx';
import EffectLifecycle from './learn/02-EffectLifecycle.jsx';
import CustomHooks from './learn/03-CustomHooks.jsx';
import ContextAPI from './learn/04-ContextAPI.jsx';
import LiveSearchChallenge from './practice/LiveSearchChallenge.jsx';
import ContextChallenge from './practice/ContextChallenge.jsx';
import { ThemeContext } from './practice/ThemeContext.jsx';


function App() {
  const { theme, setTheme } = useContext(ThemeContext);


  function handleThemeChange () {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }



  const sections = [
    {
      title: 'Learn',
      links: [
        { id: 'state-batching', label: 'State Batching', component: StateBatching },
        { id: 'effect-lifecycle', label: 'Effect Lifecycle', component: EffectLifecycle },
        { id: 'custom-hooks', label: 'Custom Hooks', component: CustomHooks },
        { id: 'context-api', label: 'Context API', component: ContextAPI },
      ],
    },
    {
      title: 'Practice',
      links: [
        { id: 'live-search', label: 'Live Search Challenge', component: LiveSearchChallenge },
        { id: 'context-challenge', label: 'Context Challenge', component: ContextChallenge },
      ],
    },
  ];

  const allLinks = sections.flatMap((section) => section.links);
  const [activeId, setActiveId] = useState(allLinks[0].id);
  const ActiveComponent = allLinks.find((link) => link.id === activeId)?.component ?? StateBatching;

  const sidebarWidth = 260;

  return (

    // theme context provider

      <div style={{ minHeight: '100vh', color: theme === 'dark' ? '#f9fafb' : '#1f2937', textAlign: 'left' }}>
        <aside
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            width: `${sidebarWidth}px`,
            boxSizing: 'border-box',
            padding: '1.5rem',
            background: '#111827',
            color: '#f9fafb',
            overflowY: 'auto',
          }}
        >
          <h2 style={{ margin: '0 0 0.25rem', color: '#f9fafb' }}>React Sandbox</h2>
          <p style={{ margin: '0 0 1.5rem', color: '#9ca3af', fontSize: '0.9rem' }}>
            Interview prep workspace
          </p>

          <nav>
            {sections.map((section) => (
              <div key={section.title} style={{ marginBottom: '1.5rem' }}>
                <h3
                  style={{
                    margin: '0 0 0.5rem',
                    color: '#9ca3af',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {section.title}
                </h3>
                {section.links.map((link) => {
                  const isActive = link.id === activeId;

                  return (
                    <button
                      key={link.id}
                      type="button"
                      onClick={() => setActiveId(link.id)}
                      style={{
                        display: 'block',
                        width: '100%',
                        margin: '0.35rem 0',
                        padding: '0.75rem',
                        border: '1px solid',
                        borderColor: isActive ? '#60a5fa' : '#374151',
                        borderRadius: '6px',
                        background: isActive ? '#1d4ed8' : 'transparent',
                        color: '#f9fafb',
                        textAlign: 'left',
                        cursor: 'pointer',
                        font: 'inherit',
                      }}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>
            ))}

            <button onClick={handleThemeChange}>
              Change Theme ({theme})
            </button>
          </nav>
        </aside>

        <main
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: `${sidebarWidth}px`,
            overflowY: 'auto',
            background: theme === 'dark' ? '#111827' : '#ffffff',
          }}
        >
          <ActiveComponent />
        </main>
      </div>

  );
}

export default App;
