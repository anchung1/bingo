# reactTemplate

Steps to use this template: <br/>
1) git clone https://github.com/anchung1/reactTemplate.git <some ws> <br/>
2) on github, create another repository (say sampleProj) for future commits.  Template is for init only and no commits should go into it. <br/>
3) from <some ws>, change the remote to point to repo from step 2) <br/>
  -- git remote set-url origin https://github.com/anchung1/sampleProj.git <br/>
  -- git remote -v to verify <br/>
  -- git pull to sync <some ws> with new remote <br/>
  -- git push to put templates into new repo <br/>
  
References: <br/>
1) https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/ <br/>
2) https://help.github.com/articles/changing-a-remote-s-url/ <br/>
<br/>
For reference 1), needed to add another step: <br/>
  After setting this: <br/>
  -- git remote add origin remote repository URL <br/>
  <br/>
  Need to do git pull: <br/>
  -- git pull origin master <br/>
  <br/>
  Then do git push: <br/>
  -- git push origin master <br/>
  <br/>
<br/>
