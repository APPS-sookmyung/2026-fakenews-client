import AuthForm from './AuthForm.jsx'

export default function SignupPage({ onLogin, onHome }) {
  return <AuthForm signup onSwitch={onLogin} onHome={onHome} />
}
