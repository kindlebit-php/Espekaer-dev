
  // const [inputText, setInputText] = useState('');
  // const [encryptedText, setEncryptedText] = useState('');
  // const [decryptedText, setDecryptedText] = useState('');

  // const encrypt = () => {
  //   // Encryption logic
  //   const encrypted = inputText
      // .split('')
      // .map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      // .join('');

  //   setEncryptedText(encrypted);
  // };

  // const decrypt = () => {
  //   // Decryption logic
  //   const decrypted = encryptedText
      // ?.split('')
      // .map((char) => String.fromCharCode(char.charCodeAt(0) - 1))
      // .join('');

  //   setDecryptedText(decrypted);
  // };

class Auth {
    authenticated = false;
    
    login(data) {
      const token = data?.authToken;
      const stripe_id_speaker = data?.speakerData?.customerStripeId;
      const user_role = data?.userData?.role;
      const speaker_role = data?.speakerData?.role;
      const stripe_id_user = data?.userData?.customerStripeId;
      const _id_speaker = data?.speakerData?._id;
      const _id_user = data?.userData?._id;
      const loginSpeakerName = data?.speakerData?.fullName;
      const loginUserName = data?.userData?.fullName;
      const loginSpeakerEmail = data?.speakerData?.email;
      const loginUserEmail = data?.userData?.email;
      const loginSpeakerGender = data?.speakerData?.gender;
      const loginUserGender = data?.userData?.gender;
      localStorage.setItem("role", speaker_role ? speaker_role?.split('')?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join('') : user_role?.split('')?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join(''));
      localStorage.setItem("token", token?.split('')?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join(''));
      localStorage.setItem("stripe_id", stripe_id_speaker ? stripe_id_speaker?.split('')?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join('') : stripe_id_user?.split('')?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join(''));
      localStorage.setItem("_id_login", _id_speaker ? _id_speaker?.split('')?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join('') : _id_user?.split('')?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join(''));


      localStorage.setItem("_login_name", loginSpeakerName ? loginSpeakerName?.split('')?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join('') : loginUserName?.split('')?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join(''));
      localStorage.setItem("_login_email", loginSpeakerEmail ? loginSpeakerEmail?.split('')?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join('') : loginUserEmail?.split('')?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join(''));
      localStorage.setItem("_login_gender", loginSpeakerGender ? loginSpeakerGender?.split('')?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join('') : loginUserGender?.split('')?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join(''));
  
      if (token) {
        this.authenticated = true;
      } else {  
        this.authenticated = false;
      }
    };

    // speaker sidebar name & email
    getSidebarProfileNameAndImage(data){
      localStorage.setItem("sidebarName",data?.fullName?.split('')
      ?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join(''));
      localStorage.setItem("sidebarImage",data?.profileImage?.split('')
      ?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join(''));
    };

     // organiser sidebar name & email
     getSidebarProfileNameAndImageOrganizer(data){
      localStorage.setItem("sidebarName",data?.fullName?.split('')
      ?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join(''));
      localStorage.setItem("sidebarImage",data?.profileImage?.split('')
      ?.map((char) => String.fromCharCode(char.charCodeAt(0) + 1))
      .join(''));
    };

    getSidebarName(){
      const sidebarName = localStorage.getItem("sidebarName");
      return sidebarName;
    };

    getSidebarImage(){
      const sidebarImage = localStorage.getItem("sidebarImage");
      return sidebarImage;
    };
  
    token() {
      const token = localStorage.getItem("token");
      return token;
    };

    loginName(){
      const getLoginName=localStorage.getItem("_login_name");
      return getLoginName;
    };

    loginEmail(){
      const getLoginEmail=localStorage.getItem("_login_email");
      return getLoginEmail;
    };
    
    loginGender(){
      const getLoginGender=localStorage.getItem("_login_gender");
      return getLoginGender;
    };

    stripeToken(){
      const stripeToken = localStorage.getItem("stripe_id");
      return stripeToken;
    };

    forgetEmail(){
      const forgetEmail = localStorage.getItem("forgetEmail");
      return forgetEmail;
    };    

    speakerEmail(){
      const speaker_email = localStorage.getItem("speaker_email");
      return speaker_email;
    };
    loginId(){
      const _id_login = localStorage.getItem("_id_login");
      return _id_login;
    };
    getRol(){
      const roleValue=localStorage.getItem("role");
      return roleValue;
    }

    resetPasswordId(){
      const reset_password_id = localStorage.getItem("reset_password_id");
      return reset_password_id;
    };
    
    resetPasswordToken(){
      const reset_password_token = localStorage.getItem("reset_password_token");
      return reset_password_token;
    };
  
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("forget_password_email");
      localStorage.removeItem("sidebarName");
      localStorage.removeItem("sidebarImage");
      this.authenticated = false;
    };
  
    isUserAuthenticated() {
      if (localStorage.getItem("token")) {
        return true;
      } else {
        return false;
      };
    };
  };
  // eslint-disable-next-line
  export default new Auth();
  