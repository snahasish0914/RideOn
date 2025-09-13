export const SloganArea = () => {
  return (
    <div className="px-4 py-12 bg-gray-50 text-center">
      {/* Main Slogan */}
      <div className="mb-8">
        <h2 className="text-4xl font-light text-gray-400 leading-relaxed">
          Making
        </h2>
        <h2 className="text-4xl font-light text-gray-400 leading-relaxed">
          travel better
        </h2>
        <h2 className="text-4xl font-light text-gray-400 leading-relaxed">
          for everyone
        </h2>
        <div className="mt-6">
          <p className="text-xl font-medium text-gray-600">
            No Wait, Just Go
          </p>
        </div>
      </div>

      {/* Created with Love */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-gray-500 flex items-center justify-center gap-2">
          Created with love 
          <span className="text-xl" style={{ color: '#9A6735' }}>❤️</span>
        </p>
      </div>

      {/* Extra spacing for scroll */}
      <div className="h-16"></div>
    </div>
  );
};