# FakeNews Client


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


### 🟡 개발 시 사용 파일

#### `apis/`

백엔드 서버의 API를 기능별로 나누어 관리합니다.  
컴포넌트에서 직접 HTTP 요청을 작성하지 않고, 이 폴더의 함수를 호출하여 사용합니다.

예시:
- `authApi.js` : 로그인, 회원가입 관련 API
- `postApi.js` : 게시글 조회, 작성, 수정, 삭제 API
- `memberApi.js` : 회원 정보 관련 API


#### `axios/`

API 요청에 공통으로 적용되는 Axios 설정을 관리합니다.  
서버 주소, 요청 제한 시간, 인증 토큰 및 공통 오류 처리 등을 설정합니다.

예시:
- `axiosInstance.js` : 공통 Axios 인스턴스
- `interceptors.js` : 요청 및 응답 인터셉터


#### `assets/`

프로젝트에서 사용하는 이미지, 아이콘, 폰트 등의 정적 파일을 관리합니다.

예시:
- `images/` : 로고, 프로필, 배경 등의 이미지
- `icons/` : 메뉴, 버튼 등에 사용하는 아이콘
- `fonts/` : 프로젝트에서 사용하는 폰트


#### `components/`

화면을 구성하는 작은 단위의 UI 컴포넌트를 관리합니다.  
여러 페이지에서 반복해서 사용하거나 별도로 관리할 필요가 있는 UI를 작성합니다.

예시:
- `Header.jsx` : 상단 헤더
- `Sidebar.jsx` : 사이드 메뉴
- `PostCard.jsx` : 게시글 카드
- `Button.jsx` : 공통 버튼


#### `content/`

화면에서 사용하는 정적인 문구나 목록 데이터를 관리합니다.  
자주 변경되지 않지만 여러 컴포넌트에서 사용하는 콘텐츠를 분리하여 작성합니다.

예시:
- `menuItems.js` : 메뉴 항목 목록
- `categoryContent.js` : 카테고리 정보
- `guideContent.js` : 안내 문구 및 도움말


#### `hooks/`

여러 컴포넌트에서 반복해서 사용하는 React 로직을 Custom Hook으로 관리합니다.  
파일 이름은 React 관례에 따라 `use`로 시작합니다.

예시:
- `useAuth.js` : 로그인 상태 및 인증 관련 로직
- `usePosts.js` : 게시글 데이터 처리 로직
- `useDebounce.js` : 검색 입력 지연 처리 로직


#### `layout/`

여러 페이지에서 공통으로 사용하는 화면의 기본 구조를 관리합니다.  
헤더, 사이드바, 본문 영역처럼 페이지 전체의 배치를 담당합니다.

예시:
- `MainLayout.jsx` : 일반 페이지 공통 레이아웃
- `AuthLayout.jsx` : 로그인 및 회원가입 페이지 레이아웃


#### `lib/`

외부 라이브러리의 초기화 코드나 프로젝트 전반에서 사용하는 공통 모듈을 관리합니다.  
특정 화면에 종속되지 않는 라이브러리 관련 설정을 작성합니다.

예시:
- `queryClient.js` : TanStack Query 설정
- `storage.js` : 로컬 스토리지 사용 함수
- `date.js` : 날짜 라이브러리 설정 및 공통 처리 함수


#### `pages/`

하나의 완성된 화면 단위를 관리합니다.  
페이지 이동 시 보여지는 화면은 이 폴더에 작성합니다.

예시:
- `LoginPage.jsx` : 로그인 화면
- `SignupPage.jsx` : 회원가입 화면
- `MainPage.jsx` : 메인 화면
- `PostCreatePage.jsx` : 게시글 작성 화면
- `PostDetailPage.jsx` : 게시글 상세 화면


#### `App.jsx`

애플리케이션 전체의 최상위 컴포넌트입니다.  
주로 페이지 라우팅 및 전체적인 화면 구조를 관리합니다.

개별 페이지의 UI를 직접 작성하기보다는 `pages/`에 작성된 페이지들을 연결하는 역할로 사용합니다.


#### `main.jsx`

React 애플리케이션의 시작점(Entry Point)입니다.  
`App.jsx`를 불러와 실제 HTML의 `root` 영역에 React 애플리케이션을 렌더링합니다.

일반적인 화면 UI는 `main.jsx`에 직접 작성하지 않습니다.
