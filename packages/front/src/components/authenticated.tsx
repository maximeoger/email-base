"use client"
import { useSession } from "next-auth/react";
import LoggedIn from "./logged-in";
import LogInButton from "./log-in-button";
import FlexContainer from "../containers/flex-container";


export default function Authenticated () {
  const {data: session} = useSession();
  return (
    <div>
      { session?.user ? (
        <FlexContainer className="gap-4">
          <LoggedIn 
            userName={session.user.name as unknown as string}
            userImageSrc={session.user.image as unknown as string}
          />
        </FlexContainer>
      ) : (
        <FlexContainer className="gap-4">
          <LogInButton/>
        </FlexContainer> 
      )}
    </div>
  )
}