import React, { useState } from 'react';
import fakenewsLogo from '../assets/fakenews_logo.png';

export default function PostCreatePage() {
  // 1. 상태 관리
  const [authorName] = useState('김기자');
  const [authorRole] = useState('기자');
  const [postType, setPostType] = useState('뉴스');
  const [visibility, setVisibility] = useState('전체 공개');
  const [content, setContent] = useState('');

  // 2. 게시글 타입 드롭다운 제어
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const postTypeList = [
    '뉴스',
    '정정보도',
    '일반 사용자 글',
    '루머',
    '폭로글',
    '이미지 조작 의혹',
    '클릭 유도형 게시글'
  ];

  // 3. 첨부 미디어 목록
  const [mediaList, setMediaList] = useState([
    {
      id: 1,
      type: 'image',
      url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400',
      name: '국회의사당'
    },
    {
      id: 2,
      type: 'video',
      url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400',
      name: '현장 영상',
      duration: '01:12'
    }
  ]);

  // 4. 해시태그 목록
  const [hashtags, setHashtags] = useState(['건강검수제', '정부정책', '단독보도', '생활감시']);

  // 5. 모달 상태
  const [activeModal, setActiveModal] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [previewMedia, setPreviewMedia] = useState(null);

  // 핸들러
  const handleAddTag = (e) => {
    e?.preventDefault();
    const clean = tagInput.trim().replace(/^#/, '');
    if (clean && !hashtags.includes(clean)) {
      if (clean.length > 10) {
        alert('해시태그는 최대 10자까지 입력 가능합니다.');
        return;
      }
      setHashtags([...hashtags, clean]);
      setTagInput('');
      setActiveModal(null);
    }
  };

  const handleRemoveTag = (t) => setHashtags(hashtags.filter((tag) => tag !== t));
  const handleRemoveMedia = (id) => setMediaList(mediaList.filter((m) => m.id !== id));

  const handleAddDummyMedia = (type) => {
    const newMedia = {
      id: Date.now(),
      type,
      url: type === 'image'
        ? 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=400'
        : 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400',
      name: type === 'image' ? '새 이미지' : '새 영상',
      duration: type === 'video' ? '00:30' : undefined
    };
    setMediaList([...mediaList, newMedia]);
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] flex flex-col font-sans text-[#33363F]">
      
      {/* ================= 1. 상단 글로벌 헤더 (Figma: rectangle-1) ================= */}
      <header className="h-[72px] bg-white border-b border-[rgba(0,0,0,0.2)] px-8 flex items-center justify-between sticky top-0 z-30">
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
              placeholder=""
              className="w-full h-11 bg-white border border-[rgba(0,0,0,0.32)] rounded-[19px] px-4 text-sm focus:outline-none focus:border-[#33363F]"
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

      {/* ================= 2. 중앙 레이아웃 (사이드바 + 메인 카드) ================= */}
      <div className="flex flex-1 w-full">
        
        {/* 좌측 사이드바 (Figma: rectangle-2) */}
        <aside className="w-[224px] bg-white border-r border-[rgba(0,0,0,0.32)] py-6 flex flex-col gap-3 shrink-0">
          {/* 홈 (Active: rectangle-4170) */}
          <div className="mx-2 px-6 py-3.5 bg-[#E4E4E4] rounded-[10px] flex items-center gap-4 cursor-pointer">
            <svg className="w-6 h-6" viewBox="0 0 35 35" fill="none">
              <path d="M7.29 18.61C7.29 16.63 7.29 15.64 7.69 14.77C8.09 13.9 8.84 13.25 10.35 11.96L11.81 10.71C14.52 8.39 15.88 7.22 17.5 7.22C19.12 7.22 20.48 8.39 23.19 10.71L24.65 11.96C26.16 13.25 26.91 13.9 27.31 14.77C27.71 15.64 27.71 16.63 27.71 18.61V24.79C27.71 27.54 27.71 28.92 26.85 29.77C26 30.63 24.63 30.63 21.88 30.63H13.13C10.38 30.63 9 30.63 8.15 29.77C7.29 28.92 7.29 27.54 7.29 24.79V18.61Z" stroke="#33363F" strokeWidth="2.8"/>
            </svg>
            <span className="text-[17px] font-bold text-black">홈</span>
          </div>

          {/* 알림 (Figma: bell-pin + ellipse-50 + _3) */}
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

          {/* 채팅 (Figma: chat-alt-2) */}
          <div className="px-8 py-3 flex items-center gap-4 hover:bg-gray-50 rounded-xl cursor-pointer">
            <svg className="w-6 h-6" viewBox="0 0 35 35" fill="none">
              <path d="M27.35 8.59C28.33 10.06 28.33 12.11 28.33 16.21C28.33 20.3 28.33 22.35 27.35 23.82C26.92 24.46 26.38 25.01 25.74 25.43C24.46 26.29 22.73 26.4 19.58 26.41V26.42L17.97 29.64C17.43 30.72 15.9 30.72 15.36 29.64L13.75 26.42V26.41C10.6 26.4 8.88 26.29 7.59 25.43C6.96 25.01 6.41 24.46 5.98 23.82C5 22.35 5 20.3 5 16.21C5 12.11 5 10.06 5.98 8.59C6.41 7.96 6.96 7.41 7.59 6.98C9.06 6 11.11 6 15.21 6H18.13C22.22 6 24.27 6 25.74 6.98C26.38 7.41 26.92 7.96 27.35 8.59Z" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.13 13.13H21.88" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M13.13 18.96H17.5" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span className="text-[17px] text-black">채팅</span>
          </div>

          {/* 프로필 (Figma: user-alt) */}
          <div className="px-8 py-3 flex items-center gap-4 hover:bg-gray-50 rounded-xl cursor-pointer">
            <svg className="w-6 h-6" viewBox="0 0 35 35" fill="none">
              <circle cx="17.5" cy="10.2" r="5.8" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M8.37 24.67C9.28 21.95 11.98 20.42 14.85 20.42H20.15C23.02 20.42 25.72 21.95 26.63 24.67C27.12 26.14 27.55 27.86 27.67 29.63C27.71 30.18 27.26 30.62 26.71 30.62H8.29C7.74 30.62 7.29 30.18 7.33 29.63C7.45 27.86 7.88 26.14 8.37 24.67Z" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span className="text-[17px] text-black">프로필</span>
          </div>

          {/* 대시보드 (Figma: stat) */}
          <div className="px-8 py-3 flex items-center gap-4 hover:bg-gray-50 rounded-xl cursor-pointer">
            <div className="w-6 h-6 flex items-end justify-between p-0.5 border border-[#33363F] rounded-xs">
              <div className="w-1.5 h-3 bg-[#33363F]" />
              <div className="w-1.5 h-2 bg-[#33363F]" />
              <div className="w-1.5 h-4 bg-[#33363F]" />
            </div>
            <span className="text-[17px] text-black">대시보드</span>
          </div>

          {/* 설정 (Figma: setting-line) */}
          <div className="px-8 py-3 flex items-center gap-4 hover:bg-gray-50 rounded-xl cursor-pointer">
            <svg className="w-6 h-6" viewBox="0 0 35 35" fill="none">
              <circle cx="17.5" cy="17.5" r="5" stroke="#33363F" strokeWidth="2.5"/>
              <path d="M17.5 3V6M17.5 29V32M3 17.5H6M29 17.5H32M7.2 7.2L9.3 9.3M25.7 25.7L27.8 27.8M7.2 27.8L9.3 25.7M25.7 9.3L27.8 7.2" stroke="#33363F" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span className="text-[17px] text-black">설정</span>
          </div>
        </aside>

        {/* ================= 중앙 메인 카드 영역 (Figma: rectangle-4222) ================= */}
        <main className="flex-1 p-8 flex justify-center items-start">
          <div className="w-full max-w-[1195px] bg-white border border-[#7D8891] rounded-[10px] p-8 shadow-xs">
            
            {/* 타이틀 (Figma: div9 + line-21) */}
            <div className="pb-4 border-b border-[#7D8891] mb-6">
              <h1 className="text-[28px] font-bold text-black tracking-tight">새 게시글 작성</h1>
            </div>

            {/* 작성자 & 옵션 셀렉터 바 */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              {/* 유저 (Figma: user-cicrle-duotone2 + div10 + rectangle-4168) */}
              <div className="flex items-center gap-3">
                <svg className="w-12 h-12" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="25" fill="#7E869E" fillOpacity="0.25"/>
                  <circle cx="30" cy="23" r="9" fill="#65AAD9"/>
                  <path d="M30 35C36.6 35 42.2 38.5 44.6 43.4C41.7 46 38.1 47.7 34 48.1C33.1 48.2 30 48.2 30 48.2C27.9 48.2 26.8 48.2 26 48.1C21.9 47.7 18.3 46 15.4 43.4C17.8 38.5 23.4 35 30 35Z" fill="#65AAD9"/>
                </svg>
                <div className="flex items-center gap-2">
                  <span className="text-[18px] font-bold text-black">{authorName}</span>
                  <span className="bg-[rgba(101,170,217,0.53)] text-black text-[13px] px-3 py-0.5 rounded-[23px] font-medium">
                    {authorRole}
                  </span>
                </div>
              </div>

              {/* 옵션 버튼 (타입 & 공개범위) */}
              <div className="flex items-center gap-6">
                {/* 게시글 타입 (Figma: rectangle-4235 + div26 + fi-bs-angle-small-down) */}
                <div className="relative flex items-center gap-2">
                  <span className="text-[15px] font-bold text-black">게시글 타입</span>
                  <button
                    type="button"
                    onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                    className="w-[180px] h-[38px] bg-white border border-[#7D8891] rounded-[10px] px-3 flex items-center justify-between text-[14px] text-black cursor-pointer"
                  >
                    <span>{postType}</span>
                    <span className="text-[#7D8891] text-xs">▼</span>
                  </button>

                  {/* 드롭다운 메뉴 */}
                  {isTypeDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-20" onClick={() => setIsTypeDropdownOpen(false)} />
                      <div className="absolute right-0 top-full mt-1 w-[180px] bg-white border border-[#7D8891] rounded-[10px] shadow-xl z-30 py-1 overflow-hidden">
                        {postTypeList.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => {
                              setPostType(type);
                              setIsTypeDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-[13px] border-b border-gray-100 last:border-none ${
                              postType === type ? 'bg-blue-50 text-blue-600 font-bold' : 'text-black hover:bg-gray-50'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* 공개 범위 (Figma: rectangle-4165 + fi-bs-world + div27) */}
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-bold text-black">공개 범위</span>
                  <div className="h-[38px] bg-white border border-[rgba(0,0,0,0.32)] rounded-[6px] px-2.5 flex items-center gap-2">
                    <span className="text-sm">🌐</span>
                    <select
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value)}
                      className="text-[13px] text-[#7D8891] focus:outline-none cursor-pointer pr-1"
                    >
                      <option value="전체 공개">전체 공개</option>
                      <option value="팔로워 공개">팔로워 공개</option>
                      <option value="비공개">비공개</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* 본문 텍스트 입력창 (Figma: rectangle-4223 + div11) */}
            <div className="mb-4">
              <textarea
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="무슨 일이 있었나요?"
                className="w-full text-[17px] placeholder-[#7D8891] border border-[#7D8891] rounded-[10px] p-4 focus:outline-none focus:border-black resize-none"
              />
            </div>

            {/* 미디어/해시태그 바 (Figma: rectangle-4227 + image0/video0/hash0) */}
            <div className="h-[46px] border border-[#7D8891] rounded-[10px] px-4 flex items-center gap-8 mb-6">
              <button
                type="button"
                onClick={() => setActiveModal('image')}
                className="flex items-center gap-2 text-[15px] font-medium text-black cursor-pointer hover:opacity-70"
              >
                <svg className="w-5 h-5" viewBox="0 0 40 40" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.33 10C3.33 8.16 4.83 6.67 6.67 6.67H33.33C35.17 6.67 36.67 8.16 36.67 10V30C36.67 31.84 35.17 33.33 33.33 33.33H6.67C4.83 33.33 3.33 31.84 3.33 30V10ZM6.67 27.2V30H18.67L21.39 26.19L13.5 17.64L6.67 27.2ZM23.37 23.42L14.56 13.87C14.22 13.5 13.73 13.31 13.23 13.34C12.73 13.37 12.27 13.62 11.98 14.03L6.67 21.47V10H33.33V26.58L27.91 20.55C27.57 20.18 27.08 19.97 26.57 20C26.07 20.03 25.6 20.29 25.31 20.7L23.37 23.42ZM31.92 30L26.82 24.32L22.76 30H31.92ZM21.67 16.67C21.67 15.75 22.41 15 23.33 15C24.27 15 25.02 15.75 25.02 16.67C25.02 17.59 24.27 18.33 23.33 18.33C22.41 18.33 21.67 17.59 21.67 16.67Z" fill="#101828"/>
                </svg>
                <span>이미지</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('video')}
                className="flex items-center gap-2 text-[15px] font-medium text-black cursor-pointer hover:opacity-70"
              >
                <svg className="w-5 h-5" viewBox="0 0 40 40" fill="none">
                  <path d="M36.67 13.33L26.67 20L36.67 26.67V13.33Z" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23.33 10H6.67C4.83 10 3.33 11.49 3.33 13.33V26.67C3.33 28.51 4.83 30 6.67 30H23.33C25.17 30 26.67 28.51 26.67 26.67V13.33C26.67 11.49 25.17 10 23.33 10Z" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>동영상</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveModal('hashtag')}
                className="flex items-center gap-2 text-[15px] font-medium text-black cursor-pointer hover:opacity-70"
              >
                <svg className="w-5 h-5" viewBox="0 0 40 40" fill="none">
                  <path d="M20.98 31.62C20.96 31.72 20.94 31.93 20.94 32.07C20.94 32.83 21.46 33.34 22.19 33.34C22.85 33.34 23.42 32.91 23.57 32.15L24.96 25.39H27.97C29.02 25.39 29.51 24.8 29.51 24.02C29.51 23.24 29.04 22.7 27.97 22.7H25.51L26.8 16.39H29.96C31.04 16.39 31.5 15.82 31.5 15.02C31.5 14.24 31.04 13.71 29.96 13.71H27.34L28.54 7.95C28.55 7.85 28.57 7.66 28.57 7.54C28.57 6.84 28.03 6.25 27.29 6.25C26.66 6.25 26.09 6.64 25.94 7.32L24.63 13.71H19.04L20.23 7.95C20.25 7.85 20.27 7.66 20.27 7.54C20.27 6.84 19.73 6.25 18.96 6.25C18.36 6.25 17.79 6.64 17.64 7.32L16.33 13.71H13.54C12.46 13.71 11.99 14.26 11.99 15.04C11.99 15.82 12.46 16.39 13.54 16.39H15.8L14.51 22.7H11.52C10.47 22.7 10 23.24 10 24.02C10 24.8 10.47 25.39 11.52 25.39H13.96L12.68 31.62C12.66 31.72 12.64 31.93 12.64 32.07C12.64 32.83 13.16 33.34 13.89 33.34C14.55 33.34 15.12 32.91 15.27 32.15L16.66 25.39H22.27L20.98 31.62ZM18.48 16.35H24.14L22.85 22.75H17.15L18.48 16.35Z" fill="#212529"/>
                </svg>
                <span>해시태그</span>
              </button>
            </div>

            {/* 첨부된 미디어 영역 (Figma: div22 + image-14) */}
            <div className="mb-6">
              <span className="text-[17px] font-bold text-black block mb-3">첨부된 미디어</span>
              <div className="flex items-center gap-4">
                {mediaList.map((media) => (
                  <div
                    key={media.id}
                    className="relative w-[140px] h-[100px] rounded-[10px] overflow-hidden border border-[#7D8891] group cursor-pointer"
                  >
                    <img
                      src={media.url}
                      alt={media.name}
                      onClick={() => {
                        setPreviewMedia(media);
                        setActiveModal('preview');
                      }}
                      className="w-full h-full object-cover"
                    />
                    {media.type === 'video' && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <span className="w-7 h-7 bg-black/70 text-white rounded-full flex items-center justify-center text-xs">▶</span>
                        <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded font-mono">
                          {media.duration}
                        </span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveMedia(media.id);
                      }}
                      className="absolute top-1 right-1 w-5 h-5 bg-black/70 text-white rounded-full flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {/* 점선 추가 박스 */}
                <button
                  type="button"
                  onClick={() => setActiveModal('image')}
                  className="w-[140px] h-[100px] rounded-[10px] border-2 border-dashed border-[#7D8891] flex items-center justify-center text-[#7D8891] hover:text-black hover:border-black text-3xl cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* 해시태그 영역 (Figma: rectangle-4194~4197 + div18~21) */}
            <div className="mb-8">
              <span className="text-[17px] font-bold text-black block mb-3">해시태그</span>
              <div className="flex flex-wrap items-center gap-3">
                {hashtags.map((tag) => (
                  <div
                    key={tag}
                    className="h-[40px] px-4 bg-[#E1E7F0] rounded-[15px] flex items-center gap-2 text-[15px] font-medium text-black"
                  >
                    <span>#{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-gray-500 hover:text-red-500 text-base cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setActiveModal('hashtag')}
                  className="w-7 h-7 rounded-full border border-[#7D8891] text-[#7D8891] hover:border-black hover:text-black flex items-center justify-center text-base cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* 하단 버튼 (Figma: rectangle-4224(임시저장) + rectangle-4225(게시하기)) */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#7D8891]/30">
              <button
                type="button"
                onClick={() => alert(`임시저장 완료 (타입: ${postType})`)}
                className="w-[140px] h-[46px] bg-white border-2 border-[#7D8891] rounded-[15px] text-[16px] font-bold text-black hover:bg-gray-50 cursor-pointer"
              >
                임시저장
              </button>
              <button
                type="button"
                onClick={() => alert(`게시글이 성공적으로 등록되었습니다!\n타입: ${postType}`)}
                className="w-[140px] h-[46px] bg-[#33363F] text-white rounded-[15px] text-[16px] font-bold hover:bg-black cursor-pointer shadow-sm"
              >
                게시하기
              </button>
            </div>

          </div>
        </main>
      </div>

      {/* ================= 3. 팝업 모달 다이얼로그 (4종) ================= */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          
          {/* A. 이미지 업로드 모달 */}
          {activeModal === 'image' && (
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-base text-black">이미지 업로드</h3>
                <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-black cursor-pointer">✕</button>
              </div>
              <div
                onClick={() => handleAddDummyMedia('image')}
                className="border-2 border-dashed border-[#7D8891] rounded-xl p-8 flex flex-col items-center justify-center gap-2 text-center mb-6 bg-gray-50 cursor-pointer"
              >
                <span className="text-3xl">🖼️</span>
                <p className="text-xs text-gray-600 font-medium">이미지 파일을 드래그하거나 클릭하여 업로드</p>
                <p className="text-[10px] text-gray-400">JPG, PNG (최대 10MB)</p>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-xs border rounded-lg cursor-pointer">취소</button>
                <button onClick={() => handleAddDummyMedia('image')} className="px-4 py-2 text-xs bg-[#33363F] text-white rounded-lg cursor-pointer">확인</button>
              </div>
            </div>
          )}

          {/* B. 동영상 업로드 모달 */}
          {activeModal === 'video' && (
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-base text-black">동영상 업로드</h3>
                <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-black cursor-pointer">✕</button>
              </div>
              <div
                onClick={() => handleAddDummyMedia('video')}
                className="border-2 border-dashed border-[#7D8891] rounded-xl p-8 flex flex-col items-center justify-center gap-2 text-center mb-6 bg-gray-50 cursor-pointer"
              >
                <span className="text-3xl">🎥</span>
                <p className="text-xs text-gray-600 font-medium">동영상 파일을 드래그하거나 클릭하여 업로드</p>
                <p className="text-[10px] text-gray-400">MP4, MOV (최대 100MB / 3분 이내)</p>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-xs border rounded-lg cursor-pointer">취소</button>
                <button onClick={() => handleAddDummyMedia('video')} className="px-4 py-2 text-xs bg-[#33363F] text-white rounded-lg cursor-pointer">확인</button>
              </div>
            </div>
          )}

          {/* C. 해시태그 추가 모달 */}
          {activeModal === 'hashtag' && (
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-base text-black">해시태그 추가</h3>
                <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-black cursor-pointer">✕</button>
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag(e)}
                placeholder="해시태그 입력 (최대 10글자)"
                maxLength={10}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black mb-3"
                autoFocus
              />
              <div className="mb-5">
                <span className="text-xs text-gray-400 block mb-2 font-medium">입력된 태그</span>
                <div className="flex flex-wrap gap-1.5 p-2 bg-gray-50 rounded-lg border border-gray-100 min-h-[36px]">
                  {hashtags.map((tag) => (
                    <span key={tag} className="text-xs bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-xs border rounded-lg cursor-pointer">취소</button>
                <button onClick={handleAddTag} className="px-4 py-2 text-xs bg-[#33363F] text-white rounded-lg cursor-pointer">확인</button>
              </div>
            </div>
          )}

          {/* D. 이미지/영상 확대 미리보기 */}
          {activeModal === 'preview' && previewMedia && (
            <div className="relative max-w-2xl w-full bg-black rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center">
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black z-10 cursor-pointer"
              >
                ✕
              </button>
              <div className="w-full h-[65vh] flex items-center justify-center bg-black/90">
                <img
                  src={previewMedia.url}
                  alt={previewMedia.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="text-white text-xs py-3 bg-black/80 w-full text-center tracking-wider">
                {previewMedia.name}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}