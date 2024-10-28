import DescriptionSection from "./description_section";
import FormSection from "./form_section";
import JobsHolderSection from "./jobs_holder_section";

type MainPropType = {
  data: Record<string, unknown>[];
};

export default async function Main({ data }: MainPropType) {
  return (
    <main className="w-full mb-8">
      <DescriptionSection />
      <FormSection />
      <JobsHolderSection jobs={data} />
    </main>
  );
}
