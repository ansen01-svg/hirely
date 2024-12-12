export default function NotFound() {
  return (
    <div className="w-full h-[calc(100vh-73px-147.5px)]">
      <main className="w-full h-full text-primaryLight flex flex-col items-center justify-center gap-5">
        <h1 className="text-[22px] text-center">
          {"Sorry, we couldn't find anything here"}
        </h1>
        <p className="text-[15px] text-center">
          {`The job posting you're looking for might have closed, or it has been
          removed. (404 error).`}
        </p>
      </main>
    </div>
  );
}
