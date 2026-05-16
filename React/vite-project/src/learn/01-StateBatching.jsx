import React, { useState, useEffect } from 'react';

export default function StateBatching() {
  const [badCount, setBadCount] = useState(0);
  const [goodCount, setGoodCount] = useState(0);
  const [badItems, setBadItems] = useState(['alpha', 'beta']);
  const [goodItems, setGoodItems] = useState(['alpha', 'beta']);
  const [badRenderTick, setBadRenderTick] = useState(0);
  const renderSummary = `Latest committed counts: bad=${badCount}, good=${goodCount}`;

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
    document.title = `React State: ${goodCount}`;
  }, [badCount, goodCount]);

  function runBadTripleIncrement() {
    setBadCount(badCount + 1);
    setBadCount(badCount + 1);
    setBadCount(badCount + 1);
  }

  function runGoodTripleIncrement() {
    setGoodCount((prev) => prev + 1);
    setGoodCount((prev) => prev + 1);
    setGoodCount((prev) => prev + 1);
  }

  function mutateBadArray() {
    badItems.push(`item-${badItems.length + 1}`);
    setBadItems(badItems);
  }

  function appendGoodArray() {
    setGoodItems((prev) => [...prev, `item-${prev.length + 1}`]);
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', fontFamily: 'system-ui' }}>
      {/* SECTION 1: THE THEORY */}
      <h1 style={{ borderBottom: '2px solid #ccc' }}>State Batching and Immutability</h1>
      <p><strong>Definition:</strong> React state is a render-time snapshot, and a state setter enqueues work for React to reconcile later. Immutability gives React a new reference so it can detect that the snapshot has changed.</p>
      <p>In modern React, multiple state updates inside the same event or async turn are batched into one render. That is good for performance, but it means `setCount(count + 1)` repeatedly uses the same captured `count`; the updater form `setCount((prev) =&gt; prev + 1)` composes correctly because React feeds each update the latest queued value.</p>

      {/* SECTION 2: THE INTERVIEW GOTCHA */}
      <div style={{ background: '#ffebee', padding: '1rem', borderLeft: '4px solid #f44336', margin: '1.5rem 0' }}>
        <h3 style={{ color: '#d32f2f', marginTop: 0 }}>🚨 The Interview Gotcha</h3>
        <p>Interviewers often ask for three increments or an array append because they want to see whether you understand snapshots and identity. Mutating an array and passing the same reference back can bail out of rendering, while three `setCount(count + 1)` calls usually commit only one increment.</p>
      </div>

      {/* SECTION 3: INTERACTIVE EXAMPLES */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ flex: 1, padding: '1rem', background: '#f5f5f5', border: '1px solid #ddd' }}>
          <h3>❌ The Bad Way</h3>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>This relies on stale snapshots and mutates arrays in place, so React either collapses the intended work or receives the same reference back.</p>
          <pre style={codeStyle}>{`setCount(count + 1);
setCount(count + 1);
setCount(count + 1);

items.push(nextItem);
setItems(items);`}</pre>
          <p>Count: <strong>{badCount}</strong></p>
          <button type="button" onClick={runBadTripleIncrement}>Run bad +3</button>
          <div style={{ marginTop: '1rem' }}>
            <p>Items: {badItems.join(', ')}</p>
            <button type="button" onClick={mutateBadArray}>Push with mutation</button>
            <button type="button" onClick={() => setBadRenderTick((prev) => prev + 1)} style={{ marginLeft: '0.5rem' }}>Force unrelated render</button>
            <p style={{ fontSize: '0.8rem', color: '#777' }}>Unrelated renders: {badRenderTick}</p>
          </div>
        </div>
        <div style={{ flex: 1, padding: '1rem', background: '#e8f5e9', border: '1px solid #c8e6c9' }}>
          <h3>✅ The Good Way</h3>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>Updater functions compose inside the batch, and immutable array updates produce a new reference that React can reconcile predictably.</p>
          <pre style={codeStyle}>{`setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);

setItems((prev) => [...prev, nextItem]);`}</pre>
          <p>Count: <strong>{goodCount}</strong></p>
          <button type="button" onClick={runGoodTripleIncrement}>Run good +3</button>
          <div style={{ marginTop: '1rem' }}>
            <p>Items: {goodItems.join(', ')}</p>
            <button type="button" onClick={appendGoodArray}>Append immutably</button>
            <p style={{ fontSize: '0.8rem', color: '#2e7d32' }}>{renderSummary}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
