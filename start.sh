#!/bin/sh
echo "RUN MIGRATION"
npx prisma migrate resolve --rolled-back "20231009003609_add_hobby"
npx prisma migrate deploy
echo "START NODE"
node dist/main.js