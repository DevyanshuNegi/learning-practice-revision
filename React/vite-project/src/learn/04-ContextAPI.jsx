import React, { useState, useEffect } from 'react';

const BadAppContext = React.createContext(null);
const GoodThemeContext = React.createContext(null);
const GoodPointerContext = React.createContext(null);

function ConsumerReadout({ label, value }) {
  return (
    <div style={{ padding: '0.75rem', border: '1px solid #ddd', marginTop: '0.75rem', background: '#fff' }}>
      <strong>{label}</strong>
      <p>{value}</p>
      <p style={{ fontSize: '0.8rem', color: '#777' }}>Subscribed to its nearest Provider.</p>
    </div>
  );
}

function BadThemeConsumer() {
  const context = React.useContext(BadAppContext);
  return <ConsumerReadout label="Theme consumer" value={`Theme: ${context.theme}`} />;
}

function BadPointerConsumer() {
  const context = React.useContext(BadAppContext);
  return <ConsumerReadout label="Pointer consumer" value={`Pointer: ${context.pointer}`} />;
}

function GoodThemeConsumer() {
  const theme = React.useContext(GoodThemeContext);
  return <ConsumerReadout label="Theme consumer" value={`Theme: ${theme}`} />;
}

function GoodPointerConsumer() {
  const pointer = React.useContext(GoodPointerContext);
  return <ConsumerReadout label="Pointer consumer" value={`Pointer: ${pointer}`} />;
}

const MemoGoodThemeConsumer = React.memo(GoodThemeConsumer);
const MemoGoodPointerConsumer = React.memo(GoodPointerConsumer);

export default function ContextAPI() {
  const [badTheme, setBadTheme] = useState('light');
  const [badPointer, setBadPointer] = useState(20);
  const [goodTheme, setGoodTheme] = useState('light');
  const [goodPointer, setGoodPointer] = useState(20);
  const contextSummary = `Good context values: theme=${goodTheme}, pointer=${goodPointer}.`;

  const codeStyle = React.useMemo(
    () => ({
      display: 'block',
      whiteSpace: 'pre-wrap',
      padding: '0.75rem',
      background: '#202124',
      color: '#f8f9fa',
      borderRadius: '6px',
      fontSize: '0.8rem',
      lineHeight: 1.5,
      overflowX: 'auto',
      margin: '1rem 0',
    }),
    [],
  );

  const badContextValue = { theme: badTheme, pointer: badPointer };

  useEffect(() => {
    document.title = 'React Hooks: Context API';
  }, [goodTheme, goodPointer]);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', fontFamily: 'system-ui' }}>
      {/* SECTION 1: THE THEORY */}
      <h1 style={{ borderBottom: '2px solid #ccc' }}>Context API</h1>
      <p><strong>Definition:</strong> Context lets a Provider place a value above a subtree and lets Consumers read that value without passing it through every intermediate component. It is a dependency injection mechanism for the render tree, not a general-purpose state manager.</p>
      <p>Context solves prop drilling when many distant descendants need the same value and the intermediate components do not care about it. The tradeoff is that a changed Provider value notifies all consumers of that context, so putting rapidly changing data like mouse position, keystrokes, or animation frames into broad Context can create unnecessary render pressure.</p>

      {/* SECTION 2: THE INTERVIEW GOTCHA */}
      <div style={{ background: '#ffebee', padding: '1rem', borderLeft: '4px solid #f44336', margin: '1.5rem 0' }}>
        <h3 style={{ color: '#d32f2f', marginTop: 0 }}>🚨 The Interview Gotcha</h3>
        <p>The interviewer is usually looking for nuance: Context is excellent for auth, locale, theme, feature flags, and dependency wiring, but it is a poor default for high-frequency state changes because every subscribed consumer is part of the update fan-out.</p>
      </div>

      {/* SECTION 3: INTERACTIVE EXAMPLES */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ flex: 1, padding: '1rem', background: '#f5f5f5', border: '1px solid #ddd' }}>
          <h3>❌ The Bad Way</h3>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>This mixes unrelated values into one broad context object, so moving the pointer also invalidates consumers that only care about theme.</p>
          <pre style={codeStyle}>{`<AppContext.Provider value={{ theme, pointer }}>
  <ThemeConsumer />
  <PointerConsumer />
</AppContext.Provider>

// A pointer update changes the object identity
// and notifies every AppContext consumer.`}</pre>
          <button type="button" onClick={() => setBadTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}>Toggle theme</button>
          <label style={{ display: 'block', marginTop: '1rem' }}>
            Pointer
            <input
              type="range"
              min="0"
              max="100"
              value={badPointer}
              onChange={(event) => setBadPointer(Number(event.target.value))}
              style={{ width: '100%' }}
            />
          </label>
          <BadAppContext.Provider value={badContextValue}>
            <BadThemeConsumer />
            <BadPointerConsumer />
          </BadAppContext.Provider>
        </div>
        <div style={{ flex: 1, padding: '1rem', background: '#e8f5e9', border: '1px solid #c8e6c9' }}>
          <h3>✅ The Good Way</h3>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>Use Context for values with the right sharing scope, split unrelated contexts, and keep high-churn state local or in a subscription-based store.</p>
          <pre style={codeStyle}>{`<ThemeContext.Provider value={theme}>
  <ThemeConsumer />
</ThemeContext.Provider>

<PointerContext.Provider value={pointer}>
  <PointerConsumer />
</PointerContext.Provider>`}</pre>
          <button type="button" onClick={() => setGoodTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}>Toggle theme</button>
          <label style={{ display: 'block', marginTop: '1rem' }}>
            Pointer
            <input
              type="range"
              min="0"
              max="100"
              value={goodPointer}
              onChange={(event) => setGoodPointer(Number(event.target.value))}
              style={{ width: '100%' }}
            />
          </label>
          <GoodThemeContext.Provider value={goodTheme}>
            <MemoGoodThemeConsumer />
          </GoodThemeContext.Provider>
          <GoodPointerContext.Provider value={goodPointer}>
            <MemoGoodPointerConsumer />
          </GoodPointerContext.Provider>
          <p style={{ fontSize: '0.8rem', color: '#2e7d32', marginTop: '1rem' }}>{contextSummary}</p>
        </div>
      </div>
    </div>
  );
}
