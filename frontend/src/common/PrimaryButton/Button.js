import "./Button.style.css";

export default function PrimaryButton() {
  return (
    <button className="text-white rounded-4  fs-5 button-primary">
      <a className="text-decoration-none text-white" href="#">
        visit collection
      </a>
    </button>
  );
}
