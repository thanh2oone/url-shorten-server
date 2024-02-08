import mAuth from './mongo/Auth.js'
import mListUrls from './mongo/ListUrls.js'
import mDelete from './mongo/Delete.js'
import mLogin from './mongo/Login.js'
import mLogout from './mongo/Logout.js'
import mRedirect from './mongo/Redirect.js'
import mShorten from './mongo/Shorten.js'
import mSignup from './mongo/Signup.js'

// import fHome from './firebase/Home.js'
// import fListUrls from './firebase/ListUrls.js'
// import fDelete from './firebase/Delete.js'
// import fLogin from './firebase/Login.js'
// import fLogout from './firebase/Logout.js'
// import fRedirect from './firebase/Redirect.js'
// import fShorten from './firebase/Shorten.js'
// import fSignup from './firebase/Signup.js'

class UserController {
    auth = mAuth;
    shorten = mShorten;
    listUrls = mListUrls;
    delete = mDelete;
    redirect = mRedirect;
    login = mLogin;
    signup = mSignup;
    logout = mLogout

    // home = fHome;
    // shorten = fShorten;
    // listUrls = fListUrls;
    // delete = fDelete;
    // redirect = fRedirect;
    // login = fLogin;
    // signup = fSignup;
    // logout = fLogout;
}

export default new UserController;