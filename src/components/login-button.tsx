'use client'

import { signIn, signOut, useSession } from "next-auth/react";

function LoginButton() {
    const { data: session } = useSession();

    if (session?.user) {
        return (
            <>
                Đã đăng nhập với {session.user.name} <br />
                <button onClick={() => signOut()}>Đăng xuất</button>
            </>
        );
    }
    return (
        <>
            Chưa đăng nhập <br />
            <button onClick={() => signIn()}>Đăng nhập bằng Google</button>
        </>
    );
}

export default LoginButton;