import { useState } from "react";
import logo from "../assets/fakenews_logo.png";

function SignupPage(){
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

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
                        회원가입
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        FakeNews Simulator를 시작해보세요.
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
                            htmlFor="nickname"
                            className="mb-2 block text-sm font-medium text-gray-800"
                        >
                            닉네임
                        </label>

                        <input
                            id="nickname"
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            placeholder="닉네임을 입력해주세요"
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
                        회원가입
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-500">
                    이미 계정이 있으신가요?{" "}
                    <button
                        type="button"
                        className="font-semibold text-gray-900 underline"
                    >
                        로그인
                    </button>
                </p>
            </div>
        </main>
    );
}

export default SignupPage;