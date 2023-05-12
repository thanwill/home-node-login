import FormLogin from "../components/FormLogin";
import FormSignIn from "../components/FormSignIn";
import ListUsers from "../components/ListUsers";
import "./styles.css";
export default function Cadastro() {
  return (
    <>
      <div className='container'>
        <ul className='nav nav-pills mb-3' id='pills-tab' role='tablist'>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link active'
              id='pills-home-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-home'
              type='button'
              role='tab'
              aria-controls='pills-home'
              aria-selected='true'>
              Login
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link'
              id='pills-profile-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-profile'
              type='button'
              role='tab'
              aria-controls='pills-profile'
              aria-selected='false'>
              Sign In
            </button>
          </li>
          <li className='nav-item' role='presentation'>
            <button
              className='nav-link'
              id='pills-contact-tab'
              data-bs-toggle='pill'
              data-bs-target='#pills-contact'
              type='button'
              role='tab'
              aria-controls='pills-contact'
              aria-selected='false'>
              Usuários
            </button>
          </li>
        </ul>
        <div className='tab-content' id='pills-tabContent'>
          <div
            className='tab-pane fade show active'
            id='pills-home'
            role='tabpanel'
            aria-labelledby='pills-home-tab'>
            <FormLogin />
          </div>
          <div
            className='tab-pane fade'
            id='pills-profile'
            role='tabpanel'
            aria-labelledby='pills-profile-tab'>
            <FormSignIn />
          </div>
          <div
            className='tab-pane fade'
            id='pills-contact'
            role='tabpanel'
            aria-labelledby='pills-contact-tab'>
            <ListUsers />
          </div>
        </div>
      </div>
    </>
  );
}
