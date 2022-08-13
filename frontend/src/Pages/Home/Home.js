import CategoryPreview from '../../components/CategoryPreview/CategoryPreview';
import FeaturesPreviw from '../../components/FeaturesPreview';
import Slider from '../../components/Slider/Slider';

export default function Home() {
    console.log(process.env.PUBLIC_URL);
    return (
        <section className="home-page">
            <Slider />
            <CategoryPreview />
            <FeaturesPreviw />
        </section>
    );
}
