import "./FeatureCard.style.scss";

export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card-container col-12 col-md-6 col-lg-3 rounded-2 my-5">
      <div className="text-center feature-card bg-white p-4 mx-3 rounded-2">
        <div className="card-icon">{icon}</div>
        <h5 className="my-3 text-capitalize feature-title">feature title</h5>
        <p className="feature-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt non
          maiores dicta sapiente
        </p>
      </div>
    </div>
  );
}
