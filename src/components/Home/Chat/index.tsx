import { Box } from "@mui/material";
import ChatItem from "./ChatItem";

interface IProps {
  inputText: string;
}

const Chat = ({ inputText }: IProps) => {
  return (
    <Box sx={{ height: "calc(100vh - 12rem)", overflow: "auto" }}>
      <Box>
        <ChatItem text={inputText} />
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
