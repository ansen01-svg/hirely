const description = "Filter jobs by your preferences";

export default function FormSection() {
  return (
    <div className="w-full px-8 md:px-24 lg:px-44">
      <div className="w-full border-solid border-[1px] border-slate-300 shadow">
        <form className="w-full py-5 px-5 md:px-6 md:py-4 lg:px-8 lg:py-4">
          <div className="w-full flex flex-col items-center justify-center gap-5 md:flex-row md:gap-0">
            <div className="w-full h-full flex flex-col items-start justify-start md:w-[50%]">
              <h1 className="text-[24px] text-primaryLight font-bold">
                {description}
              </h1>
            </div>
            <div className="w-full md:w-[50%]">
              <div className="w-full float-end py-5 border-[1px] border-slate-300 md:w-[80%]"></div>
            </div>
          </div>

          <div className="w-full py-5 flex flex-col items-center justify-center gap-5 md:flex-row md:gap-8">
            <div className="w-full flex flex-col items-start justify-center gap-2 md:w-[50%]">
              <label
                htmlFor="role"
                className="text-[15px] text-primaryLight font-medium"
              >
                Role
              </label>
              <input
                id="role"
                name="role"
                type="text"
                className="w-full border-b-2 border-secondary"
              ></input>
            </div>

            <div className="w-full flex flex-col items-start justify-center gap-2 md:w-[50%]">
              <label
                htmlFor="role"
                className="text-[15px] text-primaryLight font-medium"
              >
                Skills
              </label>
              <input
                id="role"
                name="role"
                type="text"
                className="w-full border-b-2 border-secondary"
              ></input>
            </div>
          </div>

          <div className="w-full flex flex-col items-center justify-center gap-5 md:flex-row md:gap-8">
            <div className="w-full flex flex-col items-start justify-center gap-2 md:w-[50%]">
              <label
                htmlFor="role"
                className="text-[15px] text-primaryLight font-medium"
              >
                Salary
              </label>
              <input
                id="role"
                name="role"
                type="text"
                className="w-full border-b-2 border-secondary"
              ></input>
            </div>

            <div className="w-full flex flex-col items-start justify-center gap-2 md:w-[50%]">
              <label
                htmlFor="role"
                className="text-[15px] text-primaryLight font-medium"
              >
                Employment Type
              </label>
              <input
                id="role"
                name="role"
                type="text"
                className="w-full border-b-2 border-secondary"
              ></input>
            </div>
          </div>

          <div className="w-full mt-5 flex items-center justify-start gap-3">
            <input id="role" name="role" type="checkbox"></input>
            <label
              htmlFor="role"
              className="text-[15px] text-primaryLight font-medium"
            >
              Remote jobs only
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
