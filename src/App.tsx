import { useState, useEffect } from 'react'
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

export default function App() {
  const [errorMsg, setErrorMsg] = useState("")

  // 🌟 全域雷達：專門捕捉 React 警報器抓不到的「背景非同步錯誤」
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      setErrorMsg(event.message || "發生未知錯誤")
    }
    // 監聽整個視窗的錯誤
    window.addEventListener('error', handleGlobalError)
    
    return () => {
      window.removeEventListener('error', handleGlobalError)
    }
  }, [])

  if (errorMsg) {
    return (
      <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#d32f2f' }}>🚨 抓到背景當機原因了！</h2>
        <div style={{ background: '#ffebee', padding: '20px', borderRadius: '8px' }}>
          <pre style={{ color: '#b71c1c', fontSize: '16px' }}>
            {errorMsg}
          </pre>
        </div>
      </div>
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      {/* 🌟 關鍵：我們這次「不加上」 persistenceKey，讓它變成一個純粹的、不碰觸瀏覽器資料庫的白板 */}
      <Tldraw />
    </div>
  )
}