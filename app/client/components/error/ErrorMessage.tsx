import './errormessage.scss';

export default function ErrorMessage({message, isError = true}: {message: string; isError?: boolean}) {
  return (
    <section className={`error-container ${isError ? 'error' : 'success'}`}>
      <span className="error-icon" aria-hidden="true">!</span>
      <p>{message}</p>
    </section>
  )
};
