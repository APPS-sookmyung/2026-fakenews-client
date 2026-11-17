export function validateAuth({ email, password, nickname, confirmPassword }, signup = false) {
  const errors = {}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = '올바른 이메일 주소를 입력해주세요.'
  if (!password) errors.password = '비밀번호를 입력해주세요.'
  if (signup) {
    if (!nickname.trim() || nickname.trim().length > 20) errors.nickname = '닉네임은 1~20자로 입력해주세요.'
    if (password.length < 8 || password.length > 64 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) errors.password = '비밀번호는 영문과 숫자를 포함해 8~64자로 입력해주세요.'
    if (!confirmPassword || password !== confirmPassword) errors.confirmPassword = '비밀번호가 일치하지 않습니다.'
  }
  return errors
}
