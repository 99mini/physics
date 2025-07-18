import { useState, useEffect } from "react";
import mathWasm from "cpp-wasm";
import "./App.css";

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
        setError("WASM 모듈 초기화에 실패했습니다: " + (err as Error).message);
        console.error("WASM 초기화 오류:", err);
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
      setError("덧셈 계산 오류: " + (err as Error).message);
    }
  };

  // 곱셈 계산
  const handleMultiply = () => {
    if (!wasmReady) return;
    try {
      const result = mathWasm.multiply(num1, num2);
      setMultiplyResult(result);
    } catch (err) {
      setError("곱셈 계산 오류: " + (err as Error).message);
    }
  };

  // 속도 계산
  const handleVelocity = () => {
    if (!wasmReady) return;
    try {
      const result = mathWasm.calculateVelocity(distance, time);
      setVelocity(result);
    } catch (err) {
      setError("속도 계산 오류: " + (err as Error).message);
    }
  };

  return (
    <div className="App">
      <h1>물리학 계산기 (C++ WASM)</h1>

      {error && <div style={{ color: "red", margin: "10px 0", padding: "10px", border: "1px solid red" }}>오류: {error}</div>}

      <div style={{ margin: "20px 0" }}>
        <strong>WASM 상태:</strong> {wasmReady ? "✅ 준비됨" : "⏳ 로딩 중..."}
      </div>

      {wasmReady && (
        <>
          {/* 기본 수학 계산 */}
          <div className="card">
            <h2>기본 수학 계산</h2>
            <div>
              <label>
                첫 번째 수:
                <input type="number" value={num1} onChange={(e) => setNum1(Number(e.target.value))} />
              </label>
            </div>
            <div>
              <label>
                두 번째 수:
                <input type="number" value={num2} onChange={(e) => setNum2(Number(e.target.value))} />
              </label>
            </div>
            <div style={{ margin: "10px 0" }}>
              <button onClick={handleAdd}>덧셈 계산</button>
              <button onClick={handleMultiply} style={{ marginLeft: "10px" }}>
                곱셈 계산
              </button>
            </div>
            <div>
              {addResult !== null && (
                <p>
                  덧셈 결과: {num1} + {num2} = {addResult}
                </p>
              )}
              {multiplyResult !== null && (
                <p>
                  곱셈 결과: {num1} × {num2} = {multiplyResult}
                </p>
              )}
            </div>
          </div>

          {/* 물리학 계산 */}
          <div className="card">
            <h2>물리학 계산 - 속도</h2>
            <div>
              <label>
                거리 (m):
                <input type="number" value={distance} onChange={(e) => setDistance(Number(e.target.value))} />
              </label>
            </div>
            <div>
              <label>
                시간 (s):
                <input type="number" value={time} onChange={(e) => setTime(Number(e.target.value))} />
              </label>
            </div>
            <div style={{ margin: "10px 0" }}>
              <button onClick={handleVelocity}>속도 계산</button>
            </div>
            <div>
              {velocity !== null && (
                <p>
                  속도: {distance}m ÷ {time}s = {velocity.toFixed(2)} m/s
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
