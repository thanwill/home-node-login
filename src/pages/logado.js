export default function Logado() {
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
          <li class='nav-item dropdown'>
            <a
              class='nav-link dropdown-toggle'
              data-bs-toggle='dropdown'
              href=' '
              role='button'
              aria-expanded='false'>
              Outros
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
