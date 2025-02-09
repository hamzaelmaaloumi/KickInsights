interface myp {
    className?: string;
  }
  
  const Grid = ({ className }: myp) => {
    return (
      <div
        className={"absolute inset-0 pointer-events-none " + className}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)`,
          backgroundSize: "30px 30px", // Adjust for the size of the grid squares
          backgroundPosition: "4px 8px", // Slight offset for proper alignment
        }}
      ></div>
    );
  };
  
  export default Grid;
  