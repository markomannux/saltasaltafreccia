call npm run-script build
git add dist
git commit -m "rigenerato sito"
git subtree push --prefix dist https://github.com/markomannux/saltasaltafreccia gh-pages
git push origin master:master
