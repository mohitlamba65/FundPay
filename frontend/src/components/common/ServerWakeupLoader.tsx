import { useEffect, useState } from "react";
import { Server, Sparkles, RefreshCw, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServerWakeupLoaderProps {
  isLoading: boolean;
  error?: string | null;
  onRetry?: () => void;
  title?: string;
  itemType?: string;
}

export function ServerWakeupLoader({
  isLoading,
  error,
  onRetry,
  title = "Connecting to backend server",
  itemType = "products",
}: ServerWakeupLoaderProps) {
  const [seconds, setSeconds] = useState(0);
  const [autoRetryTimer, setAutoRetryTimer] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading) {
      setSeconds(0);
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (error && onRetry) {
      setAutoRetryTimer(6);
      const timer = setInterval(() => {
        setAutoRetryTimer((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timer);
            onRetry();
            return null;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setAutoRetryTimer(null);
    }
  }, [error, onRetry]);

  if (!isLoading && !error) {
    return null;
  }

  const isColdStart = seconds >= 3;

  if (error) {
    return (
      <div className="rounded-[24px] border border-amber-200 bg-amber-50/70 p-6 sm:p-8 max-w-xl mx-auto my-6 text-center space-y-4 shadow-sm animate-in fade-in zoom-in-95 duration-200">
        <div className="h-12 w-12 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto text-amber-700">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#050505]">Server Waking Up</h3>
          <p className="text-xs text-[#555555] mt-1 max-w-md mx-auto leading-relaxed">
            The free-tier backend on Render is currently cold-starting. This usually takes 25–35 seconds on the first request.
          </p>
        </div>

        {autoRetryTimer !== null && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-[11px] font-medium text-amber-800">
            <Clock className="h-3 w-3" />
            <span>Auto-retrying in {autoRetryTimer}s...</span>
          </div>
        )}

        {onRetry && (
          <div>
            <Button
              onClick={onRetry}
              className="bg-[#6D28D9] hover:bg-[#5420C9] text-white text-xs font-semibold rounded-[16px] h-9 px-5 transition-all shadow-sm"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-2 animate-spin" />
              Retry Now
            </Button>
          </div>
        )}
      </div>
    );
  }

  if (!isColdStart) {
    return null;
  }

  const getStageInfo = () => {
    if (seconds < 8) {
      return {
        stage: "Waking up cloud container",
        progress: 25,
        detail: "Sending activation signal to Render instance...",
      };
    }
    if (seconds < 18) {
      return {
        stage: "Booting Node.js runtime",
        progress: 55,
        detail: "Spinning up Express application server...",
      };
    }
    if (seconds < 28) {
      return {
        stage: "Establishing database handshake",
        progress: 80,
        detail: "Connecting to managed PostgreSQL instance...",
      };
    }
    return {
      stage: "Finalizing data transfer",
      progress: 92,
      detail: `Fetching live ${itemType} and financing plans...`,
    };
  };

  const { stage, progress, detail } = getStageInfo();

  return (
    <div className="rounded-[24px] border border-[#DCC9F5] bg-gradient-to-br from-[#F8F4FF] to-white p-5 sm:p-7 max-w-xl mx-auto my-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="h-9 w-9 rounded-xl bg-[#EDE4FC] flex items-center justify-center text-[#7C20E8]">
              <Server className="h-4.5 w-4.5 animate-pulse" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C20E8] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6D28D9]" />
            </span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#050505] tracking-tight">{title}</h4>
            <p className="text-[11px] text-[#6D28D9] font-medium">{stage}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#DCC9F5] text-[11px] font-semibold text-[#6D28D9] shrink-0">
          <Sparkles className="h-3 w-3" />
          <span>{seconds}s</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="h-1.5 w-full bg-[#E5E0EA] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#7C20E8] to-[#9047FF] transition-all duration-700 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[10px] text-[#777777]">
          <span>{detail}</span>
          <span>~25-35s free-tier wakeup</span>
        </div>
      </div>
    </div>
  );
}
