import { useState } from "react";
import logo from "../assets/fakenews_logo.png";

function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white px-8 py-10">
                <div className="mb-8 text-center">
                   <img
                        src={logo}
                        alt="FakeNews Simulator"
                        className="mx-auto -mb-2 w-40"
                   />
                    <h1 className="text-3xl font-bold text-gray-900">
                        로그인
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        서비스를 이용하려면 로그인을 해주세요.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="mb-2 block text-sm font-medium text-gray-800"
                        >
                            이메일
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="이메일을 입력해주세요"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-600"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="mb-2 block text-sm font-medium text-gray-800"
                        >
                            비밀번호
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력해주세요"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-gray-600"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                        로그인
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    계정이 없으신가요?{" "}
                    <button
                        type="button"
                        className="font-semibold text-gray-900 underline"
                    >
                        회원가입
                    </button>
                </p>
            </div>
        </main>
    );
}

export default LoginPage;