import {
  CtaSection,
  DeploySection,
  FeatureGridSection,
  HeroSection,
  SecuritySection,
} from "@/components/home-sections";

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Powerhour",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description:
    "Self-hosted personal finance dashboard with AI-powered insights, budgeting workflows, and secure architecture.",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <HeroSection />
      <FeatureGridSection />
      <SecuritySection />
      <DeploySection />
      <CtaSection />
    </>
  );
}
