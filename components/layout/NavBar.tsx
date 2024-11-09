'use client';

import { Video } from "lucide-react";
import Container from "./container";
import { useRouter } from "next/navigation";
import { useAuth , UserButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const NavBar = () => {

    const router = useRouter();
    const {userId} = useAuth()
    return (
        <div className="sticky top-0 border-b border-primary/10">
            <Container>
                <div className="flex justify-between">
                    <div className="flex items-center gap-1 cursor-pointer" onClick={() => {
                        router.push('/');
                    }}>
                        <Video />
                        <div className="font-bold text-xl">VidChat</div>
                    </div>
                    
                    <div className="flex gap-3 items-center">
                    <UserButton/>
                    {!userId && <>
                        <Button size='sm' variant='outline' onClick={() =>{router.push('/sign-in')}}>Sign In</Button>
                        <Button size='sm' onClick={() =>{router.push('/sign-up')}}>Sign Up</Button>
                    </>}
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default NavBar;
