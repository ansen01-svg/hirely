import ImageNotSupportedOutlinedIcon from "@mui/icons-material/ImageNotSupportedOutlined";
import { CustomImage } from "@/app/components/home/jobs_holder_section";
import { getTimeDifference } from "@/app/utils/getTimeDifference";

type HeaderPropType = {
  companyLogo: string;
  companyName: string;
  datePosted: string;
};

export default function Header({
  companyLogo,
  companyName,
  datePosted,
}: HeaderPropType) {
  return (
    <div className="w-full px-4 md:px-24 lg:px-72">
      <div className="w-full py-8 flex items-center justify-center">
        <div className="w-14 h-14">
          <div className="w-full h-full relative border-[1px] border-slate-300 rounded-full">
            {companyLogo ? (
              <CustomImage src={companyLogo} alt="company_logo" sizes={128} />
            ) : (
              <div className="w-full h-full flex items-center justify-center rounded-full border-[1px] border-slate-300">
                <ImageNotSupportedOutlinedIcon sx={{ color: "#2d333a" }} />
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 h-full px-5 text-[14px] text-primaryLight flex flex-col items-start justify-center gap-1">
          <h1 className="text-[22px]">{companyName}</h1>
          <h2 className="text-center">
            Posted {getTimeDifference(datePosted)}
          </h2>
        </div>
      </div>
    </div>
  );
}
