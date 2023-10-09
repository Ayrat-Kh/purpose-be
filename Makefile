create-migration:
	npx prisma migrate dev


apply-migration:
	npx prisma migrate deploy


init-db:
	# fd
	docker stop purpose_db
	docker rm purpose_db
	docker run \
		--name purpose_db \
		-p 5432:5432 \
		-e POSTGRES_PASSWORD=purpose_db \
		-e POSTGRES_USER=purpose_db \
		-e POSTGRES_DB=purpose_db \
		-d \
		postgres \
		-c shared_buffers=256MB \
		-c max_connections=200