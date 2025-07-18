// WebAssembly 모듈 타입 정의
interface MathWasmModule {
  ccall: (name: string, returnType: string, argTypes: string[], args: any[]) => any;
  cwrap: (name: string, returnType: string, argTypes: string[]) => Function;
}

// 모듈 로더 함수 타입
declare function MathModule(): Promise<MathWasmModule>;

// 전역 변수로 MathModule 선언
declare global {
  interface Window {
    MathModule: () => Promise<MathWasmModule>;
  }
}

// 동적으로 모듈 로드
const moduleLoader = async (): Promise<MathWasmModule> => {
  try {
    if (typeof window !== "undefined" && window.MathModule) {
      return await window.MathModule();
    } else {
      // @ts-ignore
      const MathModule = (await import("../dist/math.js")).default;
      return MathModule();
    }
  } catch (error) {
    console.error("WASM 모듈 로드 실패:", error);
    throw error;
  }
};

// 래퍼 클래스
export class MathWasm {
  private module: MathWasmModule | null = null;

  async initialize(): Promise<void> {
    if (this.module) return;

    try {
      console.log("WASM 모듈 초기화 중...");

      // 모듈 로더를 통해 WASM 모듈 로드
      this.module = await moduleLoader();
      console.log("WASM 모듈 로드됨:", this.module);

      console.log("WASM 모듈 초기화 완료");
    } catch (error) {
      console.error("WASM 모듈 초기화 실패:", error);
      throw error;
    }
  }

  // 두 수를 더하는 함수
  add(a: number, b: number): number {
    if (!this.module) {
      throw new Error("WASM 모듈이 초기화되지 않았습니다. initialize()를 먼저 호출하세요.");
    }

    return this.module.ccall("add", "number", ["number", "number"], [a, b]);
  }

  // 두 수를 곱하는 함수
  multiply(a: number, b: number): number {
    if (!this.module) {
      throw new Error("WASM 모듈이 초기화되지 않았습니다. initialize()를 먼저 호출하세요.");
    }
    return this.module.ccall("multiply", "number", ["number", "number"], [a, b]);
  }

  // 속도 계산 함수
  calculateVelocity(distance: number, time: number): number {
    if (!this.module) {
      throw new Error("WASM 모듈이 초기화되지 않았습니다. initialize()를 먼저 호출하세요.");
    }
    return this.module.ccall("calculateVelocity", "number", ["number", "number"], [distance, time]);
  }
}

// 싱글톤 인스턴스 생성
const mathWasm = new MathWasm();

export default mathWasm;
