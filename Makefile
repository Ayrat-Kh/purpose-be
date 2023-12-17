create-migration:
	npx prisma migrate dev --create-only

apply-migration:
	npx prisma migrate deploy

init-db:
	# fd
	docker stop purpose_db || true
	docker rm purpose_db || true
	docker run \
		--network host \
		--name purpose_db \
		-p 5432:5432 \
		-e POSTGRES_PASSWORD=test_db \
		-e POSTGRES_USER=test_db \
		-e POSTGRES_DB=test_db \
		-d \
		postgres \
		-c shared_buffers=256MB \
		-c max_connections=200

	npx prisma migrate deploy

docker-build:
	docker build -t purpose_be .

docker-start:
	docker stop purpose_be || true
	docker rm purpose_be || true
	docker run --network host --name purpose_be -p 3000:3000 --env-file .env purpose_be