import { useState } from 'react'
import logo from '../assets/fakenews_logo.png'
import { validateAuth } from '../lib/auth.js'

export default function AuthForm({ signup = false, onSwitch, onHome }) {
  const [values, setValues] = useState({ email: '', nickname: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const title = signup ? '회원가입' : '로그인'
  const fields = [['email', '이메일', 'email'], ...(signup ? [['nickname', '닉네임', 'text']] : []), ['password', '비밀번호', 'password'], ...(signup ? [['confirmPassword', '비밀번호 확인', 'password']] : [])]
  const submit = (event) => {
    event.preventDefault()
    const next = validateAuth(values, signup)
    setErrors(next)
    setStatus(Object.keys(next).length ? '' : '입력값 확인을 완료했습니다. 실제 인증은 API 연결 후 지원됩니다.')
    if (Object.keys(next).length) event.currentTarget.elements.namedItem(Object.keys(next)[0])?.focus()
  }
  return <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8"><div className="w-full max-w-md rounded-xl border border-gray-200 bg-white px-8 py-8"><button onClick={onHome} className="text-sm text-slate-500">← 홈으로</button><img src={logo} alt="FakeNews Simulator" className="mx-auto w-40" /><h1 className="mb-6 text-center text-3xl font-bold">{title}</h1>
    <form noValidate onSubmit={submit} className="space-y-5">{fields.map(([key, label, type]) => <div key={key}><label htmlFor={key} className="mb-2 block text-sm font-medium">{label}</label><input id={key} name={key} type={type} required value={values[key]} maxLength={key === 'nickname' ? 20 : key === 'email' ? 254 : 64} autoComplete={key === 'email' ? 'email' : key === 'nickname' ? 'nickname' : signup ? 'new-password' : 'current-password'} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `${key}-error` : key === 'password' && signup ? 'password-help' : undefined} onChange={(event) => { setValues({ ...values, [key]: event.target.value }); setErrors((previous) => ({ ...previous, [key]: undefined })); setStatus('') }} className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm" />{key === 'password' && signup && <p id="password-help" className="mt-2 text-xs text-slate-500">영문과 숫자를 포함한 8~64자</p>}{errors[key] && <p id={`${key}-error`} className="mt-2 text-xs text-red-600">{errors[key]}</p>}</div>)}<button className="w-full rounded-lg bg-black py-3 text-sm font-semibold text-white">{title}</button></form>
    <p role="status" className="mt-4 text-sm text-slate-600">{status}</p><p className="mt-6 text-center text-sm text-gray-500">{signup ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'} <button onClick={onSwitch} className="font-semibold text-gray-900 underline">{signup ? '로그인' : '회원가입'}</button></p>
  </div></main>
}
