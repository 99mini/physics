#include <emscripten.h>

extern "C" {
    // add 함수: 두 정수를 더하는 간단한 함수
    EMSCRIPTEN_KEEPALIVE
    int add(int a, int b) {
        return a + b;
    }
    
    // multiply 함수: 두 정수를 곱하는 함수 (추가 예제)
    EMSCRIPTEN_KEEPALIVE
    int multiply(int a, int b) {
        return a * b;
    }
    
    // 물리학 계산 예제: 속도 계산 (거리/시간)
    EMSCRIPTEN_KEEPALIVE
    double calculateVelocity(double distance, double time) {
        if (time == 0) return 0;
        return distance / time;
    }
}
