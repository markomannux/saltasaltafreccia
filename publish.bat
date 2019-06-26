REM riferimenti per git subtree e script di pubblicazione
REM https://www.atlassian.com/blog/git/alternatives-to-git-submodule-git-subtree
REM http://krishicks.com/post/2015/05/16/using-git-subtree-with-gh-pages/

call npm run-script build
git add dist
git commit -m "rigenerato sito"
git subtree push --prefix dist https://github.com/markomannux/saltasaltafreccia gh-pages
git push origin master:master
