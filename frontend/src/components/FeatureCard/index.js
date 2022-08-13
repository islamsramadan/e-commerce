import './FeatureCard.style.scss';

export default function FeatureCard({ feature }) {
    return (
        <div className="feature-card-container col-12 col-md-6 col-lg-3 rounded-2 my-5">
            <div className="text-center feature-card bg-white p-4 mx-3 rounded-2">
                <div className="card-icon">{feature.icon}</div>
                <h5 className="my-3 text-capitalize feature-title">{feature.title}</h5>
                <p className="feature-description">{feature.text}</p>
            </div>
        </div>
    );
}
