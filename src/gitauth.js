import React, { useEffect } from 'react';

const GITHUB_CLIENT_ID = 'github clientid';
const REDIRECT_URI = 'http://localhost:3000'; // The same URL you set in the GitHub OAuth app

// With server side 1 api call

// export default GitHubLogin;
const GitHubLogin = () => {
  // Redirect user to GitHub for authentication
  const handleGitHubLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user`;
    window.location.href = githubAuthUrl;
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const code = query.get('code');

    if (code) {
      // Step 3: Call the backend to exchange the code for an access token
      exchangeCodeForAccessToken(code);
    }
  }, []);

  const exchangeCodeForAccessToken = async (code) => {
    try {
      const response = await fetch('http://localhost:4000/github/oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code }),
      });

      const data = await response.json();
      console.log('GitHub access token:', data.access_token);
      
      // Fetch user data using the access token
      fetchGitHubUser(data.access_token);
    } catch (error) {
      console.error('Error exchanging code for access token:', error);
    }
  };

  const fetchGitHubUser = async (accessToken) => {
    try {
      const response = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const emailResponse = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userEmails = await emailResponse.json();
    console.log('GitHub user emails:', userEmails);

      const userData = await response.json();
      console.log('GitHub user data:', userData);
    } catch (error) {
      console.error('Error fetching GitHub user data:', error);
    }
  };

  return (
    <div>
      <button onClick={handleGitHubLogin}>Login with GitHub</button>
    </div>
  );
};

export default GitHubLogin;

//without server side but github give clientside coprs error 

// const GitHubLogin = () => {
//   // Step 1: Redirect user to GitHub for authentication
//   const handleGitHubLogin = () => {
//     const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user`;
//     window.location.href = githubAuthUrl;
//   };

//   // Step 2: Handle the GitHub redirect with the code
//   useEffect(() => {
//     const query = new URLSearchParams(window.location.search);
//     const code = query.get('code');

//     if (code) {
//       // Exchange the code for an access token (can be done via frontend with GitHub's OAuth app settings)
//       exchangeCodeForAccessToken(code);
//     }
//   }, []);

//   // Step 3: Exchange the authorization code for an access token
//   const exchangeCodeForAccessToken = async (code) => {
//     try {
//       const response = await fetch(
//         `https://github.com/login/oauth/access_token?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`,
//         {
//           method: 'POST',
//           headers: {
//             Accept: 'application/json',
//           },
//         }
//       );

//       const data = await response.json();
//       const accessToken = data.access_token;

//       // Now that we have the access token, we can use it to fetch user data from GitHub
//       fetchGitHubUser(accessToken);
//     } catch (error) {
//       console.error('Error fetching access token:', error);
//     }
//   };

//   // Step 4: Fetch user data using the access token
//   const fetchGitHubUser = async (accessToken) => {
//     try {
//       const response = await fetch('https://api.github.com/user', {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       const userData = await response.json();
//       console.log('GitHub user data:', userData);
//     } catch (error) {
//       console.error('Error fetching GitHub user:', error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleGitHubLogin}>Login with GitHub</button>
//     </div>
//   );
// };
