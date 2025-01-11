start:
	npx pm2 start pm2.config.js

start.server:
	npx pm2 start pm2.config.js --only server --attach

stop:
	npx pm2 stop frontend
	npx pm2 stop server

delete.all:
	npx pm2 delete frontend
	npx pm2 delete server
	npx pm2 flush 

delete.frontend:
	npx pm2 delete frontend
	npx pm2 flush frontend

delete.server:
	npx pm2 delete server
	npx pm2 flush server

logs:
	npx pm2 logs

logs.server:
	npx pm2 logs server

_generate.prisma:
	npx prisma generate