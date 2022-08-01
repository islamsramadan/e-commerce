import "./Heading.style.scss";

export default function HeadingPrimary({ title, icon }) {
  return (
    <h3 className="primary-heading text-capitalize d-inline position-relative fw-bold d-flex align-items-center">
      {icon} {title}
    </h3>
  );
}
