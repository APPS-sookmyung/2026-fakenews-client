import React, { useState } from 'react';

export default function PostCreatePage({ profile, onSubmit, onHome, draft, setDraft, editing = false }) {
  // 1. 상태 관리
  const authorName = profile.name;
  const authorRole = '일반 사용자';
  const { postType, visibility, content, hashtags, attachments: mediaList } = draft;
  const setField = (key, value) => setDraft((previous) => ({ ...previous, [key]: value }));
  const setPostType = (value) => setField('postType', value);
  const setVisibility = (value) => setField('visibility', value);
  const setContent = (value) => setField('content', value);
  const setMediaList = (value) => setField('attachments', value);
  const setHashtags = (value) => setField('hashtags', value);

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


  // 4. 해시태그 목록


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
    <div>
          <div className="w-full max-w-[1195px] bg-white border border-[#7D8891] rounded-[10px] p-4 sm:p-8 shadow-xs">
            
            {/* 타이틀 (Figma: div9 + line-21) */}
            <div className="pb-4 border-b border-[#7D8891] mb-6">
              <button type="button" onClick={onHome} className="mb-3 text-sm text-slate-500">{editing ? '← 수정 취소' : '← 홈 피드로 돌아가기'}</button>
              <h1 className="text-[28px] font-bold text-black tracking-tight">{editing ? '게시글 수정' : '새 게시글 작성'}</h1>
            </div>

            {!editing && <p className="mb-5 text-xs text-slate-500">작성 중 내용은 홈과 상세 작성 화면 사이를 이동해도 유지됩니다.</p>}
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
              <div className="flex flex-wrap items-center gap-4">
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
                maxLength={500}
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
              <div className="flex flex-wrap items-center gap-4">
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
                onClick={onHome}
                className="w-[140px] h-[46px] bg-white border-2 border-[#7D8891] rounded-[15px] text-[16px] font-bold text-black hover:bg-gray-50 cursor-pointer"
              >
                {editing ? '취소' : '닫기 · 내용 유지'}
              </button>
              <button
                type="button"
                onClick={() => {
                  onSubmit(draft);
                }}
                disabled={!content.trim()}
                className="w-[140px] h-[46px] bg-[#33363F] text-white rounded-[15px] text-[16px] font-bold hover:bg-black cursor-pointer shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editing ? '수정 저장' : '게시하기'}
              </button>
            </div>

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