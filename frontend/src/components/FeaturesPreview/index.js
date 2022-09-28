import FeatureCard from "../FeatureCard";
import { AiOutlineUnlock } from "react-icons/ai";
import HeadingPrimary from "../HeadingPrimary";
import { MdOutlineFeaturedPlayList } from "react-icons/md";

export default function FeaturesPreviw() {
  return (
    <section className="feature-section container my-5">
      <div className="row">
        <HeadingPrimary
          icon={<MdOutlineFeaturedPlayList className="me-2" />}
          title="our features"
        />
        {[1, 2, 3, 4].map((f, index) => (
          <FeatureCard key={index} icon={<AiOutlineUnlock fontSize={100} />} />
        ))}
      </div>
    </section>
  );
}
