start.development:
	npx pm2 start pm2.development.config.js

start.production:
	npx pm2 start pm2.production.config.js

start.front.production:
	npx pm2 start pm2.production.config.js --only front

start.server.production:
	npx pm2 start pm2.production.config.js --only server

_flush:
	npx pm2 flush

stop:
	npx pm2 stop front
	npx pm2 stop server

delete.all:
	npx pm2 delete front
	npx pm2 delete server
	@make _flush

delete.front:
	npx pm2 delete front
	npx pm2 flush front

delete.server:
	npx pm2 delete server
	npx pm2 flush server

logs:
	npx pm2 logs

logs.server:
	npx pm2 logs server

_install.workspace:
	yarn install

_generate.prisma:
	yarn --cwd packages/server run generate.schema

_install.frontend:
	yarn --cwd packages/front install

_install.server:
	yarn --cwd packages/server install

_build.frontend:
	yarn --cwd packages/front run build

_build.server:
	yarn --cwd packages/server run build

deploy:
	@make _install.workspace

	@make _install.server
	@make _generate.prisma
	@make _build.server

	@make _install.frontend
	@make _build.frontend

fetchEmails:
	yarn --cwd packages/mail-retreiver run start --dryRun false