import React, { useState, useRef, useEffect } from "react";
import Flag from "react-flagkit";
import { FiUpload, FiMic, FiPlay, FiRefreshCw, FiShuffle } from "react-icons/fi";

const languages = [
  { code: "EN", label: "English", country: "GB" },
  { code: "NY", label: "Chichewa", country: "MW" },
  { code: "RN", label: "Kirundi", country: "BI" },
  { code: "SW", label: "Swahili", country: "KE" },
  { code: "LN", label: "Lingala", country: "CD" },
  { code: "FR", label: "French", country: "FR" },
];

function LanguageSelect({ value, onChange }) {
  const lang = languages.find((l) => l.code === value) || languages[0];
  return (
    <div className="relative w-44">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 pl-12 rounded-xl bg-gray-50 border border-gray-300 text-gray-900 focus:ring-2 focus:ring-teal-400 outline-none appearance-none font-medium"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <Flag country={lang.country} size={22} />
      </div>
    </div>
  );
}

export default function TranslationTabsPro() {
  const [activeTab, setActiveTab] = useState("text");

  // Text Translation
  const [textIn, setTextIn] = useState("");
  const [textOut, setTextOut] = useState("");

  // Audio & ASR
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [asrLoading, setAsrLoading] = useState(false);
  const [transcript, setTranscript] = useState("");

  // TTS states
  const [ttsText, setTtsText] = useState("");
  const [ttsLoading, setTtsLoading] = useState(false);
  const [ttsAudioUrl, setTtsAudioUrl] = useState(null);
  const audioRef = useRef(null);

  // Languages
  const [sourceLang, setSourceLang] = useState("EN");
  const [targetLang, setTargetLang] = useState("NY");

  // Text → Text simulate
  const [translateLoading, setTranslateLoading] = useState(false);
  async function simulateTranslate() {
    
    if (!textIn || textIn.trim() === "") return alert("Enter text to translate");
    setTranslateLoading(true);
    setTextOut("");

    try {
      const res = await fetch("http://localhost:8000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textIn,
          source: sourceLang,
          target: targetLang,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(err.detail || "Translation failed");
      }

      const data = await res.json();
      setTextOut(data.text || "");
    } catch (e) {
      console.error(e);
      alert(`Translation error: ${e.message || e}`);
    } finally {
      setTranslateLoading(false);
    }
  }

  // Audio record
  function startRecord() {
    if (!navigator.mediaDevices) return alert("Recording not supported");
    setRecording(true);
    audioChunksRef.current = [];
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mr = new MediaRecorder(stream);
        mediaRecorderRef.current = mr;
        mr.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) audioChunksRef.current.push(e.data);
        };
        mr.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
          setAudioFile(blob);
          setAudioURL(URL.createObjectURL(blob));
        };
        mr.start();
      })
      .catch(() => {
        alert("Microphone access denied");
        setRecording(false);
      });
  }

  function stopRecord() {
    setRecording(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive")
      mediaRecorderRef.current.stop();
  }

  function handleUpload(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setAudioFile(f);
    setAudioURL(URL.createObjectURL(f));
  }

  function swapLanguages() {
    const s = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(s);
  }

  
  async function runASR() {
    if (!audioFile) return alert("No audio selected!");
    setAsrLoading(true);
    setTranscript("");

    try {
      const fd = new FormData();
      const fileToSend =
        audioFile instanceof File
          ? audioFile
          : new File([audioFile], "recording.webm", { type: audioFile.type || "audio/webm" });
      fd.append("file", fileToSend);

      const res = await fetch("http://localhost:8000/asr", {
        method: "POST",
        body: fd,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(err.detail || "Transcription failed");
      }

      const data = await res.json();
      setTranscript(data.text || "");
    } catch (e) {
      console.error(e);
      alert(`Error during transcription: ${e.message}`);
    } finally {
      setAsrLoading(false);
    }
  }

 
  async function runTTS() {
    if (!ttsText || ttsText.trim() === "") return alert("Enter text for TTS");
    setTtsLoading(true);
    
    if (ttsAudioUrl) {
      URL.revokeObjectURL(ttsAudioUrl);
      setTtsAudioUrl(null);
    }

    try {
      const res = await fetch("http://localhost:8000/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: ttsText }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(err.detail || "TTS failed");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setTtsAudioUrl(url);

      if (audioRef.current) {
        audioRef.current.src = url;
        try {
          await audioRef.current.play();
        } catch {
        }
      }
    } catch (e) {
      console.error(e);
      alert(`Error during TTS: ${e.message || e}`);
    } finally {
      setTtsLoading(false);
    }
  }

  function downloadTTS() {
    if (!ttsAudioUrl) return alert("No TTS audio available. Generate first.");
    const a = document.createElement("a");
    a.href = ttsAudioUrl;
    a.download = "tts.wav";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (audioURL) URL.revokeObjectURL(audioURL);
      if (ttsAudioUrl) URL.revokeObjectURL(ttsAudioUrl);
    };
  }, [audioURL, ttsAudioUrl]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-12 px-6 bg-gray-100">
      <div className="w-full max-w-5xl">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            LinguaOffline AI
          </h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-lg">
            Offline translation for Text & Audio — fast, lightweight, and professional.
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-4 mb-6 border-b border-gray-300 relative">
          <button
            onClick={() => setActiveTab("text")}
            className={`relative px-6 py-2 font-semibold transition ${
              activeTab === "text"
                ? "text-teal-600 after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-1 after:bg-teal-600"
                : "text-gray-700 hover:text-teal-500"
            }`}
          >
            Text Translation
          </button>
          <button
            onClick={() => setActiveTab("audio")}
            className={`relative px-6 py-2 font-semibold transition ${
              activeTab === "audio"
                ? "text-teal-600 after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-1 after:bg-teal-600"
                : "text-gray-700 hover:text-teal-500"
            }`}
          >
            Audio Translation
          </button>
        </div>

        {/* TAB CONTENT */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
          {/* TEXT TRANSLATION */}
          {activeTab === "text" && (
            <div>
              <textarea
                className="w-full h-36 p-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none resize-none text-gray-900"
                value={textIn}
                onChange={(e) => setTextIn(e.target.value)}
                placeholder="Type or paste text..."
              ></textarea>
              <div className="flex items-center gap-3 mt-4">
                <LanguageSelect value={sourceLang} onChange={setSourceLang} />
                <button
                  onClick={swapLanguages}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl border border-gray-300 transition"
                >
                  <FiShuffle size={18} />
                </button>
                <LanguageSelect value={targetLang} onChange={setTargetLang} />
                <button
                  onClick={simulateTranslate}
                  className="ml-auto bg-teal-500 hover:bg-teal-600 text-white px-5 py-2 rounded-xl shadow transition-all"
                >
                  {translateLoading ? "Translating..." : "Translate"}
                </button>
                <button
                  onClick={() => {
                    setTextIn("");
                    setTextOut("");
                  }}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl border border-gray-300 transition"
                >
                  <FiRefreshCw />
                </button>
              </div>
              <div className="mt-4 bg-gray-50 border border-gray-200 p-4 rounded-xl min-h-[120px] text-gray-700">
                {textOut || <span className="text-gray-400">The translated text will appear here...</span>}
              </div>
            </div>
          )}

          {/* AUDIO TRANSLATION */}
          {activeTab === "audio" && (
            <div>
              {/* Upload / Record */}
              <div className="mb-4 flex items-center gap-3">
                <label className="cursor-pointer">
                  <input type="file" accept="audio/*" onChange={handleUpload} className="hidden" />
                  <span className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl inline-flex items-center gap-2 hover:bg-gray-200">
                    <FiUpload /> Upload
                  </span>
                </label>
                {!recording ? (
                  <button
                    onClick={startRecord}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl inline-flex items-center gap-2"
                  >
                    <FiMic /> Record
                  </button>
                ) : (
                  <button
                    onClick={stopRecord}
                    className="px-4 py-2 bg-gray-700 text-white rounded-xl inline-flex items-center gap-2"
                  >
                    Stop
                  </button>
                )}
              </div>

              {/* Audio preview */}
              <div className="mb-4 bg-gray-50 border border-gray-200 p-4 rounded-xl">
                {audioURL ? (
                  <div className="flex items-center gap-3">
                    <audio src={audioURL} controls className="w-full" />
                    <button onClick={() => { setAudioURL(null); setAudioFile(null); }} className="text-gray-500 hover:text-gray-700 text-sm">
                      Remove
                    </button>
                  </div>
                ) : (
                  <span className="text-gray-400">No audio selected.</span>
                )}
              </div>

              {/* ASR */}
              <div className="mb-4">
                <h4 className="font-semibold mb-1 text-gray-900">Audio → Text (ASR)</h4>
                <p className="text-gray-500 text-sm mb-2">Offline ASR engine will convert speech into text.</p>
                <button
                  onClick={runASR}
                  disabled={asrLoading}
                  className="px-4 py-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white rounded-xl shadow transition-all"
                >
                  {asrLoading ? "Transcribing..." : "Run ASR"}
                </button>
                <div className="mt-2 p-2 bg-gray-50 border border-gray-200 rounded-xl min-h-[60px]">
                  {transcript || <span className="text-gray-400">The transcribed text will appear here...</span>}
                </div>
              </div>

              {/* TTS */}
              <div>
                <h4 className="font-semibold mb-1 text-gray-900">Text → Audio (TTS)</h4>
                <textarea
                  className="w-full h-24 p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-400 outline-none"
                  placeholder="Enter text to convert to speech..."
                  value={ttsText}
                  onChange={(e) => setTtsText(e.target.value)}
                ></textarea>
                <div className="flex gap-3 mt-3 items-center">
                  <button
                    onClick={runTTS}
                    disabled={ttsLoading}
                    className="px-4 py-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white rounded-xl inline-flex items-center gap-2 transition-all"
                  >
                    <FiPlay /> {ttsLoading ? "Generating..." : "Play"}
                  </button>
                  <button
                    onClick={downloadTTS}
                    disabled={!ttsAudioUrl}
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl hover:bg-gray-200 transition"
                  >
                    Download
                  </button>
                  <span className="text-sm text-gray-500 ml-2">
                    {ttsAudioUrl ? "Ready" : ttsLoading ? "Working…" : "No audio generated"}
                  </span>
                </div>

                {/* hidden audio element for playback */}
                <audio ref={audioRef} controls className="mt-3 w-full" src={ttsAudioUrl || undefined} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
