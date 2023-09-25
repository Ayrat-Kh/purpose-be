create-migration:
	npx prisma migrate dev

apply-migration:
	npx prisma migrate deploy
