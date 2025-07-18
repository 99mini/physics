# Physics 모노레포지토리

pnpm + turborepo 기반의 물리학 계산 모노레포지토리입니다.

## 프로젝트 구조

```
physics/
├── apps/
│   ├── physics/          # React + Vite 물리학 계산 앱
│   └── web-app/          # 추가 웹 애플리케이션 (예시)
├── packages/
│   └── cpp-wasm/         # C++ → WebAssembly 컴파일 패키지
├── package.json          # 루트 패키지 설정
├── pnpm-workspace.yaml   # pnpm 워크스페이스 설정
└── turbo.json           # Turborepo 빌드 파이프라인 설정
```

## 시작하기

### 1. 의존성 설치

```bash
pnpm install
```

### 2. 개발 서버 실행

```bash
# 모든 앱 동시 실행
pnpm dev

# 특정 앱만 실행
pnpm --filter physics dev
```

### 3. 빌드

```bash
# 모든 패키지 빌드
pnpm build

# 특정 패키지만 빌드
pnpm --filter cpp-wasm build
```

## 패키지 설명

### apps/physics

React + Vite 기반의 물리학 계산 웹 애플리케이션입니다.
- C++ WASM 모듈을 사용한 고성능 계산
- 기본 수학 연산 (덧셈, 곱셈)
- 물리학 계산 (속도 계산)

### packages/cpp-wasm

C++ 코드를 WebAssembly로 컴파일하는 패키지입니다.
- Emscripten을 사용한 C++ → WASM 컴파일
- TypeScript 래퍼 제공
- 수학 및 물리학 계산 함수들

## WASM 빌드 (향후 구현)

C++ 코드를 WASM으로 컴파일하려면 Emscripten이 필요합니다:

```bash
# Emscripten 설치 후
cd packages/cpp-wasm
pnpm build:wasm
```

## 개발 가이드

### 새로운 앱 추가

1. `apps/` 폴더에 새 디렉토리 생성
2. `package.json`에 워크스페이스 의존성 설정
3. `turbo.json`에 빌드 파이프라인 추가

### 새로운 패키지 추가

1. `packages/` 폴더에 새 디렉토리 생성
2. 다른 패키지에서 `workspace:*` 형태로 의존성 추가
3. 필요시 `turbo.json`에 빌드 설정 추가

## 명령어

- `pnpm dev`: 개발 서버 실행
- `pnpm build`: 모든 패키지 빌드
- `pnpm lint`: 코드 린팅
- `pnpm test`: 테스트 실행
- `pnpm clean`: 빌드 파일 정리
