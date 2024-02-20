#!/bin/sh

git filter-branch --env-filter '
OLD_EMAIL="himanshu.dudhat@bacancytechnology.com"
CORRECT_NAME="Ishita301"
CORRECT_EMAIL="ishita.imscit21@gmail.com"
    export GIT_COMMITTER_NAME="$CORRECT_NAME"
    export GIT_COMMITTER_EMAIL="$CORRECT_EMAIL"

' --tag-name-filter cat -- --branches --tags