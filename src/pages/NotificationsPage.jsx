import { useState } from 'react'
import { ArrowLeft, Bell, Check, CheckCheck, Heart, MessageCircle, RefreshCw, Sparkles } from 'lucide-react'

const types = {
  like: { label: '좋아요', Icon: Heart, color: 'bg-rose-50 text-rose-500' },
  comment: { label: '댓글', Icon: MessageCircle, color: 'bg-blue-50 text-blue-500' },
  repost: { label: '리포스트', Icon: RefreshCw, color: 'bg-green-50 text-green-600' },
  system: { label: '시스템', Icon: Sparkles, color: 'bg-slate-100 text-slate-600' },
}

export default function NotificationsPage({ notifications, query, onRead, onReadAll, onHome }) {
  const [filter, setFilter] = useState('all')
  const [unreadOnly, setUnreadOnly] = useState(false)
  const [status, setStatus] = useState('')
  const unread = notifications.filter((item) => !item.read).length
  const keyword = query.toLowerCase().replaceAll(' ', '')
  const filtered = notifications.filter((item) =>
    (filter === 'all' || item.type === filter) && (!unreadOnly || !item.read) &&
    `${item.actor}${item.message}${item.preview}`.toLowerCase().replaceAll(' ', '').includes(keyword))

  return <>
    <div className="flex items-center gap-3 px-1 py-2">
      <button onClick={onHome} aria-label="홈 피드로 돌아가기" className="rounded-full p-2 hover:bg-slate-200"><ArrowLeft className="size-5" /></button>
      <div><h1 className="text-xl font-bold">알림</h1><p className="mt-0.5 text-xs text-slate-500">나에게 도착한 새로운 소식을 확인하세요</p></div>
    </div>
    <section className="overflow-hidden rounded-2xl border border-slate-300 bg-white">
      <div className="profile-cover flex flex-wrap items-center justify-between gap-4 px-5 py-7 sm:px-7">
        <div className="flex items-center gap-4"><div className="grid size-12 shrink-0 place-items-center rounded-2xl border border-white bg-white/80"><Bell className="size-6" /></div><div><p className="text-[10px] font-semibold tracking-[.18em] text-slate-500">NOTIFICATIONS</p><h2 className="mt-1 text-lg font-bold">{unread ? <>새로운 알림 <span className="text-green-700">{unread}개</span>가 있어요</> : '모든 소식을 확인했어요'}</h2><p className="mt-1 text-xs text-slate-500">내 게시글에 모인 반응과 시뮬레이션 소식</p></div></div>
        <button disabled={!unread} onClick={() => { onReadAll(); setStatus('모든 알림을 읽음으로 표시했습니다.') }} className="flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 disabled:cursor-default disabled:bg-slate-200 disabled:text-slate-500"><CheckCheck className="size-4" />모두 읽음</button>
      </div>
      <div className="flex overflow-x-auto border-b border-slate-200 px-3 sm:px-5" aria-label="알림 유형">
        {[['all', '전체'], ...Object.entries(types).map(([key, value]) => [key, value.label])].map(([key, label]) => <button key={key} onClick={() => setFilter(key)} aria-pressed={filter === key} className={`shrink-0 border-b-2 px-3 py-4 text-sm sm:px-4 ${filter === key ? 'border-black font-bold' : 'border-transparent text-slate-500 hover:text-black'}`}>{label}</button>)}
      </div>
      <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-7"><p className="text-xs text-slate-500">총 <b className="text-slate-800">{filtered.length}</b>개의 알림</p><label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600"><input type="checkbox" checked={unreadOnly} onChange={(event) => setUnreadOnly(event.target.checked)} className="size-4 accent-black" />읽지 않은 알림만</label></div>
      {filtered.length ? ['오늘', '이전 알림'].map((group) => {
        const items = filtered.filter((item) => item.group === group)
        return items.length > 0 && <section key={group} aria-label={group}><h2 className="border-y border-slate-100 bg-slate-50 px-5 py-2.5 text-xs font-semibold text-slate-500 sm:px-7">{group}</h2><ul className="divide-y divide-slate-100">{items.map((item) => {
          const { Icon, color, label } = types[item.type]
          return <li key={item.id} className={`flex items-start gap-3 px-5 py-5 sm:gap-4 sm:px-7 ${item.read ? '' : 'bg-slate-50/60'}`}>
            <div className={`grid size-10 shrink-0 place-items-center rounded-full ${color}`}><Icon className="size-5" /></div>
            <div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-x-2 gap-y-1"><span className="text-[11px] text-slate-500">{label}</span><span className="text-[11px] text-slate-400">· {item.time}</span>{!item.read && <span className="flex items-center gap-1 text-[10px] font-semibold text-green-700"><span className="size-1.5 rounded-full bg-green-500" />새 알림</span>}</div><p className="mt-1.5 break-words text-sm leading-6"><b>{item.actor}</b>{item.message}</p><p className="mt-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs leading-6 text-slate-500">{item.preview}</p><div className="mt-3 flex justify-end">{item.read ? <span className="flex items-center gap-1 text-xs text-slate-400"><Check className="size-3.5" />읽음</span> : <button onClick={() => { onRead(item.id); setStatus(`${item.actor} 알림을 읽음으로 표시했습니다.`) }} aria-label={`${item.actor} ${label} 알림 읽음 처리`} className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200"><Check className="size-3.5" />읽음으로 표시</button>}</div></div>
          </li>
        })}</ul></section>
      }) : <div className="px-5 py-16 text-center"><div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-slate-100 text-slate-400"><Bell className="size-6" /></div><h2 className="font-semibold">{query ? '검색 결과가 없습니다' : '확인할 알림이 없습니다'}</h2><p className="mt-2 text-sm text-slate-500">{query ? '다른 검색어나 알림 유형으로 찾아보세요.' : '새로운 소식이 도착하면 이곳에서 알려드릴게요.'}</p></div>}
    </section>
    <p role="status" className="sr-only">{status}</p>
    <p className="pb-4 text-center text-xs text-slate-400">알림은 나에게만 표시됩니다.</p>
  </>
}
