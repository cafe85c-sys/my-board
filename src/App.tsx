import { 
  Tldraw, 
  getSnapshot, 
  DefaultMainMenu, 
  DefaultMainMenuContent, 
  TldrawUiMenuItem, 
  useEditor 
} from 'tldraw'
import 'tldraw/tldraw.css'
import { useRef } from 'react'

function CustomMainMenu() {
  const editor = useEditor()
  // 建立一個隱藏的「選擇檔案」機制
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 📥 下載功能 (保持不變)
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
      alert("✨ 備份成功！檔案已存入下載資料夾。")
    } catch (e) {
      alert("備份失敗：" + e)
    }
  }

  // 📂 點擊讀取按鈕時，觸發隱藏的檔案選擇器
  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  // ⚙️ 處理讀取檔案的邏輯
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        // 把文字轉回畫布資料，並強制覆蓋現有畫布
        const json = JSON.parse(event.target?.result as string)
        editor.store.loadSnapshot(json)
        alert("✨ 讀取成功！歡迎回來。")
      } catch (error) {
        alert("讀取失敗：檔案格式不正確")
      }
    }
    reader.readAsText(file) // 以文字方式讀取檔案
    
    // 清空選擇器，確保下次選同一個檔案也會有反應
    e.target.value = ''
  }

  return (
    <DefaultMainMenu>
      <div style={{ padding: '4px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <TldrawUiMenuItem
          id="download-file"
          label="📥 下載備份 (.tldr)"
          readonlyOk
          onSelect={handleDownload}
        />
        <TldrawUiMenuItem
          id="upload-file"
          label="📂 讀取備份 (.tldr)"
          readonlyOk
          onSelect={handleUploadClick}
        />
        {/* 這是隱藏的檔案上傳元件，不會顯示在畫面上 */}
        <input 
          type="file" 
          accept=".tldr,application/json" 
          style={{ display: 'none' }} 
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      <DefaultMainMenuContent />
    </DefaultMainMenu>
  )
}

export default function App() {
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw 
        persistenceKey="my-unique-board-vercel"
        components={{
          MainMenu: CustomMainMenu,
        }}
      />
    </div>
  )
}