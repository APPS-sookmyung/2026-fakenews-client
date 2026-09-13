import React, { useState } from 'react';
import fakenewsLogo from '../assets/fakenews_logo.png';

export default function PostDetailPage() {
  // 1. 게시글 반응 상태
  const [likes, setLikes] = useState(224);
  const [isLiked, setIsLiked] = useState(false);
  const [reposts, setReposts] = useState(142);
  const [isReposted, setIsReposted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 2. 모달 제어 상태
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);

  // 신고 폼 상태
  const [reportReason, setReportReason] = useState('허위 정보 / 가짜 뉴스');
  const [reportDetail, setReportDetail] = useState('');

  // 3. 댓글 상태
  const [comments, setComments] = useState([
    {
      id: 1,
      author: '이승이',
      role: '일반 사용자',
      time: '28분 전',
      content: '와 진짜라면 너무 무섭네요... 사생활 다 감시당하는 건가요?',
      likes: 32,
      isLiked: false
    },
    {
      id: 2,
      author: '박지민',
      role: '일반 사용자',
      time: '25분 전',
      content: '출처가 어딘지 궁금하네요. 믿기엔 좀 과한데요?',
      likes: 18,
      isLiked: false
    },
    {
      id: 3,
      author: '김도헌',
      role: '기자',
      time: '20분 전',
      content: '추가 취재 중입니다. 확인되는 대로 업데이트하겠습니다.',
      likes: 25,
      isLiked: false
    }
  ]);
  const [newComment, setNewComment] = useState('');

  // 핸들러
  const handleAddComment = (e) => {
    e?.preventDefault();
    if (!newComment.trim()) return;
    const commentObj = {
      id: Date.now(),
      author: '김솔이',
      role: '일반 사용자',
      time: '방금 전',
      content: newComment.trim(),
      likes: 0,
      isLiked: false
    };
    setComments([...comments, commentObj]);
    setNewComment('');
  };

  const togglePostLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  const toggleRepost = () => {
    setIsReposted(!isReposted);
    setReposts(isReposted ? reposts - 1 : reposts + 1);
  };

  const handleReportSubmit = () => {
    alert(`[신고 접수 완료]\n유형: ${reportReason}\n상세내용: ${reportDetail || '없음'}`);
    setIsReportModalOpen(false);
    setReportDetail('');
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] flex flex-col font-sans text-[#33363F]">
      
      {/* ================= 1. 상단 글로벌 헤더 (Figma: rectangle-1) ================= */}
      <header className="h-[72px] bg-white border-b border-[rgba(0,0,0,0.2)] pl-4 pr-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        {/* 좌측 로고 */}
        <div className="flex items-center w-52">
          <img 
            src={fakenewsLogo} 
            alt="FakeNews Simulator Logo" 
            className="h-28 w-auto object-contain cursor-pointer -ml-1"
          />
        </div>

        {/* 중앙 메뉴 버튼 + 검색창 (Figma: menu + rectangle-9) */}
        <div className="flex-1 max-w-[620px] flex items-center gap-4 mx-6">
          <button type="button" className="text-[#33363F] p-1 cursor-pointer">
            <svg className="w-7 h-7" viewBox="0 0 60 60" fill="none">
              <path d="M12.5 17.5H47.5" stroke="#33363F" strokeWidth="4" strokeLinecap="round"/>
              <path d="M12.5 30H47.5" stroke="#33363F" strokeWidth="4" strokeLinecap="round"/>
              <path d="M12.5 42.5H47.5" stroke="#33363F" strokeWidth="4" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="flex-1">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-full h-11 bg-white border border-[rgba(0,0,0,0.32)] rounded-[19px] px-5 text-sm focus:outline-none focus:border-[#33363F] placeholder-[#7D8891]"
            />
          </div>
        </div>

        {/* 우측 알림 + 프로필 (Figma: bell-pin1 + user-cicrle-duotone0 + div7/div8) */}
        <div className="flex items-center gap-5">
          <button type="button" className="cursor-pointer">
            <svg className="w-7 h-7" viewBox="0 0 42 42" fill="none">
              <path d="M20.55 3.3C21.99 3.3 22.88 3.3 23.67 3.42C25.19 3.67 26.6 4.28 27.79 5.16C26.96 5.74 26.26 6.51 25.78 7.41C25.01 6.9 24.13 6.54 23.19 6.38C22.7 6.3 22.1 6.3 20.55 6.3C19 6.3 18.4 6.3 17.91 6.38C15.42 6.79 13.38 8.61 12.7 11.05L11.88 17.63C11.74 18.93 11.65 19.75 11.43 20.54C11.14 21.39 10.41 22.87 9.74 23.99L7.9 27.04C7.73 27.33 7.58 27.58 7.46 27.79H32.77C33.11 27.79 33.39 27.8 33.64 27.79C33.52 27.58 33.37 27.33 33.2 27.04L31.36 23.99C30.69 22.87 29.96 21.39 29.67 20.54C29.45 19.74 29.22 17.63 29.09 16.54C29.84 16.83 30.65 17 31.5 17C31.72 17 32.16 16.97 32.2 17.3C32.35 18.69 32.56 19.72 32.76 20.3L35.77 25.5C36.22 26.13 36.74 27.27 36.71 29.53C36.22 30.4 34.79 30.72 32.77 30.8H8.33C7.6 30.8 5.74 30.63 4.39 29.53C3.9 28.66 4.36 27.27 4.58 26.74L7.17 22.44C7.89 21.24 8.35 20.3 8.54 19.72L9.34 13.33C9.81 10.24 13.78 4.02 17.43 3.42C18.22 3.3 19.11 3.3 20.55 3.3Z" fill="#33363F"/>
              <path d="M15.93 30.91C16.23 32.59 16.89 34.07 17.8 35.12C18.72 36.18 19.84 36.75 21 36.75C22.16 36.75 23.28 36.18 24.2 35.12C25.11 34.07 25.77 32.59 26.07 30.91" stroke="#33363F" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="31.5" cy="10.5" r="4" fill="#33363F"/>
            </svg>
          </button>

          <div className="flex items-center gap-3">
            <svg className="w-11 h-11" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="25" fill="#7E869E" fillOpacity="0.25"/>
              <circle cx="30" cy="23" r="9" fill="#222222"/>
              <path d="M30 35C36.6 35 42.2 38.5 44.6 43.4C41.7 46 38.1 47.7 34 48.1C33.1 48.2 30 48.2 30 48.2C27.9 48.2 26.8 48.2 26 48.1C21.9 47.7 18.3 46 15.4 43.4C17.8 38.5 23.4 35 30 35Z" fill="#222222"/>
            </svg>
            <div className="flex flex-col text-left">
              <span className="text-[14px] font-bold text-black leading-tight">김솔이</span>
              <span className="text-[12px] text-[#7D8891]">일반 사용자</span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= 2. 중앙 전체 레이아웃 (사이드바 + 상세 본문) ================= */}
      <div className="flex flex-1 w-full">
        
        {/* 좌측 사이드바 (상단 메뉴 + 하단 사용자 역할 카드 + 로그아웃) */}
        <aside className="w-[240px] bg-white border-r border-[rgba(0,0,0,0.32)] py-6 px-3 flex flex-col justify-between shrink-0">
          
          {/* A. 상단 네비게이션 메뉴 */}
          <div className="flex flex-col gap-2">
            <div className="mx-2 px-6 py-3.5 bg-[#E4E4E4] rounded-[10px] flex items-center gap-4 cursor-pointer">
              <svg className="w-6 h-6" viewBox="0 0 35 35" fill="none">
                <path d="M7.29 18.61C7.29 16.63 7.29 15.64 7.69 14.77C8.09 13.9 8.84 13.25 10.35 11.96L11.81 10.71C14.52 8.39 15.88 7.22 17.5 7.22C19.12 7.22 20.48 8.39 23.19 10.71L24.65 11.96C26.16 13.25 26.91 13.9 27.31 14.77C27.71 15.64 27.71 16.63 27.71 18.61V24.79C27.71 27.54 27.71 28.92 26.85 29.77C26 30.63 24.63 30.63 21.88 30.63H13.13C10.38 30.63 9 30.63 8.15 29.77C7.29 28.92 7.29 27.54 7.29 24.79V18.61Z" stroke="#33363F" strokeWidth="2.8"/>
              </svg>
              <span className="text-[17px] font-bold text-black">홈</span>
            </div>

            <div className="px-8 py-3 flex items-center justify-between hover:bg-gray-50 rounded-xl cursor-pointer">
              <div className="flex items-center gap-4">
                <svg className="w-6 h-6" viewBox="0 0 35 35" fill="none">
                  <path d="M17.38 2.5C19.29 2.53 21.08 3.12 22.56 4.12C21.77 4.75 21.15 5.58 20.76 6.53C19.77 5.89 18.6 5.52 17.34 5.5H16.91C13.66 5.54 10.95 7.98 10.54 11.2L10.15 14.72C10.06 15.52 10.01 16.03 9.9 16.53C9.75 17.22 9.52 17.89 9.22 18.52C9.01 18.99 8.74 19.42 8.33 20.12L7.1 22.16H26.72L25.92 20.12C25.5 19.42 25.24 18.99 25.02 18.52C24.73 17.89 24.5 17.22 24.35 16.53L24.04 14.24C24.73 14.52 25.47 14.67 26.25 14.67L26.77 11.62C24.56 11.58 23.33 10.31 23.33 8.75C23.33 7.67 23.92 6.73 24.8 6.22C25.8 7.52 26.47 9.1 26.68 10.82L26.71 11.08C27.18 15.31 27.28 15.89 27.74 17.25L29.72 20.62C30.69 22.39 30.66 24.65 28.73 25.84C28.17 25.92 27.45 25.92 26.72 25.92H7.53C6.8 25.92 6.08 25.92 5.51 25.84C4.08 25.51 3.59 24.65 3.56 22.39L4.53 20.62C5.76 18.57 6.51 17.25 6.97 15.89L7.54 11.08C8.15 6.12 12.12 2.56 16.87 2.5H17.38Z" fill="#33363F"/>
                  <path d="M13.27 25.76C13.52 27.16 14.07 28.39 14.84 29.27C15.6 30.15 16.54 30.63 17.5 30.63C18.46 30.63 19.4 30.15 20.16 29.27C20.93 28.39 21.48 27.16 21.73 25.76" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="26.25" cy="8.75" r="3.4" fill="#33363F"/>
                </svg>
                <span className="text-[17px] text-black">알림</span>
              </div>
              <span className="w-6 h-6 bg-black text-white text-[12px] font-bold rounded-full flex items-center justify-center">
                3
              </span>
            </div>

            <div className="px-8 py-3 flex items-center gap-4 hover:bg-gray-50 rounded-xl cursor-pointer">
              <svg className="w-6 h-6" viewBox="0 0 35 35" fill="none">
                <path d="M27.35 8.59C28.33 10.06 28.33 12.11 28.33 16.21C28.33 20.3 28.33 22.35 27.35 23.82C26.92 24.46 26.38 25.01 25.74 25.43C24.46 26.29 22.73 26.4 19.58 26.41V26.42L17.97 29.64C17.43 30.72 15.9 30.72 15.36 29.64L13.75 26.42V26.41C10.6 26.4 8.88 26.29 7.59 25.43C6.96 25.01 6.41 24.46 5.98 23.82C5 22.35 5 20.3 5 16.21C5 12.11 5 10.06 5.98 8.59C6.41 7.96 6.96 7.41 7.59 6.98C9.06 6 11.11 6 15.21 6H18.13C22.22 6 24.27 6 25.74 6.98C26.38 7.41 26.92 7.96 27.35 8.59Z" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.13 13.13H21.88" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M13.13 18.96H17.5" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <span className="text-[17px] text-black">채팅</span>
            </div>

            <div className="px-8 py-3 flex items-center gap-4 hover:bg-gray-50 rounded-xl cursor-pointer">
              <svg className="w-6 h-6" viewBox="0 0 35 35" fill="none">
                <circle cx="17.5" cy="10.2" r="5.8" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M8.37 24.67C9.28 21.95 11.98 20.42 14.85 20.42H20.15C23.02 20.42 25.72 21.95 26.63 24.67C27.12 26.14 27.55 27.86 27.67 29.63C27.71 30.18 27.26 30.62 26.71 30.62H8.29C7.74 30.62 7.29 30.18 7.33 29.63C7.45 27.86 7.88 26.14 8.37 24.67Z" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <span className="text-[17px] text-black">프로필</span>
            </div>

            <div className="px-8 py-3 flex items-center gap-4 hover:bg-gray-50 rounded-xl cursor-pointer">
              <div className="w-6 h-6 flex items-end justify-between p-0.5 border border-[#33363F] rounded-xs">
                <div className="w-1.5 h-3 bg-[#33363F]" />
                <div className="w-1.5 h-2 bg-[#33363F]" />
                <div className="w-1.5 h-4 bg-[#33363F]" />
              </div>
              <span className="text-[17px] text-black">대시보드</span>
            </div>

            <div className="px-8 py-3 flex items-center gap-4 hover:bg-gray-50 rounded-xl cursor-pointer">
              <svg className="w-6 h-6" viewBox="0 0 35 35" fill="none">
                <circle cx="17.5" cy="17.5" r="5" stroke="#33363F" strokeWidth="2.5"/>
                <path d="M17.5 3V6M17.5 29V32M3 17.5H6M29 17.5H32M7.2 7.2L9.3 9.3M25.7 25.7L27.8 27.8M7.2 27.8L9.3 25.7M25.7 9.3L27.8 7.2" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              <span className="text-[17px] text-black">설정</span>
            </div>
          </div>

          {/* B. 하단 사용자 역할 카드 & 로그아웃 (Figma: rectangle-4171 + rectangle-4173) */}
          <div className="flex flex-col gap-3 mt-8">
            <div className="w-full bg-white border border-[rgba(0,0,0,0.32)] rounded-[19px] p-4 flex flex-col items-center text-center shadow-xs">
              <span className="text-[13px] text-[#7D8891] mb-2 self-start font-medium">현재 역할</span>
              
              <div className="flex items-center gap-2 mb-2 self-start">
                <svg className="w-9 h-9" viewBox="0 0 50 50" fill="none">
                  <circle cx="25" cy="25" r="20" fill="#7E869E" fillOpacity="0.25"/>
                  <circle cx="25" cy="20" r="7.5" fill="#222222"/>
                  <path d="M25 28C30 28 34 31 36 35C33 38 29 40 25 40C21 40 17 38 14 35C16 31 20 28 25 28Z" fill="#222222"/>
                </svg>
                <span className="text-[16px] font-bold text-black">일반 사용자</span>
              </div>

              <p className="text-[12px] text-gray-700 text-left leading-relaxed mb-4">
                피드를 탐색하고<br />
                게시글에 반응하며<br />
                정보 확산에 영향을 미칩니다
              </p>

              <button
                type="button"
                onClick={() => alert('역할 변경 모달')}
                className="w-full py-2 bg-white border border-[rgba(0,0,0,0.32)] rounded-[14px] text-[14px] font-bold text-black hover:bg-gray-50 transition cursor-pointer shadow-2xs"
              >
                역할 변경
              </button>
            </div>

            <button
              type="button"
              onClick={() => alert('로그아웃 되었습니다.')}
              className="w-full h-12 bg-black text-white rounded-[16px] flex items-center justify-center gap-3 text-[15px] font-bold hover:bg-gray-800 transition cursor-pointer shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 34" fill="none">
                <path d="M0 8.55L0 4.61C0 2.47 0 1.39 0.69 0.8C1.38 0.2 2.44 0.35 4.57 0.65L18.18 2.6C20.64 2.95 21.87 3.12 22.6 3.97C23.33 4.82 23.33 6.06 23.33 8.54V24.8C23.33 27.28 23.33 28.52 22.6 29.36C21.87 30.21 20.64 30.39 18.18 30.74L4.57 32.68C2.44 32.98 1.38 33.14 0.69 32.54C0 31.94 0 30.87 0 28.72L0 25.11" stroke="white" strokeWidth="2.5"/>
              </svg>
              <span>로그아웃</span>
            </button>
          </div>

        </aside>

        {/* ================= 중앙 메인 콘텐츠 (피그마 2중 카드 구조 반영) ================= */}
        <main className="flex-1 p-8 flex justify-center items-start overflow-y-auto">
          {/* 외곽 1차 큰 흰색 카드 (Figma: rectangle-4192) */}
          <div className="w-full max-w-[1229px] bg-white rounded-[15px] p-6 shadow-xs flex flex-col gap-4">
            
            {/* 상단: 피드로 돌아가기 버튼 (Figma: div14) */}
            <button
              type="button"
              onClick={() => alert('피드로 돌아갑니다.')}
              className="flex items-center gap-2 text-[20px] font-bold text-black hover:text-blue-600 transition self-start cursor-pointer px-2 py-1"
            >
              <span>←</span>
              <span>피드로 돌아가기</span>
            </button>

            {/* 내부 2차 포스트 상세 카드 (Figma: rectangle-4193) */}
            <div className="w-full bg-white border border-[#7D8891] rounded-[15px] p-8 flex flex-col gap-6">
              
              {/* 1. 작성자 헤더 */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <svg className="w-12 h-12" viewBox="0 0 60 60" fill="none">
                    <circle cx="30" cy="30" r="25" fill="#7E869E" fillOpacity="0.25"/>
                    <circle cx="30" cy="23" r="9" fill="#65AAD9"/>
                    <path d="M30 35C36.6 35 42.2 38.5 44.6 43.4C41.7 46 38.1 47.7 34 48.1C33.1 48.2 30 48.2 30 48.2C27.9 48.2 26.8 48.2 26 48.1C21.9 47.7 18.3 46 15.4 43.4C17.8 38.5 23.4 35 30 35Z" fill="#65AAD9"/>
                  </svg>
                  <div className="flex items-center gap-2">
                    <span className="text-[18px] font-bold text-black">김기자</span>
                    <span className="bg-[rgba(101,170,217,0.53)] text-black text-[13px] px-3 py-0.5 rounded-[23px] font-medium">
                      기자
                    </span>
                    <span className="text-[14px] text-[#7D9188] ml-1">· 34분 전</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-500">
                  <button
                    type="button"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className="cursor-pointer hover:text-black"
                  >
                    <svg className={`w-6 h-6 ${isBookmarked ? 'fill-black stroke-black' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>
                  </button>
                  <button type="button" className="cursor-pointer hover:text-black text-xl font-bold">
                    •••
                  </button>
                </div>
              </div>

              {/* 2. 본문 내용 */}
              <div className="text-[17px] text-black leading-relaxed font-normal">
                <p className="font-bold mb-3 text-[19px]">
                  [단독] 정부가 내년부터 국민의 일상 데이터를 ‘건강 점수’로 관리한다?
                </p>
                <p className="text-gray-800 leading-8">
                  복수의 내부 관계자에 따르면 보건복지부는 스마트폰, 카드 사용, 수면 패턴 등 일상 데이터를 종합해 국민 개개인의 ‘건강 점수’를 산출하는 시범 사업을 준비 중이라고 합니다.<br />
                  이 점수가 낮으면 보험료 인상은 물론, 일부 복지 혜택에서도 제외될 수 있다고 전해졌습니다.
                </p>
              </div>

              {/* 3. 본문 이미지 */}
              <div className="w-full max-w-[800px] rounded-xl overflow-hidden border border-gray-300 shadow-xs">
                <img
                  src="https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=900"
                  alt="국회 취재 사진"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* 4. 해시태그 */}
              <div className="flex flex-wrap items-center gap-3">
                {['건강점수제', '정부정책', '단독보도', '생활감시'].map((tag) => (
                  <span
                    key={tag}
                    className="h-10 px-4 bg-[#E1E7F0] rounded-[15px] flex items-center text-[15px] font-bold text-black"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* 5. 인터랙션 바 */}
              <div className="flex items-center justify-between py-4 border-y border-gray-200">
                <div className="flex items-center gap-8">
                  <button
                    type="button"
                    onClick={togglePostLike}
                    className={`flex items-center gap-2 text-[17px] font-medium cursor-pointer transition ${isLiked ? 'text-red-500' : 'text-black hover:opacity-70'}`}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                    <span>{likes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={toggleRepost}
                    className={`flex items-center gap-2 text-[17px] font-medium cursor-pointer transition ${isReposted ? 'text-green-600' : 'text-black hover:opacity-70'}`}
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="17 1 21 5 17 9"/>
                      <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                      <polyline points="7 23 3 19 7 15"/>
                      <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                    </svg>
                    <span>{reposts}</span>
                  </button>

                  <div className="flex items-center gap-2 text-[17px] font-medium text-black">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                    </svg>
                    <span>89</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(true)}
                  className="flex items-center gap-2 text-[16px] font-bold text-black hover:text-red-600 transition cursor-pointer"
                >
                  <span className="text-red-500 text-lg">⚠️</span>
                  <span>신고</span>
                </button>
              </div>

              {/* 6. 확산 현황 지표 4종 */}
              <div>
                <h3 className="text-[19px] font-bold text-black mb-4">1. 확산 현황</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white border-2 border-black rounded-[15px] p-4 flex items-center gap-3">
                    <span className="text-3xl">👥</span>
                    <div className="flex flex-col">
                      <span className="text-[12px] text-gray-500 font-medium">도달 사용자</span>
                      <span className="text-[18px] font-bold text-black">1,248명</span>
                    </div>
                  </div>

                  <div className="bg-white border-2 border-black rounded-[15px] p-4 flex items-center gap-3">
                    <span className="text-3xl">🔁</span>
                    <div className="flex flex-col">
                      <span className="text-[12px] text-gray-500 font-medium">리포스트</span>
                      <span className="text-[18px] font-bold text-black">142회</span>
                    </div>
                  </div>

                  <div className="bg-white border-2 border-black rounded-[15px] p-4 flex items-center gap-3">
                    <span className="text-3xl">🔀</span>
                    <div className="flex flex-col">
                      <span className="text-[12px] text-gray-500 font-medium">변형 횟수</span>
                      <span className="text-[18px] font-bold text-black">4회</span>
                    </div>
                  </div>

                  <div className="bg-white border-2 border-black rounded-[15px] p-4 flex items-center gap-3">
                    <span className="text-3xl">📈</span>
                    <div className="flex flex-col">
                      <span className="text-[12px] text-gray-500 font-medium">확산현황</span>
                      <span className="text-[18px] font-bold text-blue-600">+235%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. 공유 네트워크 시각화 & 변형 경로 타임라인 */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-gray-200">
                <div className="lg:col-span-5 flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[19px] font-bold text-black">2. 공유 네트워크 시각화</h3>
                    <button
                      type="button"
                      onClick={() => setIsNetworkModalOpen(true)}
                      className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      상세보기 ↗
                    </button>
                  </div>
                  
                  <div
                    onClick={() => setIsNetworkModalOpen(true)}
                    className="w-full h-72 bg-gray-50 hover:bg-gray-100/70 border border-gray-300 rounded-[15px] flex flex-col items-center justify-center p-4 relative overflow-hidden cursor-pointer transition group shadow-2xs"
                  >
                    <div className="relative w-48 h-48 flex items-center justify-center pointer-events-none">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md z-10">
                        원문
                      </div>
                      <div className="absolute top-4 left-6 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-[10px]">A</div>
                      <div className="absolute top-4 right-6 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-[10px]">B</div>
                      <div className="absolute bottom-6 left-8 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-[10px]">C</div>
                      <div className="absolute bottom-6 right-8 w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px]">현재</div>
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 192 192">
                        <line x1="96" y1="96" x2="40" y2="40" stroke="#CBD5E1" strokeWidth="2"/>
                        <line x1="96" y1="96" x2="152" y2="40" stroke="#CBD5E1" strokeWidth="2"/>
                        <line x1="96" y1="96" x2="56" y2="146" stroke="#CBD5E1" strokeWidth="2"/>
                        <line x1="96" y1="96" x2="136" y2="146" stroke="#65AAD9" strokeWidth="2.5"/>
                      </svg>
                    </div>
                    <span className="text-[12px] text-gray-500 mt-2 font-medium">
                      클릭하여 전체 네트워크 구조 확대 보기
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-7 flex flex-col">
                  <h3 className="text-[19px] font-bold text-black mb-4">3. 원 작성자부터 현재 게시글까지의 변형 경로</h3>
                  <div className="flex flex-col gap-3">
                    <div className="bg-white border-2 border-[#7D8891] rounded-[12px] p-3.5 flex justify-between items-start shadow-2xs">
                      <div>
                        <div className="text-[14px] font-bold text-black mb-1">
                          1 원 작성자 <span className="text-gray-600 font-medium">김기자(기자)</span>
                        </div>
                        <p className="text-[13px] text-gray-700">원문: “강력 검토 단계로, 구체적 도입 일정은 미정입니다.”</p>
                      </div>
                      <span className="text-[12px] text-[#7D9188] whitespace-nowrap">· 3일 전</span>
                    </div>

                    <div className="bg-white border-2 border-[#7D8891] rounded-[12px] p-3.5 flex justify-between items-start shadow-2xs">
                      <div>
                        <div className="text-[14px] font-bold text-black mb-1">
                          2 사용자 A <span className="text-gray-600 font-medium">일반 사용자</span>
                        </div>
                        <p className="text-[13px] text-gray-700">수정: “정부가 곧 건강 점수제로 국민을 관리합니다.”</p>
                      </div>
                      <span className="text-[12px] text-[#7D9188] whitespace-nowrap">· 2일 전</span>
                    </div>

                    <div className="bg-white border-2 border-[#7D8891] rounded-[12px] p-3.5 flex justify-between items-start shadow-2xs">
                      <div>
                        <div className="text-[14px] font-bold text-black mb-1">
                          3 사용자 B <span className="text-gray-600 font-medium">일반 사용자</span>
                        </div>
                        <p className="text-[13px] text-gray-700">수정: “점수 낮으면 보험료 인상, 복지 혜택도 박탈 예정!”</p>
                      </div>
                      <span className="text-[12px] text-[#7D9188] whitespace-nowrap">· 5시간 전</span>
                    </div>

                    <div className="bg-blue-50/60 border-2 border-blue-400 rounded-[12px] p-3.5 flex justify-between items-start shadow-2xs">
                      <div>
                        <div className="text-[14px] font-bold text-blue-900 mb-1">
                          4 현재 게시글 <span className="text-blue-700 font-medium">김기자(기자)</span>
                        </div>
                        <p className="text-[13px] text-blue-950 font-medium">
                          수정: “정부, 건강 점수제 전면 도입 추진. 건강 점수 낮으면 보험료 높아지고 복지 혜택 감소할 수 있음”
                        </p>
                      </div>
                      <span className="text-[12px] text-blue-500 whitespace-nowrap font-medium">· 34분 전</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 8. 댓글 영역 */}
              <div className="pt-6 border-t border-gray-200 flex flex-col gap-6">
                <h3 className="text-[19px] font-bold text-black">댓글 {comments.length}</h3>

                <form onSubmit={handleAddComment} className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#E5EDF5] text-[#2B6CB0] flex items-center justify-center font-bold text-sm shrink-0">
                    김
                  </div>
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    className="flex-1 h-12 bg-white border-2 border-black rounded-[12px] px-4 text-[15px] focus:outline-none placeholder-[#7D8891]"
                  />
                  <button
                    type="submit"
                    className="h-12 px-6 bg-black text-white text-[15px] font-bold rounded-[14px] hover:bg-gray-800 transition cursor-pointer shrink-0 shadow-xs"
                  >
                    등록
                  </button>
                </form>

                <div className="flex flex-col gap-5 pt-2">
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start justify-between pb-4 border-b border-gray-100 last:border-none">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-sm text-gray-700 shrink-0">
                          {comment.author[0]}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[15px] font-bold text-black">{comment.author}</span>
                            <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${comment.role === '기자' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                              {comment.role}
                            </span>
                            <span className="text-[12px] text-[#7D9188] ml-1">{comment.time}</span>
                          </div>
                          <p className="text-[15px] text-gray-900 leading-normal">{comment.content}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setComments(comments.map(c => c.id === comment.id ? { ...c, isLiked: !c.isLiked, likes: c.isLiked ? c.likes - 1 : c.likes + 1 } : c));
                          }}
                          className="flex items-center gap-1 hover:text-red-500 cursor-pointer"
                        >
                          <span>{comment.isLiked ? '❤️' : '🤍'}</span>
                          <span>좋아요 {comment.likes}</span>
                        </button>
                        <button type="button" className="hover:text-black cursor-pointer font-medium">
                          답글
                        </button>
                        <button type="button" className="hover:text-black cursor-pointer">
                          •••
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </main>
      </div>

      {/* ================= 3. 모달 1: 공유 네트워크 상세 보기 확대 팝업 ================= */}
      {isNetworkModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[20px] p-6 w-full max-w-2xl shadow-2xl relative flex flex-col gap-4">
            
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-lg font-bold text-black">공유 네트워크 상세 보기</h3>
              <button
                type="button"
                onClick={() => setIsNetworkModalOpen(false)}
                className="text-gray-400 hover:text-black text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="w-full h-80 bg-gray-50 border border-gray-200 rounded-xl relative flex items-center justify-center p-4 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 500 300">
                <line x1="250" y1="150" x2="180" y2="80" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="250" y1="150" x2="320" y2="80" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="250" y1="150" x2="130" y2="150" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="250" y1="150" x2="370" y2="150" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="250" y1="150" x2="180" y2="220" stroke="#CBD5E1" strokeWidth="2"/>
                <line x1="250" y1="150" x2="320" y2="220" stroke="#65AAD9" strokeWidth="2.5"/>

                <line x1="180" y1="80" x2="120" y2="60" stroke="#E2E8F0" strokeWidth="1.5"/>
                <line x1="180" y1="80" x2="160" y2="30" stroke="#E2E8F0" strokeWidth="1.5"/>
                <line x1="320" y1="80" x2="380" y2="50" stroke="#E2E8F0" strokeWidth="1.5"/>
                <line x1="370" y1="150" x2="440" y2="140" stroke="#E2E8F0" strokeWidth="1.5"/>
                <line x1="370" y1="150" x2="420" y2="190" stroke="#E2E8F0" strokeWidth="1.5"/>
                <line x1="180" y1="220" x2="120" y2="250" stroke="#E2E8F0" strokeWidth="1.5"/>
                <line x1="320" y1="220" x2="390" y2="260" stroke="#65AAD9" strokeWidth="2"/>

                <circle cx="250" cy="150" r="14" fill="#2563EB" />
                <text x="250" y="154" fill="white" fontSize="10" textAnchor="middle" fontWeight="bold">원문</text>

                <circle cx="180" cy="80" r="10" fill="#94A3B8" />
                <circle cx="320" cy="80" r="10" fill="#94A3B8" />
                <circle cx="130" cy="150" r="10" fill="#94A3B8" />
                <circle cx="370" cy="150" r="10" fill="#94A3B8" />
                <circle cx="180" cy="220" r="10" fill="#94A3B8" />
                
                <circle cx="320" cy="220" r="13" fill="#3B82F6" stroke="#DBEAFE" strokeWidth="3"/>
                <text x="320" y="224" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold">현재</text>

                <circle cx="120" cy="60" r="6" fill="#CBD5E1" />
                <circle cx="160" cy="30" r="6" fill="#CBD5E1" />
                <circle cx="380" cy="50" r="6" fill="#CBD5E1" />
                <circle cx="440" cy="140" r="6" fill="#CBD5E1" />
                <circle cx="420" cy="190" r="6" fill="#CBD5E1" />
                <circle cx="120" cy="250" r="6" fill="#CBD5E1" />
                <circle cx="390" cy="260" r="8" fill="#93C5FD" />
              </svg>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-600 inline-block"></span> 원 작성자 게시글
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> 현재 게시글
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-gray-400 inline-block"></span> 공유된 게시글
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsNetworkModalOpen(false)}
                className="px-6 py-2 border-2 border-gray-400 rounded-xl text-sm font-bold text-gray-800 hover:bg-gray-50 transition cursor-pointer"
              >
                닫기
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= 4. 모달 2: 게시글 신고 팝업 (Figma: 신고페이지) ================= */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[20px] p-7 w-full max-w-md shadow-2xl relative flex flex-col gap-4">
            
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <h3 className="text-xl font-black text-black">게시글 신고</h3>
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="text-gray-400 hover:text-black text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs font-bold text-gray-800">해당 게시글의 문제 유형을 선택해주세요.</p>

            <div className="flex flex-col gap-2.5">
              {[
                { title: '허위 정보 / 가짜 뉴스', desc: '사실이 아닌 정보를 사실처럼 유포하고 있어요' },
                { title: '욕설 / 혐오 표현', desc: '누군가를 비하하거나 혐오감을 주는 내용이에요' },
                { title: '음란물 / 성적 콘텐츠', desc: '부적절한 성적 내용이 포함되어 있어요' },
                { title: '스팸 / 광고', desc: '반복적으로 광고나 홍보성 내용을 올려요' },
                { title: '기타', desc: '기타 부적절한 내용이에요' }
              ].map((item) => (
                <label
                  key={item.title}
                  className={`border rounded-xl p-3 flex items-start gap-3 cursor-pointer transition ${reportReason === item.title ? 'border-black bg-gray-50' : 'border-gray-200 hover:bg-gray-50/50'}`}
                >
                  <input
                    type="radio"
                    name="reportReason"
                    value={item.title}
                    checked={reportReason === item.title}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="mt-1 accent-black"
                  />
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-black">{item.title}</span>
                    <span className="text-[11px] text-gray-500">{item.desc}</span>
                  </div>
                </label>
              ))}
            </div>

            <textarea
              rows="3"
              value={reportDetail}
              onChange={(e) => setReportDetail(e.target.value)}
              placeholder="추가 설명이 있다면 입력해주세요. (선택)"
              className="w-full border border-gray-300 rounded-xl p-3 text-xs focus:outline-none focus:border-black resize-none placeholder-gray-400"
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="w-24 py-2.5 border border-gray-300 rounded-xl text-xs font-bold text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleReportSubmit}
                className="w-28 py-2.5 bg-black text-white rounded-xl text-xs font-bold hover:bg-gray-800 transition cursor-pointer shadow-sm"
              >
                신고하기
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}