start:
	npx pm2 start pm2.config.js --attach

start.server:
	npx pm2 start pm2.config.js --attach server

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

logs:
	npx pm2 logs