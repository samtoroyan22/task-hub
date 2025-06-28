interface Props {
  active?: boolean;
  payload?: Array<{
    value: number;
  }>;
}

export function ProjectChartTooltip({ active, payload }: Props) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div
      className="bg-primary dark:bg-neutral-800 py-1.5 px-2.5 
      rounded-2xl shadow-lg text-center text-sm font-medium text-white"
    >
      {payload[0].value} Projects
    </div>
  );
}
