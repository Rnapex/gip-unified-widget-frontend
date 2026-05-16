function QuoteButton({
  onClick,
  loading,
}) {

  return (
    <button
      className="
        quote-button
      "
      onClick={onClick}
      disabled={loading}
    >
      {loading
        ? "Calculating..."
        : "Get Quote"}
    </button>
  );
}

export default QuoteButton;