import mHome from './mongo/home.js'
import mAllUrls from './mongo/arrurls.js'
import mDelete from './mongo/delete.js'
import mLogin from './mongo/login.js'
import mLogout from './mongo/logout.js'
import mReori from './mongo/reori.js'
import mShorten from './mongo/shorten.js'
import mSignup from './mongo/signup.js'

import fHome from './firebase/home.js'
import fAllUrls from './firebase/arrurls.js'
import fDelete from './firebase/delete.js'
import fLogin from './firebase/login.js'
import fLogout from './firebase/logout.js'
import fReori from './firebase/reori.js'
import fShorten from './firebase/shorten.js'
import fSignup from './firebase/signup.js'

class UserController {
    home = mHome;
    shorten = mShorten;
    allurls = mAllUrls;
    delete = mDelete;
    reori = mReori;
    login = mLogin;
    signup = mSignup;
    logout = mLogout

    // home = fHome;
    // shorten = fShorten;
    // allurls = fAllUrls;
    // delete = fDelete;
    // reori = fReori;
    // login = fLogin;
    // signup = fSignup;
    // logout = fLogout
}

export default new UserController