import AuthForm from './AuthForm.jsx'

export default function LoginPage({ onSignup, onHome }) {
  return <AuthForm onSwitch={onSignup} onHome={onHome} />
}
