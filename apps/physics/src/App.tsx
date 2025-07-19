import { useState, useEffect } from 'react';
import mathWasm from 'cpp-wasm';
import { cn } from './lib/utils';

function App() {
  const [wasmReady, setWasmReady] = useState(false);
  const [num1, setNum1] = useState(5);
  const [num2, setNum2] = useState(3);
  const [addResult, setAddResult] = useState<number | null>(null);
  const [multiplyResult, setMultiplyResult] = useState<number | null>(null);
  const [distance, setDistance] = useState(100);
  const [time, setTime] = useState(10);
  const [velocity, setVelocity] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // WASM 모듈 초기화
  useEffect(() => {
    const initWasm = async () => {
      try {
        await mathWasm.initialize();
        setWasmReady(true);
        setError(null);
      } catch (err) {
        setError('WASM 모듈 초기화에 실패했습니다: ' + (err as Error).message);
        console.error('WASM 초기화 오류:', err);
      }
    };

    initWasm();
  }, []);

  // 덧셈 계산
  const handleAdd = () => {
    if (!wasmReady) return;
    try {
      const result = mathWasm.add(num1, num2);
      setAddResult(result);
    } catch (err) {
      setError('덧셈 계산 오류: ' + (err as Error).message);
    }
  };

  // 곱셈 계산
  const handleMultiply = () => {
    if (!wasmReady) return;
    try {
      const result = mathWasm.multiply(num1, num2);
      setMultiplyResult(result);
    } catch (err) {
      setError('곱셈 계산 오류: ' + (err as Error).message);
    }
  };

  // 속도 계산
  const handleVelocity = () => {
    if (!wasmReady) return;
    try {
      const result = mathWasm.calculateVelocity(distance, time);
      setVelocity(result);
    } catch (err) {
      setError('속도 계산 오류: ' + (err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">물리학 계산기 (C++ WASM)</h1>

        {!wasmReady && (
          <div className="flex items-center justify-center p-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-gray-600">WASM 모듈 로딩 중...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6 shadow-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm">오류: {error}</p>
              </div>
            </div>
          </div>
        )}

        {wasmReady && (
          <div className="space-y-6">
            {/* 기본 수학 계산 */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
                <h2 className="text-xl font-medium text-blue-800">기본 수학 계산</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">첫 번째 수:</label>
                    <input
                      type="number"
                      value={num1}
                      onChange={(e) => setNum1(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">두 번째 수:</label>
                    <input
                      type="number"
                      value={num2}
                      onChange={(e) => setNum2(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleAdd}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    덧셈 계산
                  </button>
                  <button
                    onClick={handleMultiply}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    곱셈 계산
                  </button>
                </div>

                <div className="mt-4 space-y-2">
                  {addResult !== null && (
                    <p className="text-gray-800 bg-blue-50 p-3 rounded-md">
                      <span className="font-medium">덧셈 결과:</span> {num1} + {num2} ={' '}
                      <span className="font-bold text-blue-700">{addResult}</span>
                    </p>
                  )}
                  {multiplyResult !== null && (
                    <p className="text-gray-800 bg-green-50 p-3 rounded-md">
                      <span className="font-medium">곱셈 결과:</span> {num1} × {num2} ={' '}
                      <span className="font-bold text-green-700">{multiplyResult}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* 물리학 계산 */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="bg-purple-50 px-4 py-3 border-b border-purple-100">
                <h2 className="text-xl font-medium text-purple-800">물리학 계산 - 속도</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">거리 (m):</label>
                    <input
                      type="number"
                      value={distance}
                      onChange={(e) => setDistance(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">시간 (s):</label>
                    <input
                      type="number"
                      value={time}
                      onChange={(e) => setTime(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={handleVelocity}
                    className={cn(
                      'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white',
                      'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500',
                      !wasmReady && 'opacity-50 cursor-not-allowed',
                    )}
                    disabled={!wasmReady}
                  >
                    속도 계산
                  </button>
                </div>

                <div className="mt-4">
                  {velocity !== null && (
                    <p className="text-gray-800 bg-purple-50 p-3 rounded-md">
                      <span className="font-medium">속도:</span> {distance}m ÷ {time}s ={' '}
                      <span className="font-bold text-purple-700">{velocity.toFixed(2)} m/s</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2025 물리학 계산기 - C++ WebAssembly 데모</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
