import {useState} from "react";
import {Bell, BarChart3, ChevronDown, Clock3, FileText, Heart, Home, LogOut, Menu, MessageCircle, RefreshCw, Search, Settings, User, Users} from "lucide-react";
import fakenewsLogo from "../assets/fakenews_logo.png";

//프로필 (사용자 아이콘 컴포넌트)
function Avatar({size="normal", color="green"}){
    const sizeClass = size==="small" ? "w-8 h-8" : "w-10 h-10";
    const colorClass = color==="blue" ? "bg-blue-100 text-blue-500" : color==="gray" ? "bg-slate-200 text-slate-700" : "bg-green-100 text-green-600";

    return(
        <div className={`${sizeClass} ${colorClass} rounded-full flex items-center justify-center shrink-0`}>
            <User className="w-5 h-5"/>
        </div>
    );
}

//상단 Header
function Header({searchKeyword, setSearchKeyword}){
    return(
        <header className="h-[72px] bg-white border-b border-slate-200 px-5 flex items-center sticky top-0 z-30">
            <div className="w-[220px] flex items-center">
                <img src={fakenewsLogo} alt="FakeNews Simulator Logo" className="h-24 w-auto object-contain"/>
            </div>

            <div className="flex-1 flex items-center gap-4 max-w-[680px]">
                <button className="p-2">
                    <Menu className="w-7 h-7"/>
                </button>

                <div className="flex-1 h-11 border border-slate-300 rounded-[18px] px-4 flex items-center gap-3 bg-white">
                    <Search className="w-5 h-5 text-slate-400"/>
                    <input type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} placeholder="검색어를 입력하세요" className="flex-1 bg-transparent outline-none text-sm"/>
                    {searchKeyword && <button onClick={() => setSearchKeyword("")} className="text-xl text-gray-500">×</button>}
                </div>
            </div>

            <div className="ml-auto flex items-center gap-5">
                <div className="relative">
                    <Bell className="w-6 h-6"/>
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-[10px] rounded-full flex items-center justify-center">3</span>
                </div>

                <div className="flex items-center gap-2">
                    <Avatar color="gray"/>
                    <div>
                        <p className="text-sm font-bold">김송이</p>
                        <p className="text-xs text-gray-500">일반 사용자</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400"/>
                </div>
            </div>
        </header>
    );
}

//좌측 사이드바
function Sidebar(){
    const menus = [
        {icon: Home, label: "홈"},
        {icon: Bell, label: "알림", count: 3},
        {icon: MessageCircle, label: "채팅"},
        {icon: User, label: "프로필"},
        {icon: BarChart3, label: "대시보드"},
        {icon: Settings, label: "설정"}
    ];

    return(
        <aside className="w-[240px] bg-white border-r border-slate-200 p-4 flex flex-col shrink-0 min-h-[calc(100vh-72px)]">
            <div className="space-y-2">
                {menus.map(({icon: Icon, label, count}) => (
                    <button key={label} className="w-full px-5 py-3 rounded-xl flex items-center gap-4 text-left hover:bg-slate-50">
                        <Icon className="w-5 h-5"/>
                        <span>{label}</span>
                        {count && <span className="ml-auto w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">{count}</span>}
                    </button>
                ))}
            </div>

            <div className="mt-auto">
                <div className="border border-slate-200 rounded-2xl p-4 mb-3">
                    <p className="text-xs text-gray-500 mb-3">현재 역할</p>

                    <div className="flex items-center gap-2 mb-4">
                        <Avatar color="gray"/>
                        <span className="font-bold">일반 사용자</span>
                    </div>

                    <p className="text-xs text-gray-600 leading-5 mb-4">피드를 탐색하고<br/>게시글에 반응하며<br/>정보 확산에 영향을 미칩니다</p>
                    <button className="w-full border border-slate-200 rounded-xl py-2 text-sm font-medium">역할 변경</button>
                </div>

                <button className="w-full bg-black text-white rounded-xl py-3 flex items-center justify-center gap-2">
                    <LogOut className="w-5 h-5"/>
                    로그아웃
                </button>
            </div>
        </aside>
    );
}

