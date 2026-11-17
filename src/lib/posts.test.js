import test from 'node:test'
import assert from 'node:assert/strict'
import { createPost, selectFeed, updateOwnPost, addComment, togglePost, emptyDraft } from './posts.js'

const profile = { name: '작성자' }
const makePost = (content = '본문') => createPost({ ...emptyDraft(), content }, profile)

test('두 작성 화면의 초안 형식을 공통 게시글로 변환하고 첨부·옵션을 보존한다', () => {
  const draft = { ...emptyDraft(), content: '  새 글  ', visibility: '비공개', hashtags: ['태그'], attachments: [{ id: 'file', name: 'photo.png', type: 'image/png' }] }
  const post = createPost(draft, profile)
  assert.equal(post.content, '새 글')
  assert.equal(post.author, profile.name)
  assert.equal(post.isOwn, true)
  assert.equal(post.visibility, '비공개')
  assert.equal(post.attachment, 'photo.png')
  draft.hashtags.push('변경')
  draft.attachments[0].name = 'changed'
  assert.deepEqual(post.hashtags, ['태그'])
  assert.equal(post.attachments[0].name, 'photo.png')
  assert.notEqual(post.id, makePost().id)
})

test('빈 글과 500자 초과 글을 거절하고 경계값을 허용한다', () => {
  assert.equal(makePost('   '), null)
  assert.equal(makePost('a'.repeat(501)), null)
  assert.ok(makePost('a'.repeat(500)))
})

test('댓글은 해당 게시글에만 반영하고 빈 댓글은 무시한다', () => {
  const posts = [makePost('첫 글'), makePost('다른 글')]
  const updated = addComment(posts, posts[0].id, '  댓글  ', '독자')
  assert.equal(updated[0].comments, 1)
  assert.equal(updated[0].commentList[0].content, '댓글')
  assert.equal(updated[0].commentList[0].author, '독자')
  assert.equal(updated[1], posts[1])
  assert.equal(posts[0].comments, 0)
  assert.equal(addComment(updated, posts[0].id, ' ', '독자'), updated)
  assert.equal(addComment(updated, posts[0].id, 'a'.repeat(501), '독자'), updated)
})

test('반응 토글은 되돌릴 수 있고 원본 게시글을 변경하지 않는다', () => {
  const posts = [makePost()]
  for (const [key, count] of [['liked', 'likes'], ['reposted', 'reposts'], ['bookmarked', null]]) {
    const active = togglePost(posts, posts[0].id, key)
    assert.equal(active[0][key], true)
    if (count) assert.equal(active[0][count], 1)
    assert.deepEqual(togglePost(active, posts[0].id, key), posts)
  }
  assert.equal(posts[0].liked, false)
})

test('내 글 수정은 댓글·반응·작성 시간을 유지하며 다른 사람 글을 수정하지 않는다', () => {
  const own = { ...makePost(), likes: 8, comments: 1, commentList: [{ id: 'comment' }] }
  const other = { ...makePost(), isOwn: false }
  const posts = [own, other]
  const draft = { ...emptyDraft(), content: '수정한 본문' }
  const result = updateOwnPost(posts, own.id, draft)
  assert.equal(result[0].content, draft.content)
  assert.equal(result[0].likes, 8)
  assert.equal(result[0].createdAt, own.createdAt)
  assert.deepEqual(result[0].commentList, own.commentList)
  assert.equal(result[0].edited, true)
  assert.equal(updateOwnPost(posts, other.id, draft)[1], other)
  assert.equal(updateOwnPost(posts, own.id, { ...draft, content: ' ' }), posts)
})

test('피드 탭은 최신·인기·추천·팔로잉 기준으로 정렬하며 검색과 함께 동작한다', () => {
  const posts = [
    { ...makePost('오래된 글'), id: 'old', createdAt: 1, likes: 10, reposts: 0, comments: 0 },
    { ...makePost('새로운 글'), id: 'new', createdAt: 3, likes: 1, reposts: 10, followed: true, hashtags: ['태그'] },
    { ...makePost('중간 글'), id: 'middle', createdAt: 2, likes: 2 },
  ]
  const ids = (tab, query) => selectFeed(posts, tab, query).map((post) => post.id)
  assert.deepEqual(ids('최신'), ['new', 'middle', 'old'])
  assert.deepEqual(ids('인기'), ['old', 'middle', 'new'])
  assert.deepEqual(ids('추천'), ['new', 'old', 'middle'])
  assert.deepEqual(ids('팔로잉'), ['new'])
  assert.deepEqual(ids('최신', '태그'), ['new'])
  assert.deepEqual(ids('팔로잉', '없는 검색어'), [])
  assert.deepEqual(posts.map((post) => post.id), ['old', 'new', 'middle'])
})
