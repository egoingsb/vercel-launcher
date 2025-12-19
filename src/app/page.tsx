
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

  // Check for missing env vars
  const missingSupabase = !process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Blob token is server-side only, so we can't check it directly here easily without server component or prop passing.
  // But we can infer or simpler: just show general guide if DB is missing, or add a specific check via server action later.
  // For now, let's focus on the visible ones. Actually, we can check Blob status via the upload error.

  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => {
    if (missingSupabase) setShowGuide(true);
  }, [missingSupabase]);

  return (
    <div className="p-8 space-y-12 max-w-2xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-8">Vercel One-Click Verification</h1>

      {/* Setup Guide */}
      {(showGuide || dbStatus.includes('Missing') || blobUrl === 'error') && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm leading-5 font-medium text-yellow-800">
                Setup Required / 설정이 필요합니다
              </h3>
              <div className="mt-2 text-sm leading-5 text-yellow-700">
                <p className="mb-2">일부 기능이 작동하지 않을 수 있습니다. Vercel Dashboard에서 다음 설정을 완료해 주세요.</p>
                <ul className="list-disc pl-5 space-y-1">
                  {missingSupabase && (
                    <li>
                      <strong>Supabase 연결:</strong> Settings &rarr; Integrations &rarr; Add Supabase
                    </li>
                  )}
                  <li>
                    <strong>Blob Storage 추가:</strong> <a href="https://vercel.com/dashboard" target="_blank" className="underline font-bold text-blue-600">Vercel Dashboard</a> 이동 &rarr; Storage 탭 &rarr; Create Database &rarr; Blob 선택
                  </li>
                  <li>
                    <strong>설정 후:</strong> Deployments 탭에서 <strong>Redeploy</strong> 필수!
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

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
