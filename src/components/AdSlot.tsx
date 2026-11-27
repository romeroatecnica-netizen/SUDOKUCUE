interface AdSlotProps {
  slotId: string;
  placement: 'mid-leaderboard' | 'bottom-banner';
}

export function AdSlot({ slotId, placement }: AdSlotProps) {
  const minHeightClass = placement === 'mid-leaderboard' ? 'min-h-[100px]' : 'min-h-[120px]';

  return (
    <aside
      aria-label="Advertisement"
      className={`no-print w-full max-w-6xl mx-auto px-4 sm:px-6 my-8`}
    >
      {/* Media.net Contextual Ad Unit — Reserved min-height to prevent CLS */}
      {/* Replace the inner container below with your Media.net <div id="..."></div> + async script tag */}
      <div
        id={slotId}
        data-ad-network="media.net"
        data-ad-placement={placement}
        className={`w-full ${minHeightClass} bg-white border border-[#E2E8F0] rounded-xl flex items-center justify-center px-4 py-3 text-center`}
      >
        <span className="text-xs text-slate-400 tracking-wide">
          Media.net Ad Slot · {placement}
        </span>
      </div>
    </aside>
  );
}
