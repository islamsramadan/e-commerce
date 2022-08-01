import CategoryPreview from "../../components/CategoryPreview/CategoryPreview";
import FeaturesPreviw from "../../components/FeaturesPreview";
import Slider from "../../components/Slider/Slider";

export default function Home() {
  return (
    <section className="home-page">
      <Slider />
      <CategoryPreview />
      <FeaturesPreviw />
    </section>
  );
}
