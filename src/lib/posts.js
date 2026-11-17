// Both composers submit the same draft shape to App's shared posts state.
export function createPost(draft, profile) {
  const content = draft.content.trim()
  if (!content || content.length > 500) return null
  const attachments = (draft.attachments || []).map((item) => ({ ...item }))
  return {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    commentList: [],
    isOwn: true,
    author: profile.name,
    role: '일반 사용자',
    tone: 'green',
    avatar: 'green',
    time: '방금 전',
    content,
    postType: draft.postType || '일반 사용자 글',
    visibility: draft.visibility || '전체 공개',
    hashtags: [...(draft.hashtags || [])],
    attachments,
    attachment: attachments.map((item) => item.name).join(', '),
    comments: 0,
    reposts: 0,
    likes: 0,
    liked: false,
    reposted: false,
    bookmarked: false,
  }
}

export function selectFeed(posts, tab, query = '') {
  const keyword = query.toLowerCase().replaceAll(' ', '')
  const result = posts.filter((post) =>
    (tab !== '팔로잉' || post.followed) &&
    `${post.author}${post.content}${(post.hashtags || []).join('')}`.toLowerCase().replaceAll(' ', '').includes(keyword))
  const newest = (a, b) => b.createdAt - a.createdAt
  if (tab === '인기') return result.sort((a, b) => b.likes - a.likes || newest(a, b))
  if (tab === '추천') return result.sort((a, b) =>
    (b.likes + b.reposts * 2 + b.comments) - (a.likes + a.reposts * 2 + a.comments) || newest(a, b))
  return result.sort(newest)
}

export function updateOwnPost(posts, id, draft) {
  const content = draft.content.trim()
  if (!content || content.length > 500) return posts
  return posts.map((post) => post.id === id && post.isOwn ? {
    ...post, content, postType: draft.postType, visibility: draft.visibility,
    hashtags: [...draft.hashtags], attachments: draft.attachments.map((item) => ({ ...item })),
    attachment: draft.attachments.map((item) => item.name).join(', '), edited: true,
  } : post)
}

export function addComment(posts, id, content, author) {
  const text = content.trim()
  if (!text || text.length > 500) return posts
  const comment = { id: crypto.randomUUID(), author, content: text, time: '방금 전', isOwn: true }
  return posts.map((post) => post.id === id ? {
    ...post, comments: post.comments + 1, commentList: [...(post.commentList || []), comment],
  } : post)
}

export function togglePost(posts, id, key) {
  if (!['liked', 'reposted', 'bookmarked'].includes(key)) return posts
  return posts.map((post) => post.id !== id ? post : {
    ...post, [key]: !post[key],
    ...(key === 'liked' && { likes: post.likes + (post.liked ? -1 : 1) }),
    ...(key === 'reposted' && { reposts: post.reposts + (post.reposted ? -1 : 1) }),
  })
}

export const emptyDraft = () => ({ content: '', postType: '일반 사용자 글', visibility: '전체 공개', hashtags: [], attachments: [] })
