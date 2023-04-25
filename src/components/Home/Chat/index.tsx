import { Box } from "@mui/material";
import ChatItem from "./ChatItem";

const Chat = () => {
  return (
    <Box sx={{ height: "calc(100vh - 12rem)", overflow: "auto" }}>
      <Box>
        <ChatItem
          text=' act as a job seeker and write a proposal related to the following
            job detail "We have been developing Stock Market Website from the
            ground up. Looking to integrate API, Charts, Data, Login and etc. We
            already have the design and API keys with all to request data to the
            page. You will need to start bringing this website to life. Tech
            stack: Next.js (React) framework and JavaScript-based frameworks are
            perfect for building web applications that integrate with real-time
            data API, custom chart elements, authentication, etc. And you will
            need to work on AWS."'
        />
      </Box>

      <Box sx={{ background: "rgba(86,88,105,1)" }}>
        <ChatItem
          text="To remove the last 2 commits in your Github repository, you can use the git reset command followed by the --hard flag to discard the changes from those commits.

Here are the steps:

Open the terminal or command prompt.
Navigate to your local repository using the cd command.
Type git log to see the list of commits in your repository.
Note down the SHA-1 hashes of the last 2 commits that you want to remove.
Type git reset --hard HEAD~2 in the terminal. This will remove the last 2 commits from your local repository and discard any changes made in those commits.
Finally, push the changes to your Github repository using git push -f command. The -f flag is used to force push the changes, as you have modified the commit history.
Note: Be careful while using the git reset command, as it can permanently delete commits and changes. Make sure to create a backup or clone of your repository before making any major changes."
          responseIcon
        />
      </Box>
    </Box>
  );
};

export default Chat;
