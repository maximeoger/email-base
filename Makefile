start:
	npx pm2 start pm2.config.js --attach

stop:
	npx pm2 stop frontend
	npx pm2 stop server

delete.all:
	npx pm2 delete frontend
	npx pm2 delete server
	npx pm2 flush 

logs:
	npx pm2 logs