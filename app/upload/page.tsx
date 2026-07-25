"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [files, setFiles] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  function receive(list: FileList | null) {
    if (!list) return;
    setFiles(Array.from(list).map(f => f.name));
  }
  return <main className="upload-page">
    <nav className="site-nav"><Link href="/" className="wordmark"><span>GH</span> Ghost Hand Studios</Link><Link href="/" className="text-link">← Back to overview</Link></nav>
    <section className="upload-shell">
      <div className="eyebrow"><i /> SECURE DATA IMPORT</div>
      <h1>Bring your exports.<br /><em>We’ll find the signal.</em></h1>
      <p>Upload sales, service, or parts exports. For this prototype, files remain in your browser and sample intelligence is loaded after processing.</p>
      <button className={`dropzone ${dragging?"dragging":""}`} onClick={()=>input.current?.click()} onDragOver={e=>{e.preventDefault();setDragging(true)}} onDragLeave={()=>setDragging(false)} onDrop={e=>{e.preventDefault();setDragging(false);receive(e.dataTransfer.files)}}>
        <input ref={input} type="file" multiple accept=".csv,.xlsx,.xls" onChange={e=>receive(e.target.files)} />
        <span>⇧</span><b>Drop DMS exports here</b><small>or click to browse · CSV, XLS, XLSX</small>
      </button>
      {files.length > 0 && <div className="file-list">{files.map(f=><span key={f}>✓ {f}</span>)}<button className="button button-light" onClick={()=>router.push("/dashboard")}>Process {files.length} file{files.length>1?"s":""} →</button></div>}
      <div className="sample-cta"><div><span>NO EXPORTS ON HAND?</span><b>See the full experience with realistic Porsche dealer data.</b></div><Link href="/demo" className="button button-dark">Load demo data →</Link></div>
      <div className="trust-row"><span>◇ Browser-only prototype</span><span>◇ No files are stored</span><span>◇ Sample data available</span></div>
    </section>
  </main>;
}
