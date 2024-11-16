#!/bin/zsh
DIR=/Users/daniellebarker/programming/personal/draw-go-react
# delete everything in the public folder except for the images folder

# Delete everything inside ./backend/public except the ./backend/public/images directory and its contents

find ./backend/public -mindepth 1 ! -path "./backend/public/assets/images*" -exec rm -rf {} +


cd $DIR/frontend && tsc -b && vite build
cd $DIR/backend && cp -R dist/* ./public
rm -rf $DIR/backend/dist
cd $DIR/backend && go build -o draw-go-react


