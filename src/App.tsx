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
      {/* 乖乖拿掉隱藏魔法，換取網頁版的穩定運作 */}
      <Tldraw 
        persistenceKey="my-unique-board-web"
        components={{
          MainMenu: CustomMainMenu,
        }}
      />
    </div>
  )
}