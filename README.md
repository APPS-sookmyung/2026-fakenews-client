# FakeNews Client

가짜 뉴스 판별 및 관련 정보를 제공하는 웹 서비스의 프론트엔드 프로젝트입니다.

> 현재 프로젝트 초기 구성 단계입니다. 서비스 소개, 주요 기능, 화면 이미지와 배포 주소는 개발 진행에 맞춰 업데이트합니다.

## 주요 기능


## 기술 스택

| 구분 | 기술 |
| --- | --- |
| UI | React 19 |
| Build | Vite 8 |
| Language | JavaScript (JSX) |
| Lint | Oxlint |
| Package Manager | npm |

## 시작하기

### 요구 사항

- Node.js 20 이상
- npm 10 이상


## 🌕 개발 컨벤션 🌕

### 🟡 Commit Convention

| 태그 | 설명 |
| --- | --- |
| `feat` | 새로운 기능 구현 |
| `modify` | 기능 변화가 있는 코드 수정 |
| `docs` | README, Wiki 등 문서 수정 |
| `add` | 부수적인 코드·라이브러리 추가 또는 새 파일 생성 |
| `remove` | 폴더·파일 또는 불필요한 코드 삭제 |
| `fix` | 버그 및 오류 해결 |
| `rename` | 파일 이름 변경 또는 이동 |
| `refactor` | 기능 변화 없이 코드 구조 개선 |
| `perf` | API 호출 횟수, 로딩 시간 등 성능 개선 |
| `correct` | 비즈니스 로직 변화 없는 문법·타입·이름 수정 |
| `style` | CSS 등 스타일 수정 |
| `test` | 테스트 추가 또는 수정 |
| `chore` | 빌드·패키지 설정 등 `src`, `test` 외 기타 변경 |

커밋 메시지는 한 커밋에 한 가지 작업만 담고, 명령형의 간결한 문장으로 작성합니다.

```text
#이슈번호 태그: 작업 내용
```

예시:

```bash
git commit -m "#1 feat: 회원가입 기능 구현"
```

### 🟡 Branch Convention

| 브랜치 | 설명 |
| --- | --- |
| `main` | 출시 가능한 프로덕션 코드 |
| `dev` | 다음 배포 버전의 개발 코드를 통합하는 브랜치 |
| `feat` | 기능 개발 |
| `fix` | 에러 및 버그 수정 |
| `docs` | README 및 문서 수정 |
| `refactor` | 기능 변화 없는 코드 리팩터링 |
| `modify` | 기능 변화가 있는 코드 수정 |
| `chore` | 빌드 설정 등 기타 작업 |

브랜치는 다음 형식으로 생성합니다.

```text
태그/#이슈번호-기능-이름
```

예시:

```bash
git switch -c feat/#1-login
```

작업 완료 후 대상 브랜치에 Pull Request를 생성하고, 리뷰 및 확인을 거쳐 병합합니다.

### 🟡 Issue Convention

| 태그 | 설명 |
| --- | --- |
| `feat` | 기능 추가 |
| `fix` | 에러 및 버그 수정 |
| `docs` | README 및 문서 수정 |
| `refactor` | 기능 변화 없는 코드 리팩터링 |
| `modify` | 기능 변화가 있는 코드 수정 |
| `perf` | 성능 개선 |
| `chore` | 그 외 작업 |

이슈 제목은 다음 형식으로 작성합니다.

```text
태그: 작업 내용
```

예시: `feat: user API 구현`