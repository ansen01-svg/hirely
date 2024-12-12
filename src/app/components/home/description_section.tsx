const description = "Your Hub for All Job Listings in One Place";

export default function DescriptionSection() {
  return (
    <div className="w-full px-4 md:px-24 lg:px-44">
      <div className="w-full py-16 md:py-20 lg:py-20">
        <h1 className="text-center text-[22px] text-primaryLight lg:text-[28px]">
          {description}
        </h1>
      </div>
    </div>
  );
}
