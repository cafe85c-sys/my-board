import { 
  Tldraw, 
  getSnapshot, 
  DefaultMainMenu, 
  DefaultMainMenuContent, 
  TldrawUiMenuItem, 
  useEditor 
} from 'tldraw'
import 'tldraw/tldraw.css'

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
      alert("✨ 備份成功！檔案已存入下載資料夾。")
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
  return (
    <div style={{ position: 'fixed', inset: 0 }}>
      <Tldraw 
        // 加上這個，瀏覽器就會自動記住你畫的東西
        persistenceKey="my-unique-board-vercel"
        // 加上這個，左上角選單就會有「下載備份」按鈕
        components={{
          MainMenu: CustomMainMenu,
        }}
      />
    </div>
  )
}