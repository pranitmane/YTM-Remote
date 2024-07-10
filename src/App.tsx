import { useEffect, useState } from "react"

export default function App() {
  const [serverStatus, setServerStatus] = useState("offline")

  useEffect(() => {
    fetch("http://localhost:8080/status").then(() => {
      setServerStatus("Online")
    }).catch(() => {
      setServerStatus("Offline")
    })
  }, [])

  return (
    <main className="w-[400px] h-[400px] flex flex-col gap-2 p-4 bg-gray-900 text-white relative">
      <h1 className="text-2xl font-bold text-center">YTM Remote</h1>
      <section className={"flex items-center justify-center h-full w-full border rounded-md p-4"
        + (serverStatus === "Online" ? " bg-green-600 border-green-400" : " bg-red-600 border-red-400")
      }>
        <h2 className="text-xl">Server Status : <span className="font-bold">{serverStatus}</span></h2>
      </section>
      <section className="flex gap-2 items-center justify-center w-full p-2">
        <a onClick={()=>openLink("https://x.com/pranitbmane")} className="text-sm hover:underline text-sky-500" href="https://x.com/pranitbmane">Twitter</a>
        <a onClick={()=>openLink("https://github.com/pranitmane")} className="text-sm hover:underline text-sky-500" href="https://github.com/pranitmane">Github</a>
      </section>
    </main>
  )
}

function openLink(link: string) {
  chrome.tabs.create({ url: link })
}


