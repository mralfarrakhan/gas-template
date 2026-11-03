import { useState } from "preact/hooks";

interface AppInfo {
  version: string;
  userEmail: string;
  timeZone: string;
  timestamp: string;
}

export function App() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState<string | null>(null);
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSayHello = (e: Event) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    setError(null);

    google.script.run
      .withSuccessHandler((message: string) => {
        setGreeting(message);
        setIsLoading(false);
      })
      .withFailureHandler((err: Error) => {
        setError(err.message || "Failed to execute sayHello");
        setIsLoading(false);
      })
      .sayHello(name);
  };

  const handleFetchInfo = () => {
    setIsLoading(true);
    setError(null);

    google.script.run
      .withSuccessHandler((info: AppInfo) => {
        setAppInfo(info);
        setIsLoading(false);
      })
      .withFailureHandler((err: Error) => {
        setError(err.message || "Failed to fetch app info");
        setIsLoading(false);
      })
      .getAppInfo();
  };

  return (
    <div class="min-h-screen bg-slate-50 text-slate-800 p-6 flex flex-col items-center justify-center">
      <div class="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-6 border border-slate-200">
        <div class="text-center">
          <h1 class="text-2xl font-bold tracking-tight text-slate-900">
            Apps Script + Preact
          </h1>
          <p class="text-xs text-slate-500 mt-1">
            Version:{" "}
            {typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "1.0.0"}
          </p>
        </div>

        {error && (
          <div class="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSayHello} class="space-y-4">
          <div>
            <label class="block text-xs font-medium text-slate-700 mb-1">
              Enter your name
            </label>
            <input
              type="text"
              value={name}
              onInput={(e) => setName((e.target as HTMLInputElement).value)}
              placeholder="Your name..."
              class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-medium rounded-lg text-sm transition-colors cursor-pointer"
          >
            {isLoading ? "Running..." : "Call Server (sayHello)"}
          </button>
        </form>

        {greeting && (
          <div class="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm">
            {greeting}
          </div>
        )}

        <div class="pt-4 border-t border-slate-100 flex flex-col items-center">
          <button
            type="button"
            onClick={handleFetchInfo}
            disabled={isLoading}
            class="text-xs text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
          >
            Fetch Server Info
          </button>

          {appInfo && (
            <div class="mt-3 w-full bg-slate-50 p-3 rounded-lg text-xs font-mono text-slate-600 space-y-1">
              <div>User: {appInfo.userEmail}</div>
              <div>Timezone: {appInfo.timeZone}</div>
              <div>Timestamp: {appInfo.timestamp}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
