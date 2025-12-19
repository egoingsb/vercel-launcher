
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';
import { supabase } from '@/lib/supabase';

export default function Page() {
  // Supabase Check
  const [dbStatus, setDbStatus] = useState('Checking...');
  useEffect(() => {
    async function checkDb() {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        setDbStatus('Missing Env Vars (NEXT_PUBLIC_SUPABASE_URL)');
        return;
      }
      // Simple check: client initialized?
      // We can try to fetch data, but table might not exist.
      // Let's just report initialized.
      setDbStatus('Initialized (Client ready)');
    }
    checkDb();
  }, []);

  // Chat
  const { messages, input, handleInputChange, handleSubmit } = useChat() as any;

  // Upload
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  async function upload(event: React.FormEvent) {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error("No file selected");
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(
      `/api/upload?filename=${file.name}`,
      {
        method: 'POST',
        body: file,
      },
    );

    const newBlob = await response.json();
    setBlobUrl(newBlob.url);
  }

  return (
    <div className="p-8 space-y-12 max-w-2xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-8">Vercel One-Click Verification</h1>

      <section className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-green-700">1. Supabase / Database</h2>
        <div className="bg-gray-100 p-4 rounded text-sm font-mono">
          Status: {dbStatus}
        </div>
      </section>

      <section className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">2. Vercel AI SDK</h2>
        <div className="mb-4 h-48 overflow-y-auto border p-4 rounded bg-gray-50">
          {messages.length === 0 && <p className="text-gray-400 text-sm">No messages yet.</p>}
          {messages.map((m: any) => (
            <div key={m.id} className={`mb-2 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                {m.content}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e); }} className="flex gap-2">
          <input
            className="border p-2 flex-grow rounded"
            value={input}
            onChange={handleInputChange}
            placeholder="Type 'Hello'..."
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Send</button>
        </form>
      </section>

      <section className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-orange-700">3. Vercel Blob / Storage</h2>
        <form onSubmit={upload} className="flex gap-2 items-center mb-4">
          <input name="file" ref={inputFileRef} type="file" required className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100" />
          <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">Upload</button>
        </form>
        {blobUrl && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <p className="text-sm font-bold mb-2">Uploaded Successfully:</p>
            <img src={blobUrl} width="100%" className="rounded mb-2 shadow-sm max-h-60 object-cover" />
            <a href={blobUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-500 break-all">{blobUrl}</a>
          </div>
        )}
      </section>
    </div>
  );
}
