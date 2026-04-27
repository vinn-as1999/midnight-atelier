import './login.scss';


export default function LoginPage() {
  return (
    <>
      <section className="login-container">
        <header>
          <h1>the midnight atelier</h1>
          <span className="page-tag">
            the heritage guild
          </span>
        </header>

        <article className="form-container">
          <h1>Sign In</h1>
          <form action="">
            <label htmlFor="">email address</label><input type="email" placeholder='john_taylor@example.com' />

            <label htmlFor="">password</label>
            <input type="password" placeholder='ex4mpl3@123' />

            <div className="form-options">
              <div>
                <input type="checkbox" /> <span>Remember Me</span>
              </div>

              <span>forgot password?</span>
            </div>

            <button type="submit">
              enter the atelier
            </button>
          </form>
        </article>
      </section>
    </>
  )
};