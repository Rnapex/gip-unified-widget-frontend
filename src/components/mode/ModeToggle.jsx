import { MODES }
  from "../../utils/constants";

function ModeToggle({
  mode,
  setMode,
}) {
  return (
    <div className="mode-toggle">
      <button
        className={
          mode ===
          MODES.individual
            ? "mode-btn active"
            : "mode-btn"
        }

        onClick={() =>
          setMode(
            MODES.individual
          )
        }
      >
        Individual
      </button>

      <button
        className={
          mode ===
          MODES.business
            ? "mode-btn active"
            : "mode-btn"
        }

        onClick={() =>
          setMode(
            MODES.business
          )
        }
      >
        Business
      </button>
    </div>
  );
}

export default ModeToggle;