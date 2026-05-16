function QuoteButton({
  onClick,
  loading,
  disabled = false,
}) {

  return (
    <button
      className="
        quote-button
      "
      onClick={onClick}
      disabled={
        loading || disabled
      }
    >
      {loading
        ? "Calculating..."
        : "Get Quote"}
    </button>
  );
}

export default QuoteButton;
