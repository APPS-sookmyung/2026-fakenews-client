import test from 'node:test'
import assert from 'node:assert/strict'
import { validateAuth } from './auth.js'

const valid = { email: 'sample@example.com', nickname: '독자', password: 'sample123', confirmPassword: 'sample123' }
test('로그인은 이메일과 비밀번호를 검증하고 회원가입 규칙을 강제하지 않는다', () => {
  assert.deepEqual(validateAuth({ ...valid, password: 'short' }), {})
  assert.ok(validateAuth({ ...valid, email: 'invalid' }).email)
  assert.ok(validateAuth({ ...valid, password: '' }).password)
  assert.ok(validateAuth({ ...valid, email: ' ' }).email)
})
test('회원가입은 닉네임·비밀번호 조건·비밀번호 확인을 검증한다', () => {
  assert.deepEqual(validateAuth(valid, true), {})
  assert.ok(validateAuth({ ...valid, nickname: '   ' }, true).nickname)
  assert.ok(validateAuth({ ...valid, nickname: '가'.repeat(21) }, true).nickname)
  assert.ok(validateAuth({ ...valid, password: '12345678' }, true).password)
  assert.ok(validateAuth({ ...valid, password: 'abcdefgh' }, true).password)
  assert.ok(validateAuth({ ...valid, password: 'a1' }, true).password)
  assert.ok(validateAuth({ ...valid, confirmPassword: 'different' }, true).confirmPassword)
})
