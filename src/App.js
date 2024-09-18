import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import GitHubLogin from "./gitauth";

function App() {
  return (
    <div>
      <LoginSocialGoogle
        client_id="google clientid"
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ provider, data }) => {
          console.log(provider, data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>
      <GitHubLogin />
    </div>
    
    
  );
}

export default App;
