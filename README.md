# reactTemplate

Steps to use this template:
1) git clone https://github.com/anchung1/reactTemplate.git <some ws>
2) on github, create another repository (say sampleProj) for future commits.  Template is for init only and no commits should go into it.
3) from <some ws>, change the remote to point to repo from step 2)
  -- git remote set-url origin https://github.com/anchung1/<sampleProj>.git
  -- git remote -v to verify
  -- git pull to sync <some ws> with new remote
  -- git push to put templates into new repo
  
References:
1) https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/
2) https://help.github.com/articles/changing-a-remote-s-url/

For reference 1), needed to add another step:
  After setting this:
  -- git remote add origin remote repository URL
  
  Need to do git pull:
  -- git pull origin master
  
  Then do git push:
  -- git push origin master
  
