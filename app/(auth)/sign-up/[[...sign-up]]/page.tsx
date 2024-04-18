import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-center my-[6vh]">
      <SignUp />
    </div>
  );
}
