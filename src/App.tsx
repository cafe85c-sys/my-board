import { Component, ReactNode } from 'react'
import { Tldraw } from 'tldraw'
import 'tldraw/tldraw.css'

// 🌟 錯誤捕捉器：只要白板一當機，就立刻把當機原因印在畫面上！
class CatchError extends Component<{children: ReactNode}, {error: any}> {
  state = { error: null }
  static getDerivedStateFromError(error: any) { 
    return { error } 
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
          <h2 style={{ color: '#d32f2f' }}>🚨 抓到了！網頁版當機的原因是：</h2>
          <div style={{ background: '#ffebee', padding: '20px', borderRadius: '8px' }}>
            <pre style={{ color: '#b71c1c', whiteSpace: 'pre-wrap' }}>
              {String(this.state.error)}
            </pre>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    // 強制設定長寬為 100%，排除被 CSS 壓縮成 0 的可能性
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <CatchError>
        {/* 換一個全新的鑰匙，排除舊資料干擾 */}
        <Tldraw persistenceKey="my-new-board-test-99" />
      </CatchError>
    </div>
  )
}