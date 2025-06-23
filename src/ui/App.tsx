import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [dbName, setDbName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDbName() {
      try {
        const res = await window.electron.getDbName();
        setDbName(res.data as string);
      } catch (error) {
        console.error('Error fetching database name:', error);
      }
    }

    fetchDbName();
  }, []);

  return (
    <>
      <div>
      </div>
      <h1>Connected to: {dbName}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
