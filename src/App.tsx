import { useEffect } from 'react'
import { 
  Tldraw, 
  getSnapshot, 
  DefaultMainMenu, 
  DefaultMainMenuContent, 
  TldrawUiMenuItem, 
  useEditor 
} from 'tldraw'
import 'tldraw/tldraw.css'

// 1. 自定義選單 (包含備份功能)
function CustomMainMenu() {
  const editor = useEditor()

  const handleDownload = () => {
    try {
      const snapshot = getSnapshot(editor.store)
      const data = JSON.stringify(snapshot)
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'my-board-backup.tldr'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      alert("✨ 備份成功！檔案已存入「下載」資料夾。")
    } catch (e) {
      alert("備份失敗：" + e)
    }
  }

  return (
    <DefaultMainMenu>
      <div style={{ padding: '4px' }}>
        <TldrawUiMenuItem
          id="download-file"
          label="📥 下載備份 (.tldr)"
          readonlyOk
          onSelect={handleDownload}
        />
      </div>
      <DefaultMainMenuContent />
    </DefaultMainMenu>
  )
}

export default function App() {

  // 🌟 核心魔法：DOM 狙擊手
  useEffect(() => {
    const killWatermark = () => {
      // 找出畫面上所有的超連結 (a 標籤)
      const links = document.querySelectorAll('a')
      links.forEach(link => {
        // 如果超連結裡面的文字包含 "Get a license"，就強制把它變不見！
        if (link.textContent && link.textContent.includes('Get a license')) {
          link.style.setProperty('display', 'none', 'important')
          link.style.setProperty('opacity', '0', 'important')
          link.style.setProperty('pointer-events', 'none', 'important')
        }
      })
    }

    // 因為白板元件載入需要零點幾秒，我們設定定時器連續狙擊 10 次，確保它一探頭就被消滅
    const interval = setInterval(killWatermark, 500)
    setTimeout(() => clearInterval(interval), 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      {/* 我們還是保留這段超強勢 CSS 作為雙重保險 */}
      <style>{`
        a[href*="tldraw"], a[href*="license"], [class*="watermark"] {
          display: none !important;
        }
      `}</style>
      
      <Tldraw 
        persistenceKey="my-unique-board-final"
        components={{
          MainMenu: CustomMainMenu,
        }}
      />
    </div>
  )
}