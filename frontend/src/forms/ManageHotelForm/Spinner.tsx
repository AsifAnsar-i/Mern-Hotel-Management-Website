function Spinner() {
  return (
    <div className="w-12 h-12 cursor-not-allowed rounded-full border-4 border-solid border-gray-700 relative animate-spin">
      <div className="w-6 h-6 border-4 border-solid border-gray-700 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}

export default Spinner;