//우측 패널
function RightPanel(){
    const trends = [["청년 지원금", "120 posts"], ["공약", "102 posts"], ["김도현", "72 posts"], ["대선후보", "15 posts"]];

    return(
        <aside className="w-[240px] shrink-0 space-y-4">
            <section className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <h3 className="font-bold">실시간 현황</h3>
                    <span className="text-[10px] text-gray-400">(Step 12 기준)</span>
                </div>

                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2"><FileText className="w-5 h-5"/><span>전체 게시글 수</span><b className="ml-auto">328</b></div>
                    <div className="flex items-center gap-2"><RefreshCw className="w-5 h-5"/><span>전체 리포스트 수</span><b className="ml-auto">821</b></div>
                    <div className="flex items-center gap-2"><Users className="w-5 h-5"/><span>활성 에이전트 수</span><b className="ml-auto">20</b></div>
                    <div className="flex items-center gap-2"><Clock3 className="w-5 h-5"/><span>현재 시간</span><b className="ml-auto">00 : 12 : 23</b></div>
                </div>
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                    <h3 className="font-bold">현재 영향력 순위</h3>
                    <span>›</span>
                </div>

                {[["김기자", "12,540"], ["눈송이", "9,880"], ["최송이", "7,940"]].map((user, index) => (
                    <div key={user[0]} className="flex items-center gap-2 py-2">
                        <b>{index+1}</b>
                        <Avatar size="small" color="blue"/>
                        <span className="font-bold">{user[0]}</span>
                        <span className="ml-auto text-gray-400">{user[1]}</span>
                    </div>
                ))}
            </section>

            <section className="bg-white border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
                    <h3 className="font-bold">실시간 트렌드</h3>
                    <span>›</span>
                </div>

                {trends.map(([trend, count]) => (
                    <div key={trend} className="flex py-2 text-sm">
                        <span>{trend}</span>
                        <span className="ml-auto text-gray-400">{count}</span>
                    </div>
                ))}
            </section>
        </aside>
    );
}

