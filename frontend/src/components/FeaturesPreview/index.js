import FeatureCard from '../FeatureCard';
import { AiOutlineUnlock } from 'react-icons/ai';
import { BiWorld } from 'react-icons/bi';
import { MdPayment } from 'react-icons/md';
import { TbTruckDelivery } from 'react-icons/tb';
import { GiMoneyStack } from 'react-icons/gi';
import HeadingPrimary from '../HeadingPrimary';
import { MdOutlineFeaturedPlayList } from 'react-icons/md';

export default function FeaturesPreviw() {
    const features = [
        {
            id: 1,
            icon: <BiWorld fontSize={100} />,
            title: 'Worldwide Products',
            text: 'You can find what you need from all over the world',
        },
        {
            id: 2,
            icon: <MdPayment fontSize={100} />,
            title: 'Secure Payment',
            text: 'You can pay by paypal or cash on delivery',
        },
        {
            id: 3,
            icon: <TbTruckDelivery fontSize={100} />,
            title: 'Fast Delivery',
            text: 'You will receive your products as soon as possible',
        },
        {
            id: 4,
            icon: <GiMoneyStack fontSize={100} />,
            title: 'More Profit',
            text: 'You will earn more money by selling your products on our website',
        },
    ];
    return (
        <section className="feature-section container my-5">
            <div className="row">
                <HeadingPrimary icon={<MdOutlineFeaturedPlayList className="me-2" />} title="our features" />
                {features.map((feature) => (
                    <FeatureCard key={feature.id} feature={feature} />
                ))}
            </div>
        </section>
    );
}
