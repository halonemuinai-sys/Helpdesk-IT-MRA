interface Props {
  status:       string;
  value?:       number;
  ticketStatus: string;
}

export function SlaProgressCircle({ status, value, ticketStatus }: Props) {
  if (value === undefined) {
    return (
      <div className="w-8 h-8 rounded-full border border-border/80 flex items-center justify-center text-text-3 font-bold text-[10px]">
        —
      </div>
    );
  }

  const isAchieved = status === 'Achieved' || ticketStatus === 'In Progress';
  const colorClass  = isAchieved
    ? (ticketStatus === 'In Progress' ? 'stroke-blue text-blue' : 'stroke-emerald text-emerald')
    : 'stroke-rose text-rose';

  const offset = 75.4 - (75.4 * value) / 100;

  return (
    <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
      <svg className="w-8 h-8 transform -rotate-90">
        <circle cx="16" cy="16" r="12"
          className="stroke-slate-100 dark:stroke-slate-800/40"
          strokeWidth="2.5" fill="transparent"
        />
        <circle cx="16" cy="16" r="12"
          className={colorClass}
          strokeWidth="2.5" fill="transparent"
          strokeDasharray="75.4"
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      <span className={`absolute text-[9px] font-black ${colorClass}`}>
        {value}%
      </span>
    </div>
  );
}
