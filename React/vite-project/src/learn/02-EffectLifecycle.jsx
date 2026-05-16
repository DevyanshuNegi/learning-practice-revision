import React, { useState, useEffect } from 'react';

function profileText(person) {
  return `${person} profile loaded at ${new Date().toLocaleTimeString()}`;
}

export default function EffectLifecycle() {
  const [badProfile, setBadProfile] = useState('No request has run yet.');
  const [badClicks, setBadClicks] = useState(0);
  const [badClosureLog, setBadClosureLog] = useState('Schedule a timer, then increment before it fires.');
  const [goodRequest, setGoodRequest] = useState({ person: 'Ada', delay: 500, requestId: 0 });
  const [goodProfile, setGoodProfile] = useState('No request has run yet.');
  const [goodClicks, setGoodClicks] = useState(0);
  const [goodClosureLog, setGoodClosureLog] = useState('Schedule a timer, then increment before it fires.');
  const latestGoodClicks = React.useRef(goodClicks);

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
    latestGoodClicks.current = goodClicks;
  }, [goodClicks]);

  useEffect(() => {
    let isCurrent = true;

    const timeoutId = window.setTimeout(() => {
      if (isCurrent) {
        setGoodProfile(profileText(goodRequest.person));
      }
    }, goodRequest.delay);

    return () => {
      isCurrent = false;
      window.clearTimeout(timeoutId);
    };
  }, [goodRequest]);

  function runBadRace() {
    setBadProfile('Loading Ada slowly, then Grace quickly...');

    window.setTimeout(() => {
      setBadProfile(profileText('Ada'));
    }, 900);

    window.setTimeout(() => {
      setBadProfile(profileText('Grace'));
    }, 250);
  }

  function runGoodRace() {
    const requestId = Date.now();
    setGoodProfile('Loading Ada slowly, then Grace quickly...');
    setGoodRequest({ person: 'Ada', delay: 900, requestId });

    window.setTimeout(() => {
      setGoodRequest({ person: 'Grace', delay: 250, requestId: requestId + 1 });
    }, 80);
  }

  function scheduleBadClosure() {
    const capturedClicks = badClicks;
    setBadClosureLog(`Timer scheduled with captured count ${capturedClicks}.`);

    window.setTimeout(() => {
      setBadClosureLog(`Timer fired with captured count ${capturedClicks}, even if the UI moved on.`);
    }, 900);
  }

  function scheduleGoodClosure() {
    setGoodClosureLog('Timer scheduled against a ref that tracks the latest committed count.');

    window.setTimeout(() => {
      setGoodClosureLog(`Timer fired with latest count ${latestGoodClicks.current}.`);
    }, 900);
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', fontFamily: 'system-ui' }}>
      {/* SECTION 1: THE THEORY */}
      <h1 style={{ borderBottom: '2px solid #ccc' }}>Effect Lifecycle</h1>
      <p><strong>Definition:</strong> An effect synchronizes a committed React render with an external system such as the network, a timer, storage, or an imperative subscription. The dependency array is the contract that tells React which render values the synchronization depends on.</p>
      <p>Effects run after React commits the UI, and cleanup runs before the next relevant effect or before unmount. Treat the effect body as starting one synchronization process and the cleanup as stopping exactly that process; this mental model makes dependency arrays, stale closures, and fetch race conditions much easier to reason about.</p>

      {/* SECTION 2: THE INTERVIEW GOTCHA */}
      <div style={{ background: '#ffebee', padding: '1rem', borderLeft: '4px solid #f44336', margin: '1.5rem 0' }}>
        <h3 style={{ color: '#d32f2f', marginTop: 0 }}>🚨 The Interview Gotcha</h3>
        <p>The trap is omitting dependencies to "run once" and then reading props or state from a stale closure. For data fetching, the other trap is ignoring cleanup, which lets an older slow response overwrite the newer fast response.</p>
      </div>

      {/* SECTION 3: INTERACTIVE EXAMPLES */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ flex: 1, padding: '1rem', background: '#f5f5f5', border: '1px solid #ddd' }}>
          <h3>❌ The Bad Way</h3>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>This starts async work without a cleanup path and assumes the closure will somehow stay current.</p>
          <pre style={codeStyle}>{`useEffect(() => {
  fetchProfile(userId).then(setProfile);
}, []); // userId was read but not declared

// No cleanup means an older response can win.`}</pre>
          <p><strong>Race result:</strong> {badProfile}</p>
          <button type="button" onClick={runBadRace}>Run bad fetch race</button>
          <div style={{ marginTop: '1rem' }}>
            <p>Clicks: <strong>{badClicks}</strong></p>
            <button type="button" onClick={scheduleBadClosure}>Schedule stale timer</button>
            <button type="button" onClick={() => setBadClicks((prev) => prev + 1)} style={{ marginLeft: '0.5rem' }}>Increment</button>
            <p style={{ fontSize: '0.8rem', color: '#777' }}>{badClosureLog}</p>
          </div>
        </div>
        <div style={{ flex: 1, padding: '1rem', background: '#e8f5e9', border: '1px solid #c8e6c9' }}>
          <h3>✅ The Good Way</h3>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>Declare every render value the effect uses, and cancel or ignore obsolete work in cleanup.</p>
          <pre style={codeStyle}>{`useEffect(() => {
  let current = true;

  fetchProfile(userId).then((data) => {
    if (current) setProfile(data);
  });

  return () => {
    current = false;
  };
}, [userId]);`}</pre>
          <p><strong>Race result:</strong> {goodProfile}</p>
          <button type="button" onClick={runGoodRace}>Run cleaned-up fetch race</button>
          <div style={{ marginTop: '1rem' }}>
            <p>Clicks: <strong>{goodClicks}</strong></p>
            <button type="button" onClick={scheduleGoodClosure}>Schedule latest-value timer</button>
            <button type="button" onClick={() => setGoodClicks((prev) => prev + 1)} style={{ marginLeft: '0.5rem' }}>Increment</button>
            <p style={{ fontSize: '0.8rem', color: '#2e7d32' }}>{goodClosureLog}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
