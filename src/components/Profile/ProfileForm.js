import { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCTX = useContext(AuthContext);
  const history = useHistory();

  const newPasswordSubmitHandler = event => {
    event.preventDefault();

    const eneteredNewPassoword = newPasswordInputRef.current.value;

    //add validation

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBSjn9vm-bz7TzJ8KzipGPwzBzLJS5K1ms',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCTX.token,
          password: eneteredNewPassoword,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(res => {
      //assumption: always succeeds! (need error handling later)
      history.replace('/');
    });
  };

  return (
    <form className={classes.form} onSubmit={newPasswordSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          type='password'
          id='new-password'
          minLength='6'
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
