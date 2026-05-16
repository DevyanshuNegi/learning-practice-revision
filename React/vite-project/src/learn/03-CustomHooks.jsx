import React, { useState, useEffect } from 'react';

const sharedToggleStore = { enabled: false };

function useBadSharedToggle() {
  const [, forceRender] = useState(0);

  function toggle() {
    sharedToggleStore.enabled = !sharedToggleStore.enabled;
    forceRender((prev) => prev + 1);
  }

  return [sharedToggleStore.enabled, toggle];
}

function useIsolatedToggle(initialValue = false) {
  const [enabled, setEnabled] = useState(initialValue);

  function toggle() {
    setEnabled((prev) => !prev);
  }

  return { enabled, toggle };
}

export default function CustomHooks() {
  const [badAEnabled, toggleBadA] = useBadSharedToggle();
  const [badBEnabled, toggleBadB] = useBadSharedToggle();
  const goodA = useIsolatedToggle(false);
  const goodB = useIsolatedToggle(true);
  const goodSummary = `Good instances: A=${goodA.enabled ? 'on' : 'off'}, B=${goodB.enabled ? 'on' : 'off'}.`;

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

  useEffect(() => {
    document.title = 'React Hooks: Custom Hooks';
  }, [goodA.enabled, goodB.enabled]);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', fontFamily: 'system-ui' }}>
      {/* SECTION 1: THE THEORY */}
      <h1 style={{ borderBottom: '2px solid #ccc' }}>Custom Hooks</h1>
      <p><strong>Definition:</strong> A custom hook is a function that composes React hooks into reusable behavior while preserving React's per-component hook state model. It shares logic, not state, unless you deliberately connect it to shared storage.</p>
      <p>Use a custom hook when a component has accumulated state transitions, effects, subscriptions, or derived behavior that form a reusable unit. The extraction should make the component simpler without hiding ownership; every call to the hook gets an isolated set of hook cells in the caller's render tree.</p>

      {/* SECTION 2: THE INTERVIEW GOTCHA */}
      <div style={{ background: '#ffebee', padding: '1rem', borderLeft: '4px solid #f44336', margin: '1.5rem 0' }}>
        <h3 style={{ color: '#d32f2f', marginTop: 0 }}>🚨 The Interview Gotcha</h3>
        <p>The common mistake is describing custom hooks as state sharing. If two components call `useSomething()`, they do not share state; they share the implementation. Shared state requires lifting state, Context, an external store, or an intentional module-level singleton.</p>
      </div>

      {/* SECTION 3: INTERACTIVE EXAMPLES */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ flex: 1, padding: '1rem', background: '#f5f5f5', border: '1px solid #ddd' }}>
          <h3>❌ The Bad Way</h3>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>This hides state in a module-level object, so every hook call is coupled to the same mutable store.</p>
          <pre style={codeStyle}>{`const shared = { enabled: false };

function useToggle() {
  const [, force] = useState(0);
  return [
    shared.enabled,
    () => {
      shared.enabled = !shared.enabled;
      force((n) => n + 1);
    },
  ];
}`}</pre>
          <p>Panel A: <strong>{badAEnabled ? 'on' : 'off'}</strong></p>
          <button type="button" onClick={toggleBadA}>Toggle bad A</button>
          <p style={{ marginTop: '1rem' }}>Panel B: <strong>{badBEnabled ? 'on' : 'off'}</strong></p>
          <button type="button" onClick={toggleBadB}>Toggle bad B</button>
        </div>
        <div style={{ flex: 1, padding: '1rem', background: '#e8f5e9', border: '1px solid #c8e6c9' }}>
          <h3>✅ The Good Way</h3>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>The hook owns behavior, and React allocates isolated state for each call site.</p>
          <pre style={codeStyle}>{`function useToggle(initialValue = false) {
  const [enabled, setEnabled] = useState(initialValue);

  return {
    enabled,
    toggle: () => setEnabled((prev) => !prev),
  };
}`}</pre>
          <p>Panel A: <strong>{goodA.enabled ? 'on' : 'off'}</strong></p>
          <button type="button" onClick={goodA.toggle}>Toggle good A</button>
          <p style={{ marginTop: '1rem' }}>Panel B: <strong>{goodB.enabled ? 'on' : 'off'}</strong></p>
          <button type="button" onClick={goodB.toggle}>Toggle good B</button>
          <p style={{ fontSize: '0.8rem', color: '#2e7d32', marginTop: '1rem' }}>{goodSummary}</p>
        </div>
      </div>
    </div>
  );
}
