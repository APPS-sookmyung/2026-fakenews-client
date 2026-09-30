import { useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, Bookmark, Check, FileText, Heart, Pencil, RefreshCw, User, X } from 'lucide-react'

const tabs = [ ['게시글', FileText], ['리포스트', RefreshCw], ['좋아요', Heart], ['북마크', Bookmark] ]

export default function ProfilePage({ profile, onSave, posts, query, onHome, renderPost }) {
  const [tab, setTab] = useState('게시글')
  const [draft, setDraft] = useState(profile)
  const [saved, setSaved] = useState(false)
  const dialog = useRef(null)
  const ownPosts = posts.filter((post) => post.isOwn)
  const collections = {
    게시글: ownPosts,
    리포스트: posts.filter((post) => post.reposted),
    좋아요: posts.filter((post) => post.liked),
    북마크: posts.filter((post) => post.bookmarked),
  }
  const keyword = query.toLowerCase().replaceAll(' ', '')
  const visible = collections[tab].filter((post) => `${post.author}${post.content}`.toLowerCase().replaceAll(' ', '').includes(keyword))
  const edit = () => { setDraft(profile); setSaved(false); dialog.current.showModal() }
  const save = (event) => {
    event.preventDefault()
    if (!draft.name.trim()) return
    onSave({ ...draft, name: draft.name.trim(), bio: draft.bio.trim() })
    dialog.current.close()
    setSaved(true)
  }

  return <>
    <div className="flex items-center gap-3 px-1 py-2">
      <button onClick={onHome} aria-label="홈 피드로 돌아가기" className="rounded-full p-2 hover:bg-slate-200"><ArrowLeft className="size-5" /></button>
      <div><h1 className="text-xl font-bold">내 프로필</h1><p className="mt-0.5 text-xs text-slate-500">나의 이야기와 활동을 한곳에서</p></div>
    </div>

    <section className="overflow-hidden rounded-2xl border border-slate-300 bg-white">
      <div className="profile-cover relative flex h-36 items-start justify-between p-6 sm:h-44 sm:p-7">
        <span className="text-xs font-semibold tracking-[.18em] text-slate-600">MY SPACE</span>
        <span className="flex items-center gap-2 rounded-full border border-white/80 bg-white/75 px-3 py-1.5 text-xs text-slate-600"><span className="size-1.5 rounded-full bg-green-500" />시뮬레이션 참여 중</span>
      </div>
      <div className="px-5 pb-6 sm:px-7">
        <div className="flex items-end justify-between gap-3">
          <div className="relative -mt-10 grid size-24 place-items-center rounded-full border-[6px] border-white bg-slate-200 text-slate-700"><User className="size-12" fill="currentColor" /></div>
          <button onClick={edit} className="mb-1 flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"><Pencil className="size-4" />프로필 수정</button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2.5"><h2 className="break-all text-2xl font-bold">{profile.name}</h2><span className="role role-green">일반 사용자</span></div>
        <p className="mt-1 text-sm text-slate-400">@songyi</p>
        <p className="mt-4 whitespace-pre-line break-words text-sm leading-7 text-slate-600">{profile.bio || '아직 소개가 없습니다. 나를 소개하는 한마디를 남겨보세요.'}</p>
        <div className="mt-5 flex flex-wrap gap-2">{['미디어 리터러시', '다양한 시선', '함께 생각하기'].map((tag) => <span key={tag} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-500"># {tag}</span>)}</div>
        <div className="mt-6 grid grid-cols-3 divide-x divide-slate-200 border-t border-slate-200 pt-5 text-center">
          {[[ownPosts.length, '작성한 게시글'], [ownPosts.reduce((sum, post) => sum + post.likes, 0), '받은 좋아요'], [collections.리포스트.length, '내 리포스트']].map(([value, label]) => <div key={label}><b className="text-2xl font-semibold">{value}</b><p className="mt-1 text-xs text-slate-500">{label}</p></div>)}
        </div>
      </div>
    </section>
    <p role="status" className={saved ? 'flex items-center gap-2 text-sm text-green-700' : 'sr-only'}>{saved && <><Check className="size-4" />프로필을 수정했습니다.</>}</p>
    <section className="flex items-center gap-4 rounded-2xl border border-slate-300 bg-white p-5">
      <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-green-50 text-green-700"><User className="size-5" /></div>
      <div><h2 className="text-sm font-semibold">작은 반응도 정보의 흐름을 바꿉니다</h2><p className="mt-1 text-xs leading-5 text-slate-500">일반 사용자로서 피드를 탐색하고, 다양한 의견을 나눠보세요.</p></div>
    </section>

    <div className="flex border-b border-slate-300" aria-label="프로필 활동 필터">
      {tabs.map(([label, Icon]) => <button key={label} aria-pressed={tab === label} onClick={() => setTab(label)} className={`flex min-w-0 flex-1 items-center justify-center gap-1.5 border-b-2 px-1 py-4 text-xs sm:text-sm ${tab === label ? 'border-black font-bold text-black' : 'border-transparent text-slate-500 hover:text-black'}`}><Icon className="hidden size-4 sm:block" />{label}<span className="text-xs text-slate-400">{collections[label].length}</span></button>)}
    </div>
    {tab === '북마크' && <p className="px-1 text-xs text-slate-500">저장한 게시글은 나만 볼 수 있습니다.</p>}
    <div className="space-y-4" aria-live="polite">
      {visible.length ? visible.map(renderPost) : <div className="rounded-2xl border border-slate-300 bg-white px-5 py-14 text-center">
        <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-slate-100 text-slate-400"><FileText className="size-6" /></div>
        <h2 className="font-semibold">{query ? '검색 결과가 없습니다' : `아직 ${tab === '게시글' ? '작성한 게시글이' : tab === '리포스트' ? '리포스트한 게시글이' : tab === '좋아요' ? '좋아요한 게시글이' : '저장한 게시글이'} 없습니다`}</h2>
        <p className="mt-2 text-sm text-slate-500">{query ? '다른 검색어로 다시 찾아보세요.' : '피드에서 시작한 활동이 이곳에 차곡차곡 모입니다.'}</p>
        <button onClick={onHome} className="mx-auto mt-6 flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-sm text-white hover:bg-slate-800">피드 둘러보기<ArrowUpRight className="size-4" /></button>
      </div>}
    </div>

    <dialog ref={dialog} className="profile-dialog rounded-2xl border border-slate-200 bg-white p-0 shadow-xl" aria-labelledby="profile-edit-title">
      <form onSubmit={save} className="p-6">
        <div className="mb-6 flex items-center justify-between"><h2 id="profile-edit-title" className="text-lg font-bold">프로필 수정</h2><button type="button" onClick={() => dialog.current.close()} aria-label="프로필 수정 닫기" className="rounded-lg p-2 hover:bg-slate-100"><X className="size-5" /></button></div>
        <label className="block text-sm font-semibold">이름<input autoFocus required maxLength={20} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} className="mt-2 block w-full rounded-xl border border-slate-300 px-4 py-3 font-normal" /></label>
        <label className="mt-5 block text-sm font-semibold">소개<textarea maxLength={160} rows={4} value={draft.bio} onChange={(event) => setDraft({ ...draft, bio: event.target.value })} placeholder="나를 소개하는 한마디를 적어주세요" className="mt-2 block w-full resize-none rounded-xl border border-slate-300 px-4 py-3 font-normal" /></label>
        <p className="mt-2 text-right text-xs text-slate-400">{draft.bio.length} / 160</p>
        <div className="mt-6 flex justify-end gap-2"><button type="button" onClick={() => dialog.current.close()} className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm">취소</button><button disabled={!draft.name.trim()} className="rounded-xl bg-black px-5 py-2.5 text-sm text-white disabled:opacity-40">저장하기</button></div>
      </form>
    </dialog>
  </>
}
