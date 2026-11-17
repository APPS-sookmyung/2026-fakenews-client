import { useState } from 'react'

export default function PostDetailPage({ post, profile, renderPost, onHome, onComment }) {
  const [content, setContent] = useState('')
  const [panel, setPanel] = useState(null)
  const [reason, setReason] = useState('허위 정보 / 가짜 뉴스')
  const [reportDetail, setReportDetail] = useState('')
  const [status, setStatus] = useState('')
  if (!post) return <section className="rounded-2xl border bg-white p-8"><h1 className="text-xl font-bold">게시글을 찾을 수 없습니다</h1><p className="mt-3 text-sm text-slate-500">삭제되었거나 현재 목록에 없는 게시글입니다.</p><button onClick={onHome} className="mt-6 rounded-lg bg-black px-4 py-2 text-white">홈 피드로 돌아가기</button></section>
  const submit = (event) => {
    event.preventDefault()
    if (!content.trim() || content.trim().length > 500) return
    onComment(content)
    setContent('')
    setStatus('댓글을 등록했습니다.')
  }
  return <>
    <div className="flex items-center gap-4"><button onClick={onHome} aria-label="홈 피드로 돌아가기">← 홈</button><h1 className="text-xl font-bold">게시글 상세</h1></div>
    {renderPost(post)}
    <div className="flex gap-4 px-2 text-sm"><button onClick={() => setPanel(panel === 'network' ? null : 'network')}>확산 네트워크</button><button onClick={() => setPanel(panel === 'report' ? null : 'report')}>신고하기</button></div>
    {panel === 'network' && <section className="rounded-2xl border bg-white p-5"><h2 className="font-bold">확산 네트워크</h2><p className="mt-3 text-sm">{post.author} → 리포스트 {post.reposts}회</p><p className="mt-2 text-xs text-slate-500">상세 확산 경로는 데이터 연동 후 표시됩니다.</p><button className="mt-3 text-sm" onClick={() => setPanel(null)}>닫기</button></section>}
    {panel === 'report' && <form onSubmit={(event) => { event.preventDefault(); setPanel(null); setStatus('신고 내용을 확인했습니다. 실제 신고 전송은 API 연결 후 지원됩니다.') }} className="space-y-3 rounded-2xl border bg-white p-5"><h2 className="font-bold">게시글 신고</h2><label className="block text-sm">신고 사유<select value={reason} onChange={(event) => setReason(event.target.value)} className="mt-2 block w-full rounded-lg border p-2">{['허위 정보 / 가짜 뉴스', '혐오 / 비방', '스팸', '기타'].map((value) => <option key={value}>{value}</option>)}</select></label><label className="block text-sm">상세 내용<textarea value={reportDetail} onChange={(event) => setReportDetail(event.target.value)} required={reason === '기타'} maxLength={500} className="mt-2 block w-full rounded-lg border p-2" /></label><div className="flex gap-3"><button type="button" onClick={() => setPanel(null)}>취소</button><button className="rounded-lg bg-black px-4 py-2 text-white">내용 확인</button></div></form>}
    <section className="rounded-2xl border border-slate-300 bg-white p-5 sm:p-7">
      <h2 className="text-lg font-bold">댓글 {post.comments}</h2>
      <form onSubmit={submit} className="mt-5 space-y-3"><label className="block text-sm font-semibold">{profile.name}님의 댓글<textarea value={content} onChange={(event) => setContent(event.target.value)} maxLength={500} rows={3} placeholder="댓글을 남겨보세요" className="mt-2 block w-full resize-none rounded-xl border border-slate-300 p-3 font-normal" /></label><div className="flex items-center justify-end gap-4"><span className="text-xs text-slate-400">{content.length} / 500</span><button disabled={!content.trim()} className="rounded-lg bg-black px-4 py-2 text-sm text-white disabled:opacity-40">댓글 등록</button></div></form>
      <ul className="mt-6 divide-y divide-slate-100">{(post.commentList || []).map((comment) => <li key={comment.id} className="py-4"><b className="text-sm">{comment.isOwn ? profile.name : comment.author}</b><span className="ml-3 text-xs text-slate-400">{comment.time}</span><p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6">{comment.content}</p></li>)}</ul>
      {!post.comments && <p className="py-8 text-center text-sm text-slate-400">첫 댓글을 남겨보세요.</p>}
    </section><p role="status" className="text-sm text-slate-600">{status}</p>
  </>
}
