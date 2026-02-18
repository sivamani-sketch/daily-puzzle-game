type HeatmapProps = {
  progress: string[];
};

function Heatmap({ progress }: HeatmapProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 7 }).map((_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);

        const played = progress.includes(date.toDateString());

        return (
          <div
            key={i}
            className={`w-4 h-4 rounded ${
              played ? 'bg-green-500' : 'bg-gray-600'
            }`}
          />
        );
      })}
    </div>
  );
}

export default Heatmap;
