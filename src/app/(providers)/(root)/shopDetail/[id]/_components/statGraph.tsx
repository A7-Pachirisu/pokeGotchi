const StatGraph = ({ ratio }: { ratio: number }) => {
  return (
    <div className="flex h-6 w-36 justify-start border-2">
      <div
        className="h-5 animate-gradient bg-gradient-to-r from-red-300 to-red-500"
        style={{ width: `${ratio}%`, backgroundSize: '200% 200%' }}
      />
    </div>
  );
};

export default StatGraph;