function SearchPage(){
    //검색 페이지 상태
    const [selectedTab, setSelectedTab] = useState("전체");
    const [searchKeyword, setSearchKeyword] = useState("지원금");

    //임시 데이터
    const postResults = [
        {
            id: 1,
            author: "김송이",
            role: "일반 사용자",
            time: "12분 전",
            content: "청년 지원금 신청 기간이 이번 주까지라고 합니다.",
            hashtags: ["#지원금", "#청년지원"],
            comments: 4,
            reposts: 5,
            likes: 12
        },
        {
            id: 2,
            author: "박민준",
            role: "일반 사용자",
            time: "8분 전",
            content: "지원금 관련해서는 신청 조건도 같이 확인해야 할 것 같아요.",
            hashtags: ["#지원금", "#신청조건"],
            comments: 2,
            reposts: 3,
            likes: 8
        }
    ];

    const userResults = [
        {
            id: 1,
            name: "지원금알리미",
            username: "@support_info",
            role: "일반 사용자"
        },
        {
            id: 2,
            name: "청년지원금정보",
            username: "@youth_support",
            role: "일반 사용자"
        }
    ];

    const hashtagResults = [
        {
            id: 1,
            tag: "#지원금",
            count: 18
        },
        {
            id: 2,
            tag: "#청년지원금",
            count: 12
        }
    ];

    //검색어에 따른 필터링
    const trimmedKeyword = searchKeyword.trim();
    const filteredPosts = trimmedKeyword ? postResults.filter((post) => `${post.author} ${post.content} ${post.hashtags.join(" ")}`.includes(trimmedKeyword)) : [];
    const filteredUsers = trimmedKeyword ? userResults.filter((user) => `${user.name} ${user.username}`.includes(trimmedKeyword)) : [];
    const filteredHashtags = trimmedKeyword ? hashtagResults.filter((hashtag) => hashtag.tag.includes(trimmedKeyword)) : [];
    const totalResults = filteredPosts.length + filteredUsers.length + filteredHashtags.length;

    return(
        <div className="min-h-screen bg-slate-100 text-[#33363F]">
            {/*상단헤더*/}
            <Header searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword}/>

            <div className="flex">
                <Sidebar/>

                <main className="flex-1 p-5">
                    <div className="flex gap-4 max-w-[1360px] mx-auto">
                        <div className="flex-1 min-w-0">

                            <section className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
                                <h1 className="text-2xl font-bold mb-1">검색 결과</h1>
                                <p className="text-gray-500 mb-5">{trimmedKeyword ? `"${searchKeyword}"에 대한 검색 결과` : "검색어를 입력해주세요."}</p>

                                <div className="flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <button onClick={() => setSelectedTab("전체")} className={selectedTab==="전체" ? "bg-slate-700 text-white font-bold px-5 py-2 rounded-xl" : "bg-slate-100 text-gray-600 px-5 py-2 rounded-xl"}>전체</button>
                                        <button onClick={() => setSelectedTab("게시글")} className={selectedTab==="게시글" ? "bg-slate-700 text-white font-bold px-5 py-2 rounded-xl" : "bg-slate-100 text-gray-600 px-5 py-2 rounded-xl"}>게시글</button>
                                        <button onClick={() => setSelectedTab("사용자")} className={selectedTab==="사용자" ? "bg-slate-700 text-white font-bold px-5 py-2 rounded-xl" : "bg-slate-100 text-gray-600 px-5 py-2 rounded-xl"}>사용자</button>
                                        <button onClick={() => setSelectedTab("해시태그")} className={selectedTab==="해시태그" ? "bg-slate-700 text-white font-bold px-5 py-2 rounded-xl" : "bg-slate-100 text-gray-600 px-5 py-2 rounded-xl"}>해시태그</button>
                                    </div>

                                    <span className="text-sm text-gray-400">총 {totalResults}개의 결과</span>
                                </div>
                            </section>

                            {/*전체 검색 결과*/}
                            {selectedTab === "전체" && (
                                <div className="space-y-8">
                                    {/*사용자 검색 결과*/}
                                    <section>
                                        <div className="flex items-center justify-between mb-3">
                                            <h2 className="font-bold text-lg">사용자 ({filteredUsers.length})</h2>
                                            <button onClick={() => setSelectedTab("사용자")} className="text-sm text-gray-400">모두 보기 &gt;</button>
                                        </div>

                                        {filteredUsers.length === 0 ? (
                                            <p className="text-gray-500">검색된 사용자가 없습니다.</p>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {filteredUsers.map((user) => (
                                                    <div key={user.id} className="bg-white border border-slate-200 rounded-xl p-4">
                                                        <div className="flex items-center gap-3">
                                                            <Avatar/>
                                                            <div>
                                                                <p className="font-bold">{user.name}</p>
                                                                <p className="text-sm text-gray-400">{user.username}</p>
                                                                <p className="text-sm text-gray-500">{user.role}</p>
                                                            </div>
                                                            <button className="ml-auto border border-slate-200 rounded-lg px-4 py-2 text-sm">팔로우</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </section>
                                    
                                    {/*게시글 검색 결과*/}
                                    <section>
                                        <div className="flex items-center justify-between mb-3">
                                            <h2 className="font-bold text-lg">게시글 ({filteredPosts.length})</h2>
                                            <button className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm">최신순 <ChevronDown className="w-4 h-4"/></button>
                                        </div>

                                        <div className="space-y-3">
                                            {filteredPosts.length === 0 ? (
                                                <p className="text-gray-500">검색된 게시글이 없습니다.</p>
                                            ) : (
                                                filteredPosts.map((post) => (
                                                    <div key={post.id} className="bg-white border border-slate-200 rounded-xl p-4">
                                                        <div className="flex gap-3">
                                                            <Avatar/>
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="font-bold">{post.author}</span>
                                                                    <span className="rounded-full bg-green-100 px-2 py-1 text-sm text-green-700">{post.role}</span>
                                                                    <span className="text-gray-400">· {post.time}</span>
                                                                </div>

                                                                <p className="mt-2">{post.content}</p>

                                                                <div className="flex gap-2 mt-3">
                                                                    {post.hashtags.map((hashtag) => (
                                                                        <span key={hashtag} className="bg-blue-50 text-blue-500 text-sm px-2 py-1 rounded-full">{hashtag}</span>
                                                                    ))}
                                                                </div>

                                                                <div className="flex gap-8 mt-4 text-gray-500">
                                                                    <div className="flex items-center gap-1"><MessageCircle className="w-4 h-4"/><span>{post.comments}</span></div>
                                                                    <div className="flex items-center gap-1"><RefreshCw className="w-4 h-4"/><span>{post.reposts}</span></div>
                                                                    <div className="flex items-center gap-1"><Heart className="w-4 h-4"/><span>{post.likes}</span></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </section>
                                    
                                    {/*해시태그 검색 결과*/}
                                    <section>
                                        <div className="flex items-center justify-between mb-3">
                                            <h2 className="font-bold text-lg">해시태그 ({filteredHashtags.length})</h2>
                                            <button onClick={() => setSelectedTab("해시태그")} className="text-sm text-gray-400">모두 보기 &gt;</button>
                                        </div>

                                        {filteredHashtags.length === 0 ? (
                                            <p className="text-gray-500">검색된 해시태그가 없습니다.</p>
                                        ) : (
                                            <div className="space-y-3">
                                                {filteredHashtags.map((hashtag) => (
                                                    <div key={hashtag.id} className="bg-white border border-slate-200 rounded-xl p-4">
                                                        <p className="font-bold">{hashtag.tag}</p>
                                                        <p className="text-gray-500">게시글 {hashtag.count}개</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </section>
                                </div>
                            )}

                            {/*게시글 탭*/}
                            {selectedTab === "게시글" && (
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <h2 className="font-bold text-lg">게시글 ({filteredPosts.length})</h2>
                                        <button className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm">최신순 <ChevronDown className="w-4 h-4"/></button>
                                    </div>

                                    <div className="space-y-4">
                                        {filteredPosts.length === 0 ? (
                                            <p className="text-gray-500">검색된 게시글이 없습니다.</p>
                                        ) : (
                                            filteredPosts.map((post) => (
                                                <div key={post.id} className="bg-white border border-slate-200 rounded-xl p-4">
                                                    <div className="flex gap-3">
                                                        <Avatar/>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-bold">{post.author}</span>
                                                                <span className="rounded-full bg-green-100 px-2 py-1 text-sm text-green-700">{post.role}</span>
                                                                <span className="text-gray-400">· {post.time}</span>
                                                            </div>

                                                            <p className="mt-2">{post.content}</p>

                                                            <div className="flex gap-2 mt-3">
                                                                {post.hashtags.map((hashtag) => (
                                                                    <span key={hashtag} className="bg-blue-50 text-blue-500 text-sm px-2 py-1 rounded-full">{hashtag}</span>
                                                                ))}
                                                            </div>

                                                            <div className="flex gap-8 mt-4 text-gray-500">
                                                                <div className="flex items-center gap-1"><MessageCircle className="w-4 h-4"/><span>{post.comments}</span></div>
                                                                <div className="flex items-center gap-1"><RefreshCw className="w-4 h-4"/><span>{post.reposts}</span></div>
                                                                <div className="flex items-center gap-1"><Heart className="w-4 h-4"/><span>{post.likes}</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}

                            {/*사용자 탭*/}
                            {selectedTab === "사용자" && (
                                <div>
                                    <h2 className="font-bold text-lg mb-3">사용자 ({filteredUsers.length})</h2>

                                    {filteredUsers.length === 0 ? (
                                        <p className="text-gray-500">검색된 사용자가 없습니다.</p>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {filteredUsers.map((user) => (
                                                <div key={user.id} className="bg-white border border-slate-200 rounded-xl p-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar/>
                                                        <div>
                                                            <p className="font-bold">{user.name}</p>
                                                            <p className="text-sm text-gray-400">{user.username}</p>
                                                            <p className="text-sm text-gray-500">{user.role}</p>
                                                        </div>
                                                        <button className="ml-auto border border-slate-200 rounded-lg px-4 py-2 text-sm">팔로우</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/*해시태그 탭*/}
                            {selectedTab === "해시태그" && (
                                <div>
                                    <h2 className="font-bold text-lg mb-3">해시태그 ({filteredHashtags.length})</h2>

                                    {filteredHashtags.length === 0 ? (
                                        <p className="text-gray-500">검색된 해시태그가 없습니다.</p>
                                    ) : (
                                        <div className="space-y-3">
                                            {filteredHashtags.map((hashtag) => (
                                                <div key={hashtag.id} className="bg-white border border-slate-200 rounded-xl p-4">
                                                    <p className="font-bold">{hashtag.tag}</p>
                                                    <p className="text-gray-500">게시글 {hashtag.count}개</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <RightPanel/>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default SearchPage;